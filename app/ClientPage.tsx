'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, Star, Youtube, Instagram, Twitter, Flame } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage({ images = [] }: { images?: string[] }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem('vault_unlocked') === 'true') {
      setHasEntered(true);
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;
    setLoading(true);
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age })
      });
    } catch (err) {
      console.error(err);
    }
    localStorage.setItem('vault_unlocked', 'true');
    setHasEntered(true);
    setLoading(false);
  };

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen bg-[#050505] font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden ${!hasEntered ? 'h-screen overflow-hidden' : ''}`}>
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg p-8 md:p-12 bg-white/5 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600"></div>
              
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-500/10 rounded-full border border-orange-500/30 animate-pulse">
                  <Flame className="w-10 h-10 text-orange-500" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 uppercase tracking-tight">
                🔥🌶️ Parabéns! Você está prestes a acessar as minhas prévias! 🌶️🔥
              </h2>
              
              <p className="text-white/60 text-center text-sm mb-8">
                Me informe seu nome e idade para confirmar sua entrada.
              </p>

              <form onSubmit={handleUnlock} className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Seu Nome</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-colors"
                    placeholder="Como devo te chamar?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Sua Idade</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-colors"
                    placeholder="Qual a sua idade?"
                    min="18"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-rose-600 text-white font-bold tracking-widest uppercase text-xs py-5 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_rgba(244,63,94,0.5)] transition-all disabled:opacity-50"
                >
                  {loading ? 'Acessando...' : 'Acessar Prévias'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dramatic Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[60%] bg-rose-900/20 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-purple-900/20 blur-[100px] rounded-full -z-10"></div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_10px_#f43f5e] animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase">Vault Secure</span>
            </div>
            <h1 className="font-display text-xl font-light tracking-tight uppercase sm:text-2xl">
              LAURA <span className="font-bold">CASEMAR</span>
            </h1>
          </div>
          
          <nav className="hidden items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 md:flex">
            <a href="#" className="transition-colors hover:text-white">Directory</a>
            <a href="#" className="transition-colors hover:text-white">Encrypted</a>
            <a href="#" className="transition-colors hover:text-white">VIP Archive</a>
          </nav>

          <button className="rounded-full bg-white px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase text-black transition-all hover:bg-rose-100 hover:scale-105 active:scale-95">
            Unlock Now
          </button>
        </div>
      </header>

      <main className="relative pt-40 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <div className="flex flex-col items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10 flex flex-col items-center"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Archive Status</span>
                  <span className="text-[10px] bg-rose-500/20 px-2 py-0.5 rounded text-rose-300 font-mono">ENCRYPTED_V2.04</span>
                </div>
                <h2 className="font-display text-6xl font-light leading-[0.9] tracking-tight uppercase sm:text-8xl">
                  THE <span className="italic serif text-rose-200">SECRET</span> <br/>
                  <span className="font-bold">GALLERY</span>
                </h2>
              </div>
                
              <div className="relative p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl group">
                <div className="absolute left-0 top-0 h-full w-1 bg-rose-500 rounded-full"></div>
                <p className="text-lg italic leading-relaxed text-white/70 pl-4">
                  "Bem vindo as minhas previas"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Access Level</p>
                  <p className="text-sm font-semibold text-rose-400">Ultra Premium</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Items Stored</p>
                  <p className="text-sm font-semibold">+428 Media Files</p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 px-10 py-5 font-bold tracking-widest text-white shadow-[0_0_40px_rgba(244,63,94,0.3)] transition-all hover:shadow-[0_0_60px_rgba(244,63,94,0.4)] uppercase text-xs"
              >
                Enter the Vault
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

          </div>
        </div>
      </main>

      {/* Gallery Section */}
      <section id="gallery" className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-3xl font-light tracking-tight uppercase">
              Vault <span className="font-bold">Contents</span>
            </h2>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              {images.length} Files Encrypted
            </div>
          </div>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: (i % 10) * 0.1 }}
                className="relative w-full break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group bg-white/5"
              >
                <div className="relative w-full">
                  <img 
                    src={src} 
                    alt={`Preview ${i + 1}`} 
                    loading={i < 8 ? "eager" : "lazy"}
                    fetchPriority={i < 8 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-auto object-cover scale-[1.15] origin-top" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metadata Footer Area */}
      <footer className="border-t border-white/10 bg-[#050505] pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-b border-white/5 pb-12 mb-12">
            <div className="flex gap-16">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Archive Member</span>
                <span className="text-sm text-white/80 font-semibold tracking-tight">Laura Casemar</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Latency Status</span>
                <span className="text-sm text-green-400 font-mono">14ms</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] uppercase text-white/30 tracking-widest mb-1">System Version</span>
                <span className="text-sm text-white/40 font-mono">VAULT_V2.04_STABLE</span>
              </div>
            </div>

            <div className="flex gap-4">
               {[Instagram, Twitter, Youtube].map((Icon, i) => (
                 <a key={i} href="#" className="h-12 w-12 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40 transition-all hover:border-rose-500 hover:text-white hover:bg-rose-500/10">
                    <Icon className="h-5 w-5" />
                 </a>
               ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-widest text-white/20 uppercase">
             <p>© 2026 Secured Archive Node 01</p>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Connection Private & Encrypted
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
