import { Icon } from "@iconify/react";
import type { Contributor } from "../data";

type ContributorsSectionProps = {
  title: string;
  contributors: Contributor[];
};

export function ContributorsSection({ title, contributors }: ContributorsSectionProps) {
  return (
    <section className="contributors">
      <h2 className="section-title">{title}</h2>
      <div className="contributors-grid">
        {contributors.map((contributor) => (
          <div key={contributor.name} className="contributor-item">
            <img className="contributor-avatar" src={contributor.avatar} alt={contributor.name} loading="lazy" />
            <div className="contributor-name">{contributor.name}</div>
            <div className="contributor-contribution">{contributor.contribution}</div>
            {contributor.link && (
              <a href={contributor.link} target="_blank" rel="noreferrer" className="contributor-link">
                <Icon icon="fa6-brands:github" />
                GitHub
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
