"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CatalogoProduto } from "@/types/catalogo";
import { ProductGrid } from "./product-grid";

type Props = { iniciais: CatalogoProduto[]; temMaisInicial: boolean; busca: string; categoriaId: string | null };
export function InfiniteProductGrid({ iniciais, temMaisInicial, busca, categoriaId }: Props) {
  const [produtos, setProdutos] = useState(iniciais);
  const [temMais, setTemMais] = useState(temMaisInicial);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const offset = useRef(iniciais.length);
  const requisicao = useRef<AbortController | null>(null);
  const sentinela = useRef<HTMLDivElement>(null);
  useEffect(() => () => { requisicao.current?.abort(); requisicao.current = null; }, []);
  const carregar = useCallback(async () => {
    if (!temMais || requisicao.current) return;
    const controller = new AbortController();
    requisicao.current = controller;
    setCarregando(true); setErro(false);
    try {
      const params = new URLSearchParams({ offset: String(offset.current), q: busca });
      if (categoriaId) params.set("categoria", categoriaId);
      const resposta = await fetch(`/api/catalogo/produtos?${params}`, { signal: controller.signal, cache: "no-store" });
      if (!resposta.ok) throw new Error("Falha na consulta");
      const dados: { produtos: CatalogoProduto[]; temMais: boolean } = await resposta.json();
      if (controller.signal.aborted) return;
      offset.current += dados.produtos.length;
      setProdutos(anteriores => { const mapa = new Map(anteriores.map(p => [p.id, p])); for (const p of dados.produtos) mapa.set(p.id, p); return [...mapa.values()]; });
      setTemMais(dados.temMais && dados.produtos.length > 0);
    } catch { if (!controller.signal.aborted) setErro(true); }
    finally { if (requisicao.current === controller) { requisicao.current = null; setCarregando(false); } }
  }, [busca, categoriaId, temMais]);
  useEffect(() => {
    if (!temMais || erro || carregando || !sentinela.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) void carregar(); }, { rootMargin: "300px" });
    observer.observe(sentinela.current);
    return () => observer.disconnect();
  }, [carregar, temMais, erro, carregando, produtos.length]);
  return <>
    <p className="search-count" aria-live="polite">{produtos.length} produto(s) exibido(s)</p>
    <ProductGrid produtos={produtos} />
    <div ref={sentinela} className="catalog-infinite-status" aria-busy={carregando}>
      {carregando ? <p role="status">Carregando mais produtos…</p> : temMais ? <>
        {erro && <p role="alert">Não foi possível carregar mais produtos.</p>}
        <button type="button" onClick={() => void carregar()}>{erro ? "Tentar novamente" : "Carregar mais produtos"}</button>
      </> : produtos.length > 0 ? <p>Você chegou ao final da coleção.</p> : null}
    </div>
  </>;
}
