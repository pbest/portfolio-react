import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const colors = [
  '#111', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
  '#E67E22', '#2ECC71',
];

const StickySectionWrapper = styled(motion.section)<{ bgColor: string; z: number }>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ z }) => z};
  transition: background 0.3s;
`;

interface StickySectionProps {
  children: React.ReactNode;
  index: number;
  total: number;
}

const StickySection: React.FC<StickySectionProps> = ({ children, index, total }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Only scale effect, no opacity
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.65, 1], [0.98, 1, 1, 0.95]);

  const bgColor = colors[index % colors.length];

  return (
    <StickySectionWrapper
      ref={ref}
      bgColor={bgColor}
      z={index + 1}
      style={{ scale }}
    >
      {children}
    </StickySectionWrapper>
  );
};

export default StickySection; 