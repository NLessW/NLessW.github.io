// src/components/Skills.jsx
import React, { useMemo, useEffect, useState } from 'react';
import { langColors } from '../constants';

const Skills = ({ repos, loading }) => {
    const [animatedWidths, setAnimatedWidths] = useState({});

    const { sortedLangs, totalBytes } = useMemo(() => {
        if (!repos || repos.length === 0) return { sortedLangs: [], totalBytes: 0 };

        let globalBytes = {};
        let total = 0;

        repos.forEach((repo) => {
            if (!repo.languageStats) return;
            for (const [lang, bytes] of Object.entries(repo.languageStats)) {
                globalBytes[lang] = (globalBytes[lang] || 0) + bytes;
                total += bytes;
            }
        });

        const sorted = Object.entries(globalBytes)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6);

        return { sortedLangs: sorted, totalBytes: total };
    }, [repos]);

    useEffect(() => {
        if (sortedLangs.length > 0) {
            const timer = setTimeout(() => {
                const widths = {};
                sortedLangs.forEach(([lang, bytes]) => {
                    const percent = ((bytes / totalBytes) * 100).toFixed(1);
                    widths[lang] = percent + '%';
                });
                setAnimatedWidths(widths);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [sortedLangs, totalBytes]);

    return (
        <section id="skills" className="py-24 relative bg-dark/50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-12 font-mono flex items-center gap-2">
                    <span className="text-neon">02.</span> Code Intelligence
                </h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Improved Chart Card */}
                    <div className="glass p-8 rounded-xl border border-slate-700/50 hover:border-neon/50 transition-all duration-300 shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-neon">
                                    <i className="fa-solid fa-chart-pie"></i>
                                </span>
                                GitHub Language Stats
                            </h3>
                            <span className="text-xs font-mono text-slate-500 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                                {loading ? 'Loading...' : `${repos.length} Public Projects`}
                            </span>
                        </div>
                        <div id="lang-chart-container" className="space-y-5">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="loader ease-linear rounded-full border-2 border-t-2 border-slate-600 h-8 w-8"></div>
                                </div>
                            ) : (
                                sortedLangs.map(([lang, bytes]) => {
                                    const percent = ((bytes / totalBytes) * 100).toFixed(1);
                                    const color = langColors[lang] || '#94a3b8';
                                    return (
                                        <div key={lang} className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-white font-bold">{lang}</span>
                                                <span className="text-slate-400 font-mono">{percent}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000"
                                                    style={{
                                                        width: animatedWidths[lang] || '0%',
                                                        backgroundColor: color,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Improved Skills Cards */}
                    <div className="flex flex-col gap-6">
                        <div className="glass p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 h-full shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                                    <i className="fa-solid fa-microchip"></i>
                                </span>
                                Technical Skills
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 font-mono mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">
                                        Core & Embedded
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <SkillBadge
                                            text="C / C++"
                                            colorClass="text-blue-200"
                                            hoverBorder="hover:border-blue-400"
                                        />
                                        <SkillBadge
                                            text="Python"
                                            colorClass="text-blue-200"
                                            hoverBorder="hover:border-blue-400"
                                        />
                                        <SkillBadge
                                            text="Arduino"
                                            colorClass="text-blue-200"
                                            hoverBorder="hover:border-blue-400"
                                        />
                                        <SkillBadge
                                            text="TypeScript"
                                            colorClass="text-blue-200"
                                            hoverBorder="hover:border-blue-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 font-mono mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">
                                        Web Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <SkillBadge
                                            text="React.js"
                                            colorClass="text-purple-200"
                                            hoverBorder="hover:border-purple-400"
                                        />
                                        <SkillBadge
                                            text="Node.js & Express"
                                            colorClass="text-purple-200"
                                            hoverBorder="hover:border-purple-400"
                                        />
                                        <SkillBadge
                                            text="MongoDB"
                                            colorClass="text-purple-200"
                                            hoverBorder="hover:border-purple-400"
                                        />
                                        <SkillBadge
                                            text="Tailwind CSS"
                                            colorClass="text-purple-200"
                                            hoverBorder="hover:border-purple-400"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 font-mono mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">
                                        Data & AI
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <SkillBadge
                                            text="TensorFlow"
                                            colorClass="text-orange-200"
                                            hoverBorder="hover:border-orange-400"
                                        />
                                        <SkillBadge
                                            text="AI"
                                            colorClass="text-orange-200"
                                            hoverBorder="hover:border-orange-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SkillBadge = ({ text, colorClass, hoverBorder }) => (
    <span
        className={`px-3 py-1.5 bg-slate-800/50 ${colorClass} text-sm font-mono rounded border border-slate-700 ${hoverBorder} transition-colors cursor-default`}
    >
        {text}
    </span>
);

export default Skills;
