import Image from "next/image";
import { Cross, Sparkles } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { CONTATO } from "@/lib/constants/contato";

export function SiteFooter() {
  return (
    <footer className="site-footer refined-footer">
      <div className="page-container footer-devotional">
        <div className="footer-mark-wrap">
          <Image
            src="/brand/icon-crista-modesta.png"
            alt="Símbolo da Cristã Modesta"
            width={164}
            height={164}
            className="footer-round-logo"
          />
        </div>

        <span className="footer-faith-kicker">
          <Cross size={14} aria-hidden="true" />
          Fé · Modéstia · Propósito
        </span>

        <h2>Cristã Modesta</h2>
        <p className="footer-devotional-copy">
          Uma marca criada para servir mulheres com beleza, cuidado e
          excelência — reconhecendo que toda honra e toda glória pertencem a
          Deus.
        </p>
        <blockquote>
          “Tudo seja feito para a glória de Deus.”
          <cite>1 Coríntios 10:31</cite>
        </blockquote>
      </div>

      <div className="page-container footer-links-grid">
        <div>
          <p className="footer-title">Atendimento</p>
          <a
            href={`https://wa.me/${CONTATO.whatsappNumero}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={17} aria-hidden="true" />
            WhatsApp {CONTATO.whatsappExibicao}
          </a>
          <a href={CONTATO.instagram} target="_blank" rel="noreferrer">
            <FaInstagram size={17} aria-hidden="true" />
            Instagram {CONTATO.instagramUsuario}
          </a>
        </div>

        <div>
          <p className="footer-title">Exclusividades</p>
          <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">
            <Sparkles size={17} aria-hidden="true" />
            Entrar no grupo VIP
          </a>
          <span>Novidades e reposições em primeira mão.</span>
        </div>

        <div>
          <p className="footer-title">Nossa essência</p>
          <span>Elegância sem abrir mão da fé.</span>
          <span>Modéstia com feminilidade.</span>
          <span>Excelência em cada detalhe.</span>
        </div>
      </div>

      <div className="footer-bottom refined-footer-bottom">
        <span>
          © {new Date().getFullYear()} Cristã Modesta. Todos os direitos
          reservados.
        </span>
        <span>Jesus é o centro do nosso propósito.</span>
      </div>
    </footer>
  );
}
