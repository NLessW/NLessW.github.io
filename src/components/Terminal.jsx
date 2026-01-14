// src/components/Terminal.jsx
import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ isOpen, onClose }) => {
    const [history, setHistory] = useState([
        {
            type: 'system',
            html: '<span class="text-neon">System Online. v2.0.1</span><br />Type <span class="text-yellow-400">\'help\'</span> to view available commands.<br />',
        },
    ]);
    const [inputVal, setInputVal] = useState('');
    const bodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history, isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const val = inputVal.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', val: inputVal }];

            let out = '';
            if (val === 'help')
                out = 'Commands: <span class="text-yellow-400">about, skills, projects, clear, exit</span>';
            else if (val === 'about')
                out =
                    'Full-stack & Embedded Developer @ NLessW\nName : Kim WooHyeok\nEmail : qkqkhih@rehan.ai.kr\nBirth : 2000.04.03\nSex : Male\nLocation : Republic of Korea, Incheon\nGitHub : https://github.com/NLessW';
            else if (val === 'skills')
                out =
                    'My Skills:\n- Programming: C, C++, Python, JavaScript, TypeScript, HTML, CSS, React\n- Embedded Systems: Arduino\n- Web Development: Node.js, Express, MongoDB, Tailwind CSS\n- Tools: Git, VSCode';
            else if (val === 'projects') {
                out = 'Scrolling to projects...';
                window.location.href = '#projects';
                onClose();
            } else if (val === 'clear') {
                setHistory([]);
                setInputVal('');
                return;
            } else if (val === 'exit') {
                onClose();
            } else if (val) {
                out = `<span class="text-red-400">Command not found: ${val}</span>`;
            }

            if (out) {
                newHistory.push({ type: 'output', html: out.replace(/\n/g, '<br>') });
            }

            setHistory(newHistory);
            setInputVal('');
        }
    };

    // if (!isOpen) return null;

    return (
        <div
            id="terminal-overlay"
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm ${
                isOpen ? 'active' : ''
            }`}
        >
            <div className="w-full max-w-3xl bg-[#0c0c0c] rounded-lg shadow-2xl border border-slate-700 overflow-hidden font-mono text-sm md:text-base">
                <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between border-b border-black">
                    <div className="flex gap-2">
                        <div
                            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition"
                            onClick={onClose}
                        ></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-slate-500 text-xs">NLessW@portfolio:~</div>
                </div>
                <div
                    className="p-6 h-[400px] overflow-y-auto text-slate-300 scrollbar-hide"
                    id="terminal-body"
                    ref={bodyRef}
                >
                    {history.map((item, idx) => {
                        if (item.type === 'system' || item.type === 'output') {
                            return (
                                <div key={idx} className="mb-1" dangerouslySetInnerHTML={{ __html: item.html }}></div>
                            );
                        } else if (item.type === 'input') {
                            return (
                                <div key={idx} className="mb-1">
                                    <span className="text-neon">➜</span> <span className="text-white">{item.val}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="p-4 bg-[#0c0c0c] border-t border-slate-800 flex items-center">
                    <span className="text-neon mr-2">➜</span>
                    <input
                        type="text"
                        ref={inputRef}
                        id="terminal-input"
                        className="bg-transparent border-none outline-none text-white w-full font-mono"
                        placeholder="Type command..."
                        autoComplete="off"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
