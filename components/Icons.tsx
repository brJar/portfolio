/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export const ThinkingIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" className="spin-icon" {...props}>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" opacity=".3"/>
        <path d="M20 12h2A10 10 0 0012 2v2a8 8 0 018 8z"/>
    </svg>
);
export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 .25a.75.75 0 0 1 .673.418L9.743 3.25l2.579.375a.75.75 0 0 1 .416 1.285l-1.867 1.82.44 2.569a.75.75 0 0 1-1.088.791L8 8.975l-2.302 1.21a.75.75 0 0 1-1.088-.79l.44-2.57-1.867-1.82a.75.75 0 0 1 .416-1.285l2.579-.375L7.327.668A.75.75 0 0 1 8 .25zM4.5 11.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
    </svg>
);
export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);

export const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

export const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);

export const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
);

export const SaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
    </svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

export const UploadCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 16 12 12 8 16"></polyline>
        <line x1="12" y1="12" x2="12" y2="21"></line>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
        <polyline points="16 16 12 12 8 16"></polyline>
    </svg>
);

export const MoveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="5 9 2 12 5 15"/>
        <polyline points="9 5 12 2 15 5"/>
        <polyline points="19 9 22 12 19 15"/>
        <polyline points="9 19 12 22 15 19"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="12" y1="2" x2="12" y2="22"/>
    </svg>
);

export const AddTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
    </svg>
);

export const AddImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
);

export const ShapeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    </svg>
);

export const LayoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
);

export const Grid3Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
        <line x1="15" y1="3" x2="15" y2="21"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
    </svg>
);

export const ColorIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
    </svg>
);

export const BoldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
);

export const ItalicIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
);

export const AlignLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
);

export const AlignCenterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
);

export const AlignRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
);

export const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
);

export const WidthIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15 3 21 3 21 9"></polyline>
        <polyline points="9 21 3 21 3 15"></polyline>
        <line x1="21" y1="3" x2="14" y2="10"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
);

export const HeightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 21 3 21 3 15"></polyline>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="3" y1="21" x2="21" y2="3"></line>
    </svg>
);

export const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path>
    </svg>
);

export const UndoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 7v6h6"></path>
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
    </svg>
);

export const RedoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 7v6h-6"></path>
        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path>
    </svg>
);

export const DuplicateIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

export const LayerUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 19V5"></path>
        <path d="M5 12l7-7 7 7"></path>
    </svg>
);

export const LayerDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 5v14"></path>
        <path d="M19 12l-7 7-7-7"></path>
    </svg>
);

export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

export const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

export const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

export const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
);

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

export const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
);

export const FigIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="40" height="40" rx="8" fill="#2E2E2E"/>
        <path d="M15 35C17.76 35 20 32.76 20 30V25H15C12.24 25 10 27.24 10 30C10 32.76 12.24 35 15 35Z" fill="#0ACF83"/>
        <path d="M10 20C10 17.24 12.24 15 15 15H20V25H15C12.24 25 10 22.76 10 20Z" fill="#A259FF"/>
        <path d="M10 10C10 7.24 12.24 5 15 5H20V15H15C12.24 15 10 12.76 10 10Z" fill="#F24E1E"/>
        <path d="M20 5H25C27.76 5 30 7.24 30 10C30 12.76 27.76 15 25 15H20V5Z" fill="#FF7262"/>
        <path d="M30 20C30 22.76 27.76 25 25 25C22.24 25 20 22.76 20 20C20 17.24 22.24 15 25 15C27.76 15 30 17.24 30 20Z" fill="#1ABCFE"/>
    </svg>
);

