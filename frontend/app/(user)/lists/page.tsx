"use client";

import { useEffect, useState } from "react";
import React from 'react';
import { UserListsResponse, ListStatus } from "@/lib/api";
import { Trash2, Film, BookOpen, AlertCircle } from "lucide-react";

// 🎬 NOSSOS DADOS MOCKADOS PARA FAZER A INTERFACE GANHAR VIDA!
const INITIAL_MOCK_DATA: UserListsResponse = {
  watched: [
    { item_id: "w1", title: "Interestelar", media_type: "movie", status: "watched", added_at: "2026-05-10T14:30:00Z" },
    { item_id: "w2", title: "Breaking Bad", media_type: "series", status: "watched", added_at: "2026-06-01T20:15:00Z" },
    { item_id: "w3", title: "Duna: Parte Dois", media_type: "movie", status: "watched", added_at: "2026-06-15T18:00:00Z" }
  ],
  read: [
    { item_id: "r1", title: "O Senhor dos Anéis: A Sociedade do Anel", media_type: "book", status: "read", added_at: "2026-04-12T09:00:00Z" },
    { item_id: "r2", title: "Hábitos Atômicos", media_type: "book", status: "read", added_at: "2026-05-25T11:45:00Z" }
  ],
  dropped: [
    { item_id: "d1", title: "Morbius", media_type: "movie", status: "dropped", added_at: "2026-03-20T22:30:00Z" }
  ]
};

export default function ListsPage() {
  const [lists, setLists] = useState<UserListsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulando o carregamento inicial dos dados mockados
  useEffect(() => {
    const timer = setTimeout(() => {
      setLists(INITIAL_MOCK_DATA);
      setLoading(false);
    }, 600); // Um leve delay só para você ver o efeito de carregamento (skeleton)
    return () => clearTimeout(timer);
  }, []);

  // Remove o item manipulando apenas o estado local
  async function handleRemove(itemId: string) {
    if (!confirm("Tem certeza que deseja remover este item?")) return;
    if (!lists) return;

    setLists({
      watched: lists.watched.filter(item => item.item_id !== itemId),
      read: lists.read.filter(item => item.item_id !== itemId),
      dropped: lists.dropped.filter(item => item.item_id !== itemId),
    });
  }

  // Move o item entre as tabelas reajustando as listas localmente
  async function handleMove(itemId: string, newStatus: ListStatus) {
    if (!lists) return;

    // Localiza o item atual em qualquer uma das três sublistas
    const allItems = [...lists.watched, ...lists.read, ...lists.dropped];
    const itemToMove = allItems.find(item => item.item_id === itemId);

    if (!itemToMove) return;

    // Cria cópias limpas removendo o item de onde ele estava
    const cleanWatched = lists.watched.filter(item => item.item_id !== itemId);
    const cleanRead = lists.read.filter(item => item.item_id !== itemId);
    const cleanDropped = lists.dropped.filter(item => item.item_id !== itemId);

    // Atualiza o status do item movido
    const updatedItem = { ...itemToMove, status: newStatus };

    // Adiciona o item na lista correspondente ao novo status
    if (newStatus === "watched") cleanWatched.push(updatedItem);
    if (newStatus === "read") cleanRead.push(updatedItem);
    if (newStatus === "dropped") cleanDropped.push(updatedItem);

    setLists({
      watched: cleanWatched,
      read: cleanRead,
      dropped: cleanDropped
    });
  }

  const ListSection = ({ title, items, status }: { title: string, items: any[], status: ListStatus }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="card stagger" style={{ marginBottom: '2rem' }}>
        <h3>{title}</h3>
        <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
          {items.length} {items.length === 1 ? 'item' : 'itens'} nesta lista.
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Adicionado em</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.item_id}>
                  <td style={{ fontWeight: 500 }}>{item.title}</td>
                  <td>
                    <span className="badge" style={{ background: 'var(--panel-2)', border: '1px solid var(--border)', color: 'var(--text-soft)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {item.media_type === 'movie' || item.media_type === 'series' ? <Film size={12} /> : <BookOpen size={12} />}
                      {item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1)}
                    </span>
                  </td>
                  <td className="mono">{new Date(item.added_at).toLocaleDateString('pt-BR')}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="row" style={{ justifyContent: 'flex-end', gap: '0.4rem', display: 'flex', alignItems: 'center' }}>
                      
                      <select 
                        style={{ width: 'auto', marginBottom: 0, padding: '0.3rem 1.8rem 0.3rem 0.6rem', fontSize: '0.8rem', background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '6px' }}
                        value={status}
                        onChange={(e) => handleMove(item.item_id, e.target.value as ListStatus)}
                      >
                        <option value="read">Lido</option>
                        <option value="watched">Assistido</option>
                        <option value="dropped">Abandonado</option>
                      </select>

                      <button 
                        className="btn-sm danger-soft" 
                        onClick={() => handleRemove(item.item_id)}
                        style={{ padding: '6px', cursor: 'pointer' }}
                        title="Remover da lista"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) return <div className="skeleton" style={{ height: '200px', borderRadius: '12px' }}></div>;

  const isEmpty = !lists || (lists.read.length === 0 && lists.watched.length === 0 && lists.dropped.length === 0);

  return (
    <>
      <div className="page-header stagger">
        <div>
          <div className="eyebrow">Acervo Pessoal</div>
          <h1>Minhas Listas</h1>
          <p>Gerencie seus filmes, séries e livros consumidos ou abandonados.</p>
        </div>
      </div>

      {error && (
        <div className="alert error">
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      {isEmpty ? (
        <div className="empty card stagger" style={{ textAlign: 'center', padding: '3rem' }}>
          <BookOpen size={32} style={{ color: 'var(--muted)' }} />
          <h3 style={{ marginTop: '1rem' }}>Sua lista está vazia</h3>
          <p className="muted">Você ainda não adicionou nenhum título às suas listas.</p>
        </div>
      ) : (
        <>
          <ListSection title="Assistidos" items={lists.watched} status="watched" />
          <ListSection title="Lidos" items={lists.read} status="read" />
          <ListSection title="Abandonados" items={lists.dropped} status="dropped" />
        </>
      )}
    </>
  );
}