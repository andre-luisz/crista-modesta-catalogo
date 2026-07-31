"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { CONTATO } from "@/lib/constants/contato";

export function SiteHeader() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);

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
            <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">
              Grupo VIP
            </a>
            <a href={CONTATO.instagram} target="_blank" rel="noreferrer">
              <FaInstagram aria-hidden="true" />
              {CONTATO.instagramUsuario}
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="page-container header-content">
          <button
            type="button"
            className="header-icon-button mobile-only"
            onClick={() => setMenuAberto((valor) => !valor)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
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
            <Link href="/">Início</Link>
            <Link href="/#novidades">Novidades</Link>
            <Link href="/#colecoes">Coleções</Link>
            <Link href="/#produtos">Produtos</Link>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-icon-button"
              onClick={() => setBuscaAberta((valor) => !valor)}
              aria-label="Pesquisar produtos"
            >
              <Search />
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

        {buscaAberta ? (
          <div className="search-drawer">
            <form action="/buscar" className="page-container search-form">
              <Search aria-hidden="true" />
              <input
                name="q"
                type="search"
                placeholder="O que você procura?"
                autoFocus
                required
              />
              <button type="submit">Buscar</button>
            </form>
          </div>
        ) : null}

        {menuAberto ? (
          <nav className="mobile-nav" aria-label="Navegação mobile">
            <Link href="/" onClick={fechar}>Início</Link>
            <Link href="/#novidades" onClick={fechar}>Novidades</Link>
            <Link href="/#colecoes" onClick={fechar}>Coleções</Link>
            <Link href="/#produtos" onClick={fechar}>Produtos</Link>
            <a href={CONTATO.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">Grupo VIP</a>
          </nav>
        ) : null}
      </header>
    </>
  );
}
