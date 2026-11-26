"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { SmartImage } from "@/components/shared/smart-image";
import type { CatalogoProduto } from "@/types/catalogo";

type ProductCardProps = { produto: CatalogoProduto; prioridade?: boolean };

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function ProductCard({ produto, prioridade = false }: ProductCardProps) {
  const reduzirMovimento = useReducedMotion();
  const promo = produto.promocao;
  const imagem = promo ? produto.imagemOferta : produto.imagemCapa;

  return (
    <motion.article
      className="editorial-product-card premium-product-card"
      whileHover={reduzirMovimento ? undefined : { y: -6 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <Link href={`/produto/${produto.slug}`} className="editorial-product-media premium-product-media">
        {imagem ? (
          <SmartImage
            src={imagem}
            alt={produto.nome}
            fill
            priority={prioridade}
            quality={90}
            sizes="(max-width: 620px) 50vw, (max-width: 1000px) 33vw, 25vw"
            containerClassName="premium-product-image-wrap"
            imageClassName="editorial-product-image"
          />
        ) : (
          <div className="editorial-product-placeholder premium-product-placeholder">
            <span>CM</span>
            <small>Imagem em breve</small>
          </div>
        )}

        {promo ? <span className="editorial-product-label catalog-offer-label">{promo.campanhaNome || "Oferta"} · {Math.floor((1 - promo.precoPromocional / promo.precoOriginal) * 100)}% OFF</span> : produto.destaque ? <span className="editorial-product-label">Destaque</span> : null}

        <span className="premium-product-discover">
          Ver detalhes
          <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>

      <div className="editorial-product-info premium-product-info">
        <div>
          <span>{produto.categoriaNome ?? "Cristã Modesta"}</span>
          <Link href={`/produto/${produto.slug}`}>{produto.nome}</Link>
        </div>
        {promo ? <div className="catalog-offer-price">
          <small>Oferta: {[produto.corOferta, produto.tamanhoOferta].filter(Boolean).join(" / ")}</small>
          <del>{formatarMoeda(promo.precoOriginal)}</del>
          <strong>{formatarMoeda(promo.precoPromocional)}</strong>
        </div> : <p>
          {produto.possuiPrecosDiferentes ? <small>A partir de </small> : null}
          {formatarMoeda(produto.precoMinimo)}
        </p>}
      </div>

      {produto.cores.length > 0 ? (
        <div className="product-color-dots premium-color-dots" aria-label="Cores disponíveis">
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
          {produto.cores.length > 5 ? <small>+{produto.cores.length - 5}</small> : null}
        </div>
      ) : null}
    </motion.article>
  );
}
