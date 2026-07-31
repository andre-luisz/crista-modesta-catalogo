import { FaWhatsapp } from "react-icons/fa";

import { criarLinkWhatsApp } from "@/lib/constants/contato";

export function FloatingWhatsApp() {
  const mensagem =
    "Olá! Vim pelo catálogo da Cristã Modesta e gostaria de atendimento.";

  return (
    <a
      className="floating-whatsapp"
      href={criarLinkWhatsApp(mensagem)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Cristã Modesta pelo WhatsApp"
    >
      <FaWhatsapp size={20} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
