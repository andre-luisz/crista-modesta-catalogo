"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { CONTATO } from "@/lib/constants/contato";

export function SiteHeader() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [rolou, setRolou] = useState(false);

  const pathname = usePathname();
  const [secao, setSecao] = useState("inicio");
  useEffect(() => {
    const atualizar = () => {
      setRolou(window.scrollY > 14);
      if (pathname !== "/") { setSecao("produtos"); return; }
      const limite = (document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 100) + 48;
      let atual = "inicio";
      for (const id of ["novidades", "colecoes", "produtos"]) {
        const elemento = document.getElementById(id);
        if (elemento && elemento.getBoundingClientRect().top <= limite) atual = id;
      }
      setSecao(atual);
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    const observer = new ResizeObserver(atualizar);
    observer.observe(document.body);
    return () => { window.removeEventListener("scroll", atualizar); window.removeEventListener("resize", atualizar); observer.disconnect(); };
  }, [pathname]);

  function fechar() {
    setMenuAberto(false);
    setBuscaAberta(false);
  }

  return (
    <>
      <div className="announcement-bar">
        <div className="page-container announcement-content">
          <span>Moda feminina com elegância e propósito</span>
          <div>
            <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">Grupo VIP</a>
            <a href={CONTATO.instagram} target="_blank" rel="noreferrer">
              <FaInstagram aria-hidden="true" />
              {CONTATO.instagramUsuario}
            </a>
          </div>
        </div>
      </div>

      <header className={`site-header premium-site-header ${rolou ? "is-scrolled" : ""}`}>
        <div className="page-container header-content">
          <button
            type="button"
            className="header-icon-button mobile-only"
            onClick={() => setMenuAberto((valor) => !valor)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <X /> : <Menu />}
          </button>

          <Link href="/" className="brand-logo-link" onClick={fechar}>
            <Image
              src="/brand/logo-crista-modesta.png"
              alt="Cristã Modesta Moda Evangélica"
              width={240}
              height={150}
              priority
              className="header-brand-logo"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <Link href="/" className={secao === "inicio" ? "catalog-nav-active" : undefined} aria-current={secao === "inicio" ? "location" : undefined}>Início</Link>
            <Link href="/#novidades" className={secao === "novidades" ? "catalog-nav-active" : undefined} aria-current={secao === "novidades" ? "location" : undefined}>Novidades</Link>
            <Link href="/#colecoes" className={secao === "colecoes" ? "catalog-nav-active" : undefined} aria-current={secao === "colecoes" ? "location" : undefined}>Coleções</Link>
            <Link href="/buscar" className={secao === "produtos" ? "catalog-nav-active" : undefined} aria-current={secao === "produtos" ? "location" : undefined}>Produtos</Link>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-icon-button premium-icon-button"
              onClick={() => setBuscaAberta((valor) => !valor)}
              aria-label={buscaAberta ? "Fechar pesquisa" : "Pesquisar produtos"}
              aria-expanded={buscaAberta}
            >
              {buscaAberta ? <X /> : <Search />}
            </button>
            <a
              href={`https://wa.me/${CONTATO.whatsappNumero}`}
              target="_blank"
              rel="noreferrer"
              className="header-whatsapp-link"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>Atendimento</span>
            </a>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {buscaAberta ? (
            <motion.div
              className="search-drawer premium-search-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24 }}
            >
              <form action="/buscar" className="page-container search-form">
                <Search aria-hidden="true" />
                <input name="q" type="search" placeholder="O que você procura?" autoFocus required />
                <button type="submit">Buscar</button>
              </form>
            </motion.div>
          ) : null}

          {menuAberto ? (
            <motion.nav
              className="mobile-nav premium-mobile-nav"
              aria-label="Navegação mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" onClick={fechar} className={secao === "inicio" ? "catalog-nav-active" : undefined} aria-current={secao === "inicio" ? "location" : undefined}>Início</Link>
              <Link href="/#novidades" onClick={fechar} className={secao === "novidades" ? "catalog-nav-active" : undefined} aria-current={secao === "novidades" ? "location" : undefined}>Novidades</Link>
              <Link href="/#colecoes" onClick={fechar} className={secao === "colecoes" ? "catalog-nav-active" : undefined} aria-current={secao === "colecoes" ? "location" : undefined}>Coleções</Link>
              <Link href="/buscar" onClick={fechar} className={secao === "produtos" ? "catalog-nav-active" : undefined} aria-current={secao === "produtos" ? "location" : undefined}>Produtos</Link>
              <a href={CONTATO.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">Grupo VIP</a>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