export const PSIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="40" height="40" rx="8" fill="#001E36"/>
        <path d="M14.3334 10.416C13.8334 10.416 13.3334 10.416 12.8169 10.4329C12.3 10.4495 11.8166 10.4495 11.3666 10.4663C10.9166 10.4829 10.5 10.4829 10.1 10.4995C9.71656 10.516 9.45 10.516 9.16656 10.516C9.05 10.516 9 10.5826 9 10.6995V27.8495C9 27.9995 9.06656 28.0663 9.2 28.0663H12.4334C12.55 28.0495 12.6334 27.9495 12.6166 27.8329V22.4829C12.9331 22.4829 13.1666 22.4829 13.3334 22.4995C13.5 22.516 13.7666 22.516 14.1666 22.516C15.5334 22.516 16.7834 22.366 17.9166 21.9495C19 21.5495 19.9334 20.8495 20.6 19.916C21.2667 18.9827 21.6 17.7993 21.6 16.366C21.6 15.616 21.4669 14.8995 21.2169 14.1995C20.952 13.4863 20.537 12.8384 20 12.2995C19.3662 11.6837 18.6033 11.2168 17.7666 10.9326C16.8331 10.5826 15.7 10.416 14.3334 10.416ZM14.7053 13.6988C15.2991 13.7101 15.8772 13.8138 16.4166 14.0326C16.9 14.216 17.3 14.5495 17.5834 14.9826C17.8493 15.4308 17.9822 15.9454 17.9669 16.4663C17.9669 17.1995 17.8 17.7663 17.45 18.1829C17.0831 18.5995 16.6166 18.9163 16.0834 19.0663C15.4666 19.2663 14.8166 19.366 14.1666 19.366H13.2831C13.0831 19.366 12.8669 19.3495 12.6334 19.3329V13.7329C12.75 13.716 12.9834 13.6995 13.3169 13.7163C13.6334 13.6995 14.0166 13.6995 14.45 13.6995C14.5354 13.6974 14.6205 13.6972 14.7053 13.6988ZM28.6834 14.5498C27.5 14.5498 26.5166 14.7329 25.7334 15.1329C25.0169 15.4663 24.4 15.9995 23.9834 16.666C23.6169 17.2829 23.4166 17.966 23.4166 18.6829C23.4023 19.2725 23.534 19.8565 23.8 20.3829C24.1117 20.9434 24.5445 21.4273 25.0669 21.7995C25.8 22.3009 26.5956 22.7043 27.4334 22.9995C28.25 23.316 28.8 23.566 29.0669 23.7826C29.3334 23.9995 29.4669 24.216 29.4669 24.4495C29.4669 24.7495 29.2834 25.0329 29.0169 25.1495C28.7169 25.2995 28.2669 25.3829 27.6334 25.3829C26.9669 25.3829 26.3 25.2995 25.6666 25.1329C24.9392 24.9705 24.2419 24.6949 23.6 24.3163C23.55 24.2829 23.5 24.2663 23.45 24.2998C23.4 24.3329 23.3834 24.3995 23.3834 24.4495V27.3495C23.3669 27.4829 23.45 27.5995 23.5669 27.666C24.1073 27.9185 24.679 28.0979 25.2669 28.1995C26.0169 28.3495 26.7666 28.416 27.5331 28.416C28.7331 28.416 29.7334 28.2329 30.55 27.8829C31.3 27.5829 31.95 27.0663 32.4166 26.3995C32.8535 25.7439 33.0803 24.9706 33.0666 24.1829C33.083 23.5878 32.9514 22.9979 32.6834 22.4663C32.3666 21.8995 31.9166 21.4329 31.3666 21.0829C30.562 20.5776 29.7005 20.1691 28.8 19.866C28.3979 19.6996 28.003 19.5161 27.6166 19.316C27.4 19.1995 27.2 19.0495 27.05 18.866C26.95 18.7326 26.8834 18.5829 26.8834 18.4329C26.8834 18.2829 26.9334 18.1163 27.0166 17.9829C27.1334 17.8163 27.3166 17.6995 27.5331 17.6495C27.85 17.5663 28.2 17.516 28.5331 17.5326C29.1666 17.5326 29.7831 17.616 30.4 17.7495C30.9669 17.866 31.5 18.0495 32 18.3163C32.0666 18.3495 32.15 18.3495 32.3 18.3163C32.326 18.297 32.3472 18.2719 32.3617 18.2429C32.3762 18.2139 32.3836 18.1819 32.3834 18.1495V15.4329C32.3834 15.366 32.3666 15.2995 32.35 15.2329C32.3166 15.1663 32.25 15.0995 32.1834 15.0829C31.7237 14.895 31.2421 14.7662 30.75 14.6995C30.0657 14.5998 29.375 14.55 28.6834 14.5498Z" fill="#31A8FF"/>
    </svg>
);

