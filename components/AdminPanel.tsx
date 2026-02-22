/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { 
    DashboardIcon, ListIcon, SettingsIcon, HomeIcon, 
    EditIcon, TrashIcon, CopyIcon, UserIcon, LogOutIcon, 
    DownloadIcon, AddTextIcon, FigIcon, LayerUpIcon, LayerDownIcon, UploadCloudIcon,
    EyeIcon, EyeOffIcon
} from './Icons';

interface AdminPanelProps {
    projects: Project[];
    mainContent: {
        welcome: string;
        title: string;
        subtitle: string;
        description: string;
    };
    siteConfig: {
        title: string;
        description: string;
        gaId: string;
        favicon?: string;
    };
    onUpdateMainContent: (field: string, value: string) => void;
    onUpdateSiteConfig: (field: string, value: string) => void;
    onUpdateProject?: (id: string, field: string, value: any) => void; // New optional prop for CMS edit
    onDeleteProject: (id: string) => void;
    onDuplicateProject: (id: string) => void;
    onEditProject: (id: string) => void;
    onMoveProject: (index: number, direction: 'up' | 'down') => void;
    onLogout: () => void;
    onExport: () => void;
    onAddProject: () => void;
    onExitAdmin: () => void;
}

const getApiUrl = (endpoint: string) => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        if (window.location.port === '3001') return endpoint;
        return `http://localhost:3001${endpoint}`;
    }
    return endpoint;
};

