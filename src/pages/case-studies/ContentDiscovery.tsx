import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import AnchorNav from '../../components/ui/AnchorNav';
import Annotation from '../../components/ui/Annotation';

interface ContentDiscoveryCaseStudyProps {
  renderNav?: (white: boolean, menuOpen: boolean, setMenuOpen: (open: boolean) => void) => React.ReactNode;
}

// Accent color variable
const ACCENT_COLOR = 'rgb(96 97 236)';
const ACCENT_COLOR_5 = 'rgba(96, 97, 236, 0.05)';

// Shadow variable
const SHADOW_500 = 'rgba(50, 50, 93, 0.08) 0px 50px 100px -20px, rgba(0, 0, 0, 0.15) 0px 30px 60px -30px';

const HeroContainer = styled.div`
  background: linear-gradient(150deg, rgb(119, 120, 253), rgb(132 179 235) 69%);
  padding: 4rem 0 7rem 0;
  border-bottom: 1px solid #eee;
  margin-top: -10rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const CaseStudyContainer = styled.div`
  width: 100%;
  padding-bottom: 5rem;
  margin-top: 1rem;
  background: rgb(249, 249, 252);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const HeroSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 14rem 1rem 2rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 768px) {
    padding: 10rem 1.5rem 2rem 1.5rem;
    gap: 1.25rem;
  }
`;

const EyebrowChip = styled.div`
  display: inline-block;
  background: rgba(0,0,0,0.15);
  color: #fff;
  font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.35em 1.1em;
  margin-top: 0.5rem;
`;

const CaseStudyTitle = styled.h1`
  font-family: 'TT Ramillas', serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 600;
  line-height: 1.1;
  color: #fff;
  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 2.8rem);
    line-height: 1.2;
    letter-spacing: -0.5px;
  }
  @media (max-width: 480px) {
    font-size: clamp(1.8rem, 9vw, 2.4rem);
  }
  @media (max-width: 390px) {
    font-size: clamp(1.6rem, 10vw, 2.2rem);
  }
`;

const CaseStudySubtitle = styled.h2`
  font-family: 'TT Ramillas', serif;
  font-size: clamp(20px, 2.5vw, 24px);
  font-weight: 400;
  line-height: 1.4;
  color: #0b0b0b;
  max-width: 750px;
  @media (max-width: 768px) {
    line-height: 1.5;
    max-width: 100%;
  }
  @media (max-width: 480px) {
    font-size: clamp(18px, 3vw, 22px);
  }
  @media (max-width: 390px) {
    font-size: clamp(16px, 3.5vw, 20px);
  }
`;

const CaseStudyIntro = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  max-width: 700px;
  margin-top: 1rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.7;
    max-width: 100%;
  }
`;

const PhoneMockupContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px; /* Increased from 320px */
  aspect-ratio: 320 / 670;
  margin: 2.5rem auto 0 auto;
  box-shadow: 0 6px 32px 0 rgba(30,40,90,0.13), 0 1.5px 6px 0 rgba(30,40,90,0.08);
  border-radius: 32px;
  background: #fff;
`;

const PhoneMockupImg = styled.img`
  position: absolute;
  top: -69px;
  left: -118px;
  width: 585px;
  height: auto;
  object-fit: contain;
  border-radius: 1.25rem;
  z-index: 1;
`;

const PhoneOverlay = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  z-index: 2;
`;

const HeroImage = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 5rem;
`;

type ContentWidth = 'body' | 'break-out' | 'full-bleed';

const getWidth = (width: ContentWidth) => {
  switch (width) {
    case 'break-out':
      return '1200px';
    case 'full-bleed':
      return '100%';
    case 'body':
    default:
      return '800px';
  }
};

const Section = styled.section<{ width?: ContentWidth }>`
  max-width: ${({ width = 'body' }) => getWidth(width)};
  margin: 4rem auto;
  padding: 0 1rem;
  @media (max-width: 768px) {
    margin: 2.5rem auto;
    padding: 0 1.5rem;
  }
`;

const SectionTitle = styled.h2<{ first?: boolean }>`
  font-family: 'PolySans', sans-serif;
  font-size: 2.8rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.2px;
  color: #111;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  padding-top: ${({ first }) => (first ? '5rem' : '7.5rem')};
  @media (max-width: 768px) {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
  }
`;

const SubSectionTitle = styled.h3`
  font-family: 'PolySans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
  margin: 4rem 0 1rem 0;
  position: relative;

  /* Desktop styling for the counter */
  &[data-counter]::before {
    content: attr(data-counter);
    position: absolute;
    left: -3rem;
    top: 55%;
    transform: translateY(-50%);
    color: #bbb;
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 1rem;
    font-weight: 400;
  }

  /* Mobile styling for the counter */
  @media (max-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.4;
    margin: 3rem 0 0.75rem 0;

    &[data-counter]::before {
      position: static;
      transform: none;
      display: block;
      left: auto;
      top: auto;
      margin-bottom: 0.75rem;
      font-size: 0.8rem;
      color: #999;
    }
  }
`;

// Styled for annotation marker override
const AccentMarker = styled.button`
  background-color: ${ACCENT_COLOR} !important;
`;

// Styled for anchor links in key initiatives
const JumpLinkNav = styled.nav`
  margin: 2.5rem 0;
  padding-left: 1rem;
  border-left: 2px solid #e0e0e0;
  @media (min-width: 768px) {
    margin-left: -1rem;
  }

  h4 {
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 1rem 0;
    color: #111;
  }
`;

// New: Visual collage grid for key initiatives
const KeyInitiativesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto 0 auto;
  justify-content: center;
  @media (max-width: 1300px) {
    max-width: 98vw;
    width: 98vw;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 2rem 0 0 0;
  }
`;

const KeyInitiativeCard = styled.button<{ bg: string }>`
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgb(249, 249, 252);
  border: none;
  border-radius: 0.75rem;
  box-shadow: none;
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s;
  min-height: 220px;
  text-align: left;
  outline: none;
  &:hover, &:focus {
    transform: translateY(-4px) scale(1.03);
    box-shadow: none;
  }
`;

const KeyInitiativeIcon = styled.img`
  height: 250px;
  margin-bottom: 2.25rem;
  object-fit: contain;
`;

const KeyInitiativeLabel = styled.div`
  font-family: 'PolySans', sans-serif;
  font-size: 0.9rem;
    font-weight: 500;
  color: #000;
  margin-bottom: 0;
  text-align: left;
  width: 100%;
  line-height: 1.4;
`;

const KeyInitiativeBold = styled.span`
  font-weight: 700;
  color: #000;
`;

const KeyInitiativeGray = styled.span`
  font-weight: 300;
  color: rgb(85, 85, 85);
`;

const StorytellingTextSecondary = styled.p`
  font-weight: 300;
  color: rgb(85, 85, 85);
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
`;

const KeyInitiativeDesc = styled.div`
    font-size: 1rem;
  color: #fff;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: left;
  width: 100%;
`;

const KeyInitiativesTitle = styled.h3`
  font-family: 'TT Ramillas', serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #000;
  text-align: center;
  margin: 0 0 2rem 0;
  max-width: 800px;
  @media (max-width: 768px) {
    font-size: 1.875rem;
    text-align: left;
    line-height: 1.3;
  }
`;

// Strategic Insight block background
const InsightBlock = styled.div`
  background-color: ${ACCENT_COLOR_5};
  border-radius: 8px;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  @media (min-width: 768px) {
    margin-left: -2rem;
  }

  h4 {
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    color: #111;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 0.75rem 0;
  }

  p {
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    margin: 0;
  }
`;

const BodyText = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
  font-family: 'TT Ramillas', serif;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HighlightListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  @media (max-width: 768px) {
    font-size: 1rem;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 9px;
    height: 9px;
    background: #bbb;
    margin-top: 0.5em;
    margin-right: 0.25em;
    flex-shrink: 0;
  }
