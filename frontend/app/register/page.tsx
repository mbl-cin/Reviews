"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, UserPlus, Star } from "lucide-react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  
  // Adicionamos um estado separado para name e username
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Agora passamos os 4 campos na ordem correta!
      await api.register(name, username, email, password);
      
      alert("Conta criada com sucesso! Confirme seu email.");
      router.push("/login");
      
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-split" style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>
      
      <aside className="auth-aside" style={{ flex: 1, padding: '40px', background: 'linear-gradient(135deg, #0d0f14 0%, #1a1040 40%, #0f0d20 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="brand" style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="brand-mark" style={{ color: 'var(--accent)' }}>
             <Star size={24} fill="currentColor" />
          </span>
          <span className="brand-text" style={{ fontSize: '20px' }}>
            <b style={{ color: 'var(--text)' }}>Reviews</b>
          </span>
        </div>
        <div className="auth-hero">
          <h2 style={{ fontSize: '42px', color: 'var(--text)', marginBottom: '16px', fontWeight: 900, letterSpacing: '-1px' }}>
            Junte-se à <br /><span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Comunidade</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>
            Crie sua conta para começar a avaliar seus filmes, séries e livros favoritos.
          </p>
        </div>
      </aside>

      <main className="auth-main" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div className="card auth-card" style={{ width: '100%', maxWidth: '400px', background: 'var(--surface)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          
          <div className="eyebrow" style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Novo Usuário
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>
            Crie sua conta
          </h1>
          <p className="muted" style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
            Preencha os dados abaixo para se cadastrar.
          </p>

          {error && (
            <div className="alert error" style={{ display: 'flex', gap: '8px', padding: '12px', background: 'rgba(255,101,132,.15)', color: 'var(--accent2)', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', alignItems: 'center' }}>
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* NOVO CAMPO: Nome Completo */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Mário Pedro"
                style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }}
                required
              />
            </div>

            {/* CAMPO ATUALIZADO: Nome de Usuário */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>Nome de Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: cinefilo99"
                style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: '14px', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', marginTop: '8px', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', gap: '8px' }}
            >
              <UserPlus size={20} />
              {loading ? "Cadastrando…" : "Cadastrar"}
            </button>
          </form>

          <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>
            Já tem uma conta? <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Faça login</Link>
          </p>
        </div>
      </main>
    </div>
  );
}