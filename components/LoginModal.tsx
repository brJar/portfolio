/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

declare const process: any;

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

// Helper to safely get env vars regardless of build tool (Vite, CRA, Next.js)
const getEnvVar = (key: string, fallback: string): string => {
    // 1. Try Vite (import.meta.env)
    try {
        // @ts-ignore
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
            // @ts-ignore
            return import.meta.env[key];
        }
    } catch (e) {}

    // 2. Try Node/Webpack/CRA (process.env)
    try {
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
    } catch (e) {}

    return fallback;
};

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [step, setStep] = useState<'initial' | 'verifying'>('initial');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleGoogleSignIn = () => {
        setStep('verifying');
        setError('');
        setPin('');
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Configuration:
        // Use Environment Variables (Vercel) if available, otherwise fallback to defaults.
        // Vercel Keys: REACT_APP_ADMIN_EMAIL, VITE_ADMIN_EMAIL, etc.
        
        const ENV_EMAIL_KEYS = ['REACT_APP_ADMIN_EMAIL', 'VITE_ADMIN_EMAIL', 'NEXT_PUBLIC_ADMIN_EMAIL'];
        const ENV_PIN_KEYS = ['REACT_APP_ADMIN_PIN', 'VITE_ADMIN_PIN', 'NEXT_PUBLIC_ADMIN_PIN'];

        // Find first defined env var or use fallback
        let allowedEmail = 'br.mute4u@gmail.com';
        let secretPin = '6254'; 

        for (const key of ENV_EMAIL_KEYS) {
            const val = getEnvVar(key, '');
            if (val) { allowedEmail = val; break; }
        }
        
        for (const key of ENV_PIN_KEYS) {
            const val = getEnvVar(key, '');
            if (val) { secretPin = val; break; }
        }
        
        const normalizeEmail = email.toLowerCase().trim();

        if (normalizeEmail === allowedEmail && pin === secretPin) {
            onLogin();
            setEmail('');
            setPin('');
            setStep('initial');
        } else {
            setError('Access Denied. Invalid email or security PIN.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Owner Access</h2>
                
                {step === 'initial' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                            Restricted area. Please sign in to manage portfolio content.
                        </p>
                        
                        <button 
                            onClick={handleGoogleSignIn}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '40px',
                                cursor: 'pointer', fontWeight: 500, color: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path>
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.716H1.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"></path>
                                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H1.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path>
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 1.957 4.958L4.964 7.274C5.672 5.14 7.656 3.58 9 3.58z" fill="#EA4335"></path>
                            </svg>
                            Continue with Google
                        </button>

                        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: '#999', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>Cancel</button>
                    </div>
                ) : (
                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                            Enter your authorized Google email and Security PIN.
                        </p>
                        <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="modal-input"
                            placeholder="email@gmail.com"
                            autoFocus
                            required
                        />
                        
                        <input 
                            type="password" 
                            value={pin} 
                            onChange={(e) => setPin(e.target.value)}
                            className="modal-input"
                            placeholder="Security PIN"
                            required
                        />
                        
                        {error && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '-5px' }}>{error}</div>}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="submit" className="modal-btn primary">Verify</button>
                            <button type="button" onClick={() => { setStep('initial'); setError(''); }} className="modal-btn secondary">Back</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginModal;