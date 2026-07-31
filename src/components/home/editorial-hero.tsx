"use client";

import Image from "next/image";
import { SmartImage } from "@/components/shared/smart-image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import type { CatalogoProduto } from "@/types/catalogo";

type EditorialHeroProps = {
  produto?: CatalogoProduto;
};

export function EditorialHero({ produto }: EditorialHeroProps) {
  return (
    <section className="editorial-hero">
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
              alt="Cristã Modesta"
              width={650}
              height={470}
              priority
            />
          </div>
        )}
        <div className="editorial-hero-overlay" />
      </div>

      <motion.div
        className="page-container editorial-hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="editorial-kicker">Cristã Modesta · Nova coleção</p>
        <h1>Elegância para viver seus melhores momentos.</h1>
        <p className="editorial-hero-description">
          Uma seleção de peças femininas que une delicadeza, conforto e
          propósito em cada detalhe.
        </p>
        <div className="editorial-hero-actions">
          <a href="#produtos" className="editorial-primary-link">
            Conhecer a coleção <ArrowRight aria-hidden="true" />
          </a>
          {produto ? (
            <Link href={`/produto/${produto.slug}`} className="editorial-secondary-link">
              Ver look em destaque
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
