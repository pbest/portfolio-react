import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const AnnotationWrapper = styled.div`
  position: relative;
  width: 100%;
  line-height: 0; /* a fix to remove mysterious space below image */
  max-width: 100vw;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  /* border: 1px solid #ddd; */
`;

const MarkerButton = styled.button<{ layout?: 'overlay' | 'side-right' | 'side-left'; visible: boolean; markerColor?: string }>`
  position: absolute;
  width: 28px;
  height: 28px;
  background-color: ${({ markerColor }) => markerColor || '#007AFF'};
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s, background-color 0.2s, opacity 0.4s;
  border-radius: 0 50% 50% 50%;
  transform: translate(-50%, -50%) rotate(${props => props.layout === 'side-left' ? '180deg' : '270deg'}) scale(${props => props.visible ? 1 : 0.7});
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};

  &:hover {
    transform: translate(-50%, -50%) rotate(${props => props.layout === 'side-left' ? '180deg' : '270deg'}) scale(1.1);
    background-color: ${({ markerColor }) => markerColor || '#0056b3'};
  }
`;

const Popover = styled.div<{ layout?: 'overlay' | 'side-right' | 'side-left' }>`
  position: absolute;
  background-color: #222;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  width: 280px;
  font-family: 'Polysans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
  text-align: left;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.open {
    visibility: visible;
    opacity: 1;
  }
  
  ${({ layout }) => layout === 'side-right'
    ? css`
        left: calc(100% + 15px);
        top: 50%;
        transform: translateY(-50%);
      `
    : layout === 'side-left'
    ? css`
        right: calc(100% + 15px);
        top: 50%;
        transform: translateY(-50%);
      `
    : css`
        left: 50%;
        top: -10px;
        transform: translate(-50%, -100%);
      `
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

interface AnnotationInfo {
  x: number;
  y: number;
  text: string;
}

interface MarkerProps {
  annotation: AnnotationInfo;
  isOpen: boolean;
  onToggle: () => void;
  layout: 'overlay' | 'side-right' | 'side-left';
  visible: boolean;
  markerColor?: string;
}

const Marker: React.FC<MarkerProps> = ({ annotation, isOpen, onToggle, layout, visible, markerColor }) => {
  const markerStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${annotation.y}%`,
    left: layout === 'side-right' ? 'calc(100% + 20px)' : layout === 'side-left' ? '-20px' : `${annotation.x}%`,
    transform: layout === 'side-right' ? 'translateY(-50%)' : layout === 'side-left' ? 'translateY(-50%)' : 'translate(-50%, -50%)',
  };

  return (
    <div style={markerStyle}>
      <MarkerButton onClick={onToggle} aria-label="Show annotation" layout={layout} visible={visible} markerColor={markerColor}></MarkerButton>
      <Popover className={isOpen ? 'open' : ''} layout={layout}>
        <CloseButton onClick={onToggle} aria-label="Close annotation">&times;</CloseButton>
        {annotation.text}
      </Popover>
    </div>
  );
};

interface AnnotationProps {
  src: string;
  alt: string;
  annotations: AnnotationInfo[];
  maxWidth?: number;
  layout?: 'overlay' | 'side-right' | 'side-left';
  boxShadow?: string;
  markerColor?: string;
}

const Annotation: React.FC<AnnotationProps> = ({ src, alt, annotations, maxWidth, layout = 'overlay', boxShadow, markerColor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [markersInView, setMarkersInView] = useState(false);
  const [visibleMarkers, setVisibleMarkers] = useState(annotations.map(() => false));
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for image in view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMarkersInView(true);
      },
      { threshold: 0.5 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => {
      if (wrapperRef.current) observer.unobserve(wrapperRef.current);
    };
  }, []);

  // Staggered marker appearance
  useEffect(() => {
    if (markersInView) {
      let timeouts: NodeJS.Timeout[] = [];
      annotations.forEach((_, i) => {
        timeouts.push(setTimeout(() => {
          setVisibleMarkers(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 250 * i));
      });
      return () => timeouts.forEach(clearTimeout);
    }
  }, [markersInView, annotations.length]);

  return (
    <AnnotationWrapper ref={wrapperRef} style={{ maxWidth: maxWidth ? `${maxWidth}px` : '100%', margin: maxWidth ? '2rem auto' : '2rem 0' }}>
      <Image src={src} alt={alt} style={boxShadow ? { boxShadow } : undefined} />
      {annotations.map((annotation, index) => (
        <Marker
          key={index}
          annotation={annotation}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(prevIndex => prevIndex === index ? null : index)}
          layout={layout}
          visible={visibleMarkers[index]}
          markerColor={markerColor}
        />
      ))}
    </AnnotationWrapper>
  );
};

export default Annotation; 