import React from 'react';
import styled from 'styled-components';

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem 1rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Narrative = styled.div`
  font-size: 1.13rem;
  color: #333;
  line-height: 1.7;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Photo = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  margin-bottom: 1rem;
`;

const ResumeButton = styled.a`
  background: #fff;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 2rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: background 0.18s, border 0.18s;
  &:hover {
    background: #f5f5f5;
    border: 1px solid #bbb;
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><text y="16" font-size="16">↗️</text></svg>'), auto;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #444;
  font-size: 1.3rem;
  text-decoration: none;
  &:hover {
    color: #222;
    text-decoration: underline;
  }
`;

const About = () => (
  <AboutGrid>
    <Narrative>
      <SectionTitle>About Me</SectionTitle>
      <p>
        I started my career studying urban planning and finance — disciplines rooted in structure, behavior, and long-term outcomes. That foundation still shapes how I approach product design: as a balance of human need, system constraints, and craft.
      </p>
      <p>
        Over the past 14+ years, I've designed for newspapers, agencies, and platforms. I've led teams through moments of high ambiguity and built systems that scale clarity, quality, and experimentation. I've helped launch new formats, grow product teams, and ship things that stick.
      </p>
      <p>
        What connects it all? A love of designing for discovery — moments when a product reveals something timely, useful, or surprising to someone who didn't know they were looking for it.
      </p>
      <SectionTitle>How I Lead</SectionTitle>
      <ul>
        <li>Being a builder — not just of products, but of rituals, roles, and safe environments.</li>
        <li>Saying no with clarity and yes with intention.</li>
        <li>Staying close to the work when it matters most — and getting out of the way when it doesn't.</li>
        <li>Protecting craft while aligning to outcomes.</li>
      </ul>
      <p>
        My goal is to create teams where thoughtful design can thrive and where people feel empowered to take smart risks.
      </p>
      <SectionTitle>Outside of Work</SectionTitle>
      <p>
        I'm based in New York City, where I live with my partner. I'm an amateur archivist, a former dancer's partner, and someone who cares deeply about making complex things feel generous and intuitive.
      </p>
    </Narrative>
    <RightCol>
      <Photo src="https://placehold.co/180x180?text=Paul+Best" alt="Paul Best" />
              <ResumeButton href="/resume-PaulBest.pdf" target="_blank" rel="noopener noreferrer">Download Resume</ResumeButton>
      <SocialLinks>
        <SocialLink href="mailto:hello@paul.best" title="Email">✉️</SocialLink>
        <SocialLink href="https://www.linkedin.com/in/paulbest/" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</SocialLink>
        <SocialLink href="https://www.instagram.com/paulbest/" target="_blank" rel="noopener noreferrer" title="Instagram">IG</SocialLink>
      </SocialLinks>
    </RightCol>
  </AboutGrid>
);

export default About; 