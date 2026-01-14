// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Replace with your actual EmailJS service/template/public key
        // Service ID: 'service_xyz', Template ID: 'template_abc', Public Key: 'user_123'
        // Sign up at https://www.emailjs.com/

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId) {
            alert('EmailJS keys are missing in .env file!');
            setStatus('error');
            return;
        }

        emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
            (result) => {
                console.log(result.text);
                setStatus('success');
                setFormData({ name: '', subject: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            },
            (error) => {
                console.log(error.text);
                setStatus('error');
            }
        );
    };

    return (
        <section id="contact" className="py-24 bg-dark relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900/20 -z-10 skew-x-12"></div>

            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white font-mono mb-4">
                        <span className="text-neon">04.</span> Contact Me
                    </h2>
                    <p className="text-slate-400">Have a question or want to work together? Send me a message!</p>
                </div>

                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-mono text-slate-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-mono text-slate-400">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                                    placeholder="Project Inquiry"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-mono text-slate-400">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors resize-none"
                                placeholder="Hello, I'd like to discuss..."
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            {status === 'success' && (
                                <span className="text-neon font-mono text-sm animate-pulse">
                                    <i className="fa-solid fa-check mr-2"></i>Message Sent!
                                </span>
                            )}
                            {status === 'error' && (
                                <span className="text-red-500 font-mono text-sm">
                                    Failed to send. Please try again.
                                </span>
                            )}
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`px-8 py-3 bg-neon text-dark font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] inline-flex items-center gap-2 ${
                                    status === 'sending' ? 'opacity-70 cursor-wait' : ''
                                }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-regular fa-paper-plane"></i> Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 flex justify-center gap-8 text-slate-400">
                    <a href="mailto:qkqkhih@rehan.ai.kr" className="flex items-center gap-2 hover:text-neon transition">
                        <i className="fa-regular fa-envelope"></i> qkqkhih@rehan.ai.kr
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
