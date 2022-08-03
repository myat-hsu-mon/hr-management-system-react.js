import ProjectCard from "components/ProjectCard";
import NoResultFound from "shared/NoResultFound";

export default function Projects({ projects }) {
  if (!projects.length)
    return <NoResultFound text="No Projects Found!" className="mt-16" />;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {projects.map((project, index) => (
        <ProjectCard {...project} key={index} />
      ))}
    </div>
  );
}
