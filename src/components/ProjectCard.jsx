function ProjectCard({ title, description, link, featured }) {
  return (
    <article className={`project-card ${featured ? "featured" : ""}`}>
      {featured && <span className="badge">Featured</span>}
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noreferrer">
        View project
      </a>
    </article>
  );
}

export default ProjectCard;