export const AIIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="40" height="40" rx="8" fill="#6A3A28"/>
        <path d="M29.3374 10.0387C29.1295 10.043 28.9227 10.0076 28.729 9.93465C28.5353 9.8617 28.3585 9.75263 28.2088 9.6137C27.9199 9.31106 27.7649 8.91209 27.7767 8.5014C27.7698 8.30124 27.8069 8.10192 27.8856 7.9165C27.9643 7.73108 28.0828 7.56374 28.2334 7.42544C28.5398 7.15117 28.9435 6.99972 29.3621 7.002C29.5746 6.99132 29.7872 7.02347 29.986 7.09639C30.1849 7.1693 30.3658 7.28138 30.517 7.42544C30.791 7.73035 30.9398 8.12105 30.9352 8.52405C30.9307 8.92705 30.7732 9.31457 30.4924 9.6137C30.343 9.76024 30.1625 9.87396 29.9631 9.94705C29.7637 10.0201 29.5503 10.0525 29.3374 10.0387ZM27.7143 13.2002H31V29H27.7143V13.2002ZM18.465 10.0719L18.4486 10.0403H15.0314C14.9821 10.0481 14.9376 10.0736 14.9071 10.1118C14.8766 10.1499 14.8623 10.1978 14.8671 10.2457C14.8678 10.6374 14.8349 11.0284 14.7686 11.4149C14.6864 11.6203 14.6371 11.8257 14.5714 11.9995L14.1279 13.2318L8 29H11.5157L12.7479 25.84H21.3564L22.6543 29H26.2029L18.465 10.0719ZM13.98 22.6801L16.9371 15.033L16.9536 15.0962L16.9864 15.1594L19.4179 21.1001L20.0586 22.6801H13.98Z" fill="#FFB74D"/>
    </svg>
);

