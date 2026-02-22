/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UploadCloudIcon, LinkIcon, CloseIcon, AddImageIcon, ListIcon, HomeIcon, EditIcon } from './Icons';

interface EditableProps {
    value: string;
    onSave: (val: string) => void;
    isEditMode: boolean;
    mode?: 'text' | 'image' | 'multiline';
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    children?: React.ReactNode;
    saveAsHtml?: boolean;
    isSelected?: boolean;
}

// Predefined assets usually found in public folder or used in the project
const PUBLIC_ASSETS = [
    '/assets/project1.png',
    '/assets/image.jpg',
    '/logo.png',
    '/vite.svg',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80'
];

const getApiUrl = (endpoint: string) => {
    // If we are on localhost (any port), try to target port 3001 for API calls
    // This serves as a fallback if the Vite proxy isn't working or configured
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        // If we are already on 3001, just use relative path
        if (window.location.port === '3001') return endpoint;
        return `http://localhost:3001${endpoint}`;
    }
    return endpoint;
};

// Helper to determine the correct source URL for images
const resolveImageUrl = (path: string) => {
    if (!path) return '';
    // If it's already an absolute URL or data URI, leave it
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    // If it's an uploaded file (starts with /uploads/) and we are on localhost (dev),
    // point to backend port 3001 to ensure we can see it even if Vite doesn't proxy it yet.
    if (path.startsWith('/uploads/') && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
         if (window.location.port === '3001') return path;
         return `http://localhost:3001${path}`;
    }
    
    // For other static assets (like /assets/...), allow Vite to handle them
    return path;
};

