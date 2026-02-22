/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { Session, CanvasElement, Project } from './types';
import ProjectDetail from './components/ProjectDetail';
import MainPage from './components/MainPage';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import { DashboardIcon, DownloadIcon, CloseIcon, SaveIcon, EditIcon } from './components/Icons';
import { 
    INITIAL_PROJECTS, 
    DEFAULT_CONTENT, 
    createDefaultElements, 
    INITIAL_MAIN_CONTENT, 
    INITIAL_SERVICES_CONTENT, 
    INITIAL_REVIEWS_CONTENT, 
    INITIAL_SITE_CONFIG
} from './constants';
import { generateId } from './utils';

const STORAGE_KEY = 'flash-ui-projects-v8';
const CONFIG_STORAGE_KEY = 'flash-ui-config';
const AUTH_STORAGE_KEY = 'flash-ui-auth-session';

const getInitialProjects = (): Project[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PROJECTS;
};

const getInitialSiteConfig = () => {
    try {
        const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SITE_CONFIG;
};

function App() {
  const [projects, setProjects] = useState<Project[]>(getInitialProjects);
  const [siteConfig, setSiteConfig] = useState(getInitialSiteConfig);

  useEffect(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(siteConfig));
        
        // Update Document Title
        if (siteConfig.title) document.title = siteConfig.title;

        // Update Meta Description
        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', siteConfig.description || '');
        
        // Update Favicon
        if (siteConfig.favicon) {
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = siteConfig.favicon;
        }

    } catch (e) {}
  }, [siteConfig]);

  useEffect(() => {
      if (!siteConfig.gaId) return;
      const scriptId = 'ga-gtag';
      if (document.getElementById(scriptId)) return;

      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${siteConfig.gaId}');`;
      document.head.appendChild(inlineScript);
  }, [siteConfig.gaId]);


  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectsSnapshot, setProjectsSnapshot] = useState<Project[] | null>(null);
  
  const [mainContent, setMainContent] = useState(INITIAL_MAIN_CONTENT);
  const [mainContentSnapshot, setMainContentSnapshot] = useState<typeof mainContent | null>(null);

  const [servicesContent, setServicesContent] = useState(INITIAL_SERVICES_CONTENT);
  const [reviewsContent, setReviewsContent] = useState(INITIAL_REVIEWS_CONTENT);

  const [sessions, setSessions] = useState<Session[]>(() => {
    return projects.map(p => ({
        id: p.id, prompt: p.title, timestamp: Date.now(),
        artifacts: [{ id: `${p.id}_0`, styleName: p.desc, html: '', status: 'complete' as const }]
    }));
  });

  // Check storage on mount for persistent login (optional)
  useEffect(() => {
      const isAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (isAuth === 'true') {
          setIsAdmin(true);
      }
  }, []);

  useEffect(() => {
      if (projects.length > sessions.length) {
          const newSessions = projects.map(p => {
              const existing = sessions.find(s => s.id === p.id);
              if (existing) return existing;
              return {
                  id: p.id, prompt: p.title, timestamp: Date.now(),
                  artifacts: [{ id: `${p.id}_0`, styleName: p.desc, html: '', status: 'complete' as const }]
              };
          });
          setSessions(newSessions);
      } else if (projects.length < sessions.length) {
          setSessions(prev => prev.filter(s => projects.some(p => p.id === s.id)));
      } else {
           const currentIds = projects.map(p => p.id).join(',');
           const sessionIds = sessions.map(s => s.id).join(',');
           if (currentIds !== sessionIds) {
               const newSessions = projects.map(p => sessions.find(s => s.id === p.id) || {
                    id: p.id, prompt: p.title, timestamp: Date.now(),
                    artifacts: [{ id: `${p.id}_0`, styleName: p.desc, html: '', status: 'complete' as const }]
               });
               setSessions(newSessions);
           }
      }
  }, [projects]);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
      if (!isEditMode) {
          setSelectedProjectId(id);
          // Force immediate scroll
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          
          setTimeout(() => {
              window.scrollTo(0, 0);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
          }, 0);
      }
  };

  useEffect(() => {
      if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
      }
  }, []);

  const handleSelectProject = (id: string) => {
      setSelectedProjectId(id);
      // Force immediate scroll
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      
      // Force scroll after render
      setTimeout(() => {
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
      }, 0);
      
      // Backup scroll just in case of layout shifts
      setTimeout(() => window.scrollTo(0, 0), 50);
  };

  const handleBack = () => setSelectedProjectId(null);

  const handleLogout = () => {
      setIsAdmin(false);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsEditMode(false);
      setShowAdminPanel(false);
      setProjectsSnapshot(null);
      setMainContentSnapshot(null);
  };

  const handleFigmaClick = () => {
      if (!isAdmin) setIsLoginModalOpen(true);
      else setShowAdminPanel(true);
  };

  const handleLoginSuccess = () => {
      setIsAdmin(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsLoginModalOpen(false);
      setShowAdminPanel(true);
  };

  const toggleEditMode = () => {
      if (!isAdmin) return;
      if (isEditMode) {
          setProjectsSnapshot(null);
          setMainContentSnapshot(null);
          setIsEditMode(false);
      } else {
          setProjectsSnapshot(JSON.parse(JSON.stringify(projects)));
          setMainContentSnapshot({ ...mainContent });
          setIsEditMode(true);
      }
  };

  const handleCancelEdit = () => {
      if (projectsSnapshot) {
          setProjects(projectsSnapshot);
          setProjectsSnapshot(null);
      }
      if (mainContentSnapshot) {
          setMainContent(mainContentSnapshot);
          setMainContentSnapshot(null);
      }
      setIsEditMode(false);
  };

  const handleExportData = async () => {
      const dataStr = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { CanvasElement } from './types';

export const createDefaultElements = (id: string, title: string, image: string, description: string): CanvasElement[] => [];

export const CALM_COLORS = [
    '#A7BED3', '#C6E2E9', '#F1FFC4', '#FFCAAF', 
    '#DABFDE', '#C1BEB5', '#8E9AAF', '#CBC0D3', 
    '#EFD3D7', '#FEEAFA', '#8D99AE', '#2B2D42',
    '#4A5759', '#D0F4DE', '#E4C1F9', '#9DA9A0'
];

export const DEFAULT_CONTENT = ${JSON.stringify(DEFAULT_CONTENT, null, 4)};
export const INITIAL_SITE_CONFIG = ${JSON.stringify(siteConfig, null, 4)};
export const INITIAL_MAIN_CONTENT = ${JSON.stringify(mainContent, null, 4)};
export const INITIAL_SERVICES_CONTENT = ${JSON.stringify(servicesContent, null, 4)};
export const INITIAL_REVIEWS_CONTENT = ${JSON.stringify(reviewsContent, null, 4)};
export const INITIAL_PROJECTS = ${JSON.stringify(projects, null, 4)};
`;
      
      // Attempt File System API first (Modern Browsers)
      try {
          // @ts-ignore
          if (window.showSaveFilePicker) {
              // @ts-ignore
              const handle = await window.showSaveFilePicker({
                  suggestedName: 'constants.ts',
                  types: [{ description: 'TypeScript File', accept: { 'text/typescript': ['.ts'] } }],
              });
              const writable = await handle.createWritable();
              await writable.write(dataStr);
              await writable.close();
              alert("Saved to constants.ts");
              return;
          }
      } catch (err) {}

      // Fallback: Blob Download
      const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "constants.ts";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const updateProject = useCallback((id: string, field: string, value: any) => {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }, []);

  const updateElements = useCallback((id: string, elements: CanvasElement[]) => {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, elements } : p));
  }, []);

  const updateMainContent = (field: keyof typeof mainContent, value: string) => {
      setMainContent(prev => ({ ...prev, [field]: value }));
  };

  const updateServices = (idx: number, field: string, value: string) => {
      if (idx === -1) {
           setServicesContent(prev => ({ ...prev, title: value }));
           return;
      }
      const newItems = [...servicesContent.items];
      // @ts-ignore
      newItems[idx] = { ...newItems[idx], [field]: value };
      setServicesContent(prev => ({ ...prev, items: newItems }));
  };

  const updateReviews = (idx: number, field: string, value: string) => {
      if (idx === -1) {
          setReviewsContent(prev => ({ ...prev, title: value }));
          return;
      }
      const newItems = [...reviewsContent.items];
      // @ts-ignore
      newItems[idx] = { ...newItems[idx], [field]: value };
      setReviewsContent(prev => ({ ...prev, items: newItems }));
  };
  
  const handleCMSMainContentUpdate = (field: string, value: string) => {
      setMainContent(prev => ({ ...prev, [field]: value }));
  };
  
  const handleUpdateSiteConfig = (field: string, value: string) => {
      setSiteConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProject = () => {
      const newId = generateId();
      // Use purely generic defaults to avoid looking like a duplicate of existing projects
      const newProject: Project = {
          id: newId, 
          title: "New Project", 
          desc: "Category", 
          image: "",
          shortDescription: "Short description...",
          ...DEFAULT_CONTENT, 
          heroOverlayText: "NEW PROJECT",
          elements: createDefaultElements(newId, "New Project", "", "")
      };
      setProjects(prev => [...prev, newProject]);
      return newId; 
  };
  
  const handleDuplicateProject = (id: string) => {
      const projectToClone = projects.find(p => p.id === id);
      if (!projectToClone) return;
      const newId = generateId();
      const newProject = {
          ...projectToClone, id: newId, title: `${projectToClone.title} (Copy)`,
          elements: JSON.parse(JSON.stringify(projectToClone.elements)).map((el: CanvasElement) => ({
              ...el, id: generateId() + '_copy'
          }))
      };
      setProjects(prev => [...prev, newProject]);
  };
  
  const handleDeleteProject = (id: string) => {
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProjectId === id) setSelectedProjectId(null);
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
      setProjects(prev => {
          const newProjects = [...prev];
          if (direction === 'up' && index > 0) {
              [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
          } else if (direction === 'down' && index < prev.length - 1) {
              [newProjects[index + 1], newProjects[index]] = [newProjects[index], newProjects[index + 1]];
          }
          return newProjects;
      });
  };

  const handleCMSEditProject = (id: string) => {
      setShowAdminPanel(false);
      setSelectedProjectId(id);
      setIsEditMode(true);
  };

  const FloatingButton = () => {
      if (!isAdmin || showAdminPanel) return null;
      return (
        <div className="fab-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="fab" style={{ backgroundColor: '#1e293b' }} onClick={() => { setIsEditMode(false); setSelectedProjectId(null); setShowAdminPanel(true); }}>
                <DashboardIcon />
            </button>
            {isEditMode && (
                <>
                    <button className="fab" style={{ backgroundColor: '#10b981' }} onClick={handleExportData}>
                        <DownloadIcon />
                    </button>
                    <button className="fab" style={{ backgroundColor: '#666' }} onClick={handleCancelEdit}>
                        <CloseIcon />
                    </button>
                </>
            )}
            <button className={`fab ${isEditMode ? 'active' : ''}`} onClick={toggleEditMode}>
                {isEditMode ? <SaveIcon /> : <EditIcon />}
            </button>
        </div>
      );
  };

  if (isAdmin && showAdminPanel) {
      return (
          <AdminPanel 
            projects={projects} mainContent={mainContent} siteConfig={siteConfig}
            onUpdateMainContent={handleCMSMainContentUpdate} onUpdateSiteConfig={handleUpdateSiteConfig}
            onUpdateProject={updateProject} onDeleteProject={handleDeleteProject}
            onDuplicateProject={handleDuplicateProject} onEditProject={handleCMSEditProject}
            onMoveProject={handleMoveProject} onLogout={handleLogout} onExport={handleExportData}
            onAddProject={() => { const newId = handleAddProject(); handleCMSEditProject(newId); }}
            onExitAdmin={() => setShowAdminPanel(false)}
          />
      );
  }

  if (selectedProjectId) {
      const project = projects.find(p => p.id === selectedProjectId);
      return (
          <div className="project-page-wrapper">
              <div className="project-page-content">
                  <ProjectDetail 
                        key={selectedProjectId}
                        project={project || projects[0]} allProjects={projects}
                        onBack={handleBack} onSelectProject={handleSelectProject}
                        isEditMode={isEditMode} onUpdateProject={updateProject} onUpdateElements={updateElements}
                  />
              </div>
              <FloatingButton />
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLoginSuccess} />
          </div>
      );
  }

  return (
    <>
        <MainPage 
            mainContent={mainContent} servicesContent={servicesContent} reviewsContent={reviewsContent}
            sessions={sessions} projects={projects} isEditMode={isEditMode} isAdmin={isAdmin}
            onUpdateMainContent={updateMainContent} onUpdateServices={updateServices}
            onUpdateReviews={updateReviews} onUpdateProject={updateProject}
            onCardClick={handleCardClick} onFigmaClick={handleFigmaClick}
            onCreateProject={handleAddProject}
        />
        <FloatingButton />
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLoginSuccess} />
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}