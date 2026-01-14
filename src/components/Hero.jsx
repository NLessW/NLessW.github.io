// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { USERNAME } from '../constants';

const phrases = ['Full-Stack Developer', 'Firmware Developer', 'Artificial Intelligence'];

const Hero = ({ toggleTerminal, loading }) => {
    const [text, setText] = useState('');
    const [isDel, setIsDel] = useState(false);
    const [pIdx, setPIdx] = useState(0);
    const [cIdx, setCIdx] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                const cur = phrases[pIdx];

                if (!isDel && cIdx === cur.length + 1) {
                    setIsDel(true);
                } else if (isDel && cIdx === 0) {
                    setIsDel(false);
                    setPIdx((prev) => (prev + 1) % phrases.length);
                } else {
                    setCIdx((prev) => (isDel ? prev - 1 : prev + 1));
                }
            },
            isDel ? (cIdx === 0 ? 500 : 50) : cIdx === phrases[pIdx].length + 1 ? 2000 : 100
        );

        return () => clearTimeout(timeout);
    }, [cIdx, isDel, pIdx]);

    useEffect(() => {
        // Text sync effect
        const cur = phrases[pIdx];
        setText(cur.substring(0, cIdx));
    }, [cIdx, pIdx]);

    return (
        <header id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
            <div className="max-w-4xl w-full text-center md:text-left z-10">
                <div
                    id="connection-status"
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono mb-6 transition-colors ${
                        loading ? 'text-slate-400' : 'text-neon'
                    }`}
                >
                    <span
                        className={`w-2 h-2 rounded-full animate-pulse ${loading ? 'bg-yellow-500' : 'bg-neon'}`}
                    ></span>
                    {loading ? 'Connecting to GitHub API...' : `Connected (${USERNAME})`}
                </div>
                <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    FULL-STACK & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-cyan-500">
                        EMBEDDED DEV.
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 mb-10 font-mono h-8 flex items-center justify-center md:justify-start">
                    <span className="mr-2 text-neon">$</span>
                    <span>{text}</span>
                    <span className="w-3 h-6 bg-neon inline-block ml-1 animate-blink"></span>
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <a
                        href="https://github.com/NLessW"
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 bg-neon text-dark font-bold rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center"
                    >
                        <i className="fa-brands fa-github mr-2"></i> GitHub
                    </a>
                    <button
                        onClick={toggleTerminal}
                        className="px-8 py-4 border border-slate-600 rounded hover:border-neon hover:text-neon transition-all bg-dark/50 font-mono"
                    >
                        Open Terminal
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Hero;