export const AEIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M33.3594 0H6.64062C2.97311 0 0 3.04446 0 6.8V33.136C0 36.8915 2.97311 39.936 6.64062 39.936H33.3594C37.0269 39.936 40 36.8915 40 33.136V6.8C40 3.04446 37.0269 0 33.3594 0Z" fill="#00005B"/>
        <path d="M16.0692 23.8927H9.87061L8.60936 27.912C8.59319 27.9809 8.55536 28.0425 8.50169 28.0872C8.44802 28.1319 8.38149 28.1574 8.31233 28.1596L5.14795 28.1594C4.96879 28.1594 4.90618 28.0586 4.96014 27.857L10.3269 12.0956L10.3805 11.93L10.3983 11.8733L10.4342 11.7549C10.452 11.6938 10.4698 11.629 10.4878 11.5588C10.5581 11.1922 10.594 10.8196 10.5951 10.446C10.5915 10.4198 10.5939 10.3932 10.602 10.3682C10.6102 10.3432 10.6239 10.3204 10.6421 10.3018C10.6604 10.2831 10.6826 10.2691 10.707 10.2607C10.7314 10.2523 10.7574 10.2499 10.783 10.2536H15.0495C15.1745 10.2536 15.2461 10.2995 15.2642 10.3911L21.3553 27.8847C21.4089 28.0679 21.3553 28.1595 21.1944 28.1594H17.7059C17.646 28.1661 17.5858 28.1503 17.5365 28.1149C17.4871 28.0795 17.452 28.027 17.4376 27.9671L16.0692 23.8927ZM10.8367 20.5037H15.0764L15.0159 20.2994L14.9189 19.9759L14.7769 19.5125L14.5042 18.6378L14.2445 17.7972L13.7614 16.2309C13.6279 15.7986 13.4998 15.3645 13.377 14.9288L13.2398 14.4335L13.0917 13.8906L12.9564 13.3871H12.9295C12.7952 14.0466 12.6317 14.6996 12.4395 15.3439L12.2583 15.9396L11.8223 17.3796L11.6014 18.1132C11.5615 18.2456 11.5217 18.3766 11.4819 18.5061L11.3631 18.8898L11.245 19.2645L11.1275 19.63L11.0106 19.9863C10.9524 20.1623 10.8944 20.3348 10.8367 20.5037ZM31.2301 22.3284H25.944C26.0087 22.8639 26.1824 23.3796 26.4539 23.8421C26.7539 24.3002 27.1783 24.6584 27.6747 24.8725C28.3474 25.1708 29.0751 25.3168 29.808 25.3007C30.3894 25.2892 30.9687 25.224 31.5387 25.1061C32.0486 25.0357 32.5482 24.9024 33.0267 24.709C33.1162 24.6359 33.161 24.6817 33.1611 24.8463V27.4567C33.1655 27.5279 33.1515 27.5989 33.1206 27.6628C33.09 27.7127 33.0487 27.7549 33 27.7864C32.4691 28.0272 31.9105 28.1976 31.3375 28.2936C30.5591 28.4433 29.768 28.5123 28.9761 28.4996C27.7455 28.4996 26.7081 28.3105 25.864 27.9324L25.7828 27.8951C24.9713 27.5292 24.2546 26.974 23.69 26.274C23.1625 25.6144 22.7701 24.8528 22.5361 24.0346C22.3045 23.227 22.1872 22.3896 22.1875 21.5479C22.1849 20.6288 22.3253 19.7152 22.6034 18.8413C22.8712 17.989 23.2946 17.1964 23.8511 16.5058C24.4002 15.8234 25.0866 15.2704 25.8636 14.8845C26.6506 14.4909 27.5809 14.3496 28.6542 14.3496C29.5443 14.3268 30.4285 14.5051 31.2437 14.8717C31.9292 15.171 32.5326 15.6377 33.0012 16.2309C33.441 16.8117 33.7771 17.4675 33.994 18.168C34.2053 18.8431 34.3139 19.5475 34.3161 20.2564C34.3161 20.6596 34.3027 21.026 34.2759 21.3556L34.252 21.6378L34.227 21.9056L34.2122 22.0413L34.2087 22.07C34.2018 22.1305 34.1733 22.1864 34.1288 22.2269C34.0843 22.2674 34.0269 22.2898 33.9673 22.2898L33.8937 22.2914L33.802 22.2962L33.7306 22.3015L33.5637 22.316L33.4172 22.3309C33.3773 22.3352 33.3359 22.3392 33.293 22.3429L33.16 22.3536L33.018 22.3632L32.8672 22.3712L32.7075 22.3781L32.6242 22.381L32.4512 22.3858C32.2801 22.3901 32.1048 22.3792 31.925 22.3658L31.6522 22.3453C31.5118 22.3348 31.3709 22.3292 31.2301 22.3284ZM25.9442 19.8252H29.5983L29.9095 19.8231L30.1211 19.82L30.2581 19.8168L30.4119 19.8114C30.5495 19.7973 30.6823 19.7523 30.8009 19.6794V19.5146C30.7957 19.2997 30.7595 19.0868 30.6937 18.8826C30.549 18.4138 30.2579 18.0066 29.8653 17.7237C29.4726 17.4407 29.0001 17.2975 28.5203 17.3162C28.0687 17.2883 27.6189 17.3955 27.2258 17.6248C26.8327 17.8542 26.5132 18.1957 26.3064 18.6077C26.1225 18.991 26.0002 19.402 25.9442 19.8252Z" fill="#9999FF"/>
    </svg>
);

export const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9.27968 20.2826C15.2567 17.6791 19.2414 15.9626 21.2337 15.1333C26.9289 12.7652 28.1109 12.3539 28.8828 12.34C29.0526 12.3372 29.4305 12.3792 29.6772 12.5786C29.8822 12.7468 29.9398 12.9742 29.9687 13.1339C29.9943 13.2934 30.0295 13.6569 30.0007 13.9407C29.6932 17.1823 28.3575 25.0485 27.6784 28.6793C27.3934 30.2155 26.8264 30.7305 26.2787 30.7808C25.0871 30.8904 24.1838 29.9941 23.0307 29.2385C21.2273 28.0556 20.2087 27.3195 18.4566 26.1655C16.4323 24.8317 17.7455 24.0985 18.8987 22.9005C19.1998 22.5869 24.4465 17.8159 24.5458 17.3831C24.5586 17.329 24.5714 17.1272 24.4497 17.0209C24.3312 16.9142 24.155 16.9507 24.0269 16.9795C23.8443 17.0205 20.9647 18.9258 15.3784 22.6949C14.5616 23.2567 13.8217 23.5306 13.1555 23.5161C12.4252 23.5005 11.0158 23.1023 9.96836 22.7621C8.68711 22.3448 7.66531 22.1241 7.755 21.4152C7.79984 21.0462 8.30914 20.6686 9.27968 20.2826Z" fill="white"/>
    </svg>
);