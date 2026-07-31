"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Expand, Share2 } from "lucide-react";
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
    produto.cores.find((cor) => cor.principal) ?? produto.cores[0] ?? null;

  const [corId, setCorId] = useState(corInicial?.id ?? null);
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [lightboxAberto, setLightboxAberto] = useState(false);
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

  const tamanhoSelecionado = corAtual?.tamanhos.find(
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

    const atualizarIndice = () => setIndiceImagem(emblaApi.selectedScrollSnap());
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
    setIndiceImagem(0);
    setCorId(id);
    setTamanho(null);
  }

  const mensagem = [
    `Olá! Tenho interesse em ${produto.nome}.`,
    produto.codigo ? `Código: ${produto.codigo}.` : null,
    corAtual ? `Cor: ${corAtual.nome}.` : null,
    tamanho ? `Tamanho: ${tamanho}.` : null,
    `Valor: ${moeda(preco)}.`,
  ]
    .filter(Boolean)
    .join("\n");

  async function compartilhar() {
    const dados = {
      title: produto.nome,
      text: `Veja ${produto.nome} na Cristã Modesta`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(dados);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="product-page-layout">
      <section className="product-gallery-section">
        {imagens.length > 0 ? (
          <>
            <div className="product-gallery-viewport" ref={emblaRef}>
              <div className="product-gallery-container">
                {imagens.map((imagem, indice) => (
                  <div className="product-gallery-slide" key={imagem.id}>
                    <button
                      type="button"
                      className="product-main-image-button"
                      onClick={() => {
                        setIndiceImagem(indice);
                        setLightboxAberto(true);
                      }}
                      aria-label={`Ampliar imagem ${indice + 1}`}
                    >
                      <SmartImage
                        src={imagem.url}
                        alt={`${produto.nome} - imagem ${indice + 1}`}
                        fill
                        priority={indice === 0}
                        quality={92}
                        sizes="(max-width: 1000px) 100vw, 58vw"
                        containerClassName="product-main-image-smart"
                        imageClassName="product-main-image-element"
                      />
                      <span className="product-zoom-label">
                        <Expand aria-hidden="true" />
                        Ampliar
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {imagens.length > 1 ? (
              <>
                <div className="product-gallery-dots" aria-label="Imagens do produto">
                  {imagens.map((imagem, indice) => (
                    <button
                      key={imagem.id}
                      type="button"
                      className={indice === indiceImagem ? "active" : ""}
                      onClick={() => selecionarImagem(indice)}
                      aria-label={`Ir para imagem ${indice + 1}`}
                    />
                  ))}
                </div>

                <div className="product-thumbnails">
                  {imagens.map((imagem, indice) => (
                    <button
                      key={imagem.id}
                      type="button"
                      className={indice === indiceImagem ? "active" : ""}
                      onClick={() => selecionarImagem(indice)}
                      aria-label={`Selecionar imagem ${indice + 1}`}
                    >
                      <SmartImage
                        src={imagem.url}
                        alt=""
                        fill
                        quality={82}
                        sizes="100px"
                        containerClassName="product-thumbnail-smart"
                        imageClassName="product-thumbnail-image"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className="product-no-image">Imagem em breve</div>
        )}
      </section>

      <aside className="product-details-panel">
        <p className="product-breadcrumb">
          {produto.categoriaNome ?? "Coleção Cristã Modesta"}
        </p>
        <h1>{produto.nome}</h1>

        <div className="product-detail-price">
          {produto.possuiPrecosDiferentes && !tamanhoSelecionado ? (
            <small>A partir de</small>
          ) : null}
          <strong>{moeda(preco)}</strong>
        </div>

        {produto.codigo ? (
          <p className="product-code">Código {produto.codigo}</p>
        ) : null}

        {produto.cores.length > 0 ? (
          <div className="product-option-group">
            <div className="option-heading">
              <span>Cor</span>
              <strong>{corAtual?.nome}</strong>
            </div>
            <div className="color-options">
              {produto.cores.map((cor) => (
                <button
                  key={cor.id}
                  type="button"
                  onClick={() => selecionarCor(cor.id)}
                  className={cor.id === corAtual?.id ? "active" : ""}
                  aria-label={`Selecionar cor ${cor.nome}`}
                >
                  <span style={{ backgroundColor: cor.codigoHex || undefined }}>
                    {!cor.codigoHex ? cor.nome.slice(0, 1) : null}
                  </span>
                  <small>{cor.nome}</small>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {corAtual?.tamanhos.length ? (
          <div className="product-option-group">
            <div className="option-heading">
              <span>Tamanho</span>
              <strong>{tamanho ?? "Escolha"}</strong>
            </div>
            <div className="size-options">
              {corAtual.tamanhos.map((item) => (
                <button
                  key={item.variacaoId}
                  type="button"
                  onClick={() => setTamanho(item.tamanho)}
                  className={item.tamanho === tamanho ? "active" : ""}
                >
                  {item.tamanho}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <a
          className="product-whatsapp-cta"
          href={criarLinkWhatsApp(mensagem)}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
          Tenho interesse
        </a>

        <button
          className="product-share-button"
          type="button"
          onClick={compartilhar}
        >
          <Share2 aria-hidden="true" />
          Compartilhar produto
        </button>

        {produto.descricao ? (
          <div className="product-description">
            <h2>Sobre esta peça</h2>
            <p>{produto.descricao}</p>
          </div>
        ) : null}

        <div className="product-assurances">
          <p>
            <strong>Disponibilidade real</strong>
            <span>Somente variações em estoque são exibidas.</span>
          </p>
          <p>
            <strong>Atendimento personalizado</strong>
            <span>Fale diretamente com a Cristã Modesta.</span>
          </p>
        </div>
      </aside>

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
