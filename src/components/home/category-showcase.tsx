import Link from "next/link";

import { SmartImage } from "@/components/shared/smart-image";
import type { CatalogoCategoria, CatalogoProduto } from "@/types/catalogo";

type CategoryShowcaseProps = {
  categorias: CatalogoCategoria[];
  produtos: CatalogoProduto[];
};

export function CategoryShowcase({ categorias, produtos }: CategoryShowcaseProps) {
  const itens = categorias.slice(0, 3).map((categoria, indice) => ({
    categoria,
    produto:
      produtos.find((item) => item.categoriaId === categoria.id && item.imagemCapa) ??
      produtos.filter((item) => item.imagemCapa)[indice],
  }));

  if (itens.length === 0) return null;

  return (
    <section id="colecoes" className="page-container collection-section">
      <header className="editorial-section-heading centered">
        <span>Coleções</span>
        <h2>Encontre o estilo que combina com você.</h2>
      </header>

      <div className="collection-grid">
        {itens.map(({ categoria, produto }, indice) => (
          <Link
            key={categoria.id}
            href={`/buscar?categoria=${categoria.id}`}
            className={`collection-tile collection-tile-${indice + 1}`}
          >
            {produto?.imagemCapa ? (
              <SmartImage
                src={produto.imagemCapa}
                alt={categoria.nome}
                fill
                quality={90}
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
                containerClassName="collection-image-wrap"
                imageClassName="collection-image"
              />
            ) : (
              <div className="collection-fallback" />
            )}
            <div className="collection-overlay" />
            <div className="collection-caption">
              <small>{categoria.quantidadeProdutos} peças disponíveis</small>
              <h3>{categoria.nome}</h3>
              <span>Explorar coleção</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
