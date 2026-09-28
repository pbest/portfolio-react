import React, { useEffect, useRef, useState } from 'react';

const NATURAL_W = 980;
const NATURAL_H = 680;

export function HabitTilesVisual({ contained = false }: { contained?: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [showTiles, setShowTiles] = useState([false, false, false, false]);
  const [moveToCenter, setMoveToCenter] = useState(false);
  const [fadeOutTiles, setFadeOutTiles] = useState([false, false, false, false]);
  const [scale, setScale] = useState(1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const trigger = () => setInView(true);
    window.addEventListener('habit-tiles-animation-trigger', trigger);
    return () => window.removeEventListener('habit-tiles-animation-trigger', trigger);
  }, []);

  useEffect(() => {
    if (!contained) return;
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / NATURAL_W) * 0.9);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [contained]);

  useEffect(() => {
    const target = contained ? frameRef.current : sceneRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
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
    observer.observe(target);
    return () => observer.unobserve(target);
  }, [contained]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowTiles([true, true, true, true]);
      return;
    }
    setShowTiles([false, false, false, false]);
    setMoveToCenter(false);
    setFadeOutTiles([false, false, false, false]);
    const timeouts: number[] = [];
    timeouts.push(
      window.setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          timeouts.push(
            window.setTimeout(() => {
              setShowTiles((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 400 * i)
          );
        }
        timeouts.push(window.setTimeout(() => setMoveToCenter(true), 2000));
      }, 300)
    );
    if (contained) {
      const fadeDone = 300 + 2000 + 350 + 90 * 3 + 700;
      timeouts.push(window.setTimeout(() => setRun((current) => current + 1), fadeDone + 2000));
    }
    return () => timeouts.forEach(clearTimeout);
  }, [inView, run, contained]);

  useEffect(() => {
    if (!moveToCenter) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timeouts: number[] = [];
    for (let i = 0; i < 4; i++) {
      timeouts.push(
        window.setTimeout(() => {
          setFadeOutTiles((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 350 + 90 * i)
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [moveToCenter]);

  const positions: React.CSSProperties[] = [
    { left: -250, top: '27%' },
    { left: -200, top: '44%' },
    { right: -250, top: '27%' },
    { right: -200, top: '45%' },
  ];

  const centerTransforms = [
    'scale(1) translate(250px, 0)',
    'scale(1) translate(200px, 0)',
    'scale(1) translate(-250px, 0)',
    'scale(1) translate(-200px, 0)',
  ];

  const scene = (
    <div ref={sceneRef} style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src="/images/case-study-1/habit-tiles-3.png"
        alt="The Washington Post app, with habit tiles around the feed"
        style={{ maxWidth: '430px', width: '100%', borderRadius: '16px', display: 'block', position: 'relative', zIndex: 2 }}
      />
      {['1', '2', '3', '4'].map((n, i) => {
        const baseStyle: React.CSSProperties = {
          position: 'absolute',
          width: 180,
          height: 'auto',
          borderRadius: 6,
          boxShadow: '0 0 0 1px #e6e6e6',
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
            alt=""
            style={{ ...baseStyle, ...animateStyle }}
          />
        );
      })}
    </div>
  );

  if (!contained) {
    return <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>{scene}</div>;
  }

  return (
    <div ref={frameRef} style={{ width: '100%' }}>
      <div style={{ height: NATURAL_H * scale, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            width: NATURAL_W,
            height: NATURAL_H,
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -NATURAL_W / 2,
            marginTop: -NATURAL_H / 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale * 0.92})`,
            transformOrigin: 'center center',
          }}
        >
          {scene}
        </div>
      </div>
    </div>
  );
}
