import { Search } from "lucide-react";

import { InfiniteProductGrid } from "@/components/produto/infinite-product-grid";
import { listarCategoriasPublicas, listarProdutosPublicos } from "@/services/catalogo";

type Props = { searchParams: Promise<{ q?: string; categoria?: string; pagina?: string }> };

export default async function BuscarPage({ searchParams }: Props) {
  const parametros = await searchParams;
  const busca = parametros.q?.trim() ?? "";
  const categoriaId = parametros.categoria ?? null;

  const limite = 20;
  const url = (cat: string | null = categoriaId) => {
    const params = new URLSearchParams();
    if (busca) params.set("q", busca);
    if (cat) params.set("categoria", cat);

    return `/buscar?${params.toString()}`;
  };
  const [resultado, categorias] = await Promise.all([
    listarProdutosPublicos({ busca, categoriaId, limite: limite + 1, offset: 0 }),
    listarCategoriasPublicas().catch(() => []),
  ]);
  const produtos = resultado.slice(0, limite);
  const temMais = resultado.length > limite;
  const categoria = categorias.find((item) => item.id === categoriaId);
  const titulo = busca ? `Resultados para “${busca}”` : categoria ? categoria.nome : "Toda a coleção";

  return (
    <main className="page-container search-page">
      <header className="search-page-header">
        <span>Explore a vitrine</span>
        <h1>{titulo}</h1>
        <form action="/buscar" className="catalog-search-box">
          <Search aria-hidden="true" />
          {categoriaId && <input type="hidden" name="categoria" value={categoriaId} />}
          <input name="q" defaultValue={busca} placeholder="Buscar vestidos, blusas, cores..." />
          <button type="submit">Pesquisar</button>
        </form>
      </header>
      <div className="category-filter-links">
        <a href={url(null)} className={!categoriaId ? "active" : ""}>Todos</a>
        {categorias.map((item) => (
          <a key={item.id} href={url(item.id)} className={item.id === categoriaId ? "active" : ""}>{item.nome}</a>
        ))}
      </div>
      <InfiniteProductGrid key={JSON.stringify([busca, categoriaId])} iniciais={produtos} temMaisInicial={temMais} busca={busca} categoriaId={categoriaId} />
    </main>
  );
}

export const dynamic = "force-dynamic";
