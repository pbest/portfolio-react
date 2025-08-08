import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem 1rem;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 900px;
  border-radius: 1.25rem;
  object-fit: cover;
  margin-bottom: 1.5rem;
  background: #eee;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-family: 'DM Serif Display', serif;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.3rem;
  color: #666;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const ContextBar = styled.div`
  background: #f7f7f7;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2.5rem;
  font-size: 1rem;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Section = styled.section<{ highlight?: boolean }>`
  margin-bottom: 2.5rem;
  ${(props) =>
    props.highlight &&
    css`
      background: #eafaf1;
      border-left: 4px solid #4ecb71;
      border-radius: 0.5rem;
      padding: 1.25rem 1.5rem;
      color: #1a6c3a;
    `}
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ChallengeBox = styled.div`
  background: #fff6e6;
  border-left: 4px solid #f7b267;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
  color: #7a4c00;
  font-size: 1.08rem;
`;

const BulletList = styled.ul`
  margin: 0 0 1.5rem 1.5rem;
  padding: 0;
  color: #444;
  font-size: 1.08rem;
`;

const Outcome = styled.div`
  background: #eafaf1;
  border-left: 4px solid #4ecb71;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
  color: #1a6c3a;
  font-size: 1.08rem;
`;

const Reflections = styled.div`
  background: #f5f7fa;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  color: #333;
  font-size: 1.08rem;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;

const NavButton = styled.button`
  background: #f5f5f5;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 2rem;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.18s, border 0.18s;
  &:hover {
    background: #e6e6e6;
    border: 1px solid #bbb;
  }
`;

export interface CaseStudySection {
  title: string;
  content: React.ReactNode;
  highlight?: boolean;
}

export interface CaseStudyTemplateProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  context?: React.ReactNode;
  sections: CaseStudySection[];
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
}

const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({
  title,
  subtitle,
  heroImage = 'https://placehold.co/900x320?text=Case+Study+Hero',
  context,
  sections,
  onBack,
  onNext,
  backLabel = 'Back to Work',
  nextLabel = 'Next Case',
}) => (
  <Container>
    <Hero>
      {heroImage && <HeroImage src={heroImage} alt={title + ' hero'} />}
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Hero>
    {context && <ContextBar>{context}</ContextBar>}
    {sections.map((section, i) => (
      <Section key={i} highlight={section.highlight}>
        <SectionTitle>{section.title}</SectionTitle>
        <div>{section.content}</div>
      </Section>
    ))}
    <NavRow>
      {onBack && <NavButton onClick={onBack}>{backLabel}</NavButton>}
      {onNext && <NavButton onClick={onNext}>{nextLabel}</NavButton>}
    </NavRow>
  </Container>
);

export default CaseStudyTemplate; 