import { Icon } from "@iconify/react";
import type { Copy } from "../data";

type LeadDeveloperProps = {
  title: string;
  authorName: string;
  authorRole: string;
  authorDesc: string;
  authorLinks: Copy["authorLinks"];
};

export function LeadDeveloper({
  title,
  authorName,
  authorRole,
  authorDesc,
  authorLinks,
}: LeadDeveloperProps) {
  return (
    <section className="author-section">
      <h2 className="section-title">{title}</h2>
      <div className="author-card acrylic">
        <div className="author-header">
          <img src="/plfjy.png" alt="作者头像" className="author-avatar" />
          <h2 className="author-name">{authorName}</h2>
          <p className="author-title">{authorRole}</p>
        </div>

        <p>{authorDesc}</p>

        <div className="author-links">
          <a target="_blank" rel="noreferrer" href="https://plfjy.top/" className="author-link">
            <Icon icon="fa6-solid:house" />
            {authorLinks.home}
          </a>
          <a target="_blank" rel="noreferrer" href="https://blog.plfjy.top/" className="author-link">
            <Icon icon="fa6-solid:blog" />
            {authorLinks.blog}
          </a>
          <a target="_blank" rel="noreferrer" href="https://space.bilibili.com/453909624/" className="author-link">
            <Icon icon="fa6-brands:bilibili" />
            {authorLinks.bilibili}
          </a>
          <a target="_blank" rel="noreferrer" href="https://github.com/PLFJY/" className="author-link">
            <Icon icon="fa6-brands:github" />
            {authorLinks.github}
          </a>
        </div>
      </div>
    </section>
  );
}
