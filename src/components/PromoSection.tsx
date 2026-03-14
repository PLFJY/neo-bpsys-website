import type { PromoEmbed } from "../data";

type PromoSectionProps = {
  promo: PromoEmbed | null;
};

export function PromoSection({ promo }: PromoSectionProps) {
  if (!promo || !promo.embedHtml.trim()) return null;

  return (
    <section className="promo-section">
      <h2 className="section-title">{promo.title}</h2>
      <div className="promo-card">
        <div className="promo-embed" dangerouslySetInnerHTML={{ __html: promo.embedHtml }} />
      </div>
    </section>
  );
}
