"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Cross } from "lucide-react";
import { motion } from "motion/react";

import { SmartImage } from "@/components/shared/smart-image";
import type { CatalogoProduto } from "@/types/catalogo";

type EditorialHeroProps = {
  produto?: CatalogoProduto;
};

export function EditorialHero({ produto }: EditorialHeroProps) {
  return (
    <section className="editorial-hero refined-editorial-hero">
      <div className="editorial-hero-media">
        {produto?.imagemCapa ? (
          <SmartImage
            src={produto.imagemCapa}
            alt={produto.nome}
            fill
            priority
            quality={92}
            sizes="100vw"
            containerClassName="editorial-hero-image-wrap"
            imageClassName="editorial-hero-image"
          />
        ) : (
          <div className="editorial-hero-placeholder">
            <Image
              src="/brand/logo-crista-modesta.png"
              alt="Cristã Modesta Moda Evangélica"
              width={650}
              height={470}
              priority
            />
          </div>
        )}
        <div className="editorial-hero-overlay refined-hero-overlay" />
      </div>

      <motion.div
        className="page-container editorial-hero-content refined-hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="editorial-kicker refined-kicker">
          <Cross size={14} aria-hidden="true" />
          Cristã Modesta · Moda com propósito
        </p>
        <h1>Elegância que honra seus valores.</h1>
        <p className="editorial-hero-description">
          Peças escolhidas com cuidado para mulheres que desejam vestir-se com
          beleza, modéstia e propósito, glorificando a Deus também nos detalhes.
        </p>
        <div className="editorial-hero-actions">
          <a href="#produtos" className="editorial-primary-link">
            Conhecer a coleção <ArrowRight aria-hidden="true" />
          </a>
          {produto ? (
            <Link
              href={`/produto/${produto.slug}`}
              className="editorial-secondary-link"
            >
              Ver peça em destaque
            </Link>
          ) : null}
        </div>
      </motion.div>

      <a className="hero-scroll-hint" href="#novidades" aria-label="Ver novidades">
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
