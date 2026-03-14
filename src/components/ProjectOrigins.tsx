import { Icon } from "@iconify/react";
import type { Copy } from "../data";

type ProjectOriginsProps = {
  title: string;
  timeline: Copy["timeline"];
};

export function ProjectOrigins({ title, timeline }: ProjectOriginsProps) {
  return (
    <section className="timeline">
      <h2 className="section-title">{title}</h2>
      {timeline.map((project) => (
        <a key={project.name} className="project" href={project.url} target="_blank" rel="noreferrer">
          <Icon icon="fa6-solid:code-branch" />
          <div>
            <h3>{project.name}</h3>
            <p>{project.desc}</p>
          </div>
        </a>
      ))}
    </section>
  );
}
