/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo, useEffect } from 'react';
import { Project } from '../types';

interface NextProjectsProps {
    currentProjectId: string;
    allProjects: Project[];
    onSelectProject: (id: string) => void;
    isMobile: boolean;
    isEditMode?: boolean;
}

export const NextProjects = ({ currentProjectId, allProjects, onSelectProject, isMobile, isEditMode }: NextProjectsProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const autoScrollSpeed = useRef(0);
    const animationFrameRef = useRef<number>(0);

    // Filter projects
    const projectsToRender = useMemo(() => {
        return allProjects.filter(p => {
            if (p.id === currentProjectId) return false;
            if (p.isHidden && !isEditMode) return false;
            return true;
        });
    }, [allProjects, currentProjectId, isEditMode]);

    // --- Visual Updates (Scaling Only) ---
    const updateVisuals = () => {
        if (!sliderRef.current) return;

        const container = sliderRef.current;
        const containerCenter = window.innerWidth / 2;
        const children = Array.from(container.children) as HTMLElement[];

        children.forEach((child) => {
            const rect = child.getBoundingClientRect();
            const childCenter = rect.left + rect.width / 2;
            
            // Calculate distance from center of screen
            const distance = Math.abs(containerCenter - childCenter);
            
            // Logic: closer to 0 distance = 1 opacity. Further away = lower opacity.
            // Increased range (0.8 instead of 0.6) to keep more items visible (approx 3 items)
            const maxDistance = window.innerWidth * 0.8;
            let visibility = 1 - (distance / maxDistance);
            
            // Clamp values
            visibility = Math.max(0.3, Math.min(1, visibility));

            // Apply styles directly for performance
            const isHidden = child.getAttribute('data-hidden') === 'true';
            child.style.opacity = isHidden ? '0.5' : '1'; 
            
            // Optional: slight scale effect for focus
            const scale = 0.9 + (0.1 * visibility); // 0.9 at edges, 1.0 at center
            child.style.transform = `scale(${scale})`;
        });
    };

    // --- Animation Loop ---
    const animate = () => {
        if (sliderRef.current) {
            // Handle Edge Auto-Scroll
            if (autoScrollSpeed.current !== 0) {
                sliderRef.current.scrollLeft += autoScrollSpeed.current;
            }
            
            // Update Dimming logic
            updateVisuals();
        }
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);


    // --- Mouse Wheel Support ---
    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            // If dragging, don't interfere
            if (isDragDown.current) return;

            // Prevent default vertical scroll if we are scrolling horizontally
            // Note: This behavior is aggressive, you might want to check if (Math.abs(e.deltaY) > Math.abs(e.deltaX))
            if (Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY; // Map vertical wheel to horizontal scroll
            }
        };

        // Add passive: false to allow preventDefault
        el.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', handleWheel);
        };
    }, []);


    // --- Drag Logic ---
    const onSliderMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        isDragDown.current = true;
        sliderRef.current.style.cursor = 'grabbing';
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft.current = sliderRef.current.scrollLeft;
        autoScrollSpeed.current = 0; // Stop auto scroll on interaction
    };

    const onSliderMouseMove = (e: React.MouseEvent) => {
        if (!isDragDown.current || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
        sliderRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const stopDragging = () => {
        isDragDown.current = false;
        if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
    };

    // --- Edge Hover Logic ---
    const handleEdgeEnter = (direction: 'left' | 'right') => {
        const baseSpeed = 8;
        autoScrollSpeed.current = direction === 'left' ? -baseSpeed : baseSpeed;
    };

    const handleEdgeLeave = () => {
        autoScrollSpeed.current = 0;
    };


    if (projectsToRender.length === 0) return null;

    return (
        <div style={{ 
            position: 'relative', 
            marginTop: '100px', 
            marginBottom: '40px',
            width: '100vw', 
            marginLeft: 'calc(-50vw + 50%)', // Break out of parent container logic
            marginRight: 'calc(-50vw + 50%)',
            overflow: 'hidden' // Hide scrollbars
        }}>
            
            {/* Header in Center (constrained width) */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '24px' }}>
                <h3 className="t2">Next Projects</h3>
            </div>

            {/* Hover Zone Left */}
            {!isMobile && (
                <div 
                    onMouseEnter={() => handleEdgeEnter('left')}
                    onMouseLeave={handleEdgeLeave}
                    style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0, width: '10%', 
                        zIndex: 10, cursor: 'w-resize',
                        background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
                    }}
                />
            )}

            {/* Hover Zone Right */}
            {!isMobile && (
                <div 
                    onMouseEnter={() => handleEdgeEnter('right')}
                    onMouseLeave={handleEdgeLeave}
                    style={{
                        position: 'absolute', top: 0, right: 0, bottom: 0, width: '10%', 
                        zIndex: 10, cursor: 'e-resize',
                        background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
                    }}
                />
            )}

            {/* Slider Container */}
            <div 
                ref={sliderRef} 
                className="hide-scrollbar"
                onMouseDown={onSliderMouseDown} 
                onMouseLeave={(e) => { stopDragging(); handleEdgeLeave(); }} 
                onMouseUp={stopDragging} 
                onMouseMove={onSliderMouseMove}
                style={{
                    display: 'flex', 
                    gap: '24px', // Reduced gap for tighter layout
                    overflowX: 'auto', 
                    cursor: 'grab', 
                    // Calculate left padding to align with 1200px container + 20px gutter
                    // Formula: Max(20px, (100vw - 1200px) / 2 + 20px)
                    paddingLeft: isMobile ? '20px' : 'calc(max(20px, (100vw - 1200px) / 2 + 20px))', 
                    paddingRight: '50px',
                    paddingBottom: '40px',
                    paddingTop: '20px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            >
                {projectsToRender.map((p) => (
                    <div 
                        key={p.id} 
                        onClick={() => !isDragDown.current && onSelectProject(p.id)} 
                        className="next-project-card"
                        data-hidden={p.isHidden ? "true" : "false"}
                        style={{ 
                            // Reduced width to fit ~3 cards (1200 / 3 approx 400, minus gaps -> 300-340)
                            flex: isMobile ? '0 0 85vw' : '0 0 340px',
                            transition: 'transform 0.2s ease-out', 
                            willChange: 'transform',
                            opacity: p.isHidden ? 0.5 : 1
                        }}
                    >
                        <div style={{ 
                            width: '100%', 
                            aspectRatio: '16/10',
                            backgroundColor: '#f0f0f0', 
                            borderRadius: '24px', 
                            overflow: 'hidden',
                            marginBottom: '16px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            pointerEvents: 'none' 
                        }}>
                            {p.image ? (
                                <img 
                                    src={p.image} 
                                    alt={p.title}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        display: 'block' 
                                    }} 
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>No Image</div>
                            )}
                        </div>
                        <div className="t2" style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-0.02em', textAlign: 'left' }}>{p.title}</div>
                        <div style={{ textAlign: 'left', color: '#666', marginTop: '4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.desc}</div>
                    </div>
                ))}
            </div>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <a 
                    href="https://x.com/brdmitry" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="t3" 
                    style={{ 
                        fontSize: '12px', 
                        display: 'block',
                        textDecoration: 'none',
                        color: '#999',
                        textAlign: 'left'
                    }}
                >
                    created by @brdmitry
                </a>
            </div>
        </div>
    );
};
