'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, Star, Youtube, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function LandingPage({ images = [] }: { images?: string[] }) {
  const [index, setIndex] = useState(-1);
  const slides = images.map((src) => ({ src }));

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="space-y-2">
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
                  "Bem-vindo ao meu mundo privado. Archive 01 pronto para visualização. Conteúdos sem censura e sem limites."
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

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              {/* Blurred Background Image Placeholder */}
              <div className="absolute inset-0 grayscale brightness-[20%] opacity-50">
                 <Image 
                  src={images.length > 0 ? images[0] : "https://picsum.photos/seed/vault-preview/1200/1600"} 
                  alt="Vault preview" 
                  fill
                  className="object-cover blur-3xl scale-110"
                  referrerPolicy="no-referrer"
                  unoptimized
                 />
              </div>

              {/* Graphic Elements */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-20">
                <div className="absolute top-10 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80]"></div>
                </div>

                <div className="mb-8 inline-flex items-center justify-center p-6 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                   <Lock className="h-10 w-10" />
                </div>

                <h3 className="mb-3 font-display text-4xl font-light tracking-tight uppercase">
                  VIP <span className="font-bold">PREVIEW</span>
                </h3>
                
                <p className="mb-10 max-w-xs text-sm leading-relaxed text-white/40">
                  Syncing Archive contents... <br/>
                  <span className="text-white/80">300+ EXCLUSIVE MEDIA TAGGED</span>
                </p>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="w-[78%] h-full bg-gradient-to-r from-rose-600 to-purple-600"></div>
                  </div>
                  <div className="flex justify-between text-[8px] tracking-[0.2em] font-mono text-white/30 uppercase">
                    <span>Buffering Vault</span>
                    <span>78% Loaded</span>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between z-20">
                <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] uppercase font-bold tracking-widest text-white/60">
                   4K_RES_STABLE
                </div>
                <div className="px-4 py-1.5 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/30 text-[9px] uppercase font-bold tracking-widest text-rose-300">
                   Locked
                </div>
              </div>

              {/* Glossy Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
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
                className="relative w-full break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group bg-white/5 cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <div className="relative w-full">
                  <img 
                    src={src} 
                    alt={`Preview ${i + 1}`} 
                    loading={i < 8 ? "eager" : "lazy"}
                    fetchPriority={i < 8 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-auto object-cover -mb-[15%] transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-white uppercase drop-shadow-md">FILE_{i.toString().padStart(4, '0')}</span>
                      <Lock className="w-3 h-3 text-rose-500 drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        animation={{ swipe: 250 }}
        styles={{ container: { backgroundColor: "rgba(5, 5, 5, 0.98)", backdropFilter: "blur(10px)" } }}
      />

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
