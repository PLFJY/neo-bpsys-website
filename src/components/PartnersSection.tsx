import { Icon } from "@iconify/react";
import type { Partner } from "../data";

type PartnersSectionProps = {
  title: string;
  partners: Partner[];
  websiteLabel: string;
};

function renderDescription(description: string) {
  const lines = description
    .split(/\n|<br\s*\/?>|<\/br>/gi)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export function PartnersSection({ title, partners, websiteLabel }: PartnersSectionProps) {
  if (partners.length === 0) return null;

  return (
    <section className="contributors">
      <h2 className="section-title">{title}</h2>
      <div className="contributors-grid">
        {partners.map((partner) => (
          <div key={partner.name} className="contributor-item">
            <img className="contributor-avatar" src={partner.avatar} alt={partner.name} loading="lazy" />
            <div className="contributor-name">{partner.name}</div>
            <div className="contributor-contribution">{renderDescription(partner.description)}</div>
            {partner.link && (
              <a href={partner.link} target="_blank" rel="noreferrer" className="contributor-link">
                <Icon icon="fa6-solid:link" />
                {websiteLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