export const Editable = ({ value, onSave, isEditMode, mode = 'text', className, style, placeholder, children, saveAsHtml = false, isSelected = false }: EditableProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLElement>(null);
    
    // Image loading state
    const [imgError, setImgError] = useState(false);
    const [displaySrc, setDisplaySrc] = useState('');
    const [retryCount, setRetryCount] = useState(0);

    // Modal State
    const [showImageMenu, setShowImageMenu] = useState(false);
    const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'link'>('upload');
    const [urlInput, setUrlInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    
    // Library State
    const [libraryImages, setLibraryImages] = useState<string[]>(PUBLIC_ASSETS);
    const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);

    // --- Content Sync for Text Modes ---
    useEffect(() => {
        if (mode !== 'image' && contentRef.current) {
            // Only sync if NOT focused to avoid overwriting user's ongoing edits during parent re-renders
            if (document.activeElement !== contentRef.current) {
                if (saveAsHtml) {
                    if (contentRef.current.innerHTML !== (value || placeholder || '')) {
                        contentRef.current.innerHTML = value || placeholder || '';
                    }
                } else {
                    if (contentRef.current.innerText !== (value || placeholder || '')) {
                        contentRef.current.innerText = value || placeholder || '';
                    }
                }
            }
        }
    }, [value, mode, saveAsHtml, placeholder]);

    useEffect(() => {
        const clean = value ? value.trim() : '';
        // Apply the resolver to point to the correct port for uploads
        setDisplaySrc(resolveImageUrl(clean));
        setImgError(false);
        setRetryCount(0);
    }, [value]);

    // Fetch images when library tab is opened
    useEffect(() => {
        if (activeTab === 'library' && showImageMenu) {
            setIsLoadingLibrary(true);
            const apiUrl = getApiUrl('/api/files');
            
            fetch(apiUrl)
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Failed to fetch files');
                })
                .then((uploadedFiles: string[]) => {
                    // Combine uploaded files with static public assets, removing duplicates
                    const combined = Array.from(new Set([...uploadedFiles, ...PUBLIC_ASSETS]));
                    setLibraryImages(combined);
                })
                .catch(err => {
                    console.warn("Library API not reachable, falling back to static assets.");
                    // Fallback to static assets only
                    setLibraryImages(PUBLIC_ASSETS);
                })
                .finally(() => setIsLoadingLibrary(false));
        }
    }, [activeTab, showImageMenu]);

    const handleImageError = () => {
        if (!displaySrc || displaySrc.startsWith('data:') || imgError) {
            setImgError(true);
            return;
        }
        if (retryCount > 1) {
            setImgError(true);
            return;
        }
        if (!displaySrc.startsWith('http') && !displaySrc.startsWith('/')) {
            const newSrc = '/' + displaySrc;
            setDisplaySrc(resolveImageUrl(newSrc)); // Apply resolver here too just in case
            setRetryCount(prev => prev + 1);
            return;
        }
        setImgError(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        if (mode !== 'image' && contentRef.current) {
             const newValue = saveAsHtml ? contentRef.current.innerHTML : contentRef.current.innerText;
             // Basic normalization to avoid unnecessary saves
             const normalizedNew = newValue.trim();
             const normalizedOld = (value || '').trim();
             
             // Check if it matches placeholder to avoid saving placeholder as value
             if (normalizedNew === placeholder) {
                 return; 
             }

             if (normalizedNew !== normalizedOld) {
                 onSave(newValue);
             }
        }
    };

    const handleImageContainerClick = (e: React.MouseEvent) => {
        if (isEditMode) {
            // Only open menu if item is already selected.
            // If not selected, let the event bubble to parent to handle selection.
            if (isSelected) {
                e.stopPropagation();
                setShowImageMenu(true);
                setActiveTab('upload'); // Reset to upload by default
                if (value && !value.startsWith('data:')) {
                    setUrlInput(value);
                } else {
                    setUrlInput('');
                }
            }
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            
            // Use Multipart form data to send to server
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Try proxy first (relative), if fail, try explicit localhost:3001
                let apiUrl = '/api/upload';
                
                // If we are sure we are dev and not using proxy, force explicit absolute
                if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port !== '3001') {
                     apiUrl = getApiUrl('/api/upload');
                }

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    onSave(data.url); // Expecting { url: "/uploads/..." }
                    setShowImageMenu(false);
                } else {
                    console.error("Upload failed with status:", response.status, response.statusText);
                    alert(`Failed to upload image. Server returned: ${response.status} ${response.statusText}.\nEnsure 'node server.js' is running.`);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Error connecting to server. Ensure 'node server.js' is running in a separate terminal.");
            } finally {
                setIsUploading(false);
            }
        }
    };

    // Convert Google Drive Viewer links to Direct Image links
    const convertGoogleDriveLink = (url: string) => {
        if (url.includes('drive.google.com')) {
            // Regex to extract the ID from various Google Drive URL formats
            const idMatch = url.match(/[-\w]{25,}/);
            if (idMatch) {
                return `https://drive.google.com/uc?export=view&id=${idMatch[0]}`;
            }
        }
        return url;
    };

    const handleUrlSubmit = (e?: React.FormEvent) => {
        if(e) e.preventDefault();
        let finalUrl = urlInput.trim();
        
        if (finalUrl) {
            finalUrl = convertGoogleDriveLink(finalUrl);
            onSave(finalUrl);
            setShowImageMenu(false);
        }
    };

    const handleAssetSelect = (assetUrl: string) => {
        onSave(assetUrl);
        setShowImageMenu(false);
    };

    const triggerFileUpload = (e: React.MouseEvent) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    if (mode === 'image') {
        const { objectFit, ...containerStyle } = style || {};
        
        // Custom Fill Logic
        let imgStyles: React.CSSProperties = {
            display: 'block', 
            cursor: isEditMode ? 'pointer' : 'default' 
        };

        const fit = objectFit as any;

        if (fit === 'horizontal') {
            imgStyles.width = '100%';
            imgStyles.height = 'auto';
        } else if (fit === 'vertical') {
            imgStyles.width = 'auto';
            imgStyles.height = '100%';
            imgStyles.margin = '0 auto';
        } else {
            imgStyles.width = '100%';
            imgStyles.height = '100%';
            imgStyles.objectFit = (objectFit as any) || 'cover';
        }

        // Determine effective background color.
        // If containerStyle has backgroundColor, use it.
        // Otherwise, if in edit mode and no image (or error), show light grey placeholder bg.
        let effectiveBgColor = containerStyle.backgroundColor;
        if (!effectiveBgColor && isEditMode && (!displaySrc || imgError)) {
            effectiveBgColor = 'rgba(0,0,0,0.05)';
        }

        return (
            <div 
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%', 
                    overflow: 'hidden', 
                    ...containerStyle,
                    backgroundColor: effectiveBgColor
                }} 
                className={className} 
                onClick={handleImageContainerClick}
                title={isEditMode ? (isSelected ? "Click to change image" : "Click to select") : undefined}
            >
                {displaySrc && !imgError ? (
                    <img 
                        src={displaySrc} 
                        alt="" 
                        onError={handleImageError}
                        style={imgStyles} 
                    />
                ) : (
                    <div style={{ 
                        width: '100%', height: '100%', 
                        cursor: isEditMode ? 'pointer' : 'default',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {(imgError || !displaySrc) ? (
                            <div style={{ 
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                color: '#999', fontSize: '12px', textAlign: 'center', padding: '10px'
                            }}>
                                <div style={{ opacity: 0.5 }}><AddImageIcon /></div>
                                {isEditMode && <span>{imgError ? 'Image Not Found' : 'Add Image'}</span>}
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                )}
                
                {/* NEW: Explicit Edit Trigger Button for Images in Edit Mode */}
                {isEditMode && (
                    <button 
                        className="edit-image-trigger"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowImageMenu(true);
                            setActiveTab('upload');
                            if (value && !value.startsWith('data:')) {
                                setUrlInput(value);
                            } else {
                                setUrlInput('');
                            }
                        }}
                        title="Change Image"
                    >
                        <EditIcon style={{ width: 16, height: 16 }} />
                    </button>
                )}

                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                
                {isEditMode && showImageMenu && createPortal(
                    <div className="modal-overlay" onClick={() => setShowImageMenu(false)}>
                        <div 
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 
                                maxWidth: '600px', 
                                width: '90%', 
                                padding: '0', 
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Header */}
                            <div style={{ 
                                padding: '20px', 
                                borderBottom: '1px solid #eee', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>Select Image</h3>
                                <button 
                                    onClick={() => setShowImageMenu(false)} 
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#666' }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div style={{ display: 'flex', borderBottom: '1px solid #eee', backgroundColor: '#f9fafb' }}>
                                <button 
                                    onClick={() => setActiveTab('upload')}
                                    style={{
                                        flex: 1, padding: '14px', border: 'none', background: 'none',
                                        borderBottom: activeTab === 'upload' ? '2px solid #2563eb' : '2px solid transparent',
                                        color: activeTab === 'upload' ? '#2563eb' : '#666',
                                        fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}
                                >
                                    <UploadCloudIcon /> Upload
                                </button>
                                <button 
                                    onClick={() => setActiveTab('library')}
                                    style={{
                                        flex: 1, padding: '14px', border: 'none', background: 'none',
                                        borderBottom: activeTab === 'library' ? '2px solid #2563eb' : '2px solid transparent',
                                        color: activeTab === 'library' ? '#2563eb' : '#666',
                                        fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}
                                >
                                    <ListIcon /> Library
                                </button>
                                <button 
                                    onClick={() => setActiveTab('link')}
                                    style={{
                                        flex: 1, padding: '14px', border: 'none', background: 'none',
                                        borderBottom: activeTab === 'link' ? '2px solid #2563eb' : '2px solid transparent',
                                        color: activeTab === 'link' ? '#2563eb' : '#666',
                                        fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}
                                >
                                    <LinkIcon /> Link
                                </button>
                            </div>

                            {/* Body */}
                            <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '250px' }}>
                                
                                {/* TAB: UPLOAD */}
                                {activeTab === 'upload' && (
                                    <div 
                                        onClick={!isUploading ? triggerFileUpload : undefined}
                                        style={{
                                            border: '2px dashed #cbd5e1',
                                            borderRadius: '16px',
                                            backgroundColor: '#f8fafc',
                                            height: '200px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: isUploading ? 'wait' : 'pointer',
                                            transition: 'all 0.2s',
                                            color: '#64748b',
                                            opacity: isUploading ? 0.7 : 1
                                        }}
                                        onMouseEnter={(e) => {
                                            if(!isUploading) {
                                                e.currentTarget.style.borderColor = '#2563eb';
                                                e.currentTarget.style.backgroundColor = '#eff6ff';
                                                e.currentTarget.style.color = '#2563eb';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if(!isUploading) {
                                                e.currentTarget.style.borderColor = '#cbd5e1';
                                                e.currentTarget.style.backgroundColor = '#f8fafc';
                                                e.currentTarget.style.color = '#64748b';
                                            }
                                        }}
                                    >
                                        <div style={{ transform: 'scale(1.5)', marginBottom: '16px' }}>
                                            <UploadCloudIcon />
                                        </div>
                                        <span style={{ fontWeight: 600, fontSize: '16px' }}>
                                            {isUploading ? 'Uploading...' : 'Click to Upload Image'}
                                        </span>
                                        <span style={{ fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>
                                            {isUploading ? 'Please wait' : 'JPG, PNG, GIF, WEBP'}
                                        </span>
                                    </div>
                                )}

                                {/* TAB: LIBRARY */}
                                {activeTab === 'library' && (
                                    <>
                                        {isLoadingLibrary ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#666' }}>
                                                Loading assets...
                                            </div>
                                        ) : (
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                                                {libraryImages.map((asset, idx) => (
                                                    <div 
                                                        key={idx}
                                                        onClick={() => handleAssetSelect(asset)}
                                                        style={{
                                                            aspectRatio: '1',
                                                            borderRadius: '8px',
                                                            overflow: 'hidden',
                                                            cursor: 'pointer',
                                                            border: '1px solid #eee',
                                                            position: 'relative',
                                                            backgroundColor: '#f9f9f9'
                                                        }}
                                                        title={asset}
                                                        className="library-item"
                                                    >
                                                        <img src={resolveImageUrl(asset)} alt="asset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                ))}
                                                {libraryImages.length === 0 && (
                                                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#999', padding: '20px' }}>
                                                        No images found in public uploads.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* TAB: LINK */}
                                {activeTab === 'link' && (
                                    <form onSubmit={handleUrlSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Image URL</label>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>
                                                    <LinkIcon />
                                                </div>
                                                <input 
                                                    type="text" 
                                                    value={urlInput}
                                                    onChange={(e) => setUrlInput(e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    style={{ 
                                                        width: '100%', padding: '12px 12px 12px 40px', 
                                                        borderRadius: '8px', border: '1px solid #cbd5e1', 
                                                        fontSize: '14px', outline: 'none'
                                                    }}
                                                    autoFocus
                                                />
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px', marginLeft: '4px' }}>
                                                Supports Unsplash, direct links, and <b>Google Drive</b> (public files).
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button 
                                                type="submit" 
                                                disabled={!urlInput.trim()}
                                                style={{
                                                    padding: '10px 20px', backgroundColor: urlInput.trim() ? '#2563eb' : '#e2e8f0',
                                                    color: urlInput.trim() ? '#fff' : '#94a3b8', border: 'none',
                                                    borderRadius: '8px', fontWeight: 600, cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                Insert Image
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    const Component = mode === 'multiline' ? 'div' : 'span';
    const props = {
        ref: contentRef as any,
        contentEditable: isEditMode,
        onBlur: handleBlur,
        className: className,
        style: { 
            outline: isEditMode ? '2px dashed #2563eb' : 'none',
            outlineOffset: '4px',
            borderRadius: '4px',
            minWidth: isEditMode ? '20px' : undefined,
            cursor: isEditMode ? 'text' : undefined,
            whiteSpace: 'pre-wrap',
            ...style 
        },
        suppressContentEditableWarning: true
    };

    // NOTE: We do NOT use dangerouslySetInnerHTML here. 
    // Instead, we use useEffect to manually sync content when the prop changes
    // while preventing React from overwriting the user's edits during typing.
    // This allows the element to be "uncontrolled" during focus, but "controlled" when we push updates (like initial load or undo).
    return <Component {...props} />;
};