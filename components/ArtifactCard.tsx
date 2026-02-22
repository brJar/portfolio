/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Artifact } from '../types';
import { Editable } from './Editable';
import { ArrowUpRightIcon } from './Icons';

interface ArtifactCardProps {
    artifact: Artifact;
    prompt: string;
    bgColor: string;
    imageUrl?: string;
    subtitle?: string;
    shortDescription?: string;
    onClick: () => void;
    isEditMode: boolean;
    onUpdateProject: (field: string, value: string) => void;
    onHoverChange?: (imageUrl: string | null) => void;
}

const ArtifactCard = React.memo(({ 
    artifact, 
    prompt,
    bgColor,
    imageUrl,
    subtitle,
    shortDescription,
    onClick,
    isEditMode,
    onUpdateProject,
    onHoverChange
}: ArtifactCardProps) => {
    
    // Local selection state for the card image to allow one-click edit initiation logic if needed,
    // but typically we can just force isSelected=true when in edit mode for this specific component to mimic "one click" behavior
    const [isImageSelected, setIsImageSelected] = useState(false);

    const handleTitleSave = (val: string) => {
        onUpdateProject('title', val);
    };

    const handleSubtitleSave = (val: string) => {
        onUpdateProject('desc', val);
    };
    
    const handleShortDescSave = (val: string) => {
        onUpdateProject('shortDescription', val);
    };

    const handleImageSave = (val: string) => {
        onUpdateProject('image', val);
        setIsImageSelected(false);
    };
    
    // Logic for text color: Always white for blue/image background
    const textColor = '#ffffff';
    const subtitleColor = 'rgba(255,255,255,0.9)';
    const textShadow = '0 2px 10px rgba(0,0,0,0.1)';
    
    // Mouse Follower Logic
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isEditMode && followerRef.current) {
            followerRef.current.style.left = `${e.clientX}px`;
            followerRef.current.style.top = `${e.clientY}px`;
        }
    };

    // Toggle local selection for image on click in edit mode to support the flow
    const handleCardClick = () => {
        if (isEditMode) {
            setIsImageSelected(true);
        } else {
            onClick();
        }
    };

    return (
        <>
            <div 
                className={`portfolio-card ${isEditMode ? 'is-editing' : 'hide-cursor'} ${isHovering && !isEditMode ? 'glass-active' : ''}`}
                style={{ 
                    backgroundColor: bgColor,
                    outline: (isEditMode && isImageSelected) ? '2px solid #2563eb' : 'none',
                    outlineOffset: '2px'
                }}
                onMouseEnter={() => {
                    setIsHovering(true);
                    if (onHoverChange && imageUrl && !isEditMode) onHoverChange(imageUrl);
                }}
                onMouseLeave={() => {
                    setIsHovering(false);
                    if (onHoverChange && !isEditMode) onHoverChange(null);
                }}
                onMouseMove={handleMouseMove}
                onClick={handleCardClick}
            >
                {/* 
                    Z-Index boosted to 30 to ensure it's above everything.
                    Pointer events set to auto in edit mode to allow clicking the Editable text.
                    Pointer events set to none in view mode to allow clicking the card through the text.
                */}
                <div className="card-overlay-text" style={{ textShadow, zIndex: 30, pointerEvents: isEditMode ? 'auto' : 'none' }}>
                    <div className="card-header-group">
                        <div className="t2 text-truncate" style={{ color: textColor, position: 'relative' }}>
                            <Editable 
                                value={prompt} 
                                onSave={handleTitleSave} 
                                isEditMode={isEditMode}
                                placeholder="New Project Title"
                            />
                        </div>
                        <div className="card-subtitle text-truncate" style={{ color: subtitleColor, position: 'relative' }}>
                            <Editable 
                                value={subtitle || artifact.styleName} 
                                onSave={handleSubtitleSave} 
                                isEditMode={isEditMode}
                                placeholder="Category"
                                saveAsHtml={true}
                            />
                        </div>
                    </div>
                    {/* Hover Description - Visible on hover OR when editing */}
                    <div 
                        className={`card-short-desc line-clamp-3 ${(isHovering || isEditMode) ? 'visible' : ''}`}
                        style={{ pointerEvents: isEditMode ? 'auto' : 'none' }}
                    >
                        <Editable 
                            value={shortDescription || ""} 
                            onSave={handleShortDescSave} 
                            isEditMode={isEditMode}
                            placeholder="Add a short hover description..."
                            mode="multiline"
                            saveAsHtml={true}
                        />
                    </div>
                </div>

                <div className="card-content">
                    {/* Layer 1: Iframe Fallback (only if no image) */}
                    {!imageUrl && artifact.html && (
                        <iframe 
                            srcDoc={artifact.html} 
                            title={artifact.id} 
                            sandbox="allow-scripts allow-forms allow-same-origin"
                            style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: isEditMode ? 0.3 : 1 }} // Fade out in edit mode if no image, to emphasize adding one
                        />
                    )}

                    {/* Layer 2: Image or Image Uploader. 
                        In Edit Mode, we render Editable. We pass isSelected={true} effectively when isEditMode is on 
                        and user clicked it, or we can just pass isSelected={true} always if we want one-click behavior 
                        but relying on parent click to set isImageSelected is safer.
                    */}
                    {(imageUrl || isEditMode) && (
                        <Editable 
                            mode="image"
                            value={imageUrl || ''} 
                            onSave={handleImageSave} 
                            isEditMode={isEditMode}
                            isSelected={isImageSelected} // Controlled selection state
                            className="card-image"
                            style={{ 
                                position: 'relative', 
                                zIndex: 1, 
                                height: '100%',
                                // If not editing and no image, hide this layer so iframe shows. 
                                // If editing and no image, keep it visible (transparent) to catch clicks for upload.
                                display: (!imageUrl && !isEditMode) ? 'none' : 'block' 
                            }}
                        >
                             {/* Hint text only visible when editing and no image exists */}
                             {!imageUrl && isEditMode && (
                                <div style={{
                                    width:'100%', height:'100%', 
                                    display:'flex', alignItems:'center', justifyContent:'center', 
                                    color:'rgba(255,255,255,0.7)', 
                                    border:'2px dashed rgba(255,255,255,0.3)',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(0,0,0,0.1)'
                                }}>
                                    + Add Cover Image
                                </div>
                             )}
                        </Editable>
                    )}
                    
                    {/* Layer 3: Overlay Gradient (Only when image exists) */}
                    {imageUrl && <div className="card-gradient-overlay" style={{ zIndex: 2 }} />}
                </div>

                {!isEditMode && (
                    <div className="card-hover-action">
                        <ArrowUpRightIcon />
                    </div>
                )}
            </div>
            
            {/* Custom Mouse Follower Portal-like element */}
            {!isEditMode && createPortal(
                <div 
                    ref={followerRef} 
                    className={`mouse-follower ${isHovering ? 'visible' : ''}`}
                    style={{ pointerEvents: 'none' }} // Ensure it never captures clicks
                >
                    See<br/>Project
                </div>,
                document.body
            )}
            {isEditMode && isImageSelected && (
                <div 
                    style={{ position: 'fixed', inset: 0, zIndex: 29 }} 
                    onClick={() => setIsImageSelected(false)} 
                />
            )}
        </>
    );
});

export default ArtifactCard;