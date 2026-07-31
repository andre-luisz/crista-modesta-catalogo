import { Search } from "lucide-react";

import { ProductGrid } from "@/components/produto/product-grid";
import { listarCategoriasPublicas, listarProdutosPublicos } from "@/services/catalogo";

type Props = { searchParams: Promise<{ q?: string; categoria?: string }> };

export default async function BuscarPage({ searchParams }: Props) {
  const parametros = await searchParams;
  const busca = parametros.q?.trim() ?? "";
  const categoriaId = parametros.categoria ?? null;
  const [produtos, categorias] = await Promise.all([
    listarProdutosPublicos({ busca, categoriaId, limite: 60 }).catch(() => []),
    listarCategoriasPublicas().catch(() => []),
  ]);
  const categoria = categorias.find((item) => item.id === categoriaId);
  const titulo = busca ? `Resultados para “${busca}”` : categoria ? categoria.nome : "Toda a coleção";

  return (
    <main className="page-container search-page">
      <header className="search-page-header">
        <span>Explore a vitrine</span>
        <h1>{titulo}</h1>
        <form action="/buscar" className="catalog-search-box">
          <Search aria-hidden="true" />
          <input name="q" defaultValue={busca} placeholder="Buscar vestidos, blusas, cores..." />
          <button type="submit">Pesquisar</button>
        </form>
      </header>
      <div className="category-filter-links">
        <a href="/buscar" className={!categoriaId ? "active" : ""}>Todos</a>
        {categorias.map((item) => (
          <a key={item.id} href={`/buscar?categoria=${item.id}`} className={item.id === categoriaId ? "active" : ""}>{item.nome}</a>
        ))}
      </div>
      <p className="search-count">{produtos.length} peça(s) disponível(is)</p>
      <ProductGrid produtos={produtos} />
    </main>
  );
}
