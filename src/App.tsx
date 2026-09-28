import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CaseStudyTemplate from './pages/CaseStudyTemplate';
import About from './pages/About';
import Resume from './pages/Resume';
import WorkIndex from './pages/WorkIndex';
import Contact from './pages/Contact';
import HamburgerMenu from './components/layout/HamburgerMenu';
import { MotionProvider } from './components/layout/MotionContext';
import ContentDiscoveryCaseStudy from './pages/case-studies/ContentDiscovery';
import WireframeHome from './pages/WireframeHome';

const AppContainer = styled.div<{ $home?: boolean }>`
  font-family: ${({ $home }) =>
    $home ? 'Arial, Helvetica, sans-serif' : "Georgia, 'Times New Roman', Times, serif"};
  width: 100%;
  margin: 0;
  padding: 0;
  background: ${({ $home }) => ($home ? 'transparent' : '#fff')};
  overflow-x: ${({ $home }) => ($home ? 'clip' : 'hidden')};
`;


const NavWrapper = styled.div<{ white?: boolean }>`
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  padding: 4rem 3rem 0 3rem;
  @media (max-width: 768px) {
    padding: 1.5rem 0 0 0;
  }
`;

const LogoSpace = styled.img<{ white?: boolean }>`
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-left: 2rem;
  @media (max-width: 768px) {
    padding-left: 1.5rem;
  }
`;

const MobileNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 2rem;
  @media (max-width: 768px) {
    padding-right: 1.5rem;
  }
