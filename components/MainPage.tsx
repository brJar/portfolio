/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Session, Project } from '../types';
import ArtifactCard from './ArtifactCard';
import { Editable } from './Editable';
import SideDrawer from './SideDrawer';
import { FigIcon, PSIcon, AIIcon, AEIcon, TelegramIcon, AddTextIcon, BoldIcon, ItalicIcon, ColorIcon, UserIcon, DownloadIcon } from './Icons';

interface MainPageProps {
    mainContent: {
        welcome: string;
        title: string;
        subtitle: string;
        description: string;
    };
    servicesContent: {
        title: string;
        items: Array<{ title: string; desc: string }>;
    };
    reviewsContent: {
        title: string;
        items: Array<{ text: string; author: string }>;
    };
    sessions: Session[];
    projects: Project[];
    isEditMode: boolean;
    isAdmin: boolean;
    onUpdateMainContent: (field: string, value: string) => void;
    onUpdateServices: (idx: number, field: string, value: string) => void;
    onUpdateReviews: (idx: number, field: string, value: string) => void;
    onUpdateProject: (id: string, field: string, value: any) => void;
    onCardClick: (id: string) => void;
    onFigmaClick: () => void;
    onCreateProject: () => void;
}

const DEFAULT_CARD_COLOR = '#2563eb';

// Initial Resume Data (Translated)
const INITIAL_RESUME_DATA = {
    name: "Dmitry Tarasenko",
    role: "UI/UX Designer",
    avatar: "", // Placeholder for user uploaded avatar
    about: "I carefully approach interface design, analyzing target audiences and researching user scenarios. I develop design systems and UI kits for scalable projects. My primary tool is Figma (Auto Layout, Components, Variants), and I use Adobe Photoshop, Illustrator, and After Effects for complex graphics and animation. English Level: B2.",
    experience: [
        {
            role: "Product Manager, Designer",
            company: "Web Viki",
            period: "Sep 2024 – Present",
            desc: "Developing websites and web applications. Creating advertising materials and identity. Project planning, creating specifications, team coordination, quality control."
        },
        {
            role: "UI/UX Designer",
            company: "Freelance",
            period: "July 2012 – Present",
            desc: "Development of web applications and sites. Developing and maintaining UI-kits. Creating animated banners. Corporate identity. Mobile applications."
        },
        {
            role: "Designer",
            company: "Linkor",
            period: "Feb 2016 – Apr 2024",
            desc: "Information technology, system integration, internet. Corporate identity and automation visualization."
        }
    ],
    education: [
        {
            school: "Institute of Modern Knowledge named after A.M. Shirokov",
            degree: "Design (Incomplete Higher)",
            year: "2006"
        },
        {
            school: "Minsk State College of Art",
            degree: "Wood Carver",
            year: "2003"
        }
    ],
    skills: "Figma, HTML, Graphic Design, Interface Design, Web Design, Adobe After Effects, Adobe Photoshop"
};

