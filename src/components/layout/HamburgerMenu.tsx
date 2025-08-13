import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';

type HamburgerMenuProps = { white?: boolean; open?: boolean; setOpen?: (open: boolean) => void };

const HamburgerButton = styled.button<{ white?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: 200;
  position: relative;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
  border-radius: 0;
  
  &:hover {
    .bar {
      width: 28px !important;
    }
  }
`;

const Bar = styled.span<{ short?: boolean; white?: boolean }>`
  display: block;
  height: 2px;
  width: ${({ short }) => (short ? '20px' : '28px')};
  margin: 4px 0;
  background: ${({ white }) => (white ? '#fff' : '#444')};
  border-radius: 2px;
  transition: 0.3s;
`;

const Scrim = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(8px);
  z-index: 140;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  cursor: pointer;
`;

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  transform-origin: top right;
  transform: ${({ open }) => (open ? 'scale(1)' : 'scale(0.7)')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: transform 0.32s cubic-bezier(.4,0,.2,1), opacity 0.22s cubic-bezier(.4,0,.2,1);
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  
  @media (min-width: 768px) {
    width: 25%;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    margin: 0.5rem 0.5rem 0.5rem 0;
    height: calc(100vh - 1rem);
    border-radius: 12px;
  }
`;

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-end;
`;

const MenuLink = styled(Link)<{ open: boolean; index: number }>`
  color: #000;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0.02em;
  font-weight: 600;
  font-family: 'TT Ramillas', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  transition-delay: ${({ open, index }) => (open ? `${0.2 + index * 0.1}s` : '0s')};
  &:hover {
    text-decoration: underline;
  }
`;

const MenuLinkExternal = styled.a<{ open: boolean; index: number }>`
  color: #000;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0.02em;
  font-weight: 600;
  font-family: 'TT Ramillas', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  transition-delay: ${({ open, index }) => (open ? `${0.2 + index * 0.1}s` : '0s')};
  &:hover {
    text-decoration: underline;
  }
`;

const TiltOverlay = React.forwardRef(function TiltOverlay(props: any, ref: any) {
  const { open, ...rest } = props;
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tiltRef.current && open) {
      VanillaTilt.init(tiltRef.current, {
        max: 3,
        speed: 800,
        glare: true,
        'max-glare': 0.1,
        scale: 1.0,
      });
      return () => {
        if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
          (tiltRef.current as any).vanillaTilt.destroy();
        }
      };
    }
  }, [open]);

  return <Overlay ref={node => {
    tiltRef.current = node as HTMLDivElement | null;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }} open={open} {...rest} />;
});

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ white, open: controlledOpen, setOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleSetOpen = setOpen || setInternalOpen;

  const handleClose = () => handleSetOpen(false);

  return (
    <>
      <HamburgerButton aria-label="Open navigation menu" onClick={() => handleSetOpen(!open)} white={white}>
        <Bar className="bar" white={white} style={{ 
          transform: open ? 'rotate(45deg) translateY(7px)' : 'none',
          width: open ? '28px' : '28px'
        }} />
        <Bar className="bar" short white={white} style={{ 
          transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none',
          width: open ? '28px' : '20px'
        }} />
      </HamburgerButton>
      <Scrim open={open} onClick={handleClose} />
      <Overlay open={open} onClick={handleClose}>
        <MenuLinks onClick={e => e.stopPropagation()}>
          <MenuLink to="https://paul.best" onClick={handleClose} open={open} index={0}>Home</MenuLink>
          <MenuLink to="https://paul.best/#work" onClick={handleClose} open={open} index={1}>Case Studies</MenuLink>
          <MenuLink to="https://paul.best/#about" onClick={handleClose} open={open} index={2}>About</MenuLink>
          <MenuLinkExternal href="/resume-PaulBest.pdf" target="_blank" rel="noopener noreferrer" onClick={handleClose} open={open} index={3}>Resume</MenuLinkExternal>
          <MenuLink to="https://paul.best/#contact" onClick={handleClose} open={open} index={4}>Contact</MenuLink>
        </MenuLinks>
      </Overlay>
    </>
  );
};

export default HamburgerMenu;