import React from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: 'DM Serif Display', serif;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const DownloadButton = styled.a`
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
  margin-bottom: 2rem;
  display: inline-block;
  &:hover {
    background: #f5f5f5;
    border: 1px solid #bbb;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ResumeBody = styled.div`
  font-size: 1.08rem;
  color: #333;
  line-height: 1.7;
`;

const RolesList = styled.ul`
  margin: 0 0 1.5rem 1.5rem;
  padding: 0;
  color: #444;
  font-size: 1.08rem;
`;

const Resume = () => (
  <ResumeContainer>
    <Title>Resume</Title>
    <DownloadButton href="/resume.pdf" download>Download PDF</DownloadButton>
    <Section>
      <SectionTitle>Experience</SectionTitle>
      <ResumeBody>
        <strong>The Washington Post</strong> — Product Design Director<br />
        2018–2024<br />
        <em>Led design for discovery, personalization, and design systems. Managed and grew a team of product designers. Launched new features and scaled design culture across the org.</em>
        <br /><br />
        <strong>Independent & Studio Work</strong> — Design Lead<br />
        2012–2018<br />
        <em>Partnered with agencies, startups, and non-profits to deliver digital products, design systems, and brand experiences.</em>
        <br /><br />
        <strong>Education</strong><br />
        B.A. Urban Studies, University of Pennsylvania<br />
        <br />
      </ResumeBody>
    </Section>
    <Section>
      <SectionTitle>Roles I'm Interested In</SectionTitle>
      <RolesList>
        <li>Staff/Principal/Director UX or Product Design</li>
        <li>Search, systems, or platform orgs</li>
        <li>Teams focused on discovery, personalization, or design systems</li>
      </RolesList>
    </Section>
  </ResumeContainer>
);

export default Resume; 