export default function MainPage({
    mainContent,
    servicesContent,
    reviewsContent,
    sessions,
    projects,
    isEditMode,
    isAdmin,
    onUpdateMainContent,
    onUpdateServices,
    onUpdateReviews,
    onUpdateProject,
    onCardClick,
    onFigmaClick,
    onCreateProject
}: MainPageProps) {
    const [loopCount, setLoopCount] = useState(1);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [showResume, setShowResume] = useState(false);
    
    // Background Image State for transitions
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [isBgVisible, setIsBgVisible] = useState(false);

    // Resume State
    const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
    const [isAboutHovered, setIsAboutHovered] = useState(false);
    
    // Toolbar State
    const [currentFontSize, setCurrentFontSize] = useState('3');

    // Scroll Reveal Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [loopCount, sessions, servicesContent, reviewsContent]);

    useEffect(() => {
        if (isEditMode) {
            setLoopCount(1);
            
            const handleSelectionChange = () => {
                const size = document.queryCommandValue('fontSize');
                if (size) setCurrentFontSize(size);
            };
            document.addEventListener('selectionchange', handleSelectionChange);
            return () => document.removeEventListener('selectionchange', handleSelectionChange);
        }

        const handleScroll = () => {
            // Disable infinite scroll on mobile devices
            if (window.innerWidth < 768) return;

            const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
            if (scrolledToBottom) {
                setLoopCount(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isEditMode]);

    const handleHover = (img: string | null, id: string | null) => {
        if (img) {
            setBgImage(img);
            setIsBgVisible(true);
            setHoveredId(id);
        } else {
            setIsBgVisible(false);
            setHoveredId(null);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    // Helper to format selection on the main page
    const execCmd = (cmd: string, val?: string) => {
        document.execCommand(cmd, false, val);
        if (cmd === 'fontSize' && val) setCurrentFontSize(val);
    };

    // Prevent focus loss when clicking toolbar
    const handleToolbarMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    // Resume Update Helpers
    const updateResumeField = (field: keyof typeof resumeData, value: string) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    const updateExperience = (index: number, field: string, value: string) => {
        const newExp = [...resumeData.experience];
        // @ts-ignore
        newExp[index] = { ...newExp[index], [field]: value };
        setResumeData(prev => ({ ...prev, experience: newExp }));
    };

    const updateEducation = (index: number, field: string, value: string) => {
        const newEdu = [...resumeData.education];
        // @ts-ignore
        newEdu[index] = { ...newEdu[index], [field]: value };
        setResumeData(prev => ({ ...prev, education: newEdu }));
    };

    // Dark Mode / Contrast Logic
    const isDark = !!hoveredId;

    const renderProjectCard = (session: Session, loopIndex: number = 0) => {
        const project = projects.find(p => p.id === session.id);
        if (!project) return null;
        
        // Hide project if isHidden is true and not in edit mode
        if (project.isHidden && !isEditMode) return null;

        const uniqueId = `${session.id}-${loopIndex}`;
        const artifact = session.artifacts[0];
        
        return (
            <div key={uniqueId} className="reveal" style={{ position: 'relative', zIndex: 1, opacity: (project.isHidden && isEditMode) ? 0.5 : 1 }}>
                <ArtifactCard 
                    artifact={artifact}
                    prompt={project.title}
                    subtitle={project.desc}
                    shortDescription={project.shortDescription}
                    bgColor={DEFAULT_CARD_COLOR}
                    imageUrl={project.image}
                    onClick={() => onCardClick(session.id)}
                    isEditMode={isEditMode}
                    onUpdateProject={(field, val) => onUpdateProject(session.id, field, val)}
                    onHoverChange={(img) => handleHover(img, img ? uniqueId : null)}
                />
            </div>
        );
    };

    const renderContentLoop = (loopIndex: number) => {
        // Dynamic Styles for Content Blocks with stronger blur
        const blockStyle: React.CSSProperties = {
            position: 'relative',
            zIndex: 1,
            opacity: 1,
            transform: 'none',
            transition: 'all 0.4s ease',
            backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : undefined, // More visible dark glass
            backdropFilter: isDark ? 'blur(12px)' : 'none', // Stronger visible blur
            color: isDark ? '#fff' : undefined,
        };

        const itemTitleStyle: React.CSSProperties = {
            color: isDark ? '#fff' : undefined,
            transition: 'color 0.4s ease'
        };

        const itemDescStyle: React.CSSProperties = {
            color: isDark ? 'rgba(255,255,255,0.7)' : undefined,
            transition: 'color 0.4s ease'
        };

        const reviewBgStyle: React.CSSProperties = {
            ...blockStyle,
            backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : '#fff', 
            border: isDark ? 'none' : '1px solid #eee' // No border on dark
        };

        return (
            <React.Fragment key={`loop-${loopIndex}`}>
                {/* First 3 Projects */}
                {sessions.slice(0, 3).map(s => renderProjectCard(s, loopIndex))}

                {/* Services Block */}
                <div className="content-block reveal" style={blockStyle}>
                    <h2 className="t2" style={itemTitleStyle}>
                        <Editable 
                            value={servicesContent.title}
                            onSave={(val) => onUpdateServices(-1, 'title', val)}
                            isEditMode={isEditMode}
                            saveAsHtml={true}
                        />
                    </h2>
                    <div className="services-grid">
                        {servicesContent.items.map((item, idx) => (
                            <div key={idx} className="service-item">
                                <h3 style={itemTitleStyle}>
                                    <Editable 
                                        value={item.title}
                                        onSave={(val) => onUpdateServices(idx, 'title', val)}
                                        isEditMode={isEditMode}
                                        saveAsHtml={true}
                                    />
                                </h3>
                                <div style={itemDescStyle}>
                                    <Editable 
                                        value={item.desc}
                                        onSave={(val) => onUpdateServices(idx, 'desc', val)}
                                        isEditMode={isEditMode}
                                        mode="multiline"
                                        saveAsHtml={true}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Remaining Projects (4 onwards) */}
                {sessions.slice(3).map(s => renderProjectCard(s, loopIndex))}
                
                {/* Reviews Block */}
                <div className="content-block reveal" style={reviewBgStyle}>
                    <h2 className="t2" style={{ marginBottom: '20px', ...itemTitleStyle }}>
                        <Editable 
                            value={reviewsContent.title}
                            onSave={(val) => onUpdateReviews(-1, 'title', val)}
                            isEditMode={isEditMode}
                            saveAsHtml={true}
                        />
                    </h2>
                    <div className="reviews-grid">
                        {reviewsContent.items.map((item, idx) => (
                            <div key={idx} className="review-item" style={{ 
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                                color: isDark ? '#fff' : undefined,
                                transition: 'all 0.4s ease'
                            }}>
                                <div className="review-text" style={{ 
                                    color: isDark ? 'rgba(255,255,255,0.8)' : '#444',
                                    transition: 'color 0.4s ease'
                                }}>
                                    <Editable 
                                        value={item.text}
                                        onSave={(val) => onUpdateReviews(idx, 'text', val)}
                                        isEditMode={isEditMode}
                                        mode="multiline"
                                        saveAsHtml={true}
                                    />
                                </div>
                                <div className="review-author" style={itemTitleStyle}>
                                    - <Editable 
                                        value={item.author}
                                        onSave={(val) => onUpdateReviews(idx, 'author', val)}
                                        isEditMode={isEditMode}
                                        saveAsHtml={true}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    // Style for left column text (changes color on hover for visibility)
    const textStyle: React.CSSProperties = {
        color: isDark ? '#ffffff' : 'inherit',
        textShadow: isDark ? '0 4px 12px rgba(0,0,0,0.5)' : 'none',
        transition: 'color 0.4s ease, text-shadow 0.4s ease'
    };

    return (
        <div className="main-container">
             {/* Fixed Background Layer */}
             <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                backgroundColor: '#fff' // Default base background
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // Slow Fade Animation
                    opacity: isBgVisible ? 1 : 0,
                    transition: 'opacity 1.5s ease-out', // Slow fade effect
                }} />
                
                {/* Overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: isBgVisible ? 'rgba(0,0,0,0.3)' : 'transparent',
                    transition: 'background-color 0.5s ease'
                }} />
            </div>

            {/* Left Column - Fixed Info */}
            <div className="left-column">
                <div className="header-group" style={{ ...textStyle }}>
                    <div className="t3" style={textStyle}>
                        <Editable 
                            value={mainContent.welcome}
                            onSave={(val) => onUpdateMainContent('welcome', val)}
                            isEditMode={isEditMode}
                            saveAsHtml={true}
                        />
                    </div>
                    <div className="t1">
                        <Editable 
                            value={mainContent.title}
                            onSave={(val) => onUpdateMainContent('title', val)}
                            isEditMode={isEditMode}
                            saveAsHtml={true}
                        />
                    </div>
                    <div className="t3" style={textStyle}>
                        <Editable 
                            value={mainContent.subtitle}
                            onSave={(val) => onUpdateMainContent('subtitle', val)}
                            isEditMode={isEditMode}
                            saveAsHtml={true}
                        />
                    </div>
                </div>

                <div className="description" style={{ ...textStyle }}>
                    <Editable 
                        className="t3"
                        value={mainContent.description}
                        onSave={(val) => onUpdateMainContent('description', val)}
                        isEditMode={isEditMode}
                        mode="multiline"
                        style={{ color: 'inherit' }}
                        saveAsHtml={true}
                    />
                </div>

                {/* About Me Link - Moved before icons for better flow */}
                <div style={{ }}>
                    <button 
                        onClick={() => setShowResume(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            paddingBottom: '2px', // Space for underline
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontFamily: 'inherit',
                            display: 'inline-flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            // Hover styles
                            borderBottom: isAboutHovered ? '2px solid #ef4444' : '2px solid transparent',
                            transform: isAboutHovered ? 'translateX(4px)' : 'none', 
                            transition: 'all 0.3s ease',
                            // Color logic: if dark mode (card hover) -> white, else -> dark grey
                            color: isDark ? '#ffffff' : '#1a1a1a', 
                            textShadow: textStyle.textShadow
                        }}
                        onMouseEnter={(e) => setIsAboutHovered(true)}
                        onMouseLeave={(e) => setIsAboutHovered(false)}
                    >
                        About Me <span style={{ marginLeft: '4px', opacity: isAboutHovered ? 1 : 0, transition: 'opacity 0.3s' }}>→</span>
                    </button>
                </div>

                <div className="icons-row" style={{ }}>
                    <div className="software-icon" onClick={onFigmaClick} title={isAdmin ? "Go to Dashboard" : "Admin Login"}>
                        <FigIcon />
                    </div>
                    <div className="software-icon"><PSIcon /></div>
                    <div className="software-icon"><AIIcon /></div>
                    <div className="software-icon"><AEIcon /></div>
                </div>

                <div className="input-area" style={{ marginTop: 'auto' }}>
                        <a href="https://t.me/Brustaf" target="_blank" rel="noreferrer" className="contact-button">
                            <TelegramIcon />
                            Contact Me
                        </a>
                </div>

                <a 
                    href="https://x.com/brdmitry" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="t3" 
                    style={{ 
                        fontSize: '12px', 
                        marginTop: '16px', // 32px gap + 16px margin = 48px total visual space
                        textDecoration: 'none',
                        ...textStyle
                    }}
                >
                    created by @brdmitry
                </a>
            </div>

            {/* Right Column - Scrollable Content with Infinite Loop */}
            <div className="right-column">
                {Array.from({ length: loopCount }).map((_, i) => renderContentLoop(i))}

                {/* Add New Project Card - Only visible in edit mode */}
                {isEditMode && (
                    <div 
                        className="portfolio-card"
                        style={{ 
                            backgroundColor: '#f8f9fa', 
                            border: '2px dashed #e5e7eb', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: 'none',
                            cursor: 'pointer',
                            color: '#9ca3af',
                            transition: 'all 0.2s ease',
                            minHeight: '200px'
                        }}
                        onClick={onCreateProject}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#2563eb';
                            e.currentTarget.style.color = '#2563eb';
                            e.currentTarget.style.backgroundColor = '#eff6ff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.color = '#9ca3af';
                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }}
                    >
                        <AddTextIcon />
                        <span className="t2" style={{ fontSize: '18px', marginTop: '10px', color: 'inherit' }}>Create New Project</span>
                    </div>
                )}
            </div>

            {/* Resume Overlay */}
            <SideDrawer isOpen={showResume} onClose={() => setShowResume(false)} title="Resume">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '60px' }}>
                    
                    {/* Updated Header Section with Link-style Export */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h1 style={{ fontSize: '24px', margin: 0, color: '#111', fontWeight: 700, lineHeight: 1.2 }}>
                                <Editable 
                                    value={resumeData.name} 
                                    onSave={(val) => updateResumeField('name', val)} 
                                    isEditMode={isEditMode}
                                />
                            </h1>
                            <button 
                                onClick={handlePrint}
                                style={{ 
                                    background: 'transparent', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    padding: 0,
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '4px',
                                    color: '#64748b',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                                title="Download PDF"
                            >
                                <div style={{ transform: 'scale(0.8)', display: 'flex' }}><DownloadIcon /></div>
                                <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>Export PDF</span>
                            </button>
                        </div>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: 500 }}>
                            <Editable 
                                value={resumeData.role} 
                                onSave={(val) => updateResumeField('role', val)} 
                                isEditMode={isEditMode}
                            />
                        </div>
                    </div>

                    <div className="resume-section">
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>About Me</h3>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            {/* Avatar Section */}
                            <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                <Editable 
                                    mode="image" 
                                    value={resumeData.avatar} 
                                    onSave={(val) => updateResumeField('avatar', val)} 
                                    isEditMode={isEditMode}
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                >
                                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                        <UserIcon />
                                    </div>
                                </Editable>
                            </div>
                            <div style={{ lineHeight: '1.6', color: '#333', flex: 1 }}>
                                <Editable 
                                    value={resumeData.about} 
                                    onSave={(val) => updateResumeField('about', val)} 
                                    isEditMode={isEditMode}
                                    mode="multiline"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="resume-section">
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Experience</h3>
                        
                        {resumeData.experience.map((job, idx) => (
                            <div key={idx} style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <h4 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a' }}>
                                        <Editable 
                                            value={job.role} 
                                            onSave={(val) => updateExperience(idx, 'role', val)} 
                                            isEditMode={isEditMode}
                                        />
                                    </h4>
                                    <span style={{ color: '#666', fontSize: '14px' }}>
                                        <Editable 
                                            value={job.period} 
                                            onSave={(val) => updateExperience(idx, 'period', val)} 
                                            isEditMode={isEditMode}
                                        />
                                    </span>
                                </div>
                                <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                                    <Editable 
                                        value={job.company} 
                                        onSave={(val) => updateExperience(idx, 'company', val)} 
                                        isEditMode={isEditMode}
                                    />
                                </div>
                                <div style={{ color: '#444', lineHeight: '1.5', fontSize: '15px' }}>
                                    <Editable 
                                        value={job.desc} 
                                        onSave={(val) => updateExperience(idx, 'desc', val)} 
                                        isEditMode={isEditMode}
                                        mode="multiline"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="resume-section">
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Education</h3>
                        
                        {resumeData.education.map((edu, idx) => (
                            <div key={idx} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <h4 style={{ margin: 0, fontSize: '16px', color: '#1a1a1a' }}>
                                        <Editable 
                                            value={edu.school} 
                                            onSave={(val) => updateEducation(idx, 'school', val)} 
                                            isEditMode={isEditMode}
                                        />
                                    </h4>
                                    <span style={{ color: '#666', fontSize: '14px' }}>
                                        <Editable 
                                            value={edu.year} 
                                            onSave={(val) => updateEducation(idx, 'year', val)} 
                                            isEditMode={isEditMode}
                                        />
                                    </span>
                                </div>
                                <div style={{ color: '#555', fontSize: '14px' }}>
                                    <Editable 
                                        value={edu.degree} 
                                        onSave={(val) => updateEducation(idx, 'degree', val)} 
                                        isEditMode={isEditMode}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="resume-section">
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Skills</h3>
                         {isEditMode ? (
                            <div style={{ color: '#333', lineHeight: '1.6' }}>
                                <Editable 
                                    value={resumeData.skills} 
                                    onSave={(val) => updateResumeField('skills', val)} 
                                    isEditMode={isEditMode}
                                    mode="multiline"
                                />
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {resumeData.skills.split(',').filter(s => s.trim()).map((skill, i) => (
                                    <span key={i} style={{ 
                                        backgroundColor: '#f3f4f6', 
                                        color: '#374151', 
                                        padding: '6px 14px', 
                                        borderRadius: '100px', 
                                        fontSize: '13px', 
                                        fontWeight: 500,
                                        border: '1px solid #e5e7eb',
                                        display: 'inline-block'
                                    }}>
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </SideDrawer>

            {/* Rich Text Formatting Toolbar */}
            {isEditMode && (
                <div className="builder-toolbar" style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 900 }}>
                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => execCmd('bold')} title="Bold">
                        <BoldIcon />
                        <span>B</span>
                    </button>
                    <button className="builder-btn" onMouseDown={handleToolbarMouseDown} onClick={() => execCmd('italic')} title="Italic">
                        <ItalicIcon />
                        <span>I</span>
                    </button>
                    
                    <div className="toolbar-divider"></div>
                    
                    {/* Font Size Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <select 
                            onMouseDown={handleToolbarMouseDown}
                            onChange={(e) => execCmd('fontSize', e.target.value)}
                            value={currentFontSize}
                            style={{ 
                                border: '1px solid #ddd', 
                                borderRadius: '4px', 
                                fontSize: '11px',
                                padding: '2px',
                                width: '40px'
                            }}
                        >
                            <option value="1">XS</option>
                            <option value="2">S</option>
                            <option value="3">M</option>
                            <option value="4">L</option>
                            <option value="5">XL</option>
                            <option value="6">XXL</option>
                            <option value="7">HUGE</option>
                        </select>
                        <span style={{ fontSize: '9px', marginTop: '2px' }}>Size</span>
                    </div>

                    {/* Color Picker */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '5px' }}>
                         <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                             <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                <ColorIcon />
                                <input 
                                    type="color" 
                                    onChange={(e) => execCmd('foreColor', e.target.value)}
                                    onMouseDown={handleToolbarMouseDown} // Prevent focus loss
                                    style={{ 
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                                        opacity: 0, cursor: 'pointer' 
                                    }}
                                />
                             </div>
                             <span style={{ fontSize: '9px', marginTop: '2px' }}>Color</span>
                         </label>
                     </div>

                    <div className="toolbar-divider"></div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 8px', opacity: 0.6 }}>
                         <span style={{ fontSize: '10px', fontWeight: 700 }}>Editor</span>
                     </div>
                </div>
            )}
        </div>
    );
}