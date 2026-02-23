/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
    ArrowLeftIcon, AddTextIcon, AddImageIcon, 
    TrashIcon, VideoIcon, LayoutIcon, CloseIcon,
    SettingsIcon, ArrowUpRightIcon, Grid3Icon,
    WidthIcon, HeightIcon, PlusIcon, MinusIcon,
    MoveIcon, ShapeIcon,
    BoldIcon, ItalicIcon, ColorIcon,
    UndoIcon, RedoIcon, LayerUpIcon, LayerDownIcon, DuplicateIcon,
    AlignLeftIcon, AlignCenterIcon, AlignRightIcon,
    TelegramIcon
} from './Icons';
import { Editable } from './Editable';
import { Project, CanvasElement } from '../types';
import { generateId } from '../utils';
import { NextProjects } from './NextProjects';

interface ProjectDetailProps {
    project: Project;
    allProjects: Project[];
    onBack: () => void;
    onSelectProject: (id: string) => void;
    isEditMode: boolean;
    onUpdateProject: (id: string, field: string, value: string) => void;
    onUpdateElements: (id: string, elements: CanvasElement[]) => void;
}

const MOBILE_BREAKPOINT = 768;
const MAX_WIDTH = 1200;

// Font size presets in pixels
const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96, 128];

const GridPicker = ({ currentCols, onChange }: { currentCols: number, onChange: (cols: number) => void }) => {
    const [hover, setHover] = useState<{c: number, r: number} | null>(null);
    const maxCols = 4;
    const maxRows = 1;

    return (
        <div className="grid-picker-container" onMouseLeave={() => setHover(null)}>
            <div className="grid-matrix">
                {Array.from({ length: maxRows }).map((_, r) => (
                    <div key={r} className="grid-row">
                        {Array.from({ length: maxCols }).map((_, c) => {
                            const isActive = hover ? (c < hover.c) : (c < currentCols);
                            return (
                                <div 
                                    key={c} 
                                    className={`grid-cell ${isActive ? 'active' : ''}`}
                                    onMouseEnter={() => setHover({ c: c + 1, r: r + 1 })}
                                    onClick={() => onChange(c + 1)}
                                    title={`${c+1} Columns`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectDetail = ({ project, allProjects, onBack, onSelectProject, isEditMode, onUpdateProject, onUpdateElements }: ProjectDetailProps) => {
    if (!project) return null;

    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [history, setHistory] = useState<CanvasElement[][]>([project.elements]);
    const [historyStep, setHistoryStep] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        setHistory([project.elements]);
        setHistoryStep(0);
        setSelectedSectionId(null);
        setSelectedElementId(null);
        window.scrollTo(0, 0);
    }, [project.id]);

    // Scroll Reveal Observer for Project Detail
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        const elements = document.querySelectorAll('.project-section.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [project.elements]);

    const isMobile = viewportWidth < MOBILE_BREAKPOINT;

    const addToHistory = (newElements: CanvasElement[]) => {
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(newElements);
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
        onUpdateElements(project.id, newElements);
    };

    const undo = () => { if (historyStep > 0) { setHistoryStep(p => p-1); onUpdateElements(project.id, history[historyStep - 1]); } };
    const redo = () => { if (historyStep < history.length - 1) { setHistoryStep(p => p+1); onUpdateElements(project.id, history[historyStep + 1]); } };

    const addSection = (template: 'empty' | 'hero' | '2-col' | '3-col' = 'empty') => {
        const newId = generateId();
        let children: CanvasElement[] = [];
        let cols = 1;

        if (template === 'hero') {
            children = [
                { id: generateId(), type: 'text', content: 'Section Title', w:0,h:0,x:0,y:0, style: { fontSize: '48px', fontWeight: '800', textAlign: 'left', marginBottom:'20px' } },
                { id: generateId(), type: 'text', content: 'Add a subtitle description here.', w:0,h:0,x:0,y:0, style: { fontSize: '18px', textAlign: 'left', color: '#666' } }
            ];
        } else if (template === '2-col') {
            cols = 2;
            children = [
                { id: generateId(), type: 'image', content: '', w:0,h:0,x:0,y:0, style: { aspectRatio: '16/9', backgroundColor: '#f0f0f0' } },
                { id: generateId(), type: 'text', content: '<h3>Column Text</h3><p>Description goes here.</p>', w:0,h:0,x:0,y:0, style: { fontSize: '16px', textAlign: 'left' } }
            ];
        } else if (template === '3-col') {
            cols = 3;
            children = [
                { id: generateId(), type: 'image', content: '', w:0,h:0,x:0,y:0, style: { aspectRatio: '1/1', backgroundColor: '#f0f0f0' } },
                { id: generateId(), type: 'image', content: '', w:0,h:0,x:0,y:0, style: { aspectRatio: '1/1', backgroundColor: '#f0f0f0' } },
                { id: generateId(), type: 'image', content: '', w:0,h:0,x:0,y:0, style: { aspectRatio: '1/1', backgroundColor: '#f0f0f0' } }
            ];
        }

        const newSection: CanvasElement = {
            id: newId,
            type: 'section',
            cols: cols,
            gap: 24,
            paddingY: 40,
            content: '',
            x: 0, y: 0, w: 0, h: 0,
            children: children,
            style: { backgroundColor: 'transparent' }
        };

        addToHistory([...project.elements, newSection]);
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
    };

    const updateSection = (sectionId: string, patch: Partial<CanvasElement>) => {
        const newElements = project.elements.map(el => {
            if (el.id === sectionId) return { ...el, ...patch };
            return el;
        });
        onUpdateElements(project.id, newElements);
    };
    
    const deleteSection = (sectionId: string) => {
        if(confirm('Delete this section?')) {
            addToHistory(project.elements.filter(el => el.id !== sectionId));
            setSelectedSectionId(null);
        }
    };

    const moveSection = (index: number, dir: 'up' | 'down') => {
        const newEls = [...project.elements];
        if (dir === 'up' && index > 0) {
            [newEls[index], newEls[index - 1]] = [newEls[index - 1], newEls[index]];
        } else if (dir === 'down' && index < newEls.length - 1) {
            [newEls[index], newEls[index + 1]] = [newEls[index + 1], newEls[index]];
        }
        addToHistory(newEls);
    };

    const addItemToSection = (sectionId: string, type: 'text' | 'image' | 'video') => {
        const newElements = project.elements.map(sec => {
            if (sec.id === sectionId) {
                const newItem: CanvasElement = {
                    id: generateId(),
                    type,
                    content: type === 'text' ? 'New Text Block' : '',
                    x:0, y:0, w:0, h:0, // Not used in flex/grid
                    style: type === 'image' ? { aspectRatio: '16/9', backgroundColor: '#f0f0f0' } : { fontSize: '16px', textAlign: 'left' }
                };
                return { ...sec, children: [...(sec.children || []), newItem] };
            }
            return sec;
        });
        addToHistory(newElements);
    };

    const updateItem = (sectionId: string, itemId: string, patch: Partial<CanvasElement>) => {
        const newElements = project.elements.map(sec => {
            if (sec.id === sectionId && sec.children) {
                const newChildren = sec.children.map(child => 
                    child.id === itemId ? { ...child, ...patch } : child
                );
                return { ...sec, children: newChildren };
            }
            return sec;
        });
        addToHistory(newElements);
    };

    const updateItemStyle = (sectionId: string | null | undefined, itemId: string | null, stylePatch: React.CSSProperties) => {
        if (!sectionId || !itemId) return;
        const section = project.elements.find(s => s.id === sectionId);
        if (!section || !section.children) return;
        
        const child = section.children.find(c => c.id === itemId);
        if (!child) return;

        updateItem(sectionId, itemId, { style: { ...child.style, ...stylePatch } });
    };

    const deleteItem = (sectionId: string, itemId: string) => {
        const newElements = project.elements.map(sec => {
            if (sec.id === sectionId && sec.children) {
                return { ...sec, children: sec.children.filter(c => c.id !== itemId) };
            }
            return sec;
        });
        addToHistory(newElements);
    };

    // Grid Span Logic
    const getSpan = (styleVal: string | number | undefined) => {
        if (!styleVal) return 1;
        const str = String(styleVal);
        if (str.startsWith('span ')) return parseInt(str.replace('span ', ''));
        return 1;
    };

    const changeItemSpan = (sectionId: string, itemId: string, type: 'col' | 'row', delta: number) => {
        const section = project.elements.find(s => s.id === sectionId);
        if (!section || !section.children) return;
        
        const child = section.children.find(c => c.id === itemId);
        if (!child) return;

        const styleKey = type === 'col' ? 'gridColumn' : 'gridRow';
        const currentSpan = getSpan(child.style?.[styleKey]);
        const newSpan = Math.max(1, currentSpan + delta);
        
        // Constraint: Column span cannot exceed total columns
        if (type === 'col' && section.cols && newSpan > section.cols) return;

        const newVal = newSpan > 1 ? `span ${newSpan}` : 'auto';
        updateItemStyle(sectionId, itemId, { [styleKey]: newVal });
    };

    const execCmd = (cmd: string, val?: string) => {
        document.execCommand(cmd, false, val);
    };
    const handleToolbarMouseDown = (e: React.MouseEvent) => e.preventDefault();

    const getYouTubeEmbedUrl = (url: string) => {
        try {
            if (url.includes('youtube') || url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('v=')[1]?.split('&')[0] || url.split('/').pop()}`;
        } catch(e) {}
        return url;
    };

    const getResponsiveStyle = (style: React.CSSProperties | undefined): React.CSSProperties => {
        const finalStyle: React.CSSProperties = { ...style, maxWidth: '100%', boxSizing: 'border-box' };
        if (isMobile) {
            finalStyle.width = '100%';
            if (finalStyle.height && typeof finalStyle.height === 'string' && finalStyle.height.includes('px')) {
                finalStyle.height = 'auto';
            }
            finalStyle.gridColumn = 'auto';
            finalStyle.gridRow = 'auto';
            
            if (style?.fontSize) {
                const fsStr = String(style.fontSize);
                const fs = parseFloat(fsStr);
                if (!isNaN(fs) && fsStr.includes('px')) {
                    if (fs >= 80) finalStyle.fontSize = 'clamp(32px, 12vw, 60px)'; 
                    else if (fs >= 48) finalStyle.fontSize = 'clamp(28px, 10vw, 42px)';
                    else if (fs >= 32) finalStyle.fontSize = 'clamp(22px, 8vw, 32px)';
                    else if (fs >= 24) finalStyle.fontSize = 'clamp(18px, 6vw, 24px)';
                }
                // Enforce line height for readability on mobile
                if (!finalStyle.lineHeight) finalStyle.lineHeight = '1.4';
            }
        }
        return finalStyle;
    };

    // Renderers
    const renderItem = (sectionId: string, item: CanvasElement, isHeroSection: boolean) => {
        const isSelected = selectedElementId === item.id;
        const responsiveStyle = getResponsiveStyle(item.style);
        const isHeroImage = isHeroSection && item.type === 'image';
        
        const wrapperStyle: React.CSSProperties = {
            position: 'relative', 
            marginBottom: '0', 
            maxWidth: '100%',
            gridColumn: responsiveStyle.gridColumn,
            gridRow: responsiveStyle.gridRow,
        };

        const itemStyle = {
            ...responsiveStyle,
            borderRadius: isHeroImage && isMobile ? '0' : (responsiveStyle.borderRadius || '12px'),
            overflow: 'hidden'
        };

        return (
            <div 
                key={item.id} 
                className={`canvas-item ${isSelected ? 'selected' : ''}`} 
                style={wrapperStyle}
                onClick={(e) => {
                    if (isEditMode) {
                        e.stopPropagation();
                        setSelectedElementId(item.id);
                        setSelectedSectionId(sectionId);
                    }
                }}
            >
                {isEditMode && isSelected && (
                    <div className="item-controls">
                        <button onClick={(e) => { e.stopPropagation(); deleteItem(sectionId, item.id); }} className="mini-btn danger" title="Delete Block"><TrashIcon style={{ width: 14, height: 14 }} /></button>
                    </div>
                )}
                
                {item.type === 'image' ? (
                    <Editable 
                        mode="image"
                        value={item.content}
                        isEditMode={isEditMode}
                        isSelected={isSelected}
                        onSave={(val) => updateItem(sectionId, item.id, { content: val })}
                        style={itemStyle}
                    >
                        {isEditMode && !item.content && (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', border: '2px dashed #ddd' }}>
                                <AddImageIcon /> <br/> Add Image
                            </div>
                        )}
                    </Editable>
                ) : item.type === 'video' ? (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                        {item.content ? (
                            <iframe
                                width="100%" height="100%"
                                src={getYouTubeEmbedUrl(item.content)}
                                title="Video" frameBorder="0"
                                allowFullScreen
                                style={{ pointerEvents: isEditMode ? 'none' : 'auto' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                <VideoIcon />
                            </div>
                        )}
                        {isEditMode && (
                           <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 20, width: '80%' }}>
                                <input 
                                    type="text" 
                                    value={item.content} 
                                    placeholder="Paste YouTube URL..." 
                                    onChange={(e) => {
                                        const newElements = project.elements.map(s => {
                                            if (s.id === sectionId && s.children) {
                                                return { ...s, children: s.children.map(c => c.id === item.id ? { ...c, content: e.target.value } : c) };
                                            }
                                            return s;
                                        });
                                        onUpdateElements(project.id, newElements);
                                    }}
                                    onBlur={() => addToHistory(project.elements)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                           </div>
                        )}
                    </div>
                ) : (
                    <Editable 
                        value={item.content}
                        onSave={(val) => updateItem(sectionId, item.id, { content: val })}
                        isEditMode={isEditMode}
                        isSelected={isSelected}
                        mode="multiline"
                        saveAsHtml={true}
                        style={{ ...itemStyle, textAlign: 'left' }}
                    />
                )}
            </div>
        );
    };

    const renderSection = (section: CanvasElement, idx: number) => {
        const isSelected = isEditMode && selectedSectionId === section.id && !selectedElementId;
        const isHero = idx === 1;

        const gridStyle: React.CSSProperties = {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : `repeat(${section.cols || 1}, 1fr)`,
            gap: isMobile ? '16px' : `${section.gap}px`,
            padding: `${section.paddingY}px 0`,
            position: 'relative',
        };

        return (
            <div 
                key={section.id} 
                className={`project-section reveal ${isSelected ? 'selected' : ''}`}
                style={{ 
                    position: 'relative',
                    maxWidth: MAX_WIDTH,
                    margin: '0 auto',
                    padding: '0 20px',
                    outline: isSelected ? '2px dashed #2563eb' : 'none',
                    outlineOffset: '4px'
                }}
                onClick={(e) => {
                    if (isEditMode) {
                        e.stopPropagation();
                        setSelectedSectionId(section.id);
                        setSelectedElementId(null);
                    }
                }}
            >
                {isSelected && (
                    <div style={{
                        position: 'absolute', top: '-50px', right: 0, zIndex: 100,
                        display: 'flex', gap: '12px', backgroundColor: '#fff', 
                        padding: '8px 12px', borderRadius: '12px', 
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        alignItems: 'center', border: '1px solid #e2e8f0'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
                             <button className="mini-btn" onClick={() => moveSection(idx, 'up')} disabled={idx === 0} title="Move Up"><LayerUpIcon width={16} /></button>
                             <button className="mini-btn" onClick={() => moveSection(idx, 'down')} disabled={idx === project.elements.length - 1} title="Move Down"><LayerDownIcon width={16} /></button>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '8px', alignItems: 'center' }}>
                             <GridPicker currentCols={section.cols || 1} onChange={(c) => updateSection(section.id, { cols: c })} />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
                            <button className="mini-btn" onClick={() => addItemToSection(section.id, 'text')} title="Add Text"><AddTextIcon width={16} /></button>
                            <button className="mini-btn" onClick={() => addItemToSection(section.id, 'image')} title="Add Image"><AddImageIcon width={16} /></button>
                            <button className="mini-btn" onClick={() => addItemToSection(section.id, 'video')} title="Add Video"><VideoIcon width={16} /></button>
                        </div>

                        <div>
                            <button className="mini-btn danger" onClick={() => deleteSection(section.id)} title="Delete Section"><TrashIcon width={16} /></button>
                        </div>
                    </div>
                )}

                <div style={gridStyle}>
                    {section.children?.map(child => renderItem(section.id, child, isHero))}
                </div>
            </div>
        );
    };

    const selectedItem = selectedSectionId && selectedElementId ? project.elements.find(s => s.id === selectedSectionId)?.children?.find(c => c.id === selectedElementId) : null;
    const isTextSelected = selectedItem?.type === 'text';
    const isImageSelected = selectedItem?.type === 'image';

    return (
        <>
             <div style={{ position: 'fixed', top: isMobile ? '20px' : '32px', left: isMobile ? '20px' : '32px', zIndex: 1000, display: 'flex', gap: '12px', alignItems: 'center' }}>
                 <button className="back-button" onClick={onBack}><ArrowLeftIcon /><span>Back</span></button>
                 <a href="https://t.me/Brustaf" target="_blank" rel="noreferrer" className="telegram-header-btn">
                    <TelegramIcon width={28} height={28} fill="white" />
                 </a>
            </div>

            <div 
                className="page-enter"
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    minHeight: '100vh', 
                    backgroundColor: '#fff', 
                    paddingTop: '0px', 
                    maxWidth: '100vw'
                }}
            >
                {project.elements.map((section, idx) => (
                    section.type === 'section' ? renderSection(section, idx) : null
                ))}

                {isEditMode && (
                    <div style={{ maxWidth: MAX_WIDTH, margin: '40px auto', padding: '0 20px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                        <button className="cms-btn" onClick={() => addSection('empty')}>+ Empty Section</button>
                        <button className="cms-btn" onClick={() => addSection('2-col')}>+ 2 Columns</button>
                        <button className="cms-btn" onClick={() => addSection('hero')}>+ Hero Title</button>
                    </div>
                )}

                <NextProjects 
                    currentProjectId={project.id}
                    allProjects={allProjects}
                    onSelectProject={onSelectProject}
                    isMobile={isMobile}
                    isEditMode={isEditMode}
                />
            </div>

            {/* Builder Toolbar */}
            {isEditMode && (
                <div className="builder-toolbar">
                     <button className="builder-btn" onClick={undo}><UndoIcon /></button>
                     <button className="builder-btn" onClick={redo}><RedoIcon /></button>
                     <div className="toolbar-divider"></div>
                     
                     {selectedItem ? (
                        <>
                            {/* Span Controls */}
                            <div className="span-controls">
                                <div className="span-group">
                                    <WidthIcon style={{width: 14, height: 14, color: '#64748b', marginLeft: 2}} />
                                    <button className="control-btn" style={{width:20, height:20}} onMouseDown={handleToolbarMouseDown} onClick={() => changeItemSpan(selectedSectionId!, selectedElementId!, 'col', -1)}><MinusIcon style={{width: 10}} /></button>
                                    <span className="span-val">{getSpan(selectedItem.style?.gridColumn)}</span>
                                    <button className="control-btn" style={{width:20, height:20}} onMouseDown={handleToolbarMouseDown} onClick={() => changeItemSpan(selectedSectionId!, selectedElementId!, 'col', 1)}><PlusIcon style={{width: 10}} /></button>
                                </div>
                                <div className="span-group">
                                    <HeightIcon style={{width: 14, height: 14, color: '#64748b', marginLeft: 2}} />
                                    <button className="control-btn" style={{width:20, height:20}} onMouseDown={handleToolbarMouseDown} onClick={() => changeItemSpan(selectedSectionId!, selectedElementId!, 'row', -1)}><MinusIcon style={{width: 10}} /></button>
                                    <span className="span-val">{getSpan(selectedItem.style?.gridRow)}</span>
                                    <button className="control-btn" style={{width:20, height:20}} onMouseDown={handleToolbarMouseDown} onClick={() => changeItemSpan(selectedSectionId!, selectedElementId!, 'row', 1)}><PlusIcon style={{width: 10}} /></button>
                                </div>
                            </div>

                            {isImageSelected && (
                                <div className="span-controls" style={{ marginLeft: 8 }}>
                                    {/* Aspect Ratio Input with Presets */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                            <input 
                                                type="text" 
                                                value={selectedItem.style?.aspectRatio || "auto"}
                                                onChange={(e) => updateItemStyle(selectedSectionId, selectedElementId, { aspectRatio: e.target.value })}
                                                placeholder="Ratio"
                                                style={{ 
                                                    width: '50px', border: 'none', background: 'transparent', 
                                                    fontSize: '11px', padding: '4px 4px 4px 8px', textAlign: 'left', color: '#333' 
                                                }}
                                            />
                                            {/* Dropdown Button for Presets */}
                                            <div style={{ position: 'relative', width: '20px', height: '26px', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                 <select 
                                                    onChange={(e) => updateItemStyle(selectedSectionId, selectedElementId, { aspectRatio: e.target.value })}
                                                    value=""
                                                    style={{ 
                                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                                                        opacity: 0, cursor: 'pointer', zIndex: 10 
                                                    }}
                                                    title="Select Ratio"
                                                >
                                                    <option value="" disabled>▼</option>
                                                    <option value="auto">Auto</option>
                                                    <option value="16/9">16:9</option>
                                                    <option value="4/3">4:3</option>
                                                    <option value="1/1">1:1</option>
                                                    <option value="3/4">3:4</option>
                                                    <option value="9/16">9:16</option>
                                                    <option value="21/9">21:9</option>
                                                </select>
                                                <span style={{ fontSize: '8px', color: '#666', pointerEvents: 'none' }}>▼</span>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '9px', marginTop: 2, color: '#666', fontWeight: 600 }}>Ratio</span>
                                    </div>

                                    {/* Object Fit Control */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 8 }}>
                                        <select 
                                            value={selectedItem.style?.objectFit || "cover"}
                                            onChange={(e) => updateItemStyle(selectedSectionId, selectedElementId, { objectFit: e.target.value as any })}
                                            style={{ 
                                                border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '11px', padding: '2px 4px', width: '60px',
                                                height: '26px', backgroundColor: '#f8fafc', color: '#333'
                                            }}
                                        >
                                            <option value="cover">Cover</option>
                                            <option value="contain">Contain</option>
                                            <option value="fill">Fill</option>
                                            <option value="horizontal">W-100</option>
                                            <option value="vertical">H-100</option>
                                        </select>
                                        <span style={{ fontSize: '9px', marginTop: 2, color: '#666', fontWeight: 600 }}>Fit</span>
                                    </div>

                                    <div className="toolbar-divider"></div>

                                    {/* Border Controls */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {/* Width */}
                                            <div style={{ position: 'relative', width: 36 }}>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="20"
                                                    value={parseInt(String(selectedItem.style?.borderWidth || 0))}
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value) || 0;
                                                        updateItemStyle(selectedSectionId!, selectedElementId!, {
                                                            borderWidth: `${val}px`,
                                                            borderStyle: val > 0 ? 'solid' : 'none',
                                                            borderColor: selectedItem.style?.borderColor || '#000'
                                                        });
                                                    }}
                                                    style={{ 
                                                        width: '100%', height: '26px', border: '1px solid #e2e8f0', borderRadius: '4px', 
                                                        fontSize: '11px', padding: '2px 4px 2px 4px', textAlign: 'center', backgroundColor: '#f8fafc'
                                                    }}
                                                    placeholder="0"
                                                />
                                                <span style={{ position: 'absolute', right: 2, top: 6, fontSize: '8px', color: '#94a3b8', pointerEvents: 'none' }}>px</span>
                                            </div>

                                            {/* Color */}
                                            <div style={{ width: 26, height: 26, borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0', position: 'relative' }}>
                                                <input
                                                    type="color"
                                                    value={selectedItem.style?.borderColor || '#000000'}
                                                    onChange={(e) => updateItemStyle(selectedSectionId!, selectedElementId!, { borderColor: e.target.value })}
                                                    style={{ 
                                                        position: 'absolute', top: -2, left: -2, width: '30px', height: '30px', 
                                                        border: 'none', padding: 0, cursor: 'pointer' 
                                                    }}
                                                />
                                            </div>

                                            {/* Radius */}
                                            <div style={{ position: 'relative', width: 36 }}>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={parseInt(String(selectedItem.style?.borderRadius || 0))}
                                                    onChange={(e) => updateItemStyle(selectedSectionId!, selectedElementId!, { borderRadius: `${e.target.value}px` })}
                                                    style={{ 
                                                        width: '100%', height: '26px', border: '1px solid #e2e8f0', borderRadius: '4px', 
                                                        fontSize: '11px', padding: '2px 4px 2px 4px', textAlign: 'center', backgroundColor: '#f8fafc'
                                                    }}
                                                    placeholder="0"
                                                />
                                                <span style={{ position: 'absolute', right: 2, top: 6, fontSize: '8px', color: '#94a3b8', pointerEvents: 'none' }}>R</span>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '9px', marginTop: 2, color: '#666', fontWeight: 600 }}>Border</span>
                                    </div>

                                    <div className="toolbar-divider"></div>

                                    {/* Background Color Picker for Images */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ position: 'relative', width: '20px', height: '20px', cursor: 'pointer' }}>
                                            <ColorIcon />
                                            <input 
                                                type="color" 
                                                onChange={(e) => updateItemStyle(selectedSectionId, selectedElementId, { backgroundColor: e.target.value })}
                                                value={selectedItem.style?.backgroundColor ? String(selectedItem.style.backgroundColor) : '#f0f0f0'}
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                            />
                                        </div>
                                        <span style={{ fontSize: '9px', marginTop: '2px', color: '#666', fontWeight: 600 }}>BG</span>
                                    </div>
                                </div>
                            )}

                            {isTextSelected && (
                                <>
                                    <div className="toolbar-divider"></div>
                                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => execCmd('bold')} title="Bold"><BoldIcon /></button>
                                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => execCmd('italic')} title="Italic"><ItalicIcon /></button>
                                    
                                    {/* Font Size Selector (Pixels) */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 4px' }}>
                                         <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                            <input 
                                                type="text" 
                                                value={parseInt(String(selectedItem.style?.fontSize || '16'))}
                                                onChange={(e) => updateItemStyle(selectedSectionId, selectedElementId, { fontSize: `${e.target.value}px` })}
                                                style={{ 
                                                    width: '32px', border: 'none', background: 'transparent', 
                                                    fontSize: '11px', padding: '4px', textAlign: 'center', color: '#333' 
                                                }}
                                            />
                                            {/* Dropdown Button for Sizes */}
                                            <div style={{ position: 'relative', width: '16px', height: '24px', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                 <select 
                                                    onChange={(e) => updateItemStyle(selectedSectionId, selectedElementId, { fontSize: `${e.target.value}px` })}
                                                    value=""
                                                    style={{ 
                                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                                                        opacity: 0, cursor: 'pointer', zIndex: 10 
                                                    }}
                                                    title="Select Size"
                                                >
                                                    <option value="" disabled>▼</option>
                                                    {FONT_SIZES.map(size => (
                                                        <option key={size} value={size}>{size}px</option>
                                                    ))}
                                                </select>
                                                <span style={{ fontSize: '8px', color: '#666', pointerEvents: 'none' }}>▼</span>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '9px', marginTop: '2px', color: '#666', fontWeight: 600 }}>Size</span>
                                    </div>

                                    <div className="toolbar-divider"></div>
                                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => updateItemStyle(selectedSectionId, selectedElementId, { textAlign: 'left' })}><AlignLeftIcon /></button>
                                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => updateItemStyle(selectedSectionId, selectedElementId, { textAlign: 'center' })}><AlignCenterIcon /></button>
                                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => updateItemStyle(selectedSectionId, selectedElementId, { textAlign: 'right' })}><AlignRightIcon /></button>

                                    <div className="toolbar-divider"></div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ position: 'relative', width: '20px', height: '20px', cursor: 'pointer' }}>
                                            <ColorIcon />
                                            <input 
                                                type="color" 
                                                onChange={(e) => execCmd('foreColor', e.target.value)}
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                     ) : (
                        <div style={{ padding: '0 8px', fontSize: '11px', color: '#888', fontWeight: 500 }}>Select item to edit</div>
                     )}
                </div>
            )}
        </>
    );
};
export default ProjectDetail;