import { BadgeCheck, MessageCircleHeart, Sparkles } from "lucide-react";

const beneficios = [
  {
    titulo: "Atendimento pessoal",
    texto: "Fale diretamente com a loja e tire suas dúvidas antes de escolher.",
    Icone: MessageCircleHeart,
  },
  {
    titulo: "Disponibilidade real",
    texto: "O catálogo mostra somente peças que possuem estoque disponível.",
    Icone: BadgeCheck,
  },
  {
    titulo: "Novidades no VIP",
    texto: "Participe do grupo e receba lançamentos e condições especiais.",
    Icone: Sparkles,
  },
];

export function Benefits() {
  return (
    <section className="benefits page-container">
      {beneficios.map(({ titulo, texto, Icone }) => (
        <article key={titulo} className="benefit-card">
          <span className="benefit-icon">
            <Icone size={20} aria-hidden="true" />
          </span>
          <div>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
