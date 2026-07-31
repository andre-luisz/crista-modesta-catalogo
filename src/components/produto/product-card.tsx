import Image from "next/image";
import Link from "next/link";

import type { CatalogoProduto } from "@/types/catalogo";

type ProductCardProps = { produto: CatalogoProduto; prioridade?: boolean };

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function ProductCard({ produto, prioridade = false }: ProductCardProps) {
  return (
    <article className="editorial-product-card">
      <Link href={`/produto/${produto.slug}`} className="editorial-product-media">
        {produto.imagemCapa ? (
          <Image
            src={produto.imagemCapa}
            alt={produto.nome}
            fill
            priority={prioridade}
            sizes="(max-width: 620px) 50vw, (max-width: 1000px) 33vw, 25vw"
            className="editorial-product-image"
          />
        ) : (
          <div className="editorial-product-placeholder">
            <Image src="/brand/icon-crista-modesta.png" alt="" width={100} height={100} />
          </div>
        )}
        {produto.destaque ? <span className="editorial-product-label">Destaque</span> : null}
      </Link>

      <div className="editorial-product-info">
        <div>
          <span>{produto.categoriaNome ?? "Cristã Modesta"}</span>
          <Link href={`/produto/${produto.slug}`}>{produto.nome}</Link>
        </div>
        <p>
          {produto.possuiPrecosDiferentes ? <small>A partir de </small> : null}
          {formatarMoeda(produto.precoMinimo)}
        </p>
      </div>

      {produto.cores.length > 0 ? (
        <div className="product-color-dots" aria-label="Cores disponíveis">
          {produto.cores.slice(0, 5).map((cor) => (
            <span
              key={cor.id}
              title={cor.nome}
              style={{ backgroundColor: cor.codigoHex || undefined }}
              className={!cor.codigoHex ? "color-dot-text" : undefined}
            >
              {!cor.codigoHex ? cor.nome.slice(0, 1) : null}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
