import { containerVariants } from "@/lib/constants";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import { ProjectCard } from "../project-card";

type Props = {
  projects: Project[];
};

export function Projects({ projects }: Props) {
  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'>
      {projects.map((project, idx) => (
        <ProjectCard
          key={idx}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDeleted={project?.isDeleted}
          slideData={project?.slides}
          src={
            project.thumbnail ||
            "https://images.unsplash.com/photo-1740094714220-1b0c181be46d?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      ))}
    </motion.div>
  );
}
