import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Hero from './components/sections/Hero';
import ProjectList from './components/sections/ProjectList';
import Footer from './components/layout/Footer';
import CaseStudyTemplate from './pages/CaseStudyTemplate';
import About from './pages/About';
import Resume from './pages/Resume';
import WorkIndex from './pages/WorkIndex';
import Contact from './pages/Contact';
import HamburgerMenu from './components/layout/HamburgerMenu';
import VanillaTilt from 'vanilla-tilt';
import { MotionProvider, useMotion } from './components/layout/MotionContext';
import ContentDiscoveryCaseStudy from './pages/case-studies/ContentDiscovery';

const AppContainer = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #fff;
  overflow-x: hidden;
`;

const Spacer = styled.div`
  height: 100vh;
`;

const NavWrapper = styled.div<{ white?: boolean }>`
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  padding: 1.25rem 2rem 0 2.5rem;
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem 0 1.5rem;
  }
`;

const LogoSpace = styled.img<{ white?: boolean }>`
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 46px;
    height: 46px;
  }
`;

const LogoSpaceLarge = styled(LogoSpace)`
  width: 60px;
  height: 60px;
  @media (max-width: 768px) {
    width: 55.2px;
    height: 55.2px;
  }
`;

const NameText = styled.span`
  opacity: 0;
  margin-left: 0.5rem;
  font-family: 'Space Mono', 'Fira Mono', 'Menlo', 'monospace';
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-transform: none;
  transition: opacity 0.2s;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  &:hover ${NameText} {
    opacity: 1;
  }
`;

const MobileNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 1rem;
  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const NavLink = styled(Link)`
  color: #222;
  text-decoration: none;
  font-family: 'Space Mono', 'Fira Mono', 'Menlo', 'monospace';
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-transform: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PageContainer = styled.div`
  max-width: 85vw;
  margin: 0 auto;
  padding: 2rem 1rem 1rem 1rem;
  padding-left: 0;
`;

// --- Homepage Layout ---
const HomeHero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 4rem 0 0rem 0;
  padding-top: 10rem;
  min-height: 40vh;
  @media (max-width: 600px) {
    padding: 2rem 0 1rem 0;
  }
`;

const Headline = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 7vw;
  font-weight: 500;
  margin-bottom: 1rem;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #222;
`;

const Subhead = styled.p`
  font-family: 'TT Ramillas', serif;
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 2.5rem;
  max-width: 1000px;
  line-height: 1.6;
  opacity: 0.8;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  background: none;
  color: #222;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 14px;
  font-family: 'Space Mono', 'Fira Mono', 'Menlo', 'monospace';
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.18s;
  &:hover {
    text-decoration: underline;
  }
`;

const CaseStudyGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.5rem;
  margin: 2.5rem auto 4rem auto;
  margin-top: 0;
  max-width: 85vw;
  width: 100%;
  padding-top: 0;
  @media (max-width: 1200px) {
    max-width: 98vw;
    gap: 1.5rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CaseCard = styled(Link)<{ bg?: string }>`
  display: flex;
  flex-direction: column;
  background: ${({ bg }) => bg || '#222'};
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 0;
  text-decoration: none;
  color: #111;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 520px;
  overflow: hidden;
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.16);
    /* background: #111; */
  }
`;

const CardContent = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardVisual = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 0 0 1.25rem 1.25rem;
  margin-top: auto;
  overflow: hidden;

  img, svg {
    width: auto;
    height: 180%;
    object-fit: contain;
  }
`;

const CaseTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
  font-family: 'PolySans', sans-serif;
`;

const CaseSummary = styled.p`
  font-size: 1rem;
  color: #111;
  margin-bottom: 0.5rem;
`;

const QuoteSection = styled.section`
  margin: 4rem 0 0 0;
  padding: 2rem 0 0 0;
  border-top: 1px dashed #e0e0e0;
  text-align: center;
`;

const Quote = styled.blockquote`
  font-size: 1.4rem;
  font-style: italic;
  color: #555;
  margin: 0 auto;
  max-width: 600px;
`;

const CaseCardWithTilt: React.FC<{ to: string; bg?: string; children: React.ReactNode }> = ({ to, bg, children }) => {
  const tiltRef = useRef<HTMLAnchorElement>(null);
  const { isMotionReduced } = useMotion();

  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode && !isMotionReduced) {
      VanillaTilt.init(tiltNode, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.0, // No scale on hover
      });
      return () => {
        (tiltNode as any).vanillaTilt.destroy();
      };
    }
  }, [isMotionReduced]);

  return <CaseCard ref={tiltRef} to={to} bg={bg}>{children}</CaseCard>;
};