`;

const WhyItMattered = styled.div`
  background: #f9f9fc;
  border-radius: 8px;
  padding: 2rem 0 2rem 0;
  margin: 2.5rem 0;
  
  h3 {
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #111;
    margin: 0 0 1rem 0;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin: 0;
  }
`;

const VisualPlaceholder = styled.div`
  width: 100%;
  height: 350px;
  background: #f0f0f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1rem;
`;

const CaseStudyImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2rem 0;
  border: 1px solid #ddd;
`;

const StarTable = styled.table`
  margin: 2.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;

  thead th {
    background: #f3f3f6;
    color: #111;
    font-family: 'PolySans', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-transform: none;
    letter-spacing: normal;
    padding: 1rem 1.25rem;
    border: none;
    border-right: 1px solid #ddd;
  }

  thead th:last-child {
    border-right: none;
  }

  th, td {
    text-align: left;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  th:last-child, td:last-child {
    border-right: none;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  td {
    color: #555;
    font-size: 1rem;
    font-family: 'PolySans', sans-serif;
    font-weight: 300;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    display: block !important;
    border: none !important;
    background: none !important;
    width: 93% !important;
    margin-left: 1rem !important;
    table-layout: auto !important;
    
    thead {
      display: none !important;
    }
    
    tbody {
      display: block !important;
    }
    
    tr {
      display: block !important;
      margin-bottom: 1.5rem !important;
      border: 1px solid #ddd !important;
      border-radius: 8px !important;
      background: #fff !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      width: 100% !important;
    }
    
    td {
      display: block !important;
      width: 100% !important;
      padding: 0 1.25rem 1rem 1.25rem !important;
      border: none !important;
      border-bottom: 1px solid #eee !important;
      box-sizing: border-box !important;
      max-width: none !important;
      font-weight: 300 !important;
    }
    
    td:last-child {
      border-bottom: none !important;
    }
    
    tbody td:first-child::before {
      content: "The Situation" !important;
      display: block !important;
      background: #f3f3f6 !important;
      color: #111 !important;
      font-family: 'PolySans', sans-serif !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      padding: 1rem 1.25rem !important;
      border-radius: 8px 8px 0 0 !important;
      margin-left: -1.25rem !important;
      margin-right: -1.25rem !important;
      margin-bottom: 1rem !important;
    }
    
    tbody td:nth-child(2)::before {
      content: "My Actions" !important;
      display: block !important;
      background: #f3f3f6 !important;
      color: #111 !important;
      font-family: 'PolySans', sans-serif !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      padding: 1rem 1.25rem !important;
      margin-left: -1.25rem !important;
      margin-right: -1.25rem !important;
      margin-bottom: 1rem !important;
    }
    
    tbody td:nth-child(3)::before {
      content: "Results" !important;
      display: block !important;
      background: #f3f3f6 !important;
      color: #111 !important;
      font-family: 'PolySans', sans-serif !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      padding: 1rem 1.25rem !important;
      margin-left: -1.25rem !important;
      margin-right: -1.25rem !important;
      margin-bottom: 1rem !important;
    }
  }
`;

const RoleTable = styled.table`
  margin: 2.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  thead th {
    background: #f3f3f6;
    color: #111;
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 1rem 1.25rem;
    border: none;
  }

  th, td {
    text-align: left;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody td:first-child {
    font-weight: 600;
    color: #333;
    font-family: 'PolySans', sans-serif;
    display: flex;
    align-items: center;
  }

  tbody td:nth-child(2) {
    font-family: 'PolySans', sans-serif;
    font-weight: 300;
  }

  td {
    color: #555;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    display: block;
    border: none;
    background: none;
    
    thead {
      display: none;
    }
    
    tbody {
      display: block;
    }
    
    tr {
      display: block;
      margin-bottom: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    td {
      display: block;
      padding: 1rem 1.25rem;
      border: none;
      border-bottom: 1px solid #eee;
    }
    
    td:last-child {
      border-bottom: none;
    }
    
    tbody td:first-child {
      background: #f3f3f6;
      font-weight: 600;
      color: #111;
      border-radius: 8px 8px 0 0;
      padding: 1rem 1.25rem;
    }
    
    tbody td:nth-child(2) {
      padding: 1rem 1.25rem;
      line-height: 1.5;
    }
  }
`;

const ColorBlock = styled.span<{ color: string }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
  margin-right: 0.75rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 0;
  margin: 3rem 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    width: 100%;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid #d1d1d6;
  border-bottom: 1px solid #d1d1d6;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  min-width: 0;
  padding: 5rem 2rem 0 2rem;

  // Remove right border for last column
  &:nth-child(2), &:nth-child(4) {
    border-right: none;
  }
  // Remove bottom border for last row
  &:nth-child(n+3) {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #d1d1d6;
    width: 100%;
    padding: 2.5rem 2rem 0 2rem;
    
    // Remove bottom border for last item
    &:last-child {
      border-bottom: none;
    }
  }
`;

const StorytellingText = styled.div`
  padding-bottom: 1.25rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 0 0 12px 12px;
  flex: 1;

  @media (min-width: 900px) {
    max-width: 60%;
    margin: 2rem auto;
    align-items: center;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }

  h4 {
    font-family: 'PolySans', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: #222;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin: 0;
    text-align: center;
  }
`;

const StorytellingVisual = styled.div`
  /* height: 350px; */
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1rem;
  min-height: 120px;
  
  .storytelling-image {
    @media (max-width: 768px) {
      max-width: 270px !important;
    }
  }
`;

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const OutcomeCard = styled.div`
  background-color: #f9f9fc;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #f0f0f0;
  color: #555;
`;

const Metric = styled.p`
  font-size: 3rem;
  font-weight: 600;
  color: #15d1b1;
  margin: 0 0 0.5rem 0;
  line-height: 1;
`;

const MetricLabel = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin: 0;
`;

const Blockquote = styled.blockquote`
  border-left: 4px solid #15d1b1;
  padding-left: 2rem;
  margin: 2.5rem 0;
  font-size: 1.4rem;
  font-style: italic;
  line-height: 1.6;
  color: #555;
`;

const QuoteContainer = styled.div`
  background-color: #f4f8fe;
  border-radius: 12px;
  padding: 3rem;
  margin: 3rem 0;
  text-align: left;
`;

const QuoteAttribution = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #777;
  font-style: normal;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-family: 'Space Mono', 'Fira Mono', 'Menlo', 'monospace';
  font-size: 1rem;
  font-weight: 400;
  color: #222;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ImpactStatement = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin: 3rem 0;
