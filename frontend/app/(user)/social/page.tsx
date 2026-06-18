"use client";

import { useState } from "react";
import React from 'react';
import { Users, UserPlus, Check, X, Search } from "lucide-react";

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [searchQuery, setSearchQuery] = useState("");

  // Dados mockados locais para a interface ganhar vida antes das rotas finais
  const mockFriends = [
    { id: "1", name: "Ana Clara", username: "anacine" },
    { id: "2", name: "Lucas Silva", username: "lucas_books" },
  ];

  const mockRequests = [
    { id: "3", name: "Beatriz Oliveira", username: "bia_reviews" },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <div className="eyebrow">Comunidade</div>
          <h1>Amigos & Rede</h1>
          <p>Conecte-se com outros leitores e cinéfilos para acompanhar suas avaliações.</p>
        </div>
      </div>

      {/* Barra de ferramentas social */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '2px', background: 'var(--surface2)', padding: '4px', borderRadius: '8px', maxWidth: '300px' }}>
        <button 
          onClick={() => setActiveTab("friends")} 
          style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', background: activeTab === "friends" ? 'var(--surface)' : 'transparent', color: activeTab === "friends" ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}
        >
          Meus Amigos
        </button>
        <button 
          onClick={() => setActiveTab("requests")} 
          style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', background: activeTab === "requests" ? 'var(--surface)' : 'transparent', color: activeTab === "requests" ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}
        >
          Pedidos ({mockRequests.length})
        </button>
      </div>

      {/* Caixa de Busca */}
      <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '2rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
        <input 
          type="text" 
          placeholder="Buscar novos usuários por arroba..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 16px 12px 42px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }}
        />
      </div>

      {/* Renderização das Abas */}
      <div style={{ maxWidth: '600px' }}>
        {activeTab === "friends" ? (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={20} /> Amigos Conectados</h3>
            {mockFriends.map(friend => (
              <div key={friend.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{friend.name}</div>
                  <div className="muted" style={{ fontSize: '0.85rem' }}>@{friend.username}</div>
                </div>
                <button className="btn-sm danger-soft" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Remover</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={20} /> Solicitações Recebidas</h3>
            {mockRequests.length === 0 ? (
              <p className="muted" style={{ margin: 0 }}>Nenhuma solicitação pendente no momento.</p>
            ) : (
              mockRequests.map(req => (
                <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{req.name}</div>
                    <div className="muted" style={{ fontSize: '0.85rem' }}>@{req.username}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-sm" style={{ background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', padding: '6px 10px' }}><Check size={14} /></button>
                    <button className="btn-sm danger-soft" style={{ display: 'flex', alignItems: 'center', padding: '6px 10px' }}><X size={14} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}