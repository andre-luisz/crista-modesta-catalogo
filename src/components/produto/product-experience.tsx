"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Heart,
  PackageCheck,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { SmartImage } from "@/components/shared/smart-image";
import { criarLinkWhatsApp } from "@/lib/constants/contato";
import type { CatalogoProdutoDetalhe } from "@/types/catalogo";

function moeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function ProductExperience({
  produto,
}: {
  produto: CatalogoProdutoDetalhe;
}) {
  const corInicial =
    produto.cores.find((cor) => cor.principal) ??
    produto.cores[0] ??
    null;

  const [corId, setCorId] = useState(corInicial?.id ?? null);
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [lightboxAberto, setLightboxAberto] = useState(false);
  const [corTrocando, setCorTrocando] = useState(false);
  const [favoritoVisual, setFavoritoVisual] = useState(false);
  const reduzirMovimento = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const corAtual =
    produto.cores.find((cor) => cor.id === corId) ?? corInicial;

  const imagens = useMemo(() => {
    const especificas = corAtual?.imagens ?? [];
    const combinadas =
      especificas.length > 0
        ? [...especificas, ...produto.imagensGerais]
        : produto.imagensGerais;

    return combinadas.filter(
      (imagem, indice, lista) =>
        lista.findIndex((item) => item.id === imagem.id) === indice,
    );
  }, [corAtual, produto.imagensGerais]);

  const tamanhosDisponiveis = useMemo(
    () => (corAtual?.tamanhos ?? []).filter((item) => item.disponivel),
    [corAtual],
  );

  const tamanhoSelecionado = tamanhosDisponiveis.find(
    (item) => item.tamanho === tamanho,
  );

  const preco =
    tamanhoSelecionado?.preco ||
    corAtual?.precoMinimo ||
    produto.precoMinimo;

  const selecionarImagem = useCallback(
    (indice: number) => {
      setIndiceImagem(indice);
      emblaApi?.scrollTo(indice);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const atualizarIndice = () =>
      setIndiceImagem(emblaApi.selectedScrollSnap());

    atualizarIndice();
    emblaApi.on("select", atualizarIndice);

    return () => {
      emblaApi.off("select", atualizarIndice);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
  }, [corId, imagens.length, emblaApi]);

  function selecionarCor(id: string) {
    if (id === corId) return;

    setCorTrocando(true);
    setIndiceImagem(0);
    setCorId(id);
    setTamanho(null);

    window.setTimeout(
      () => setCorTrocando(false),
      reduzirMovimento ? 0 : 260,
    );
  }

  function abrirLightbox(indice: number) {
    setIndiceImagem(indice);
    setLightboxAberto(true);
  }

  function navegarImagem(direcao: "anterior" | "proxima") {
    if (!emblaApi) return;

    if (direcao === "anterior") {
      emblaApi.scrollPrev();
    } else {
      emblaApi.scrollNext();
    }
  }

  const mensagem = [
    `Olá! Tenho interesse em ${produto.nome}.`,
    produto.codigo ? `Código: ${produto.codigo}.` : null,
    corAtual ? `Cor: ${corAtual.nome}.` : null,
    tamanho ? `Tamanho: ${tamanho}.` : null,
    `Valor: ${moeda(preco)}.`,
    "Vi a peça no catálogo da Cristã Modesta.",
  ]
    .filter(Boolean)
    .join("\n");

  async function compartilhar() {
    const dados = {
      title: produto.nome,
      text: `Veja ${produto.nome} na Cristã Modesta`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(dados);
        toast.success("Produto compartilhado.", {
          id: "produto-compartilhado",
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado.", {
        id: "produto-link-copiado",
      });
    } catch {
      // Cancelar o compartilhamento nativo não deve gerar erro visível.
    }
  }

  function alternarFavoritoVisual() {
    setFavoritoVisual((atual) => !atual);
    toast.success(
      favoritoVisual
        ? "Peça removida dos seus favoritos."
        : "Peça salva para você lembrar.",
      { id: "favorito-visual" },
    );
  }

  return (
    <div className="zara-product-layout">
      <section
        className={`zara-product-gallery ${
          corTrocando ? "is-changing" : ""
        }`}
        aria-label={`Galeria de ${produto.nome}`}
      >
        {imagens.length > 0 ? (
          <>
            <div className="zara-desktop-gallery">
              {imagens.map((imagem, indice) => (
                <button
                  type="button"
                  className="zara-desktop-image"
                  key={imagem.id}
                  onClick={() => abrirLightbox(indice)}
                  aria-label={`Ampliar imagem ${indice + 1} de ${produto.nome}`}
                >
                  <SmartImage
                    src={imagem.url}
                    alt={`${produto.nome} - imagem ${indice + 1}`}
                    fill
                    priority={indice < 2}
                    quality={92}
                    sizes="(max-width: 1100px) 100vw, 38vw"
                    containerClassName="zara-desktop-image-smart"
                    imageClassName="zara-desktop-image-element"
                  />

                  <span className="zara-image-number">
                    {String(indice + 1).padStart(2, "0")}
                  </span>

                  <span className="zara-image-expand">
                    <Expand size={16} aria-hidden="true" />
                    Ampliar
                  </span>
                </button>
              ))}
            </div>

            <div className="zara-mobile-gallery">
              <motion.div
                key={corId ?? "geral"}
                className="zara-mobile-viewport"
                ref={emblaRef}
                initial={
                  reduzirMovimento
                    ? false
                    : { opacity: 0.75, scale: 0.995 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduzirMovimento ? 0 : 0.3 }}
              >
                <div className="zara-mobile-container">
                  {imagens.map((imagem, indice) => (
                    <div className="zara-mobile-slide" key={imagem.id}>
                      <button
                        type="button"
                        className="zara-mobile-image-button"
                        onClick={() => abrirLightbox(indice)}
                        aria-label={`Ampliar imagem ${indice + 1}`}
                      >
                        <SmartImage
                          src={imagem.url}
                          alt={`${produto.nome} - imagem ${indice + 1}`}
                          fill
                          priority={indice === 0}
                          quality={92}
                          sizes="100vw"
                          containerClassName="zara-mobile-image-smart"
                          imageClassName="zara-mobile-image-element"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {imagens.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="zara-gallery-arrow previous"
                    onClick={() => navegarImagem("anterior")}
                    disabled={indiceImagem === 0}
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="zara-gallery-arrow next"
                    onClick={() => navegarImagem("proxima")}
                    disabled={indiceImagem === imagens.length - 1}
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>

                  <div className="zara-mobile-counter">
                    {indiceImagem + 1} / {imagens.length}
                  </div>

                  <div className="zara-mobile-thumbnails">
                    {imagens.map((imagem, indice) => (
                      <button
                        key={imagem.id}
                        type="button"
                        className={
                          indice === indiceImagem ? "active" : ""
                        }
                        onClick={() => selecionarImagem(indice)}
                        aria-label={`Selecionar imagem ${indice + 1}`}
                      >
                        <SmartImage
                          src={imagem.url}
                          alt=""
                          fill
                          quality={82}
                          sizes="72px"
                          containerClassName="zara-mobile-thumbnail-smart"
                          imageClassName="zara-mobile-thumbnail-image"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : (
          <div className="zara-product-no-image">
            <Sparkles aria-hidden="true" />
            <span>Imagem em breve</span>
          </div>
        )}
      </section>

      <motion.aside
        className="zara-product-panel"
        initial={reduzirMovimento ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduzirMovimento ? 0 : 0.45,
          ease: "easeOut",
        }}
      >
        <div className="zara-product-panel-inner">
          <div className="zara-product-topline">
            <p className="zara-product-category">
              {produto.categoriaNome ?? "Coleção Cristã Modesta"}
            </p>

            <button
              type="button"
              className={`zara-favorite-button ${
                favoritoVisual ? "active" : ""
              }`}
              onClick={alternarFavoritoVisual}
              aria-label={
                favoritoVisual
                  ? "Remover dos favoritos"
                  : "Salvar nos favoritos"
              }
            >
              <Heart
                size={19}
                fill={favoritoVisual ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </button>
          </div>

          <h1>{produto.nome}</h1>

          <div className="zara-product-price">
            {produto.possuiPrecosDiferentes &&
            !tamanhoSelecionado ? (
              <small>A partir de</small>
            ) : null}
            <strong>{moeda(preco)}</strong>
          </div>

          {produto.codigo ? (
            <p className="zara-product-code">
              Ref. {produto.codigo}
            </p>
          ) : null}

          <div className="zara-stock-message">
            <PackageCheck aria-hidden="true" />
            <div>
              <strong>Disponível para pronta entrega</strong>
              <span>
                Somente cores e tamanhos com estoque aparecem aqui.
              </span>
            </div>
          </div>

          {produto.cores.length > 0 ? (
            <div className="zara-option-group">
              <div className="zara-option-heading">
                <span>Cor</span>
                <strong>{corAtual?.nome}</strong>
              </div>

              <div className="zara-color-options">
                {produto.cores.map((cor) => (
                  <button
                    key={cor.id}
                    type="button"
                    onClick={() => selecionarCor(cor.id)}
                    className={
                      cor.id === corAtual?.id ? "active" : ""
                    }
                    disabled={corTrocando}
                    aria-label={`Selecionar cor ${cor.nome}`}
                    title={cor.nome}
                  >
                    <span
                      style={{
                        backgroundColor:
                          cor.codigoHex || undefined,
                      }}
                    >
                      {!cor.codigoHex
                        ? cor.nome.slice(0, 1).toUpperCase()
                        : null}
                    </span>
                    <small>{cor.nome}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {tamanhosDisponiveis.length > 0 ? (
            <div className="zara-option-group">
              <div className="zara-option-heading">
                <span>Tamanho</span>
                <strong>{tamanho ?? "Selecione"}</strong>
              </div>

              <div className="zara-size-options">
                {tamanhosDisponiveis.map((item) => (
                  <button
                    key={item.variacaoId}
                    type="button"
                    onClick={() => setTamanho(item.tamanho)}
                    className={
                      item.tamanho === tamanho ? "active" : ""
                    }
                    aria-pressed={item.tamanho === tamanho}
                  >
                    {item.tamanho}
                    {item.tamanho === tamanho ? (
                      <Check size={13} aria-hidden="true" />
                    ) : null}
                  </button>
                ))}
              </div>

              {!tamanho ? (
                <p className="zara-size-help">
                  Selecione o tamanho para agilizar seu atendimento.
                </p>
              ) : null}
            </div>
          ) : null}

          <a
            className="zara-whatsapp-cta"
            href={criarLinkWhatsApp(mensagem)}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp aria-hidden="true" />
            <span>
              <strong>Tenho interesse</strong>
              <small>Falar com a Cristã Modesta</small>
            </span>
          </a>

          <button
            className="zara-share-button"
            type="button"
            onClick={compartilhar}
          >
            <Share2 aria-hidden="true" />
            Compartilhar esta peça
          </button>

          {produto.descricao ? (
            <details className="zara-product-accordion" open>
              <summary>Detalhes da peça</summary>
              <div>
                <p>{produto.descricao}</p>
              </div>
            </details>
          ) : null}

          <details className="zara-product-accordion">
            <summary>Atendimento e disponibilidade</summary>
            <div className="zara-assurance-list">
              <p>
                <ShieldCheck aria-hidden="true" />
                <span>
                  <strong>Disponibilidade real</strong>
                  Apenas variações disponíveis são exibidas.
                </span>
              </p>
              <p>
                <FaWhatsapp aria-hidden="true" />
                <span>
                  <strong>Atendimento humanizado</strong>
                  Tire suas dúvidas diretamente com a loja.
                </span>
              </p>
            </div>
          </details>

          <blockquote className="zara-product-purpose">
            “Tudo seja feito para a glória de Deus.”
            <cite>1 Coríntios 10:31</cite>
          </blockquote>
        </div>
      </motion.aside>

      <div className="zara-mobile-action-bar">
        <div>
          <small>
            {produto.possuiPrecosDiferentes &&
            !tamanhoSelecionado
              ? "A partir de"
              : "Valor"}
          </small>
          <strong>{moeda(preco)}</strong>
        </div>

        <a
          href={criarLinkWhatsApp(mensagem)}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
          Tenho interesse
        </a>
      </div>

      <Lightbox
        open={lightboxAberto}
        close={() => setLightboxAberto(false)}
        index={indiceImagem}
        slides={imagens.map((imagem) => ({
          src: imagem.url,
          alt: produto.nome,
        }))}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: imagens.length <= 1 }}
      />
    </div>
  );
}
