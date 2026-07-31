"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "motion/react";

import { CONTATO, criarLinkWhatsApp } from "@/lib/constants/contato";

export function Hero() {
  return (
    <section className="hero">
      <div className="page-container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Nova coleção
          </span>

          <h1>Elegância que combina com seus valores.</h1>

          <p>
            Peças femininas selecionadas para acompanhar sua rotina com
            conforto, beleza e propósito.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#produtos">
              Ver produtos
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              className="button button-secondary"
              href={criarLinkWhatsApp(
                "Olá! Gostaria de conhecer as novidades da Cristã Modesta.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              Pedir atendimento
            </a>
          </div>

          <a
            className="vip-link"
            href={CONTATO.grupoVip}
            target="_blank"
            rel="noreferrer"
          >
            <Sparkles size={15} aria-hidden="true" />
            Entre no grupo VIP e receba novidades primeiro
          </a>
        </motion.div>

        <motion.div
          className="hero-visual hero-brand-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          aria-label="Cristã Modesta Moda Evangélica"
        >
          <div className="hero-logo-glow" />

          <Image
            src="/brand/logo-crista-modesta.png"
            alt="Cristã Modesta Moda Evangélica"
            width={620}
            height={468}
            priority
            className="hero-brand-logo"
          />

          <motion.div
            className="hero-floating-note hero-note-one"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Curadoria especial</span>
            <strong>Peças que valorizam você</strong>
          </motion.div>

          <motion.div
            className="hero-floating-note hero-note-two"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Atendimento próximo</span>
            <strong>Escolha com tranquilidade</strong>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
