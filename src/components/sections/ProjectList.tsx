import React from 'react';
import Project from './Project';
import MadlibStickyCard from './MadlibStickyCard';

interface ProjectData {
  id: string;
  title: string;
  description: string;
}

interface ProjectListProps {
  projects: ProjectData[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const total = projects.length + 1; // +1 for the madlib card
  return (
    <>
      <MadlibStickyCard index={0} total={total} />
      {projects.map((project, index) => (
        <Project
          key={project.id}
          title={project.title}
          description={project.description}
          index={index + 1}
          total={total}
        />
      ))}
    </>
  );
};

export default ProjectList; 