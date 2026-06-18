"use client";

import { useEffect, useState } from "react";
import React from 'react';
import { getUsername } from "@/lib/auth";
import { User, Mail, FileText, Save } from "lucide-react";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega o nome do usuário salvo na sessão do navegador
    const savedUsername = getUsername() || "Usuário";
    setUsername(savedUsername);
    setName(savedUsername); // Fallback inicial
    setEmail(`${savedUsername}@email.com`); // Exemplo visual temporário
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    // Aqui você poderá plugar a rota de atualização do perfil do usuário comum depois
    setTimeout(() => {
      alert("Perfil atualizado com sucesso (Simulado)!");
      setLoading(false);
    }, 1000);
  }

  return (
    <>
      <div className="page-header">
        <div>
          <div className="eyebrow">Gerenciamento da Conta</div>
          <h1>Meu Perfil</h1>
          <p>Atualize suas informações de exibição, biografia e dados da conta.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '600px', background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700 }}>
              {username.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{name}</h3>
              <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>@{username}</p>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>
              <User size={14} style={{ marginRight: '4px', inlineSize: 'auto' }} /> Nome de Exibição
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>
              <Mail size={14} style={{ marginRight: '4px', inlineSize: 'auto' }} /> E-mail da Conta
            </label>
            <input
              type="email"
              value={email}
              disabled
              style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--muted)', outline: 'none', cursor: 'not-allowed' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>
              <FileText size={14} style={{ marginRight: '4px', inlineSize: 'auto' }} /> Biografia
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre seus gostos para filmes, séries ou livros..."
              rows={4}
              style={{ width: '100%', padding: '12px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: 'fit-content', padding: '12px 24px', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-end', opacity: loading ? 0.7 : 1 }}
          >
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>

        </form>
      </div>
    </>
  );
}