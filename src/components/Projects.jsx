// src/components/Projects.jsx
import React, { useState, useMemo } from 'react';
import { langColors } from '../constants';

const Projects = ({ repos, loading }) => {
    const [filter, setFilter] = useState('all');

    const langCounts = useMemo(() => {
        const counts = {};
        repos.forEach((r) => {
            let lang = r.language;
            if (!lang) return;
            // JS/TS merge logic for 카테고리
            if (lang === 'JavaScript' || lang === 'TypeScript') lang = 'JS/TS';
            counts[lang] = (counts[lang] || 0) + 1;
        });
        return counts;
    }, [repos]);

    const sortedCountKeys = useMemo(() => {
        return Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]);
    }, [langCounts]);

    const filteredRepos = useMemo(() => {
        if (filter === 'all') return repos;
        if (filter === 'JS/TS') {
            return repos.filter((r) => r.language === 'JavaScript' || r.language === 'TypeScript');
        }
        return repos.filter((r) => r.language === filter);
    }, [repos, filter]);

    return (
        <section id="projects" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white font-mono">
                            <span className="text-neon">03.</span> All Repositories
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">Fetching all public repositories from NLessW.</p>
                    </div>

                    <div
                        id="category-filters"
                        className="flex flex-nowrap gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-hide max-w-full"
                    >
                        <button
                            onClick={() => setFilter('all')}
                            className={`filter-btn px-3 py-1 text-sm rounded transition-all font-mono border border-transparent whitespace-nowrap ${
                                filter === 'all'
                                    ? 'bg-slate-700 text-white active'
                                    : 'text-slate-400 hover:text-white hover:border-slate-600'
                            }`}
                        >
                            All
                        </button>
                        {sortedCountKeys.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setFilter(lang)}
                                className={`filter-btn px-3 py-1 text-sm rounded transition-all font-mono border border-transparent whitespace-nowrap ${
                                    filter === lang
                                        ? 'bg-slate-700 text-white active'
                                        : 'text-slate-400 hover:text-white hover:border-slate-600'
                                }`}
                            >
                                {lang} ({langCounts[lang]})
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6" id="project-grid">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-slate-600 h-12 w-12 mb-4"></div>
                            <p className="font-mono text-sm">Authenticating & Fetching Data...</p>
                        </div>
                    ) : filteredRepos.length === 0 ? (
                        <div className="col-span-full text-center text-slate-500 py-10">No projects found.</div>
                    ) : (
                        filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
                    )}
                </div>
            </div>
        </section>
    );
};

const RepoCard = ({ repo }) => {
    const stats = repo.languageStats || {};
    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    const sortedStats = Object.entries(stats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4);

    return (
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="group relative block h-full">
            <div className="h-full bg-card border border-slate-800 rounded-xl p-6 hover:border-neon transition-all duration-300 flex flex-col shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-neon text-2xl">
                        <i className="fa-regular fa-folder-open"></i>
                    </div>
                    <div className="text-slate-500 text-xs font-mono">
                        <i className="fa-regular fa-clock mr-1"></i>
                        {new Date(repo.updated_at).toISOString().split('T')[0]}
                    </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon transition line-clamp-1">
                    {repo.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow h-10">
                    {repo.description || 'No description provided.'}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-700/50">
                    <div className="stacked-bar h-2 bg-slate-800 mt-4 flex overflow-hidden rounded-full">
                        {total > 0 ? (
                            sortedStats.map(([lang, bytes]) => {
                                const pct = ((bytes / total) * 100).toFixed(1);
                                const color = langColors[lang] || '#64748b';
                                return (
                                    <div
                                        key={lang}
                                        className="stacked-segment"
                                        style={{ width: `${pct}%`, backgroundColor: color }}
                                    ></div>
                                );
                            })
                        ) : (
                            <div className="w-full h-full bg-slate-700"></div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] font-mono text-slate-400">
                        {total > 0 ? (
                            sortedStats.map(([lang, bytes]) => {
                                const pct = ((bytes / total) * 100).toFixed(1);
                                const color = langColors[lang] || '#64748b';
                                return (
                                    <div key={lang} className="flex items-center gap-1">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: color }}
                                        ></span>
                                        {lang} {Math.round(pct)}%
                                    </div>
                                );
                            })
                        ) : (
                            <span>No language data</span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Projects;
