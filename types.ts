/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { CSSProperties } from 'react';

export interface Artifact {
  id: string;
  styleName: string;
  html: string;
  status: 'streaming' | 'complete' | 'error';
}

export interface Session {
    id: string;
    prompt: string;
    timestamp: number;
    artifacts: Artifact[];
}

export interface CanvasElement {
    id: string;
    type: 'section' | 'text' | 'image' | 'box' | 'video'; // Added 'section'
    
    // Position (Legacy / Optional for sections)
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    
    content: string;
    zIndex?: number;
    style?: CSSProperties;
    
    // Nesting
    children?: CanvasElement[];
    
    // Section Specific Props
    cols?: number; // 1 | 2 | 3 | 4
    gap?: number; // px
    paddingY?: number; // px
}

export interface Project {
    id: string;
    title: string;
    desc: string;
    shortDescription?: string;
    image: string;
    isHidden?: boolean;
    elements: CanvasElement[];
    [key: string]: any;
}