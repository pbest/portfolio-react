import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WorkContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: 'DM Serif Display', serif;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const CaseLink = styled(Link)`
  display: block;
  background: #fafbfc;
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  text-decoration: none;
  color: #222;
  border: 1px solid #f0f0f0;
  transition: box-shadow 0.18s, border 0.18s;
  min-height: 120px;
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    border: 1px solid #d0d0d0;
    background: #f5f7fa;
  }
`;

const CaseTitle = styled.h2`
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CaseSummary = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 0.5rem;
`;

const WorkIndex = () => (
  <WorkContainer>
    <Title>Selected Work</Title>
    <CaseList>
      <CaseLink to="/work/feed">
        <CaseTitle>Reimagining Content Discovery</CaseTitle>
        <CaseSummary>Personalized the app feed at The Washington Post, driving a 10% lift in habitual use and 42% fewer complaints.</CaseSummary>
        <span>→</span>
      </CaseLink>
      <CaseLink to="/work/audio">
        <CaseTitle>AI-Powered Listening Experience</CaseTitle>
        <CaseSummary>Launched AI-generated audio across articles, increasing listen starts by 130% and expanding engagement.</CaseSummary>
        <span>→</span>
      </CaseLink>
      <CaseLink to="/work/system">
        <CaseTitle>Design Systems at Scale</CaseTitle>
        <CaseSummary>Built a design system adopted by 1,000+ engineering projects, improving velocity, accessibility, and collaboration.</CaseSummary>
        <span>→</span>
      </CaseLink>
    </CaseList>
  </WorkContainer>
);

export default WorkIndex; 