const HomepageBodyStyle = createGlobalStyle`
  html, body, #root {
    background-color: #fff !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HomepageBodyStyle />
      <AppContainer>
        <PageContainer>
          <HomeHero>
            <Headline>Paul Best</Headline>
            <Subhead>
              I'm a product design leader who specializes in discovery, personalization, and building design cultures rooted in craft. I've led product teams at The Washington Post and design studios alike, shipping thoughtful systems that drive habit, clarity, and delight.
            </Subhead>
          </HomeHero>
        </PageContainer>
        <CaseStudyGrid>
          <CaseCardWithTilt to="/work/feed" bg="linear-gradient(150deg, rgb(119, 120, 253), rgb(132 179 235) 69%)">
            <CardContent>
              <CaseTitle>Reimagining Content Discovery</CaseTitle>
              <CaseSummary>Personalized the app feed at The Washington Post, driving a 10% lift in habitual use and 42% fewer complaints.</CaseSummary>
              <span>→</span>
            </CardContent>
            <CardVisual>
              <img src="/images/phone-mockup.png" alt="Content Discovery case study mockup" />
            </CardVisual>
          </CaseCardWithTilt>
          <CaseCardWithTilt to="/work/audio" bg="#DFA4F1">
            <CardContent>
              <CaseTitle>AI-Powered Listening Experience</CaseTitle>
              <CaseSummary>Launched AI-generated audio across articles, increasing listen starts by 130% and expanding engagement.</CaseSummary>
              <span>→</span>
            </CardContent>
            <CardVisual>
              <img src="/images/phone-mockup.png" alt="AI-Powered Listening case study mockup" />
            </CardVisual>
          </CaseCardWithTilt>
          <CaseCardWithTilt to="/work/system" bg="linear-gradient(164deg, rgb(246 137 108), rgb(255 184 147) 69%)">
            <CardContent>
              <CaseTitle>Design Systems at Scale</CaseTitle>
              <CaseSummary>Built a design system adopted by 1,000+ engineering projects, improving velocity, accessibility, and collaboration.</CaseSummary>
              <span>→</span>
            </CardContent>
            <CardVisual>
              <img src="/images/phone-mockup.png" alt="Design Systems case study mockup" />
            </CardVisual>
          </CaseCardWithTilt>
        </CaseStudyGrid>
        <PageContainer>
          <QuoteSection>
            <Quote>"Protecting craft while aligning to outcomes."</Quote>
          </QuoteSection>
        </PageContainer>
        <Footer />
      </AppContainer>
    </>
  );
};

// --- End Homepage Layout ---

// --- Case Study Pages ---
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

function AppContent() {
  const navigate = useNavigate();
  return (
    <AppContainer>
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
                      <LogoSpace src={useWhite ? "/images/logo-light.png" : "/images/logo-dark.png"} alt="Paul Best Logo" white={useWhite} onClick={() => window.location.href = 'https://paul.best'} />
                    </NavLeft>
                    <MobileNav>
                      <HamburgerMenu white={useWhite} open={menuOpen} setOpen={setMenuOpen} />
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
              <NavWrapper>
                <NavLeft>
                  <LogoSpace src="/images/logo-dark.png" alt="Paul Best Logo" onClick={() => window.location.href = 'https://paul.best'} />
                </NavLeft>
                <MobileNav>
                  <HamburgerMenu />
                </MobileNav>
              </NavWrapper>
              <Routes>
                <Route path="/" element={<Homepage />} />
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