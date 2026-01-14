// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ toggleTerminal }) => {
    return (
        <nav className="fixed w-full z-40 glass top-0 left-0 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <a
                    href="#"
                    className="text-2xl font-bold font-mono text-white tracking-tighter flex items-center gap-2"
                >
                    <span className="text-neon">&gt;_</span> NLessW
                </a>
                <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
                    <a href="#about" className="hover:text-neon transition-colors">
                        ABOUT
                    </a>
                    <a href="#skills" className="hover:text-neon transition-colors">
                        ANALYTICS
                    </a>
                    <a href="#projects" className="hover:text-neon transition-colors">
                        PROJECTS
                    </a>
                    <a href="#contact" className="hover:text-neon transition-colors">
                        CONTACT
                    </a>
                    <button
                        onClick={toggleTerminal}
                        className="px-4 py-2 border border-slate-600 rounded text-xs hover:border-neon hover:text-neon transition-all font-mono group"
                    >
                        <i className="fa-solid fa-terminal mr-2 group-hover:animate-pulse"></i>CMD
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
