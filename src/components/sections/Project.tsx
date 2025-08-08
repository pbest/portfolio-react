import React from 'react';
import styled from 'styled-components';
import StickySection from '../ui/StickySection';

const ProjectContent = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProjectNumber = styled.span`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

const ProjectTitle = styled.h3`
  font-size: 4rem;
  margin: 0;
  font-weight: 600;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1.5rem;
  margin: 0;
  max-width: 800px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

interface ProjectProps {
  title: string;
  description: string;
  index: number;
  total: number;
}

const Project: React.FC<ProjectProps> = ({ title, description, index, total }) => {
  return (
    <StickySection index={index} total={total}>
      <ProjectContent>
        <ProjectNumber>{`${index + 1}/${total}`}</ProjectNumber>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
      </ProjectContent>
    </StickySection>
  );
};

export default Project; 