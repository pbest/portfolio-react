import React from 'react';
import styled from 'styled-components';

interface NavItemProps {
  active: boolean;
}

const NavWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  width: 100%;
  max-width: 800px;
  padding: 0 1rem;
  @media (max-width: 700px) {
    overflow-x: auto;
    max-width: 100vw;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(249,249,252,0.79);
  backdrop-filter: blur(10px);
  border-radius: 99px;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 0;
`;

const NavItem = styled.button<NavItemProps>`
  background-color: ${props => (props.active ? '#fff' : 'transparent')};
  color: #333;
  border: 1px solid ${props => (props.active ? '#e5e5e58c' : 'transparent')};
  box-shadow: ${props => (props.active ? '0px 4px 12px rgba(0, 0, 0, 0.08)' : 'none')};
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-family: 'PolySans', sans-serif;
  font-size: 0.9rem;
  font-weight: ${props => (props.active ? '500' : '300')};
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 0;

  &:hover {
    background-color: ${props => (props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
  }
`;

const LongTitle = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`;

const ShortTitle = styled.span`
  @media (min-width: 601px) {
    display: none;
  }
`;

interface AnchorNavProps {
  sections: { id: string; title: string; shortTitle: string }[];
  activeSection: string;
  isVisible: boolean;
  onNavItemClick: (id: string) => void;
}

const AnchorNav: React.FC<AnchorNavProps> = ({ sections, activeSection, isVisible, onNavItemClick }) => {
  return (
    <NavWrapper isVisible={isVisible}>
      <NavContainer>
        {sections.map(section => (
          <NavItem
            key={section.id}
            active={activeSection === section.id}
            onClick={() => onNavItemClick(section.id)}
          >
            <LongTitle>{section.title}</LongTitle>
            <ShortTitle>{section.shortTitle}</ShortTitle>
          </NavItem>
        ))}
      </NavContainer>
    </NavWrapper>
  );
};

export default AnchorNav; 