const AdminPanel = ({ 
    projects, 
    mainContent,
    siteConfig,
    onUpdateMainContent,
    onUpdateSiteConfig,
    onUpdateProject,
    onDeleteProject, 
    onDuplicateProject,
    onEditProject,
    onMoveProject,
    onLogout,
    onExport,
    onAddProject,
    onExitAdmin
}: AdminPanelProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'settings'>('overview');
    const [editingProjectMeta, setEditingProjectMeta] = useState<Project | null>(null);
    const faviconInputRef = useRef<HTMLInputElement>(null);

    const StatCard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
        <div className="cms-stat-card" style={{ borderLeft: `4px solid ${color}` }}>
            <div className="cms-stat-title">{title}</div>
            <div className="cms-stat-value">{value}</div>
        </div>
    );

    const handleCopyDesignTokens = () => {
        const designSystem = {
            info: {
                generatedBy: "brJar",
                timestamp: new Date().toISOString()
            },
            colors: {
                primary: '#2563eb',
                background: '#ffffff',
                text: '#1a1a1a', 
                cardBg: '#2563eb',
                accent: '#2563eb',
                secondary: '#f0f0f0',
                glass: 'rgba(255, 255, 255, 0.2)'
            },
            typography: {
                fontFamily: 'Montserrat, sans-serif',
                h1: { fontSize: '60px', fontWeight: 400, lineHeight: 1.1 },
                h2: { fontSize: '30px', fontWeight: 700, lineHeight: 1.2 },
                body: { fontSize: '16px', fontWeight: 400 },
                small: { fontSize: '14px', fontWeight: 400 }
            },
            siteConfig,
            content: {
                main: mainContent,
                projects: projects.map(p => ({
                    title: p.title,
                    description: p.desc,
                    blocks: p.elements.length
                }))
            }
        };
        
        navigator.clipboard.writeText(JSON.stringify(designSystem, null, 2));
        alert('Design System JSON copied! You can now use this data in Figma plugins or for reference.');
    };

    const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const apiUrl = getApiUrl('/api/upload');
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    onUpdateSiteConfig('favicon', data.url);
                } else {
                    alert(`Failed to upload favicon. Server: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error uploading favicon:", error);
                alert("Server error uploading favicon. Ensure 'node server.js' is running.");
            }
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="cms-view-container">
                        <h2 className="cms-page-title">Dashboard Overview</h2>
                        <div className="cms-stats-grid">
                            <StatCard title="Total Projects" value={projects.length} color="#2563eb" />
                        </div>
                        
                        <div className="cms-section">
                            <h3 className="cms-section-title">Quick Actions</h3>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button className="cms-btn primary" onClick={onAddProject} type="button">
                                    <AddTextIcon /> New Project
                                </button>
                                <button className="cms-btn" onClick={() => setActiveTab('settings')} type="button">
                                    <SettingsIcon /> Go to Settings
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="cms-view-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 className="cms-page-title" style={{ marginBottom: 0 }}>Projects</h2>
                            <button className="cms-btn primary" onClick={onAddProject} type="button">
                                <AddTextIcon /> New Project
                            </button>
                        </div>
                        
                        <div className="cms-table-container">
                            <table className="cms-table">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Project Name</th>
                                        <th>Description</th>
                                        <th>Visibility</th>
                                        <th>Elements</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p, index) => (
                                        <tr key={p.id} style={{ opacity: p.isHidden ? 0.6 : 1 }}>
                                            <td style={{ width: '80px' }}>
                                                <div className="cms-actions" style={{ justifyContent: 'flex-start', gap: '4px' }}>
                                                    <button 
                                                        className="cms-icon-btn" 
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); onMoveProject(index, 'up'); }} 
                                                        disabled={index === 0}
                                                        title="Move Up"
                                                        style={{ opacity: index === 0 ? 0.3 : 1 }}
                                                    >
                                                        <LayerUpIcon />
                                                    </button>
                                                    <button 
                                                        className="cms-icon-btn" 
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); onMoveProject(index, 'down'); }} 
                                                        disabled={index === projects.length - 1}
                                                        title="Move Down"
                                                        style={{ opacity: index === projects.length - 1 ? 0.3 : 1 }}
                                                    >
                                                        <LayerDownIcon />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{p.title}</div>
                                                <div style={{ fontSize: '12px', color: '#888' }}>ID: {p.id}</div>
                                            </td>
                                            <td>{p.desc}</td>
                                            <td>
                                                <button 
                                                    className={`cms-icon-btn ${p.isHidden ? '' : 'primary'}`}
                                                    title={p.isHidden ? "Show Project" : "Hide Project"}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onUpdateProject) {
                                                            // @ts-ignore - Allowing boolean value
                                                            onUpdateProject(p.id, 'isHidden', !p.isHidden);
                                                        }
                                                    }}
                                                >
                                                    {p.isHidden ? <EyeOffIcon /> : <EyeIcon />}
                                                </button>
                                            </td>
                                            <td>{p.elements.length} blocks</td>
                                            <td>
                                                <div className="cms-actions">
                                                    <button className="cms-icon-btn" title="Properties (CMS Edit)" type="button" onClick={() => setEditingProjectMeta(p)}>
                                                        <SettingsIcon />
                                                    </button>
                                                    <button className="cms-icon-btn" title="Visual Builder" type="button" onClick={() => onEditProject(p.id)}>
                                                        <EditIcon />
                                                    </button>
                                                    <button className="cms-icon-btn" title="Duplicate" type="button" onClick={() => onDuplicateProject(p.id)}>
                                                        <CopyIcon />
                                                    </button>
                                                    <button 
                                                        className="cms-icon-btn danger" 
                                                        title="Delete" 
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Standard browser confirm
                                                            if(window.confirm(`Are you sure you want to delete project "${p.title}"?`)) {
                                                                onDeleteProject(p.id);
                                                            }
                                                        }}
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="cms-view-container">
                        <h2 className="cms-page-title">Global Settings</h2>
                        
                        <div className="cms-form-container" style={{ marginBottom: '30px' }}>
                            <h3 className="cms-section-title">Branding & Metadata</h3>
                            <div className="cms-form-group">
                                <label>Browser Title (Meta Title)</label>
                                <input 
                                    type="text" 
                                    className="cms-input"
                                    value={siteConfig.title}
                                    onChange={(e) => onUpdateSiteConfig('title', e.target.value)}
                                    placeholder="e.g. Flash UI - Portfolio"
                                />
                            </div>
                             <div className="cms-form-group">
                                <label>Meta Description</label>
                                <textarea 
                                    className="cms-textarea"
                                    rows={3}
                                    value={siteConfig.description}
                                    onChange={(e) => onUpdateSiteConfig('description', e.target.value)}
                                    placeholder="Brief description of your site for search engines..."
                                />
                            </div>
                            <div className="cms-form-group">
                                <label>Favicon (Browser Icon)</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ 
                                        width: '48px', height: '48px', borderRadius: '8px', border: '1px solid #e2e8f0', 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                                        backgroundColor: '#f8fafc'
                                    }}>
                                        {siteConfig.favicon ? (
                                            <img src={siteConfig.favicon} alt="favicon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                        ) : (
                                            <span style={{ fontSize: '10px', color: '#94a3b8' }}>None</span>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        ref={faviconInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFaviconUpload}
                                        accept=".ico,.png,.jpg,.jpeg,.svg"
                                    />
                                    <button className="cms-btn" onClick={() => faviconInputRef.current?.click()}>
                                        <UploadCloudIcon /> Upload Icon
                                    </button>
                                    <input 
                                        type="text" 
                                        className="cms-input"
                                        style={{ maxWidth: '300px' }}
                                        value={siteConfig.favicon || ''}
                                        onChange={(e) => onUpdateSiteConfig('favicon', e.target.value)}
                                        placeholder="or paste URL..."
                                    />
                                </div>
                            </div>
                            <div className="cms-form-group">
                                <label>Google Analytics ID (G-Tag)</label>
                                <input 
                                    type="text" 
                                    className="cms-input"
                                    value={siteConfig.gaId}
                                    onChange={(e) => onUpdateSiteConfig('gaId', e.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                />
                                <small style={{ display: 'block', marginTop: '4px', color: '#64748b' }}>
                                    Leave empty to disable analytics.
                                </small>
                            </div>
                        </div>

                        <div className="cms-form-container">
                            <h3 className="cms-section-title">Main Content</h3>
                            <div className="cms-form-group">
                                <label>Welcome Text</label>
                                <input 
                                    type="text" 
                                    className="cms-input"
                                    value={mainContent.welcome}
                                    onChange={(e) => onUpdateMainContent('welcome', e.target.value)}
                                />
                            </div>
                            <div className="cms-form-group">
                                <label>Main Title (H1)</label>
                                <input 
                                    type="text" 
                                    className="cms-input"
                                    value={mainContent.title}
                                    onChange={(e) => onUpdateMainContent('title', e.target.value)}
                                />
                            </div>
                            <div className="cms-form-group">
                                <label>Subtitle</label>
                                <input 
                                    type="text" 
                                    className="cms-input"
                                    value={mainContent.subtitle}
                                    onChange={(e) => onUpdateMainContent('subtitle', e.target.value)}
                                />
                            </div>
                            <div className="cms-form-group">
                                <label>About Description</label>
                                <textarea 
                                    className="cms-textarea"
                                    rows={5}
                                    value={mainContent.description}
                                    onChange={(e) => onUpdateMainContent('description', e.target.value)}
                                />
                            </div>
                            
                            <div className="cms-form-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <button className="cms-btn" style={{ backgroundColor: '#2E2E2E', color: 'white' }} onClick={handleCopyDesignTokens} type="button">
                                    <FigIcon /> Copy Design Tokens (JSON)
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="cms-layout">
            {/* Sidebar */}
            <div className="cms-sidebar">
                <div className="cms-sidebar-header">
                    <div className="cms-logo">BrJar</div>
                    <div className="cms-version">v1.2</div>
                </div>
                
                <nav className="cms-nav">
                    <button 
                        className={`cms-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                        type="button"
                    >
                        <DashboardIcon /> Overview
                    </button>
                    <button 
                        className={`cms-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                        type="button"
                    >
                        <ListIcon /> Projects
                    </button>
                    <button 
                        className={`cms-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                        type="button"
                    >
                        <SettingsIcon /> Settings
                    </button>
                </nav>

                <div className="cms-sidebar-footer">
                    {/* NEW: Global Save Button */}
                    <button 
                        className="cms-nav-item" 
                        onClick={onExport} 
                        type="button"
                        style={{ backgroundColor: '#10b981', color: '#fff', justifyContent: 'center', marginBottom: '10px' }}
                    >
                        <DownloadIcon /> Save Changes to Code
                    </button>

                    <button className="cms-nav-item" onClick={onExitAdmin} type="button">
                        <HomeIcon /> View Live Site
                    </button>
                    <button className="cms-nav-item danger" onClick={onLogout} type="button">
                        <LogOutIcon /> Logout
                    </button>
                    <div className="cms-user-info">
                        <div className="cms-avatar"><UserIcon /></div>
                        <div className="cms-user-details">
                            <span className="name">Admin User</span>
                            <span className="role">Administrator</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="cms-main">
                {renderContent()}
            </div>

            {/* Project Metadata Modal (Traditional CMS Editor) */}
            {editingProjectMeta && (
                <div className="modal-overlay" onClick={() => setEditingProjectMeta(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Edit Project Properties</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                <label>Project Title</label>
                                <input 
                                    className="cms-input" 
                                    value={editingProjectMeta.title} 
                                    onChange={(e) => {
                                        if(onUpdateProject) onUpdateProject(editingProjectMeta.id, 'title', e.target.value);
                                        setEditingProjectMeta(prev => prev ? ({...prev, title: e.target.value}) : null);
                                    }}
                                />
                            </div>
                            <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                <label>Category / Subtitle</label>
                                <input 
                                    className="cms-input" 
                                    value={editingProjectMeta.desc} 
                                    onChange={(e) => {
                                        if(onUpdateProject) onUpdateProject(editingProjectMeta.id, 'desc', e.target.value);
                                        setEditingProjectMeta(prev => prev ? ({...prev, desc: e.target.value}) : null);
                                    }}
                                />
                            </div>
                             {/* New Short Description Field */}
                            <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                <label>Short Description (Hover)</label>
                                <textarea 
                                    className="cms-textarea"
                                    rows={2}
                                    value={editingProjectMeta.shortDescription || ''} 
                                    onChange={(e) => {
                                        if(onUpdateProject) onUpdateProject(editingProjectMeta.id, 'shortDescription', e.target.value);
                                        setEditingProjectMeta(prev => prev ? ({...prev, shortDescription: e.target.value}) : null);
                                    }}
                                    placeholder="Brief description visible on card hover..."
                                />
                            </div>
                            <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                <label>Cover Image URL</label>
                                <input 
                                    className="cms-input" 
                                    value={editingProjectMeta.image} 
                                    onChange={(e) => {
                                        if(onUpdateProject) onUpdateProject(editingProjectMeta.id, 'image', e.target.value);
                                        setEditingProjectMeta(prev => prev ? ({...prev, image: e.target.value}) : null);
                                    }}
                                />
                                {editingProjectMeta.image && (
                                    <div style={{ marginTop: '8px', borderRadius: '4px', overflow: 'hidden', height: '100px', width: '100%' }}>
                                        <img src={editingProjectMeta.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                            <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                <label>Hero Overlay Text (ID)</label>
                                <input 
                                    className="cms-input" 
                                    value={editingProjectMeta.heroOverlayText || ''} 
                                    onChange={(e) => {
                                        if(onUpdateProject) onUpdateProject(editingProjectMeta.id, 'heroOverlayText', e.target.value);
                                        setEditingProjectMeta(prev => prev ? ({...prev, heroOverlayText: e.target.value}) : null);
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                             <button className="cms-btn primary" onClick={() => setEditingProjectMeta(null)}>Done</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;