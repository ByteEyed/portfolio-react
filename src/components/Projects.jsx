import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const FEATURED_REPOS = [
  "portfolio-v1",
  "Spirits-Of-Bombay-main",
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/ByteEyed/repos"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        const curated = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description || "No description provided.",
            link: repo.html_url,
            featured: FEATURED_REPOS.includes(repo.name),
          }))
          .sort((a, b) => b.featured - a.featured)
          .slice(0, 6);

        setProjects(curated);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects">
      <h2>Projects</h2>

      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}

      <div className="projects-grid">
        {!loading &&
          !error &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              featured={project.featured}
            />
          ))}
      </div>
    </section>
  );
}

export default Projects;