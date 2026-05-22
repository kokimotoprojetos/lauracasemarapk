'use client';

import { useState, useEffect } from 'react';
import { Lock, Users, ShieldAlert, LogOut } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fixed credentials
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'LauraVip2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      setError('');
      fetchVisitors();
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/visitors', {
        headers: { 'Authorization': 'Bearer admin-laura-2026' }
      });
      if (res.ok) {
        const data = await res.json();
        // sort by newest
        data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setVisitors(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] font-sans selection:bg-rose-500 selection:text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/30">
              <ShieldAlert className="w-8 h-8 text-rose-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2 uppercase tracking-widest">Acesso Restrito</h1>
          <p className="text-white/40 text-center text-sm mb-8">Painel de Controle Laura Casemar</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Usuário</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-500 transition-colors"
                required
              />
            </div>
            
            {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

            <button type="submit" className="w-full mt-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold tracking-widest uppercase text-xs py-4 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-rose-500 selection:text-white p-6 md:p-12">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Visitantes Capturados</h1>
            <p className="text-rose-400 text-xs font-bold">{visitors.length} Registros Encontrados</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchVisitors} className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs tracking-widest uppercase hover:bg-white/10 transition-colors">
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 px-6 py-2 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-500 text-xs tracking-widest uppercase hover:bg-rose-500/20 transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="p-4 text-[10px] tracking-widest uppercase text-white/50 font-semibold">Nome Informado</th>
                <th className="p-4 text-[10px] tracking-widest uppercase text-white/50 font-semibold">Idade</th>
                <th className="p-4 text-[10px] tracking-widest uppercase text-white/50 font-semibold">Data / Hora do Acesso</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-white/40 italic">Nenhum visitante registrado ainda.</td>
                </tr>
              ) : (
                visitors.map((v, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-white font-medium">{v.name}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${Number(v.age) >= 18 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {v.age} anos
                      </span>
                    </td>
                    <td className="p-4 text-xs text-white/40 font-mono">
                      {new Date(v.timestamp).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
