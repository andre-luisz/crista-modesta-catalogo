import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Sparkles } from "lucide-react";

import { CONTATO } from "@/lib/constants/contato";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <Image
            src="/brand/logo-crista-modesta.png"
            alt="Cristã Modesta"
            width={210}
            height={115}
            className="footer-logo"
          />
          <p className="footer-text">
            Moda feminina escolhida com cuidado para mulheres que valorizam
            elegância, conforto e propósito.
          </p>
        </div>

        <div>
          <p className="footer-title">Atendimento</p>
          <a href={`https://wa.me/${CONTATO.whatsappNumero}`} target="_blank" rel="noreferrer">
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
          <span>Receba novidades e lançamentos primeiro.</span>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Cristã Modesta. Todos os direitos reservados.
      </div>
    </footer>
  );
}
