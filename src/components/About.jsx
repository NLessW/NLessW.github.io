// src/components/About.jsx
import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-[#0a0a0a] border-b border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="relative group max-w-md mx-auto md:mx-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                        <img
                            src="https://github.com/NLessW.png"
                            alt="Profile"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 font-mono flex items-center gap-3">
                        <span className="text-neon">01.</span> About Me
                    </h2>
                    <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
                        <p>
                            Hello! My name is <strong className="text-white">Kim WooHyeok</strong> (
                            <span className="text-neon">NLessW</span>). I am a passionate developer with a strong
                            foundation in both
                            <strong className="text-white">Embedded Systems</strong> and
                            <strong className="text-white">Full-Stack Web Development</strong>.
                        </p>
                        <p>
                            I enjoy bridging the gap between hardware and software, creating efficient firmware for IoT
                            devices while also building robust web interfaces to control and monitor them.
                        </p>
                        <p>
                            Whether I'm optimizing low-level C code or designing a responsive React frontend, I always
                            strive for clean, maintainable, and efficient solutions.
                        </p>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono text-slate-300 bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                            <div>
                                <span className="text-neon block mb-1">Name</span>
                                Kim WooHyeok
                            </div>
                            <div>
                                <span className="text-neon block mb-1">Email</span>
                                qkqkhih@rehan.ai.kr
                            </div>
                            <div>
                                <span className="text-neon block mb-1">Birth</span>
                                2000.04.03
                            </div>
                            <div>
                                <span className="text-neon block mb-1">Location</span>
                                Republic of Korea, Incheon
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