`;

const RoleHeader = styled.div`
  background: #f3f3f6;
  color: #111;
  padding: 0.75rem 1.25rem;

  h3 {
    margin: 0;
    font-family: 'PolySans', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const TaskAtHand = styled.div`
  background: rgb(4, 41, 78);
  border-radius: 8px;
  max-width: 1200px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  margin: 6rem 0 8rem 0;
  padding: 15vh 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${SHADOW_500};

  h4 {
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgb(119, 120, 253);
    margin: 0 0 1.25rem 0;
  }

  p {
    font-family: 'TT Ramillas', serif;
    font-size: 2.5rem;
    color: #fff;
    text-align: center;
    line-height: 1.5;
    margin: 0;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    padding: 15vh 2.5rem;
    align-items: flex-start;
    justify-content: center;

    p {
      font-size: 1.875rem;
      text-align: left;
      line-height: 1.3;
    }
  }
`;

const KeyInitiativesSection = styled.div`
  background: #fff;
  border-radius: 8px;
  max-width: 1200px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  margin: 3rem 0 8rem 0;
  padding: 15vh 0.75rem 0.75rem 0.75rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${SHADOW_500};

  h4 {
    font-family: 'Space Mono', 'Fira Mono', 'Menlo', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgb(119, 120, 253);
    margin: 0 0 1.25rem 0;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    justify-content: center;
    padding: 11.25vh 1.5rem 0.5625rem 1.5rem;
  }
`;

const HabitTilesMarginAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [showTiles, setShowTiles] = useState([false, false, false, false]);
  const [moveToCenter, setMoveToCenter] = useState(false);
  const [fadeOutTiles, setFadeOutTiles] = useState([false, false, false, false]);

  // Function to trigger animation
  const triggerAnimation = () => {
    setInView(true);
  };

  // Listen for custom event when anchor link is clicked
  useEffect(() => {
    const handleAnchorClick = () => {
      triggerAnimation();
    };

    window.addEventListener('habit-tiles-animation-trigger', handleAnchorClick);
    return () => {
      window.removeEventListener('habit-tiles-animation-trigger', handleAnchorClick);
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.65) {
          setInView(true);
        } else {
          setInView(false);
          setShowTiles([false, false, false, false]);
          setMoveToCenter(false);
          setFadeOutTiles([false, false, false, false]);
        }
      },
      { threshold: 0.65 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Staggered appearance
  useEffect(() => {
    if (inView) {
      let timeouts: NodeJS.Timeout[] = [];
      // Add a delay before starting the staggered animation
      timeouts.push(setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          timeouts.push(setTimeout(() => {
            setShowTiles(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, 400 * i));
        }
        // After all are visible, move to center and fade out
        timeouts.push(setTimeout(() => setMoveToCenter(true), 2000));
      }, 300)); // 300ms initial delay
      return () => timeouts.forEach(clearTimeout);
    }
  }, [inView]);

  // Staggered fade out
  useEffect(() => {
    if (moveToCenter) {
      let timeouts: NodeJS.Timeout[] = [];
      for (let i = 0; i < 4; i++) {
        timeouts.push(setTimeout(() => {
          setFadeOutTiles(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 350 + 90 * i)); // 0.35s initial delay, then 0.09s stagger
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [moveToCenter]);

  // Positions for 2 left, 2 right (relative to main image)
  const positions = [
    { left: -250, top: '27%' },    // habit-tile-1 (left, 30% down) - moved further left
    { left: -200, top: '44%' },    // habit-tile-2 (left, 65% down) - moved up to align with bottom
    { right: -250, top: '27%' },   // habit-tile-3 (right, 30% down) - moved further right
    { right: -200, top: '45%' }    // habit-tile-4 (right, 65% down) - moved up to align with bottom
  ];

  // Translate values to move each tile to the center of the main image (relative to their anchor)
  const centerTransforms = [
    'scale(1) translate(250px, 0)',   // left top: move right
    'scale(1) translate(200px, 0)',  // left bottom: move right
    'scale(1) translate(-250px, 0)',  // right top: move left
    'scale(1) translate(-200px, 0)', // right bottom: move left
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
      <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
        <img src="/images/case-study-1/habit-tiles-3.png" alt="Habit Tiles screenshot" style={{ maxWidth: '430px', width: '100%', borderRadius: '16px', display: 'block', position: 'relative', zIndex: 2 }} />
        {['1', '2', '3', '4'].map((n, i) => {
          const baseStyle: React.CSSProperties = {
            position: 'absolute',
            width: 180,
            height: 'auto',
            opacity: showTiles[i] ? 1 : 0,
            transition: 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)',
            zIndex: 1,
            ...positions[i],
            transform: showTiles[i] ? 'scale(1)' : 'scale(0.8)',
          };
          const animateStyle: React.CSSProperties = fadeOutTiles[i]
            ? {
                opacity: 0,
                transform: centerTransforms[i],
                transition: 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)',
              }
            : {};
          return (
            <img
              key={n}
              src={`/images/case-study-1/habit-tiles/habit-tile-${n}.png`}
              alt={`Habit Tile ${n}`}
              style={{ ...baseStyle, ...animateStyle }}
            />
          );
        })}
      </div>
    </div>
  );
};

const teamColors: { [key: string]: string } = {
  Product: '#4285F4',
  'Design (My Role)': '#34A853',
  Engineering: '#FBBC05',
  Stakeholders: '#EA4335',
};

const sections = [
  { id: 'context', title: 'Context & Challenge', shortTitle: 'Context' },
  { id: 'strategy', title: 'Strategy & Approach', shortTitle: 'Strategy' },
  { id: 'outcomes', title: 'Outcomes & Impact', shortTitle: 'Outcomes' },
];

const forYouAnnotations = [
  {
    x: 52,
    y: 13,
    text: 'The swipeable "For You" tab provided context for skeptical user base and reassured editorial stakeholders that we were not personalizing the top stories.',
  },
  {
    x: 52,
    y: 70,
    text: 'The actions and labeling anchored each card, allowing us to include video and other visual content.',
  },
  {
    x: 55,
    y: 55,
    text: 'In post-launch preference tests, loyal subscribers and non-subscribers alike preferred the new visual treatments. The color-enhanced cards felt modern and distinct — not just prettier, but memorable.',
  },
];

const FeatureGridWide = styled(FeatureGrid)`
  max-width: 1200px;
  width: 1200px;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  margin-left: 0;
  margin-right: 0;
  margin-top: 3rem;
  margin-bottom: 3rem;
  max-width: 100vw;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

const DataChip = styled.span`
  display: inline-block;
  background: #e6f4ea;
  color: #137333;
  font-weight: 400;
  font-size: 1em;
  border-radius: 999px;
  padding: 0.15em 0.7em;
  margin: 0 0.25em;
  vertical-align: middle;
`;

// Data viz for Context & Challenge
const DataVizContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  width: 100%;
  max-width: 900px;
  min-height: 200px;
  margin: 1.5rem auto;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 2.5rem 2rem;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 1.5rem 0.5rem;
  }
`;
const DataVizLeft = styled.div`
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-right: 2.5rem;
  @media (max-width: 700px) {
    align-items: center;
    padding-right: 0;
    margin-bottom: 1.5rem;
  }
`;


const DataVizCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  border: 1px solid #f2f2f2;
  margin: 0;
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const DataVizCardDark = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0;
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  backdrop-filter: blur(10px);
`;
const DataVizCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
  margin-bottom: 1.1rem;
  border-bottom: 1px solid #ececec;
  padding-bottom: 1rem;
  line-height: 1.2;
`;

const DataVizCardTitleDark = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
  margin-bottom: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  line-height: 1.2;
`;
const DataVizCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 1.5rem;
`;
const DataVizCardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  min-width: 160px;
  height: 110px;
`;
const DataVizLabel = styled.div`
  font-size: 1rem;
  color: #222;
  font-family: 'PolySans', sans-serif;
  font-weight: 300;
  margin-bottom: 0;
`;

const DataVizLabelDark = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'PolySans', sans-serif;
  font-weight: 400;
  margin-bottom: 0;
`;
const DataVizMetric = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
  font-family: 'PolySans', sans-serif;
  margin-bottom: 0;
  line-height: 1.3;
`;

const DataVizMetricDark = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  font-family: 'PolySans', sans-serif;
  margin-bottom: 0;
  line-height: 1.3;
`;
const DataVizChange = styled.div`
  font-size: 0.9rem;
  color: #e53935;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
`;

const DataVizChangeDark = styled.div`
  font-size: 0.9rem;
  color: #ff6b6b;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
`;
const DataVizChartWrap = styled.div`
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  height: 110px;
  max-width: 120px;
`;

const DataVizFootnote = styled.div`
  font-size: 0.85rem;
  color: #888;
  text-align: left;
  margin: 0.5rem 0 0 0;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
  font-weight: 300;
`;

const DataVizFootnoteDark = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: left;
  margin: 0.5rem 0 0 0;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
  font-weight: 300;
`;

const AIStatement = styled.div`
  font-style: italic;
  color: #666;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const OutcomesSection = styled.div`
  background: rgb(4, 41, 78);
  border-radius: 8px;
  max-width: 1200px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  margin: 3rem 0 8rem 0;
  padding: 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${SHADOW_500};
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 3rem 0 4rem 0;
  }
`;

const OutcomesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 800px;
  }
`;

function DataVizPlaceholder() {
  // Generate mock data with a downward trend
  const points = Array.from({ length: 80 }, (_, i) => {
    // Simulate a noisy downward trend
    const base = 700000 - i * 1800;
    const noise = Math.sin(i * 0.3) * 20000 + (Math.random() - 0.5) * 15000;
    return base + noise;
  });
  const minY = 500000, maxY = 800000;
  const width = 600, height = 120, leftPad = 10, rightPad = 10, topPad = 10, bottomPad = 20;
  // Scale points to SVG
  const xStep = (width - leftPad - rightPad) / (points.length - 1);
  const yScale = (v: number) => topPad + ((maxY - v) / (maxY - minY)) * (height - topPad - bottomPad);
  const linePath = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${leftPad + i * xStep},${yScale(v)}`).join(' ');
  // Area path (from line down to bottom)
  const areaPath = [
    `M${leftPad},${height - bottomPad}`,
    ...points.map((v, i) => `L${leftPad + i * xStep},${yScale(v)}`),
    `L${leftPad + (points.length - 1) * xStep},${height - bottomPad}`,
    'Z'
  ].join(' ');
  // Trendline (linear regression)
  const xVals = points.map((_, i) => i);
  const yVals = points;
  const n = points.length;
  const sumX = xVals.reduce((a, b) => a + b, 0);
  const sumY = yVals.reduce((a, b) => a + b, 0);
  const sumXY = xVals.reduce((a, b, i) => a + b * yVals[i], 0);
  const sumXX = xVals.reduce((a, b) => a + b * b, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const trendY1 = slope * 0 + intercept;
  const trendY2 = slope * (n - 1) + intercept;
  const trendLine = `M${leftPad},${yScale(trendY1)} L${leftPad + (n - 1) * xStep},${yScale(trendY2)}`;
  return (
    <DataVizCard>
      <DataVizCardTitle>The trend of 'news fatigue'</DataVizCardTitle>
      <DataVizCardRow>
        <DataVizCardLeft>
          <DataVizLabel>2023 Pageviews</DataVizLabel>
          <DataVizMetric>5.4 Billion</DataVizMetric>
          <DataVizChange><span style={{fontSize:'1.1rem'}}>↓</span> 21.5% vs prev. year</DataVizChange>
        </DataVizCardLeft>
        <DataVizChartWrap>
          <svg width="100%" height="110" viewBox="0 0 180 110" preserveAspectRatio="none" style={{ width: '100%', height: '110px', display: 'block' }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#40b6e6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#40b6e6" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {/* Area under line */}
            <path d={(() => {
              const points = Array.from({ length: 24 }, (_, i) => {
                const start = 70;
                const end = 54;
                const base = start + (end - start) * (i / 23);
                const noise = Math.sin(i * 0.7) * 2 + (Math.random() - 0.5) * 1.2;
                return base + noise;
              });
              const xStep = 170 / (points.length - 1);
              const areaPath = [
                `M0,110`,
                ...points.map((v, i) => `L${i * xStep},${v}`),
                `L170,110`,
                'Z'
              ].join(' ');
              return areaPath;
            })()} fill="url(#areaGradient)" stroke="none" />
            {/* Data line */}
            <path d={(() => {
              const points = Array.from({ length: 24 }, (_, i) => {
                const start = 70;
                const end = 54;
                const base = start + (end - start) * (i / 23);
                const noise = Math.sin(i * 0.7) * 2 + (Math.random() - 0.5) * 1.2;
                return base + noise;
              });
              const xStep = 170 / (points.length - 1);
              return points.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * xStep},${v}`).join(' ');
            })()} fill="none" stroke="#40b6e6" strokeWidth="2" />
          </svg>
        </DataVizChartWrap>
      </DataVizCardRow>
      <DataVizFootnote>
         People reported feeling overwhelmed and exahusted with the news cycle
      </DataVizFootnote>
    </DataVizCard>
  );
}

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 2.5rem;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
const ScanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ScanListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0;
  font-size: 1.25rem;
  color: #222;
  line-height: 1.35;
  font-family: 'TT Ramillas', serif;