`;



// Case study pages keep their existing templates.
const AudioCase = () => {
  const navigate = useNavigate();
  return (
    <CaseStudyTemplate
      title="AI-Powered Listening Experience"
      subtitle="Launched AI-generated audio across articles, increasing listen starts by 130% and expanding engagement."
      context={
        <>
          <span><strong>Company:</strong> The Washington Post</span>
          <span><strong>Role:</strong> Product Design Director</span>
          <span><strong>Team:</strong> 2 designers, with partners in AI/ML, platform engineering, and accessibility</span>
        </>
      }
      sections={[
        {
          title: "Background",
          content: (
            <p>
              We launched an AI-generated audio feature across articles, increasing listen starts by 130% and expanding how users engage with content — especially in passive and multitasking contexts.
            </p>
          ),
        },
        {
          title: "Challenge",
          content: (
            <p>
              How might we extend the reading experience into listening — without breaking trust or adding friction? This wasn't just about sticking a play button on the page. It required a new UI paradigm for passive engagement, clarity on audio attribution, and systems for accessibility, fallback, and future extensibility.
            </p>
          ),
        },
        {
          title: "Strategy & Approach",
          content: (
            <ul>
              <li>Collaborated with our in-house AI team to fine-tune text-to-speech models for tone, pacing, and clarity</li>
              <li>Designed and tested UI patterns for in-article players, mini players, and queue behavior across breakpoints</li>
              <li>Prioritized accessibility and performance — ensuring full screen-reader support and a &lt;200ms load time</li>
              <li>Prototyped interaction flows in Figma and ran task-based user testing across desktop and mobile</li>
              <li>Developed a framework for metadata tagging and fallback states to handle edge cases gracefully</li>
            </ul>
          ),
        },
        {
          title: "Outcome",
          content: (
            <ul>
              <li>+130% increase in listen starts after rollout</li>
              <li>AI listening adopted by ~25% of app users within the first 3 months</li>
              <li>Feedback cited ease of use, convenience while commuting, and increased content completion</li>
              <li>Now a core part of the Post's cross-platform strategy and ML roadmap</li>
            </ul>
          ),
          highlight: true,
        },
        {
          title: "Reflections",
          content: (
            <p>
              This project challenged my thinking about modality, trust, and multitasking. I learned how to lead product design for emerging tech — balancing novelty with UX fundamentals. It also deepened my belief that the best design work shows up in the details users don't have to think about.
            </p>
          ),
        },
      ]}
      onBack={() => navigate('/work/feed')}
      onNext={() => navigate('/work/system')}
      backLabel="Back: Discovery"
      nextLabel="Next: Design System"
    />
  );
};

const SystemCase = () => {
  const navigate = useNavigate();
  return (
    <CaseStudyTemplate
      title="Design Systems at Scale"
      subtitle="Built a design system adopted by 1,000+ engineering projects, improving velocity, accessibility, and collaboration."
      context={
        <>
          <span><strong>Company:</strong> The Washington Post</span>
          <span><strong>Role:</strong> Product Design Director</span>
          <span><strong>Team:</strong> 4 designers and 1 engineer, with collaboration from platform, accessibility, and brand</span>
        </>
      }
      sections={[
        {
          title: "Background",
          content: (
            <p>
              We built and launched a design system that enabled faster, more consistent product development across 1,000+ engineering projects — improving velocity, accessibility, and collaboration.
            </p>
          ),
        },
        {
          title: "Challenge",
          content: (
            <p>
              How might we build a flexible, scalable design system that empowers teams to move faster — and build better? This system had to serve dozens of teams with different needs — from investigative journalism tools to real-time election dashboards — while aligning to a unified visual and UX language.
            </p>
          ),
        },
        {
          title: "Strategy & Approach",
          content: (
            <ul>
              <li>Conducted an internal audit of design and code inconsistencies across major products</li>
              <li>Created component specs, usage guidance, and accessibility defaults to standardize implementation</li>
              <li>Co-developed tokenized styles in Figma and a modular React component library with engineering</li>
              <li>Launched an open-source version for external developer adoption and transparency</li>
              <li>Hosted monthly "System Studio" feedback sessions to keep teams aligned and included</li>
            </ul>
          ),
        },
        {
          title: "Outcome",
          content: (
            <ul>
              <li>Design system adopted by 1,000+ engineering projects in the first 12 months</li>
              <li>Reduced redundant design requests and dev effort for core components</li>
              <li>Improved accessibility compliance and QA handoff through standardized specs</li>
              <li>Became the backbone of the Post's editorial product suite and new vertical launches</li>
            </ul>
          ),
          highlight: true,
        },
        {
          title: "Reflections",
          content: (
            <p>
              This work reinforced the idea that craft isn't just visual polish — it's infrastructure. Building systems is about stewardship, listening, and trust. It's about creating shared tools that let great teams build even better things.
            </p>
          ),
        },
      ]}
      onBack={() => navigate('/work/audio')}
      onNext={() => navigate('/work')}
      backLabel="Back: AI Listening"
      nextLabel="Back to Work"
    />
  );
};
// --- End Case Study Pages ---

function App() {
  return (
          <Router basename="/">
      <MotionProvider>
        <AppContent />
      </MotionProvider>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const isHome = useLocation().pathname === '/';
  return (
    <AppContainer $home={isHome}>
      <ScrollToTop />
      <Routes>
        <Route
          path="/work/feed"
          element={
            <ContentDiscoveryCaseStudy
              renderNav={(navWhite, menuOpen, setMenuOpen) => {
                const useWhite = navWhite && !menuOpen;
                return (
                  <NavWrapper white={useWhite}>
                    <NavLeft>
                      <LogoSpace src="/images/logo-dark.png" alt="Paul Best Logo" white={useWhite} onClick={() => navigate('/')} />
                    </NavLeft>
                    <MobileNav>
                      <HamburgerMenu white={false} open={menuOpen} setOpen={setMenuOpen} />
                    </MobileNav>
                  </NavWrapper>
                );
              }}
            />
          }
        />
        <Route
          path="*"
          element={
            <>
              {!isHome && (
                <NavWrapper>
                  <NavLeft>
                    <LogoSpace src="/images/logo-dark.png" alt="Paul Best Logo" onClick={() => navigate('/')} />
                  </NavLeft>
                  <MobileNav>
                    <HamburgerMenu />
                  </MobileNav>
                </NavWrapper>
              )}
              <Routes>
                <Route path="/" element={<WireframeHome />} />
                <Route path="/work" element={<WorkIndex />} />
                <Route path="/about" element={<About />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/work/audio" element={<AudioCase />} />
                <Route path="/work/system" element={<SystemCase />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </AppContainer>
  );
}

export default App; 