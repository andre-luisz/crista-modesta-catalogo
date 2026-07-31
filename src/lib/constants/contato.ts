export const CONTATO = {
  whatsappNumero: "5589994036045",
  whatsappExibicao: "(89) 99403-6045",
  grupoVip: "https://chat.whatsapp.com/Eiw9okH9X5w6ZBb3tQnZVh?mode=hqctswa&fbclid=PAT01DUATZtD5leHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaedeIOPVBytuUUAUWMKsUekQM-B1In8fdCcuOdAwC6wXIwnJao9HaojAIHo6g_aem_xrNJklrievE6HB_LTjJZkA",
  instagramUsuario: "@_cristamodesta",
  instagram: "https://www.instagram.com/_cristamodesta?igsh=MTM0OGN5MXBiNXZiaA==",
} as const;

export function criarLinkWhatsApp(mensagem: string) {
  return `https://wa.me/${CONTATO.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}
