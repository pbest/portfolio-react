import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMotion } from './MotionContext';

const FooterContainer = styled.footer`
  background: #111;
  color: #eee;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
    text-align: left;
  }
    
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`;

const SettingsContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 4rem);
  max-width: 1200px;
  margin: 0 auto;
`;

const MotionToggle = styled.button`
  background: #333;
  color: #eee;
  border: 1px solid #555;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #444;
  }
`;

const AboutSection = styled.div`
  width: 1200px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

const AboutTitle = styled.h2`
  font-family: 'TT Ramillas', serif;
  font-size: 3.8rem;
  font-weight: 500;
  color: #fff;
  line-height: 1.2;
`;

const AboutBlurb = styled.p`
  font-family: 'TT Ramillas', serif;
  font-size: 2.66rem;
  font-weight: 500;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 2rem;
  
  a {
    color: #ccc;
    text-decoration: none;
    border-bottom: 1px dotted #ccc;
    
    &:hover {
      color: #fff;
      border-bottom-color: #fff;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ActionButton = styled.a`
  background: #333;
  color: #eee;
  border: 1px solid #555;
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #444;
    border-color: #666;
    color: #fff;
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><text y="16" font-size="16">↗️</text></svg>'), auto;
  }
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

const Footer = React.forwardRef<HTMLElement>((props, ref) => {
  const { isMotionReduced, toggleMotion } = useMotion();

  return (
    <FooterContainer ref={ref}>
      <AboutSection>
        <AboutTitle>Let's make something together.</AboutTitle>
        <AboutBlurb>
          <a href="mailto:hello@paul.best">hello@paul.best</a>
        </AboutBlurb>
        <ActionButtons>
          {/* Resume button moved to bottom */}
        </ActionButtons>
      </AboutSection>
      <SettingsContainer>
        {/* <MotionToggle onClick={toggleMotion}>
          {isMotionReduced ? "Enable Motion" : "Disable Motion"}
        </MotionToggle> */}
        <ActionButton href="/resume-PaulBest.pdf" target="_blank" rel="noopener noreferrer">
          View Resume
        </ActionButton>
      </SettingsContainer>
    </FooterContainer>
  );
});

export default Footer; 