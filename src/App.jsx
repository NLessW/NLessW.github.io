// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CanvasBackground from './components/CanvasBackground';
import Terminal from './components/Terminal';
import { USERNAME } from './constants';
// Import static data (generated at build time)
import staticRepos from './data/repos.json';

function App() {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleTerminal = () => setIsTerminalOpen(!isTerminalOpen);

    useEffect(() => {
        // Use static data instead of fetching at runtime
        // This avoids exposing the GitHub Token in the client bundle
        if (staticRepos && staticRepos.length > 0) {
            setRepos(staticRepos);
            setLoading(false);
        } else {
            // Fallback: Fetch without token (rate limited) or show empty
            // For now, we assume build script ran successfully
            console.log('No static data found, using empty state or fetch fallback');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                toggleTerminal();
            }
            if (e.key === 'Escape' && isTerminalOpen) {
                setIsTerminalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isTerminalOpen]);

    return (
        <>
            <CanvasBackground />
            <Navbar toggleTerminal={toggleTerminal} />
            <Hero toggleTerminal={toggleTerminal} loading={loading} />
            <About />
            <Skills repos={repos} loading={loading} />
            <Projects repos={repos} loading={loading} />
            <Contact />
            <Footer toggleTerminal={toggleTerminal} />

            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        </>
    );
}

export default App;
