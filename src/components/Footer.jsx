// src/components/Footer.jsx
import React from 'react';

const Footer = ({ toggleTerminal }) => {
    return (
        <>
            <button
                onClick={toggleTerminal}
                className="fixed bottom-6 right-6 w-12 h-12 bg-neon rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition md:hidden z-50 text-dark"
            >
                <i className="fa-solid fa-terminal"></i>
            </button>

            <footer className="py-12 text-center text-slate-600 text-sm bg-dark border-t border-slate-800">
                <p className="mb-2">Copyright &copy; 2026 NLessW. All Rights Reserved.</p>
                <p className="font-mono text-xs">
                    Press <span className="bg-slate-800 px-1 rounded text-slate-400">`</span> to open terminal
                </p>
            </footer>
        </>
    );
};

export default Footer;
