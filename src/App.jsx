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
import { USERNAME, GITHUB_TOKEN } from './constants';

function App() {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleTerminal = () => setIsTerminalOpen(!isTerminalOpen);

    useEffect(() => {
        const fetchGitHubData = async () => {
            const headers = { Accept: 'application/vnd.github.v3+json' };
            if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

            try {
                const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
                    headers,
                });
                if (!res.ok) throw new Error(res.status === 403 ? 'Rate Limit' : 'Network Error');

                let data = await res.json();
                data = data.filter((r) => !r.fork);

                // Fetch languages for each repo
                const repoPromises = data.map(async (repo) => {
                    try {
                        const langRes = await fetch(repo.languages_url, { headers });
                        return { ...repo, languageStats: await langRes.json() };
                    } catch {
                        return { ...repo, languageStats: {} };
                    }
                });

                const detailedRepos = await Promise.all(repoPromises);
                setRepos(detailedRepos);
            } catch (error) {
                console.error(error);
                // Handle error state if needed
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
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