`;
const ScanListBullet = styled.span`
  display: inline-block;
  font-size: 1.15rem;
  color: #0102323d;
  font-weight: 700;
  margin-right: 1rem;
  margin-top: 0.18em;
  line-height: 1;

  @media (max-width: 768px) {
    margin-right: 0.65rem;
  }
`;
// Reuse ScanListBullet for WhyItem bullets
// Update WhyGrid and WhyItem to match ScanList and ScanListItem
const WhyGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.5rem 2.5rem;
  margin-top: 1.5rem;
  @media (max-width: 900px) {
    gap: 1.2rem;
  }
`;
const WhyItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0;
  font-size: 1.25rem;
  color: #222;
  line-height: 1.35;
  font-family: 'TT Ramillas', serif;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const WhyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  color: #111;
  font-family: 'PolySans', 'Fira Sans', 'Arial', sans-serif;
`;

const HeroPhoneMockupContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px; /* Increased from 320px */
  aspect-ratio: 320 / 670;
  margin: 10vh auto 0 auto; /* Reduced from 20vh to 10vh */
  box-shadow: 0 6px 32px 0 rgba(30,40,90,0.13), 0 1.5px 6px 0 rgba(30,40,90,0.08);
  border-radius: 32px;
  background: #fff;
  @media (max-width: 768px) {
    max-width: 315px;
  }
  @media (max-width: 390px) {
    max-width: 243px;
  }
`;
const HeroPhoneVideo = styled.video`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px; /* Slightly inside the phone bezel */
  z-index: 1;
  background: #000;
  display: block;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3);
  /* Mask the video to the phone screen area only */
  /* If the phone mockup has a transparent screen, this is enough. If not, use clip-path or SVG mask. */
`;
const HeroPhoneMockupImg = styled.img`
  position: absolute;
  top: -69px;
  left: -118px;
  width: 585px;
  height: auto;
  z-index: 2;
  pointer-events: none;
  user-select: none;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentDiscoveryCaseStudy: React.FC<ContentDiscoveryCaseStudyProps> = ({ renderNav }) => {
  const navigate = useNavigate();
  const [navWhite, setNavWhite] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showStarTable, setShowStarTable] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const sectionRefs = {
    context: useRef<HTMLDivElement>(null),
    strategy: useRef<HTMLDivElement>(null),
    outcomes: useRef<HTMLDivElement>(null),
  };

  // Check if we're on mobile
  const isMobile = () => window.innerWidth <= 768;

  // Toggle STAR table visibility
  const toggleStarTable = () => {
    setShowStarTable(!showStarTable);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setNavWhite(rect.bottom > 64); // 64px nav height
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const handleScroll = () => {
      if (heroRef.current && footerRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Show nav when past hero and hide when entering footer
        setIsNavVisible(heroBottom < 20 && footerTop > windowHeight);
      }
    };

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let played = false;
    const handleScroll = () => {
      if (!played && heroVideoRef.current) {
        heroVideoRef.current.play();
        played = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavItemClick = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJumpLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset to account for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Trigger habit tiles animation if clicking on habit-tiles anchor
      if (id === 'habit-tiles') {
        window.dispatchEvent(new CustomEvent('habit-tiles-animation-trigger'));
      }
    }
  };

  return (
    <>
      {renderNav && renderNav(navWhite, menuOpen, setMenuOpen)}
      <AnchorNav 
        sections={sections}
        activeSection={activeSection}
        isVisible={isNavVisible}
        onNavItemClick={handleNavItemClick}
      />
      <CaseStudyContainer>
        <HeroContainer ref={heroRef}>
          <HeroSection>
            <EyebrowChip>4 MINUTE READ</EyebrowChip>
            <CaseStudyTitle>Reimagining Content Discovery</CaseStudyTitle>
            <CaseStudySubtitle>
I led a redesign of The Washington Post's app feed to make discovery feel personal, guided, and habit-forming — boosting engagement across app, web, and email</CaseStudySubtitle>
          </HeroSection>
          <HeroImage>
            <HeroPhoneMockupContainer>
              <HeroPhoneVideo
                ref={heroVideoRef}
                src="/images/case-study-1/hero-visual/hero-phone@350x743.mp4"
                poster="/images/case-study-1/hero-visual/hero-phone-cover.jpg"
                muted
                loop
                playsInline
                preload="auto"
              />
              <HeroPhoneMockupImg
                src="/images/phone-mockup-holepunch@3x.png"
                alt="Phone mockup"
                draggable="false"
              />
            </HeroPhoneMockupContainer>
          </HeroImage>
        </HeroContainer>

        <div style={{ maxWidth: '1100px', margin: '0 auto', marginTop: isMobile() ? '-6rem' : '-7rem', textAlign: isMobile() ? 'center' : 'left' }}>
          <div 
            style={{ 
              fontFamily: isMobile() ? "'PolySans', sans-serif" : "'Space Mono', 'Fira Mono', 'Menlo', monospace", 
              fontSize: isMobile() ? '1rem' : '0.8rem', 
              fontWeight: '700', 
              letterSpacing: isMobile() ? 'normal' : '0.12em', 
              textTransform: isMobile() ? 'none' : 'uppercase',
              color: '#fff',
              marginBottom: '-1.5rem',
              textAlign: isMobile() ? 'center' : 'left',
              cursor: isMobile() ? 'pointer' : 'default',
              userSelect: 'none',
              ...(isMobile() && {
                background: 'rgba(4, 41, 78, 0.5)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'inline-block'
              })
            }}
            onClick={isMobile() ? toggleStarTable : undefined}
          >
            {isMobile() ? (showStarTable ? 'Ⓧ Close TLDR' : '👉 Don\'t want to scroll? Tap for TLDR') : 'TLDR —'}
          </div>
          <div style={{ display: isMobile() && !showStarTable ? 'none' : 'block' }}>
            <StarTable>
              <thead>
                <tr>
                  <th>The Situation</th>
                  <th style={{ width: '33%' }}>My Actions</th>
                  <th style={{ width: '33%' }}>Results</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                  After COVID and the 2020 election, audience across <em>The Post</em> dipped over 20% as casual news readers disengaged. This revealed a gap: we were optimized for news on web, not ongoing engagement in the app. We saw an opportunity to focus on habitual app usage, where churn is lowest.
                    <br /><br />
                    <strong>🔷 Task at hand:</strong> Reimagine the app's discovery system to keep readers coming back.
                  </td>
                  <td style={{ width: '33%' }}>
                    <ol style={{ 
                      margin: 0, 
                      lineHeight: '1.3',
                      listStyle: 'none',
                      counterReset: 'item'
                    }}>
                      <li style={{ 
                        marginBottom: '1.5rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-4px',
                          top: '0.05rem',
                          width: '1.2rem',
                          height: '1.2rem',
                          borderRadius: '50%',
                          border: '1px solid #ddd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          color: '#666',
                          counterIncrement: 'item',
                          lineHeight: '1'
                        }}>
                          <span style={{ content: 'counter(item)' }}>1</span>
                        </span>
                        <a 
                          href="#habit-tiles" 
                          style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                            borderBottom: '1px solid transparent',
                            transition: 'border-bottom 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid #ddd'}
                          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid transparent'}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('habit-tiles');
                            if (element) {
                              const offset = 100;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - offset;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }}
                        >
                          Launched 'Habit Tiles' to drive new behavior loops
                        </a>
                      </li>
                      <li style={{ 
                        marginBottom: '1.5rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-4px',
                          top: '0.05rem',
                          width: '1.2rem',
                          height: '1.2rem',
                          borderRadius: '50%',
                          border: '1px solid #ddd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          color: '#666',
                          lineHeight: '1'
                        }}>
                          2
                        </span>
                        <a 
                          href="#for-you-tab" 
                          style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                            borderBottom: '1px solid transparent',
                            transition: 'border-bottom 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid #ddd'}
                          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid transparent'}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('for-you-tab');
                            if (element) {
                              const offset = 100;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - offset;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }}
                        >
                          Delivered a personalized 'For You' feed to expand content variety
                        </a>
                      </li>
                      <li style={{ 
                        marginBottom: '1.5rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-4px',
                          top: '0.05rem',
                          width: '1.2rem',
                          height: '1.2rem',
                          borderRadius: '50%',
                          border: '1px solid #ddd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          color: '#666',
                          lineHeight: '1'
                        }}>
                          3
                        </span>
                        <a 
                          href="#core-feed" 
                          style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                            borderBottom: '1px solid transparent',
                            transition: 'border-bottom 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid #ddd'}
                          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid transparent'}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('core-feed');
                            if (element) {
                              const offset = 100;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - offset;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }}
                        >
                          Redesigned 'Top Stories' using user insights to boost engagement
                        </a>
                      </li>
                      <li style={{ 
                        marginBottom: '1.5rem',
                        position: 'relative',
                        paddingLeft: '1.5rem'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-4px',
                          top: '0.05rem',
                          width: '1.2rem',
                          height: '1.2rem',
                          borderRadius: '50%',
                          border: '1px solid #ddd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          color: '#666',
                          lineHeight: '1'
                        }}>
                          4
                        </span>
                        <a 
                          href="#visual-storytelling" 
                          style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                            borderBottom: '1px solid transparent',
                            transition: 'border-bottom 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid #ddd'}
                          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.borderBottom = '1px solid transparent'}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('visual-storytelling');
                            if (element) {
                              const offset = 100;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - offset;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }}
                        >
                          Rolled out modular layouts tailored to story types
                        </a>
                      </li>
                    </ol>
                  </td>
                  <td style={{ width: '33%' }}>
                    <div style={{ lineHeight: '1.3' }}>
                      Product metrics improved across depth, breadth, and habit levers.
                    </div>
                    <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', lineHeight: '1.3', listStyleType: 'circle' }}>
                      <li style={{ marginBottom: '1rem', marginTop: '1rem' }}>Casual readers returned 10% more often</li>
                      <li style={{ marginBottom: '1rem' }}>Power users formed deeper habits with 42% engagement lift</li>
                      <li style={{ marginBottom: '1rem' }}>Content discoverability complaints dropped 40%</li>
                      <li style={{ marginBottom: '1rem' }}>These gains are strongly correlated with subscriber retention</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </StarTable>
          </div>
        </div>

        <Section id="context" ref={sectionRefs.context}>
          <SectionTitle first>Context &amp; Challenge</SectionTitle>
          <BodyText>
            The Washington Post was falling behind evolving reader expectations.  News fatigue after peak of COVID and 2020 election led to <span style={{ background: '#fff7c2', borderRadius: '6px', padding: '0.1em 0.3em' }}>steep drop-offs in casual and anonymous readership</span>, shrinking the top of the funnel.   The app plays a critical role in retention as subscribers who use it regularly are far less likely to cancel







        </BodyText>
          <SectionGrid>
            <div>
            <WhyTitle>Why It Mattered</WhyTitle>
          <WhyGrid>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(0deg)' }}>✦</ScanListBullet>Engagement decline was a leading signal of churn: casual readers weren't sticking.</WhyItem>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(20deg)' }}>✦</ScanListBullet>Missed lever for growth: Discovery friction limited the product's ability to drive repeat usage.</WhyItem>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(-20deg)' }}>✦</ScanListBullet>Marketing and audience growth efforts stalled: the experience wasn't sticky enough to connect with new users.</WhyItem>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(10deg)' }}>✦</ScanListBullet>Discovery isn't just a feature: its how people stay informed, inspired, and loyal.</WhyItem>
          </WhyGrid>
            </div>
            <DataVizPlaceholder />
          </SectionGrid>

          <TaskAtHand>
            <h4>Task at hand</h4>
            <p>Reimagine the app's discovery system to keep readers coming back.</p>
          </TaskAtHand>

          <SubSectionTitle id="my-role">My Role &amp; Team</SubSectionTitle>
          <BodyText>
          As Product Design Director, I led the design effort for this multi-phase initiative, driving strategy, execution, and cross-functional alignment over the course of a year. I coached a team of designers, shaped product vision with PMs and engineering, and partnered closely with editorial and executive stakeholders to ensure both business and newsroom goals were met.
          </BodyText>
          <RoleTable>
            <thead>
              <tr>
                <th>Team</th>
                <th>My collaboration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><ColorBlock color={teamColors.Product} />Product</td>
                <td>Partnered with Product Director to prioritize and validate features</td>
              </tr>
              <tr>
                <td><ColorBlock color={teamColors['Design (My Role)']} />Design (My Role)</td>
                <td>Led and coached 1-2 designers per initiative; drove end-to-end strategy</td>
              </tr>
              <tr>
                <td><ColorBlock color={teamColors.Engineering} />Engineering</td>
                <td>Collaborated with tech leads to ensure scalable implementation</td>
              </tr>
              <tr>
                <td><ColorBlock color={teamColors.Stakeholders} />Stakeholders</td>
                <td>Aligned with execs across editorial, data/ml, and business side</td>
              </tr>
            </tbody>
          </RoleTable>
        </Section>

        <Section width="body" id="strategy" ref={sectionRefs.strategy}>
          <SectionTitle id="strategy">Strategy & Approach</SectionTitle>
          <BodyText>We focused on balancing personalization and curation, modernizing the storytelling experience, and building scalable design patterns that serve readers.
We used the dual lens of editorial integrity and user-centered personalization, with four key initiatives — each driven by behavioral insight, creative reframing, and deep cross-functional alignment.</BodyText>
          
          <KeyInitiativesSection>
            <h4>Key Initiatives</h4>
            <KeyInitiativesTitle>I pursued four tactics, each driven by behavioral insight and deep cross-functional alignment.</KeyInitiativesTitle>
            <KeyInitiativesGrid>
              <KeyInitiativeCard
                bg="linear-gradient(135deg, #A0E7E5 0%, #B4F8C8 100%)"
                onClick={() => handleJumpLinkClick({ preventDefault: () => {} } as any, 'habit-tiles')}
                aria-label="Jump to Habit Tiles"
              >
                <KeyInitiativeIcon src="/images/case-study-1/habit-tiles-2.png" alt="Habit Tiles icon" />
                <KeyInitiativeLabel>
                  <KeyInitiativeBold>Habit Tiles</KeyInitiativeBold>
                  <KeyInitiativeGray> — Delightful habitual content that keeps users engaged</KeyInitiativeGray>
                </KeyInitiativeLabel>
              </KeyInitiativeCard>
              <KeyInitiativeCard
                bg="linear-gradient(150deg, rgb(119, 120, 253), rgb(132 179 235) 69%)"
                onClick={() => handleJumpLinkClick({ preventDefault: () => {} } as any, 'for-you-tab')}
                aria-label="Jump to For You System"
              >
                <KeyInitiativeIcon src="/images/case-study-1/for-you.png" alt="For You icon" />
                <KeyInitiativeLabel>
                  <KeyInitiativeBold>'For You' System</KeyInitiativeBold>
                  <KeyInitiativeGray> — User-tailored entry points for personalized discovery</KeyInitiativeGray>
                </KeyInitiativeLabel>
              </KeyInitiativeCard>
              <KeyInitiativeCard
                bg="linear-gradient(135deg, #f7cac9 0%, #92a8d1 100%)"
                onClick={() => handleJumpLinkClick({ preventDefault: () => {} } as any, 'core-feed')}
                aria-label="Jump to Core Feed"
              >
                <KeyInitiativeIcon src="/images/case-study-1/app-hero.png" alt="Core Feed icon" />
                <KeyInitiativeLabel>
                  <KeyInitiativeBold>'Top Stories' Feed</KeyInitiativeBold>
                  <KeyInitiativeGray> — New hierarchy for improved scannability and clarity</KeyInitiativeGray>
                </KeyInitiativeLabel>
              </KeyInitiativeCard>
              <KeyInitiativeCard
                bg="linear-gradient(135deg, #f9e79f 0%, #f6ddcc 100%)"
                onClick={() => handleJumpLinkClick({ preventDefault: () => {} } as any, 'visual-storytelling')}
                aria-label="Jump to Visual Storytelling"
              >
                <KeyInitiativeIcon src="/images/case-study-1/package-structure-temp.png" alt="Visual Storytelling icon" />
                <KeyInitiativeLabel>
                  <KeyInitiativeBold>Visual Storytelling</KeyInitiativeBold>
                  <KeyInitiativeGray> — Live and explainer-ready modules for dynamic content</KeyInitiativeGray>
                </KeyInitiativeLabel>
              </KeyInitiativeCard>
            </KeyInitiativesGrid>
          </KeyInitiativesSection>

          <SubSectionTitle id="habit-tiles" data-counter="1/4">Launching Habit Tiles</SubSectionTitle>
          <BodyText>I had the idea for Habit Tiles after hearing Jeff Bezos suggest that our products should better educate users on the breadth of what The Post offers — not just deliver headlines. I connected that insight to data showing readers often skimmed the first 25% of the feed and bounced, an existing habit loop focused on catching up on the top news. I worked across product, design, and engineering to build buy-in that this experiment could enhance existing behavior by anticipating & nudging users toward deeper, more habitual engagement.</BodyText>
          <HabitTilesMarginAnimation />
          <InsightBlock>
            <h4><span style={{ fontSize: '130%', verticalAlign: 'middle' }}>⚡️</span> Key Insight</h4>
            <p>Context matters: We saw a significant boost in engagement when we iterated on the labels associated with each tile. Our v1 had the same labels for all, but <span style={{ background: '#fff7c2', borderRadius: '6px', padding: '0.1em 0.3em' }}>once we surfaced the why</span>: "trending", "followed topic", "continued reading", etc <span style={{ background: '#fff7c2', borderRadius: '6px', padding: '0.1em 0.3em' }}>people connected with the content more deeply</span>.</p>
          </InsightBlock>
          
          {/* Restore For You section */}
          <SubSectionTitle id="for-you-tab" data-counter="2/4">Creating a Personalized "For You" System</SubSectionTitle>
          <BodyText>To help our product team experiment with personalization while addressing newsroom skepticism, I proposed a separate, opt-in "For You" tab that left top stories untouched. This let us test a swipeable, visual-first experience that resonated with modern reading habits without undermining editorial curation. I worked within our design team to develop a lightweight visual system using color sampling from lead images—giving each story an immersive feel without manual styling. This approach balanced breadth, personalization, and editorial integrity—and helped shift internal attitudes toward personalization over time.</BodyText>
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            justifyContent: 'center', 
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            <Annotation 
              src="/images/case-study-1/for-you.png" 
              alt="For You tab layout"
              annotations={forYouAnnotations}
              maxWidth={380}
              layout="side-right"
              boxShadow="0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)"
              markerColor={ACCENT_COLOR}
            />
          </div>
          <InsightBlock>
            <h4><span style={{ fontSize: '130%', verticalAlign: 'middle' }}>⚡️</span> Key Insight</h4>
            <p>Users told us they didn't want the top news personalized — they still valued editorial curation. But by introducing this separate, opt-in feed that surfaced content based on behavior and interests, we respected that expectation while unlocking deeper engagement. The data showed: <span style={{ background: '#fff7c2', borderRadius: '6px', padding: '0.1em 0.3em' }}>when you find right context for personalization it drives more breadth in discovery</span> -- this is a key lever for any product.  We're now working on interating the 'Top Stories' and 'For You' experiences into one feed.</p>
          </InsightBlock>

          

          <SubSectionTitle id="core-feed" data-counter="3/4">Prioritizing Scannability in the 'Top Stories' Feed</SubSectionTitle>
          <BodyText>I led the revamp of 'top stories' feed to address a key friction point: readers had to scroll through multiple screens to move beyond a single storyline. I partnered with editorial, design, and engineering to introduce a new system of visual hierarchy and narrative summaries that let users catch up quickly and navigate with ease. This shift made the experience feel more mobile-native and helped users stay informed without getting bogged down.</BodyText>
          <Annotation
            src="/images/case-study-1/reimagine-core-feed.jpg"
            alt="New feed with annotations"
            annotations={[
              { x: 30, y: 20, text: 'Clearer Hierarchy: We established a single-column layout with clear typography and spacing rules to guide the eye.' },
              { x: 75, y: 45, text: 'Visual Entry Points: Larger, more engaging images and varied formats break up the monotony of text headlines.' },
              { x: 25, y: 70, text: 'Topic & Author Tags: Surface-level metadata allows users to quickly identify relevant stories and dive deeper into topics they care about.' }
            ]}
            markerColor={ACCENT_COLOR}
          />
          <InsightBlock>
            <h4><span style={{ fontSize: '130%', verticalAlign: 'middle' }}>⚡️</span> Key Insight</h4>
            <p>Users described the feed as "overwhelming," but the deeper unlock came when we started thinking: <span style={{ background: '#fff7c2', borderRadius: '6px', padding: '0.1em 0.3em' }}>every time someone swipes, they're looking for something different</span>. That idea became a cross-team rallying cry — helping us shift from presenting everything to designing for rhythm and variety. It gave editorial stakeholders a way to embrace simplicity without feeling like they were compromising.</p>
          </InsightBlock>

          <SubSectionTitle id="visual-storytelling" data-counter="4/4">Expanding Visual Storytelling Flexibility</SubSectionTitle>
          <BodyText>
          I expanded the visual system to support more flexible storytelling formats beyond the default photo-headline layout. I identified four high-impact story types — live updates, immersive visuals, video, and photo-forward features — and worked across product and news design to introduce reusable modules tailored to each. This unlocked faster production, clearer visual hierarchy, and a more expressive design system across the app.
          </BodyText>
          
          
            {/*
            <Annotation
              src="/images/case-study-1/package-structure-temp.png"
              alt="Package structure showing modular component architecture"
              annotations={[
                {
                  x: 20,
                  y: 30,
                  text: "Modular component system allows for flexible content types"
                },
                {
                  x: 70,
                  y: 60,
                  text: "Reusable design tokens maintain visual consistency"
                }
              ]}
              markerColor={ACCENT_COLOR}
            />
            */}
          
          <FeatureGridWide>
            <FeatureCard>
              <StorytellingVisual>
                <img 
                  src="/images/case-study-1/live.png" 
                  alt="Live Updates feature showing fast-scrolling tickers"
                  style={{
                    maxWidth: '320px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px 8px 8px 8px',
                    boxShadow: '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  className="storytelling-image"
                />
              </StorytellingVisual>
              <StorytellingText>
                <h4>'Live Updates'</h4>
                <StorytellingTextSecondary>
                  Fast-scrolling tickers and live video package for developing stories. 
                </StorytellingTextSecondary>
              </StorytellingText>
            </FeatureCard>
            <FeatureCard>
               <StorytellingVisual>
                <img 
                  src="/images/case-study-1/vertical-vid.png" 
                  alt="Live Updates feature showing fast-scrolling tickers"
                  style={{
                    maxWidth: '320px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  className="storytelling-image"
                />
              </StorytellingVisual>
              <StorytellingText>
                <h4>Vertical video</h4>
                <StorytellingTextSecondary>More engaging formats that can be re-purposed on TikTok/Instagram.</StorytellingTextSecondary>
              </StorytellingText>
            </FeatureCard>
            <FeatureCard>
              <StorytellingVisual>
                <img 
                  src="/images/case-study-1/photo-gallery.png" 
                  alt="Photo galleries feature showing support for video, graphic explainers, and dynamic layouts"
                  style={{
                    maxWidth: '320px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  className="storytelling-image"
                />
              </StorytellingVisual>
              <StorytellingText>
                <h4>Photo galleries</h4>
                <StorytellingTextSecondary>Carousels to package a more visual story</StorytellingTextSecondary>
              </StorytellingText>
            </FeatureCard>
            <FeatureCard>
              <StorytellingVisual>
                <img 
                  src="/images/case-study-1/visual-presentation.png" 
                  alt="Immersive Visuals feature showing full-bleed visuals and swipeable carousels"
                  style={{
                    maxWidth: '320px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  className="storytelling-image"
                />
              </StorytellingVisual>
              <StorytellingText>
                <h4>Immersive Visuals</h4>
                <StorytellingTextSecondary>Custom presentations for designed stories</StorytellingTextSecondary>
              </StorytellingText>
            </FeatureCard>
          </FeatureGridWide>
          <InsightBlock>
            <h4><span style={{ fontSize: '130%', verticalAlign: 'middle' }}>⚡️</span> Key Insight</h4>
            <p>In testing, users showed stronger engagement when visual formats aligned with story types — confirming that <span style={{ background: '#fff7c2', borderRadius: '6px', padding: '0.1em 0.3em' }}>presentation is part of the product experience, not just editorial polish</span>. By introducing modular design patterns, we enabled greater storytelling flexibility while streamlining implementation across surfaces.</p>
          </InsightBlock>
        </Section>
        

        <Section id="outcomes" ref={sectionRefs.outcomes}>
          <SectionTitle>Outcomes &amp; Impact</SectionTitle>
          <OutcomesSection>
            <BodyText style={{ marginBottom: '2rem', color: 'white', opacity: 0.9 }}>
            Product metrics improved across three key levers: depth, breadth, and habit.  These gains matter because they are each strongly correlated with subscriber retention.
            </BodyText>
            <OutcomesGrid>
            <DataVizCardDark>
              <DataVizCardTitleDark>Casual readers returned more often</DataVizCardTitleDark>
              <DataVizCardRow>
                <DataVizCardLeft>
                  <DataVizLabelDark>Week-over-week return visits</DataVizLabelDark>
                  <DataVizMetricDark>+10%</DataVizMetricDark>
                  <DataVizChangeDark style={{ color: 'rgb(76, 175, 80)' }}><span style={{fontSize:'1.1rem'}}>↑</span> vs baseline (A/B test)</DataVizChangeDark>
                </DataVizCardLeft>
                <DataVizChartWrap>
                  <svg width="100%" height="110" viewBox="0 0 120 110" preserveAspectRatio="none" style={{ width: '100%', height: '110px', display: 'block' }}>
                    {/* Spark bars showing +15% trend */}
                    <rect x="20" y="75" width="8" height="20" fill="#2196F3" opacity="0.6" />
                    <rect x="35" y="72" width="8" height="23" fill="#2196F3" opacity="0.7" />
                    <rect x="50" y="68" width="8" height="27" fill="#2196F3" opacity="0.8" />
                    <rect x="65" y="65" width="8" height="30" fill="#2196F3" opacity="0.9" />
                    <rect x="80" y="60" width="8" height="35" fill="#2196F3" opacity="1" />
                  </svg>
                </DataVizChartWrap>
              </DataVizCardRow>
              <DataVizFootnoteDark>
                Habit Tiles boosted the % our audience using the app weekly by 10%
              </DataVizFootnoteDark>
            </DataVizCardDark>

            <DataVizCardDark>
              <DataVizCardTitleDark>Power users formed deeper habits</DataVizCardTitleDark>
              <DataVizCardRow>
                <DataVizCardLeft>
                  <DataVizLabelDark>Engagement lift</DataVizLabelDark>
                  <DataVizMetricDark>+42%</DataVizMetricDark>
                  <DataVizChangeDark style={{ color: 'rgb(76, 175, 80)' }}><span style={{fontSize:'1.1rem'}}>↑</span> from most active subscribers</DataVizChangeDark>
                </DataVizCardLeft>
                <DataVizChartWrap>
                  <svg width="100%" height="110" viewBox="0 0 120 110" preserveAspectRatio="none" style={{ width: '100%', height: '110px', display: 'block' }}>
                    {/* Spark bars showing +45% trend */}
                    <rect x="20" y="70" width="8" height="25" fill="#FF9800" opacity="0.6" />
                    <rect x="35" y="65" width="8" height="30" fill="#FF9800" opacity="0.7" />
                    <rect x="50" y="55" width="8" height="40" fill="#FF9800" opacity="0.8" />
                    <rect x="65" y="40" width="8" height="55" fill="#FF9800" opacity="0.9" />
                    <rect x="80" y="25" width="8" height="70" fill="#FF9800" opacity="1" />
                  </svg>
                </DataVizChartWrap>
              </DataVizCardRow>
              <DataVizFootnoteDark>
                Our most engaged users (&#x3e; 2x/week) spent an extra 1.2 days each week
              </DataVizFootnoteDark>
            </DataVizCardDark>

            <DataVizCardDark>
              <DataVizCardTitleDark>People could find what they wanted</DataVizCardTitleDark>
              <DataVizCardRow>
                <DataVizCardLeft>
                  <DataVizLabelDark>Content discoverability complaints</DataVizLabelDark>
                  <DataVizMetricDark>–40%</DataVizMetricDark>
                  <DataVizChangeDark style={{ color: 'rgb(76, 175, 80)' }}><span style={{fontSize:'1.1rem'}}>↓</span> within 1 quarter</DataVizChangeDark>
                </DataVizCardLeft>
                <DataVizChartWrap>
                  <svg width="100%" height="110" viewBox="0 0 120 110" preserveAspectRatio="none" style={{ width: '100%', height: '110px', display: 'block' }}>
                    {/* Spark bars showing -35% trend (complaints decreasing = good) */}
                    <rect x="20" y="35" width="8" height="60" fill="#009688" opacity="1" />
                    <rect x="35" y="40" width="8" height="55" fill="#009688" opacity="0.9" />
                    <rect x="50" y="45" width="8" height="50" fill="#009688" opacity="0.8" />
                    <rect x="65" y="50" width="8" height="45" fill="#009688" opacity="0.7" />
                    <rect x="80" y="55" width="8" height="40" fill="#009688" opacity="0.6" />
                  </svg>
                </DataVizChartWrap>
              </DataVizCardRow>
              <DataVizFootnoteDark>
                App reviews and customer care complaints dropped steeply
              </DataVizFootnoteDark>
            </DataVizCardDark>

            <DataVizCardDark>
              <DataVizCardTitleDark>Personalization expanded breadth of content discovery</DataVizCardTitleDark>
              <DataVizCardRow>
                <DataVizCardLeft>
                  <DataVizLabelDark>Personalization adoption</DataVizLabelDark>
                  <DataVizMetricDark>132%</DataVizMetricDark>
                  <DataVizChangeDark style={{ color: 'rgb(76, 175, 80)' }}><span style={{fontSize:'1.1rem'}}>↑</span> CTR on personalized content</DataVizChangeDark>
                </DataVizCardLeft>
                <DataVizChartWrap>
                  <svg width="100%" height="110" viewBox="0 0 120 110" preserveAspectRatio="none" style={{ width: '100%', height: '110px', display: 'block' }}>
                    {/* Spark bars showing +120% trend */}
                    <rect x="20" y="65" width="8" height="30" fill="#9C27B0" opacity="0.6" />
                    <rect x="35" y="60" width="8" height="35" fill="#9C27B0" opacity="0.7" />
                    <rect x="50" y="45" width="8" height="50" fill="#9C27B0" opacity="0.8" />
                    <rect x="65" y="25" width="8" height="70" fill="#9C27B0" opacity="0.9" />
                    <rect x="80" y="5" width="8" height="90" fill="#9C27B0" opacity="1" />
                  </svg>
                </DataVizChartWrap>
              </DataVizCardRow>
              <DataVizFootnoteDark>
                Engagement with personalized content soared, meaning people were finding more variety in their feed
              </DataVizFootnoteDark>
            </DataVizCardDark>
          </OutcomesGrid>
          </OutcomesSection>
          <BodyText>
            Beyond the metrics, the project created an internal shift: editorial leaders used this framework to revamp their curation of desktop homepage, we extended the "For You" system to articles and created an email newsletter.  Our product team is now experimenting with personalized push notifications.  Within product design, this effort formed the basis of a new pattern library for our app that is adopted across the team.  Most importantly, this project build trust across the oganization with product design. 
          </BodyText>

          <SubSectionTitle>Reflection</SubSectionTitle>
          <BodyText>
            This project redefined how we approached discovery; not just as a homepage problem, but as a system for guiding behavior, trust, and habit.  Here are some of the things I took away from this project and opportunities for future improvements:
          </BodyText>
          <WhyGrid>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(0deg)' }}>✦</ScanListBullet>Empathy and strategic framing can unlock culture change — in this case, we shifted editorial perspectives on personalization by rooting our approach in shared goals.</WhyItem>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(20deg)' }}>✦</ScanListBullet>Leading through ambiguity often means bridging cultures — product, editorial, and engineering — and giving each a voice in the outcome.</WhyItem>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(-20deg)' }}>✦</ScanListBullet>Prototypes helped us de-risk high-stakes conversations — by giving stakeholders clarity and confidence around unfamiliar design choices.</WhyItem>      
            <WhyItem><ScanListBullet style={{ transform: 'rotate(10deg)' }}>✦</ScanListBullet>I would have included marketing earlier -- for a product looking to return to growth, its important to tie the new launches to a clear customer message otherwise you miss an opportunity to change perception and build top of the funnel.</WhyItem>
            <WhyItem><ScanListBullet style={{ transform: 'rotate(-10deg)' }}>✦</ScanListBullet>One thing our data supported but we weren't able to explore was better dayparting: people have different needs at 8am on a weekday vs a Saturday afternoon.</WhyItem>
          </WhyGrid>
          
          <AIStatement>
            Statement on AI use: Every em dash in this case study is my own. I used ChatGPT for feedback on structure and Cursor to build this page.
          </AIStatement>
          {/* <NavRow>
            <NavButton onClick={() => navigate('/work')}>← Back to Work</NavButton>
            <NavButton onClick={() => navigate('/work/audio')}>Next: AI Listening →</NavButton>
          </NavRow> */}
        </Section>
      </CaseStudyContainer>
      <Footer ref={footerRef} />
    </>
  );
};

export default ContentDiscoveryCaseStudy; 