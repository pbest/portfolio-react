import React, { useState } from 'react';
import styled from 'styled-components';
import StickySection from '../ui/StickySection';

const MadlibGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 2rem;
    max-width: 95vw;
  }
`;

const MadlibContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  min-width: 0;
  @media (max-width: 800px) {
    align-items: center;
  }
`;

const MadlibSentence = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 1.2;
  @media (max-width: 800px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const MadlibLine = styled.span`
  display: block;
`;

const ShuffleButton = styled.button`
  background: rgba(255,255,255,0.15);
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1.5rem;
  align-self: flex-start;
  @media (max-width: 800px) {
    align-self: center;
  }
  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

const VisualContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const VisualImage = styled.img<{type: string}>`
  width: ${props => props.type === 'phone' ? '260px' : '100%'};
  max-width: ${props => props.type === 'phone' ? '260px' : '900px'};
  aspect-ratio: ${props => props.type === 'phone' ? '260/520' : '1440/800'};
  height: auto;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  background: #eee;
  object-fit: contain;
  @media (max-width: 800px) {
    width: 90vw;
    max-width: 350px;
  }
`;

// Structured dataset of madlibs with type only
const madlibs = [
  {
    product: 'a website',
    audience: 'students',
    benefit: 'learn faster',
    type: 'desktop',
  },
  {
    product: 'an app',
    audience: 'designers',
    benefit: 'work smarter',
    type: 'phone',
  },
  {
    product: 'a dashboard',
    audience: 'teams',
    benefit: 'collaborate better',
    type: 'desktop',
  },
  {
    product: 'a game',
    audience: 'everyone',
    benefit: 'have fun',
    type: 'desktop',
  },
  {
    product: 'an automation',
    audience: 'businesses',
    benefit: 'save time',
    type: 'desktop',
  },
  {
    product: 'a chatbot',
    audience: 'creators',
    benefit: 'create with AI',
    type: 'phone',
  },
  {
    product: 'a tool',
    audience: 'developers',
    benefit: 'be more productive',
    type: 'desktop',
  },
  {
    product: 'an experiment',
    audience: 'teachers',
    benefit: 'launch ideas',
    type: 'desktop',
  },
  {
    product: 'a prototype',
    audience: 'startups',
    benefit: 'build together',
    type: 'phone',
  },
];

function getPlaceholderUrl(type: string) {
  if (type === 'phone') {
    return 'https://placehold.co/260x520/222/fff?text=Phone+Mockup';
  } else {
    return 'https://placehold.co/1440x800/222/fff?text=Desktop+Screenshot';
  }
}

function getRandomIndex(arr: any[], exclude: number) {
  let idx = Math.floor(Math.random() * arr.length);
  // Avoid repeating the same value
  if (arr.length > 1 && idx === exclude) {
    idx = (idx + 1) % arr.length;
  }
  return idx;
}

interface MadlibStickyCardProps {
  index: number;
  total: number;
}

const MadlibStickyCard: React.FC<MadlibStickyCardProps> = ({ index, total }) => {
  const [current, setCurrent] = useState(0);

  const shuffle = () => {
    setCurrent(prev => getRandomIndex(madlibs, prev));
  };

  const madlib = madlibs[current];
  const imageUrl = getPlaceholderUrl(madlib.type);

  return (
    <StickySection index={index} total={total}>
      <MadlibGrid>
        <MadlibContainer>
          <ShuffleButton onClick={shuffle}>Shuffle</ShuffleButton>
          <MadlibSentence>
            <MadlibLine>we made <span style={{color:'#FFD166'}}>{madlib.product}</span></MadlibLine>
            <MadlibLine>for <span style={{color:'#4ECDC4'}}>{madlib.audience}</span></MadlibLine>
            <MadlibLine>that helps <span style={{color:'#FF6B6B'}}>{madlib.benefit}</span></MadlibLine>
          </MadlibSentence>
        </MadlibContainer>
        <VisualContainer>
          <VisualImage src={imageUrl} alt={madlib.product} type={madlib.type} />
        </VisualContainer>
      </MadlibGrid>
    </StickySection>
  );
};

export default MadlibStickyCard; 