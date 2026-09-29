import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { HabitTilesVisual } from '../components/HabitTilesVisual';

type ThemeChoice = 'system' | 'light' | 'dark';

type Entry = {
  id: string;
  date: string;
  name: string;
  href?: string;
  body: string;
  note?: string;
  figure: 'placeholder' | 'video' | 'image' | 'habit';
  placeholder?: string;
  image?: string;
  imageAlt?: string;
  field?: string;
  stage?: 'phone' | 'panel';
};

const featured: Entry[] = [
  {
    id: 'rippling-ai',
    date: '2026',
    name: 'Rippling AI',
    href: 'https://www.rippling.com/ai',
    body: 'I defined the trust model for AI actions in Rippling: a structured proposal administrators can inspect, revise, and explicitly approve before a change reaches the system of record. I designed the review states and the handoff from conversation to the resulting product object. The point was that an automated change should feel as deliberate as one a person would make by hand.',
    note: '[Add launch status or a measured outcome once verified.]',
    figure: 'placeholder',
    placeholder: '[Rippling AI product image or paired proposal → approval frames]',
  },
  {
    id: 'rippling-onboarding',
    date: '2026',
    name: 'Document-based onboarding',
    body: 'In a CEO-priority sprint, I set the initial direction for turning company documents into a reviewed setup flow, so implementation could be more self-service. I partnered with the designer who carried it into detailed implementation and scaled it to more cases. The early frames were about what an administrator should check before a company is considered set up.',
    note: '[Show original sprint artifacts beside the shipped evolution. Credit the partner designer’s later bulk remediation and scaling work; add validated outcomes when available.]',
    figure: 'placeholder',
    placeholder: '[Initial upload, extracted profile, and review flow from my sprint]',
  },
  {
    id: 'rippling-mobile',
    date: '2025–2026',
    name: 'Personalized mobile home',
    body: 'I set the direction for a role-aware Home and designed the widget framework around each person’s work and product mix. I prototyped manager, employee, and admin views so the team could test the system across real scenarios. Home had to feel specific to the job in front of you, not a generic list of every Rippling product. A manager and an employee should open the same app and see different work.',
    note: '[Add observed customer signal or product outcome.]',
    figure: 'placeholder',
    placeholder: '[Two or three real role-based mobile Home screens]',
  },
];

const postWork: Entry[] = [
  {
    id: 'post-app',
    date: '2024–2025',
    name: 'Native app redesign',
    href: '/work/feed',
    body: 'I led the redesign of The Post’s core app feed and set the direction for personalized discovery. Week-over-week habitual use grew 10%, and content-discovery complaints fell 42% in one quarter. Habit Tiles gave readers a way back into topics, writers, and stories they had already started, without burying the news. The feed had to feel personal and still be a newspaper.',
    figure: 'habit',
  },
  {
    id: 'audio',
    date: '2022–2025',
    name: 'AI-powered audio\u00A0articles',
    body: 'I led the design of article listening and a dedicated audio destination, bringing AI narration into The Post’s reading experience. Audio starts grew 130%, and listening reached roughly a quarter of the audience. The work covered the player, the listening screen, and how a story hands off from reading to hearing. Listening had to feel like The Post, not a podcast app bolted on the side.',
    figure: 'image',
    image: '/images/wireframe/washington-post-audio-listening-screens.jpg',
    imageAlt: 'Washington Post audio listening screens',
    field: '#931a52',
    stage: 'phone',
  },
  {
    id: 'design-system',
    date: '2022–2025',
    name: 'Washington Post Design System',
    href: 'https://build.washingtonpost.com/foundations/color/',
    body: 'I sponsored and led design for an open-source system spanning consumer and newsroom products. I brought teams onto shared foundations that were adopted in more than 1,000 engineering projects. The point was a common language for type, color, and components, so a story and a tool could feel like the same Post. Shared parts only matter if a newsroom team will actually use them.',
    figure: 'image',
    image: '/images/wireframe/washington-post-design-system-interface.jpg',
    imageAlt: 'Washington Post design system interface',
    field: '#0e4d56',
    stage: 'panel',
  },
  {
    id: 'post-org',
    date: '2020–2025 · The Washington Post',
    name: 'Product design organization',
    body: 'I designed a four-team product design structure as The Post shifted toward mobile, grew the team from four to more than 30, and created technology job levels where none existed. I then led the organization across consumer products and newsroom tools. The structure had to make room for both craft and the pace of a newsroom. Levels gave people a path that the old newsroom titles never described.',
    figure: 'placeholder',
    placeholder: '[Organization structure, team evolution, or role and leveling artifacts]',
  },
  {
    id: 'publishing',
    date: '2020–2025',
    name: 'Newsroom publishing tools',
    body: 'I led the designers responsible for the tools journalists use to plan, write, edit, and publish across formats. I worked to connect those products into more coherent newsroom workflows. A story should move from assignment to publish without the tools feeling like separate products. The newsroom should not have to learn a new product for every step of the same story.',
    note: '[Confirm product framing, representative visual, and outcome.]',
    figure: 'placeholder',
    placeholder: '[Publishing suite image from approved work]',
  },
  {
    id: 'cooking',
    date: 'The Washington Post',
    name: 'Washington Post cooking',
    body: '[Add the cooking product I owned, the part I designed, and what shipped.]',
    figure: 'placeholder',
    placeholder: '[Cooking product image]',
  },
];

const agencyWork: Entry[] = [
  {
    id: 'settle-in',
    date: '2019–2020',
    name: 'Settle In',
    body: 'I helped design a mobile companion for people resettling in the U.S., working with the State Department and IRC. Videos, lessons, and progress had to be useful in the first days after arrival, when there is little time to learn a new interface.',
    figure: 'image',
    image: '/images/wireframe/settle-in-mobile-app.jpg',
    imageAlt: 'Settle In mobile app',
  },
  {
    id: 'san-jose',
    date: '2020',
    name: 'San Jose resident assistant',
    body: 'I worked with San Jose communities and city data to shape an SMS and web assistant that helped residents find services in multiple languages. Answers came from the city’s own information, in the channel people already used.',
    figure: 'image',
    image: '/images/wireframe/san-jose-resident-assistant-interface.jpg',
    imageAlt: 'San Jose resident assistant interface',
  },
  {
    id: 'accion',
    date: '2018–2019',
    name: 'Accion',
    body: 'As UX director, I helped reshape thousands of pages across Accion’s sites around its financial-inclusion mission. Recognized as a 2019 Webby honoree, the redesign gave the mission one structure so a visitor could move from the story to the work.',
    figure: 'image',
    image: '/images/wireframe/accion-website-redesign.jpg',
    imageAlt: 'Accion website redesign',
  },
  {
    id: 'nyp',
    date: '2019',
    name: 'NewYork-Presbyterian',
    body: 'I helped lead the redesign of NewYork-Presbyterian’s web experience, bringing hundreds of hospitals and outpatient locations into a clearer interface. Patients needed to find a doctor, a location, or a service without learning the org chart.',
    figure: 'image',
    image: '/images/wireframe/newyork-presbyterian-web-experience.jpg',
    imageAlt: 'NewYork-Presbyterian web experience',
  },
  {
    id: 'mbk',
    date: '2018',
    name: 'My Brother’s Keeper',
    body: 'I helped prototype a city-data platform with Bloomberg.org and the Obama Foundation so educators and policymakers could compare local disparities. It later launched in Pittsburgh. Two neighborhoods had to sit next to each other without a statistician in the room.',
    figure: 'image',
    image: '/images/wireframe/my-brother-s-keeper-data-platform.jpg',
    imageAlt: "My Brother's Keeper data platform",
  },
];

const darkVars = `
  --bg: #000;
  --text-strong: rgb(181, 181, 181);
  --text-medium: rgb(139, 139, 139);
  --text-light: rgb(95, 95, 95);
  --surface: #121212;
  --rule: #303030;
  --intro-title: rgb(201, 201, 201);
  --intro-body: rgb(136, 136, 136);
  --intro-nav: rgb(194, 194, 194);
  --link-line: rgb(255 255 255 / 20%);
`;

const HomeGlobals = createGlobalStyle<{ $theme: ThemeChoice }>`
  html, body, #root {
    background: ${({ $theme }) => ($theme === 'dark' ? '#000' : $theme === 'light' ? '#fff' : 'var(--home-canvas, #fff)')} !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  @media (prefers-color-scheme: dark) {
    html, body, #root {
      background: ${({ $theme }) => ($theme === 'light' ? '#fff' : '#000')} !important;
    }
  }
  html {
    scroll-behavior: smooth;
  }
  @media (min-width: 1100px) {
    html {
      scroll-snap-type: y proximity;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
      scroll-snap-type: none;
    }
  }
`;

const Page = styled.div<{ $theme: ThemeChoice }>`
  --bg: #fff;
  --ink: rgb(51, 51, 51);
  --text-strong: color-mix(in srgb, var(--ink) 93%, white);
  --text-medium: color-mix(in srgb, var(--ink) 77%, white);
  --text-light: color-mix(in srgb, var(--ink) 56%, white);
  --surface: #f6f6f6;
  --rule: #dedede;
  --type-reading: 18px;
  --type-support: 15px;
  --type-small: 13px;
  --intro-title: var(--ink);
  --intro-body: color-mix(in srgb, var(--ink) 76%, white);
  --intro-nav: color-mix(in srgb, var(--ink) 98%, white);
  --link-line: rgb(0 0 0 / 20%);

  max-width: 790px;
  margin: auto;
  padding: 0 22px;
  background: var(--bg);
  color: var(--text-medium);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;

  ${({ $theme }) => $theme === 'dark' && darkVars}
  @media (prefers-color-scheme: dark) {
    ${({ $theme }) => $theme === 'system' && darkVars}
  }

  a {
    color: inherit;
    text-underline-offset: 4px;
  }

  h1, h2, h3, p, li {
    text-wrap: pretty;
  }

  .mast {
    position: relative;
    z-index: 210;
    margin-top: 0;
    padding: max(28px, env(safe-area-inset-top, 0px)) 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    width: 40.5px;
    height: 40.5px;
    display: grid;
    place-items: center;
  }

  .logo-mark {
    display: block;
    width: 40.5px;
    height: 40.5px;
  }

  .logo-mark circle {
    opacity: 1;
    transition:
      fill 280ms cubic-bezier(0.23, 1, 0.32, 1),
      opacity 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  &.past-hero .logo-mark circle {
    opacity: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    &.past-hero .logo:hover .logo-mark circle,
    &.past-hero .logo:focus-visible .logo-mark circle {
      opacity: 1;
    }
  }

  @keyframes load-in {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mast .logo,
  .rail .logo,
  .rail-nav a,
  .intro h1,
  .hero-blurb {
    animation: load-in 0.5s ease both;
  }

  .rail-nav a:nth-child(1) {
    animation-delay: 0.3s;
  }

  .rail-nav a:nth-child(2) {
    animation-delay: 0.35s;
  }

  .rail-nav a:nth-child(3) {
    animation-delay: 0.4s;
  }

  .hero-blurb {
    animation-delay: 35ms;
  }

  @media (prefers-reduced-motion: reduce) {
    .logo-mark circle,
    .mast .logo,
    .rail .logo,
    .rail-nav a,
    .intro h1,
    .hero-blurb {
      transition: none;
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  .logo .logo-light {
    display: none;
    filter: brightness(0.85);
  }

  .logo .logo-dark {
    display: block;
  }

  ${({ $theme }) =>
    $theme === 'dark' &&
    `
    .logo .logo-dark { display: none; }
    .logo .logo-light { display: block; }
  `}

  @media (prefers-color-scheme: dark) {
    ${({ $theme }) =>
      $theme === 'system' &&
      `
      .logo .logo-dark { display: none; }
      .logo .logo-light { display: block; }
    `}
  }

  .menu-button {
    position: relative;
    z-index: 1;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    background: transparent;
    display: block;
    cursor: pointer;
  }

  .menu-button i {
    position: absolute;
    top: 50%;
    right: 0;
    width: 22px;
    height: 1.5px;
    margin-top: -0.75px;
    background: var(--text-strong);
    transform-origin: center;
    transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu-button i:first-child {
    transform: translateY(-4px);
  }

  .menu-button i:last-child {
    transform: translateY(4px) scaleX(0.72);
  }

  .menu-button.open i:first-child {
    transform: rotate(45deg);
  }

  .menu-button.open i:last-child {
    transform: rotate(-45deg);
  }

  .takeover {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: var(--bg);
    color: var(--text-strong);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 6rem 22px max(36px, calc(env(safe-area-inset-bottom, 0px) + 28px));
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 280ms cubic-bezier(0.23, 1, 0.32, 1),
      visibility 280ms;
  }

  .takeover.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .takeover-links {
    display: grid;
    justify-items: end;
    gap: 0.35rem;
  }

  .takeover-links a {
    font-family: 'TT Ramillas', ui-serif, Garamond, serif;
    font-size: clamp(2rem, 9vw, 3rem);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text-strong);
    text-decoration: none;
    opacity: 0;
    transform: translateX(32px);
    transition:
      opacity 320ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 320ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .takeover.open .takeover-links a {
    opacity: 1;
    transform: translateX(0);
  }

  .takeover.open .takeover-links a:nth-child(2) {
    transition-delay: 50ms;
  }

  .takeover.open .takeover-links a:nth-child(3) {
    transition-delay: 100ms;
  }

  .takeover-theme {
    margin-top: 2.75rem;
    display: flex;
    gap: 1.25rem;
  }

  .takeover-theme button {
    border: 0;
    background: transparent;
    padding: 0;
    font: inherit;
    font-size: 15px;
    color: var(--text-light);
    cursor: pointer;
  }

  .takeover-theme button[aria-pressed='true'] {
    color: var(--text-strong);
  }

  .theme-toggle {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .menu-button i,
    .takeover,
    .takeover-links a {
      transition: none;
    }
  }

  .intro {
    box-sizing: border-box;
    min-height: calc(100svh - 88px);
    padding: 16px 0 32px;
    margin-bottom: 0;
    border-bottom: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .intro h1 {
    max-width: 11em;
    margin: 0;
    font-size: 26px;
    font-weight: 400;
    line-height: 1.35;
    letter-spacing: -0.025em;
    color: var(--text-medium);
  }

  .intro h1 strong {
    font-family: 'TT Ramillas', ui-serif, Garamond, serif;
    font-weight: 500;
    color: var(--text-strong);
  }

  .hero-blurb {
    max-width: 700px;
    margin: 20px 0 0;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.012em;
    color: var(--text-medium);
  }

  .hero-blurb p {
    margin: 0;
  }

  .hero-blurb p + p {
    margin-top: 1em;
  }

  .keep {
    white-space: nowrap;
  }

  .rippling {
    color: inherit;
    text-decoration-line: underline;
    text-decoration-color: var(--link-line);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.14em;
  }

  .rail {
    display: none;
  }

  #work,
  #about,
  #contact {
    scroll-margin-top: 72px;
  }

  .stream {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .work-stream {
    padding-top: 70px;
  }

  .entry {
    padding: 0;
    margin-bottom: 108px;
  }

  .date {
    color: var(--text-light);
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 14px;
  }

  .statement {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.625;
    letter-spacing: -0.012em;
    color: var(--text-medium);
  }

  .statement .name {
    color: var(--text-strong);
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: #d8d8d8;
    text-decoration-thickness: 2px;
    text-underline-offset: 5px;
  }

  .statement .name.unlinked {
    cursor: default;
    text-decoration: none;
  }

  .entry-name {
    margin: 0;
    font-family: 'TT Ramillas', ui-serif, Garamond, serif;
    font-size: 26px;
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: var(--text-strong);
    text-wrap: pretty;
  }

  .entry-name .name,
  .entry-name .name.unlinked {
    color: inherit;
    font-weight: inherit;
    text-decoration: none;
  }

  .entry-name a.name {
    text-decoration-line: underline;
    text-decoration-color: var(--link-line);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.14em;
  }

  .entry-body {
    margin: 14px 0 0;
    font-size: 15px;
    line-height: 1.5;
    letter-spacing: -0.012em;
    color: var(--text-medium);
    text-wrap: pretty;
  }

  .work-image {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 8px;
    object-fit: contain;
    background: var(--surface);
  }

  .habit-stage {
    margin: 48px 0 0;
    background: #e1edff;
    border-radius: 8px;
    overflow: hidden;
  }

  .color-stage {
    margin: 48px 0 0;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .color-stage img {
    display: block;
    height: auto;
    object-fit: contain;
    transform: translateY(8%);
  }

  .color-stage img.phone {
    width: min(58%, 280px);
    border-radius: 12px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
  }

  .color-stage.align-end {
    justify-content: flex-end;
  }

  .color-stage img.panel {
    width: min(78%, 820px);
    border-radius: 12px 0 0 0;
    box-shadow: -16px 0 36px rgba(0, 0, 0, 0.12);
  }

  .work-image-wrap {
    margin: 38px 0 0;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    background: var(--surface);
    display: grid;
    place-items: center;
  }

  .work-image-wrap.placeholder {
    border: 1px solid var(--rule);
    text-align: center;
    color: var(--text-light);
    padding: 30px;
    font-size: var(--type-support);
  }

  .work-image-wrap.video {
    padding: 22px;
  }

  .work-image-wrap.video video {
    max-height: 100%;
    max-width: 100%;
    display: block;
  }

  .editorial-note {
    color: var(--text-light);
    font-size: var(--type-small);
    line-height: 1.45;
    margin: 10px 0 0;
  }

  .build-note {
    padding: 0 0 72px;
    max-width: 650px;
    font-size: 16px;
    line-height: 1.5;
    color: var(--text-medium);
  }

  .build-note p {
    margin: 0;
  }

  .build-note strong {
    color: var(--text-strong);
  }

  .divider {
    border-top: 1px solid var(--rule);
    padding: 31px 0 100px;
  }

  .history-rule {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 0 0 40px;
    width: 100%;
  }

  .post-stream > .entry:last-child {
    margin-bottom: 48px;
  }

  .agency-grid {
    display: grid;
    gap: 40px 24px;
  }

  .entry-compact .work-image-wrap,
  .entry-compact .color-stage,
  .entry-compact .habit-stage {
    margin: 0 0 14px;
  }

  .entry-compact .date {
    margin-bottom: 4px;
    font-size: 13px;
  }

  .entry-compact .entry-name {
    font-size: 26px;
  }

  .entry-compact .entry-body {
    margin-top: 8px;
    font-size: 15px;
    line-height: 1.45;
  }

  .divider h2 {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-light);
    margin: 0 0 31px;
    line-height: 1.5;
  }

  .work-index {
    display: grid;
    gap: 48px;
  }

  .index-company {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
    color: var(--text-strong);
    white-space: nowrap;
  }

  .index-role {
    font-size: 14px;
    line-height: 1.45;
    color: var(--text-light);
    margin: 5px 0 23px;
  }

  .index-links {
    display: grid;
    gap: 9px;
    font-size: 16px;
    line-height: 1.4;
    color: var(--text-medium);
  }

  .index-links a {
    display: block;
    width: max-content;
    max-width: 100%;
    text-decoration: underline;
    text-decoration-color: var(--rule);
    text-underline-offset: 4px;
  }

  .about {
    border-top: 1px solid var(--rule);
    padding: 32px 0 90px;
  }

  .about h2 {
    color: var(--text-strong);
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.025em;
    margin: 0 0 18px;
  }

  .about p {
    color: var(--text-medium);
    font-size: 15px;
    line-height: 1.5;
    max-width: 570px;
    margin: 0;
  }

  .contact {
    position: relative;
    background: #252525;
    color: #fff;
    padding: 70px 0 75px;
    isolation: isolate;
  }

  .contact:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    background: #252525;
  }

  .contact h2 {
    font-size: 32px;
    line-height: 1.16;
    letter-spacing: -0.035em;
    margin: 0 0 24px;
    color: #fff;
  }

  .contact a {
    font-size: var(--type-reading);
    color: #fff;
  }

  .contact p {
    font-size: var(--type-support);
    color: #bdbdbd;
    margin: 55px 0 0;
  }

  .footer {
    border-top: 1px solid var(--rule);
    padding: 25px 0 40px;
    color: var(--text-light);
    font-size: var(--type-small);
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }

  .footer a {
    color: var(--text-light);
  }

  ${({ $theme }) =>
    $theme === 'dark' &&
    `
    .contact, .contact:before { background: #111; }
    .contact a { color: var(--intro-title); }
  `}

  @media (prefers-color-scheme: dark) {
    ${({ $theme }) =>
      $theme === 'system' &&
      `
      .contact, .contact:before { background: #111; }
      .contact a { color: var(--intro-title); }
    `}
  }

  @media (min-width: 700px) {
    padding: 0 42px;

    .intro {
      padding: 20vh 0 45px;
    }

    .intro h1 {
      max-width: 735px;
      font-size: 28px;
      line-height: 1.35;
      letter-spacing: -0.02em;
    }

    .entry {
      margin-bottom: 125px;
    }

    .date {
      font-size: var(--type-support);
    }

    .divider h2 {
      font-size: var(--type-small);
      letter-spacing: 0;
      text-transform: none;
    }

    .about h2 {
      font-size: var(--type-reading);
      letter-spacing: 0;
    }

    .index-row {
      display: grid;
      grid-template-columns: 44% 1fr;
      gap: 24px;
    }

    .index-role {
      margin-bottom: 0;
    }

    .index-links,
    .about p,
    .build-note {
      font-size: var(--type-reading);
      line-height: 1.625;
    }

    .contact h2 {
      font-size: clamp(26px, 5vw, 36px);
    }

    .agency-grid {
      grid-template-columns: 1fr 1fr;
      column-gap: 56px;
      row-gap: 36px;
    }

    .agency-grid .entry {
      margin-bottom: 0;
    }
  }

  @media (min-width: 1100px) {
    max-width: none;
    padding: 0;

    .mast,
    .takeover {
      display: none;
    }

    .theme-toggle {
      display: grid;
      place-items: center;
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 80;
      width: 40px;
      height: 40px;
      padding: 0;
      border: 1px solid var(--rule);
      border-radius: 999px;
      background: var(--bg);
      color: var(--text-strong);
      cursor: pointer;
    }

    .layout {
      --side: clamp(90px, calc(90px + (100vw - 1337px) * 0.178), 140px);
      --rail-gap: clamp(72px, calc(72px + (100vw - 1337px) * 0.645), 181px);
      --hero-top: clamp(140px, 8.25vh, 187px);
      display: grid;
      grid-template-columns: 105px minmax(0, 980px);
      column-gap: var(--rail-gap);
      align-items: stretch;
      width: min(1266px, calc(100% - 2 * var(--side)));
      margin: 0 auto;
      padding: var(--hero-top) 0 0;
    }

    .rail {
      display: grid;
      grid-template-rows: 116px 34px auto;
      align-content: start;
      align-self: start;
      position: sticky;
      top: var(--hero-top);
      height: max-content;
      width: 105px;
    }

    .rail .logo {
      width: 56px;
      height: 36px;
      margin-top: 13px;
      align-self: start;
      justify-self: start;
    }

    .rail .logo-mark {
      width: 56px;
      height: 36px;
    }

    .rail-nav {
      grid-row: 3;
      display: flex;
      flex-direction: column;
      gap: 11px;
      margin-top: 7px;
    }

    .rail-nav a {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 21px;
      color: var(--intro-nav);
      text-decoration: none;
    }

    .rail-nav a:hover {
      color: var(--intro-title);
    }

    .rail-nav a:focus-visible {
      outline: 2px solid var(--intro-nav);
      outline-offset: 3px;
    }

    .intro {
      min-height: calc(100svh - var(--hero-top));
      padding: 0;
      margin: 0;
      border-bottom: 0;
      display: block;
      box-sizing: border-box;
    }

    .work-stream {
      padding-top: 0;
    }

    .work-image-wrap,
    .color-stage {
      aspect-ratio: 245 / 153;
    }

    .work-image {
      object-fit: cover;
    }

    .color-stage {
      align-items: center;
    }

    .color-stage img {
      transform: none;
    }

    .color-stage img.phone {
      width: 26%;
    }

    .color-stage.align-end {
      align-items: flex-start;
    }

    .color-stage img.panel {
      width: 60%;
      margin-top: 40px;
    }

    .entry-lockup {
      --title-size: clamp(30px, calc(1.2vw + 16px), 34px);
      display: grid;
      grid-template-columns: calc(7.8 * var(--title-size)) minmax(0, 1fr);
      column-gap: 40px;
      align-items: start;
    }

    .entry-name,
    #work {
      scroll-snap-align: start;
      scroll-margin-top: calc(var(--hero-top) + 5.5px);
    }

    .date {
      grid-column: 1;
      grid-row: 1;
      margin: 0 0 12px;
      transform: translateY(-3px);
    }

    .entry-name {
      grid-column: 1;
      grid-row: 2;
      margin-top: -12px;
      max-width: 7.8em;
      font-size: var(--title-size);
    }

    .entry-body {
      grid-column: 2;
      grid-row: 2;
      margin: -9px 0 0;
      font-size: 16px;
      line-height: 1.5;
    }

    .intro h1,
    .intro h1 strong {
      max-width: 513px;
      margin: 0;
      font-family: 'TT Ramillas', ui-serif, Garamond, serif;
      font-size: clamp(36px, calc(1.4vw + 22px), 42px);
      font-weight: 400;
      line-height: 1.38;
      letter-spacing: -0.025em;
      color: var(--intro-title);
    }

    .hero-blurb {
      max-width: 485px;
      margin: 34px 0 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 18px;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0;
      color: var(--intro-body);
    }

    .hero-blurb p + p {
      margin-top: 32px;
    }

    & > .footer {
      max-width: 706px;
      margin-left: auto;
      margin-right: auto;
    }

    .entry-compact .entry-lockup {
      display: block;
    }

    .entry-compact .date,
    .entry-compact .entry-name,
    .entry-compact .entry-body {
      grid-column: auto;
      grid-row: auto;
    }

    .entry-compact .date {
      transform: none;
      margin: 0 0 4px;
    }

    .entry-compact .entry-name {
      margin-top: 0;
      max-width: none;
      font-size: 28px;
    }

    .entry-compact .entry-body {
      margin: 8px 0 0;
      font-size: 15px;
      line-height: 1.45;
    }
  }
`;

const markCycle = ['#FF0000', '#7daaff', '#ffd65a'];

function LogoMark({ color }: { color: string }) {
  return (
    <svg className="logo-mark" viewBox="0 0 1775 1141" aria-hidden="true">
      <image href="/images/logo-dark.png" width="1775" height="1141" className="logo-dark" />
      <image href="/images/logo-light.png" width="1775" height="1141" className="logo-light" />
      <circle cx="1409" cy="775" r="372" fill={color} />
    </svg>
  );
}

function ProjectName({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) {
    return <span className="name unlinked">{children}</span>;
  }
  if (href.startsWith('/')) {
    return (
      <Link className="name" to={href}>
        {children}
      </Link>
    );
  }
  return (
    <a className="name" href={href}>
      {children}
    </a>
  );
}

function WorkEntry({ entry, compact = false }: { entry: Entry; compact?: boolean }) {
  const figure = (
    <>
      {entry.figure === 'habit' && (
        <div className="habit-stage">
          <HabitTilesVisual contained />
        </div>
      )}
      {entry.figure === 'video' && (
        <figure className="work-image-wrap video">
          <video
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/case-study-1/hero-visual/hero-phone-cover.jpg"
            aria-label="The Washington Post app feed case study video"
          >
            <source src="/images/case-study-1/hero-visual/hero-phone@350x743.mp4" type="video/mp4" />
          </video>
        </figure>
      )}
      {entry.figure === 'image' && entry.image && entry.field && (
        <figure className={entry.stage === 'panel' ? 'color-stage align-end' : 'color-stage'} style={{ background: entry.field }}>
          <img className={entry.stage || 'phone'} src={entry.image} alt={entry.imageAlt || ''} />
        </figure>
      )}
      {entry.figure === 'image' && entry.image && !entry.field && (
        <figure className="work-image-wrap">
          <img className="work-image" src={entry.image} alt={entry.imageAlt || ''} />
        </figure>
      )}
      {entry.figure === 'placeholder' && (
        <figure className="work-image-wrap placeholder">{entry.placeholder}</figure>
      )}
    </>
  );

  return (
    <li className={compact ? 'entry entry-compact' : 'entry'} id={entry.id}>
      {compact && figure}
      <div className="entry-lockup">
        <p className="date">{entry.date}</p>
        <h3 className="entry-name" id={entry.id === 'rippling-ai' ? 'work' : undefined}>
          <ProjectName href={entry.href}>{entry.name}</ProjectName>
        </h3>
        <p className="entry-body">{entry.body}</p>
      </div>
      {!compact && figure}
      {entry.note && <p className="editorial-note">{entry.note}</p>}
    </li>
  );
}

const WireframeHome = () => {
  const [theme, setTheme] = useState<ThemeChoice>('system');
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [markColor, setMarkColor] = useState('#FF0000');
  const [pastHero, setPastHero] = useState(false);
  const resolvedDark = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.homeTheme = theme;
    return () => {
      delete root.dataset.homeTheme;
    };
  }, [theme]);

  useEffect(() => {
    const workStart = document.getElementById('work');
    if (!workStart) return;
    let frame = 0;
    const update = () => {
      const past = workStart.getBoundingClientRect().top < window.innerHeight * 0.92;
      setPastHero((current) => (current === past ? current : past));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setSystemDark(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const id = window.setInterval(() => {
      setMarkColor((current) => {
        const index = markCycle.indexOf(current);
        return markCycle[(index + 1) % markCycle.length];
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <HomeGlobals $theme={theme} />
      <Page className={pastHero ? 'page past-hero' : 'page'} id="top" $theme={theme}>
        <header className="mast">
          <a href="#top" className="logo" aria-label="Paul Best, back to top">
            <LogoMark color={markColor} />
          </a>
          <button
            type="button"
            className={menuOpen ? 'menu-button open' : 'menu-button'}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i />
            <i />
          </button>
        </header>
        <div className={menuOpen ? 'takeover open' : 'takeover'} aria-hidden={!menuOpen}>
          <nav className="takeover-links" aria-label="Main">
            <a href="#work" onClick={() => setMenuOpen(false)}>Select Work</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="takeover-theme" role="group" aria-label="Appearance">
            <button type="button" aria-pressed={theme === 'system'} onClick={() => setTheme('system')}>
              System
            </button>
            <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
              Light
            </button>
            <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
              Dark
            </button>
          </div>
        </div>
        <div className="layout">
          <aside className="rail">
            <a href="#top" className="logo" aria-label="Paul Best, back to top">
              <LogoMark color={markColor} />
            </a>
            <nav className="rail-nav" aria-label="On this page">
              <a href="#work">Select Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </aside>
          <main>
          <section className="intro">
            <div className="hero-copy">
              <h1>
                <strong>Hi, I’m Paul, a product design leader <span className="keep">at <a className="rippling" href="https://www.rippling.com/">Rippling</a>.</span></strong>
              </h1>
              <div className="hero-blurb">
                <p>
                  I’m a generalist who helps teams aim higher: creating novel solutions, shipping beautiful & useful products, all while having fun. At Rippling, I lead design on some of our AI platform’s most complex problems, including how AI takes action, creates and edits work, and connects to other tools.
                </p>
                <p>
                  Before Rippling, I grew and led The Washington Post’s product design organization, leading four teams and 30+ designers. My work has also spanned mobile products and design systems.
                </p>
              </div>
            </div>
          </section>
          <ol className="stream work-stream">
            {featured.map((entry) => (
              <WorkEntry key={entry.id} entry={entry} />
            ))}
          </ol>
          <aside className="build-note" aria-label="How I build">
            <p>
              <strong>How I build.</strong> I also built a prototyping environment inside Rippling’s app shell so teams can test working ideas in product context. More than 100 builders use it daily across hundreds of branches and thousands of commits.
            </p>
            <p className="editorial-note">[Verify the current usage figure and add a demo link when ready.]</p>
          </aside>
          <section className="divider" id="earlier" aria-labelledby="earlier-heading">
            <h2 id="earlier-heading">Earlier work</h2>
            <div className="work-index">
              <div className="index-row">
                <div className="index-identity">
                  <h3 className="index-company">The Washington Post</h3>
                  <p className="index-role">Product Design Director · 2022–2025</p>
                </div>
                <div className="index-links">
                  <a href="#post-app">App and discovery</a>
                  <a href="#audio">Audio articles</a>
                  <a href="#design-system">Design system</a>
                  <a href="#post-org">Designing the organization</a>
                  <a href="#publishing">Publishing tools</a>
                  <a href="#cooking">Cooking</a>
                </div>
              </div>
              <div className="index-row">
                <div className="index-identity">
                  <h3 className="index-company">iStrategyLabs / WPP</h3>
                  <p className="index-role">UX Director · 2016–2020</p>
                </div>
                <div className="index-links">
                  <a href="#settle-in">Settle In</a>
                  <a href="#san-jose">San Jose</a>
                  <a href="#accion">Accion</a>
                  <a href="#nyp">NewYork-Presbyterian</a>
                  <a href="#mbk">My Brother’s Keeper</a>
                </div>
              </div>
            </div>
          </section>
          <ol className="stream post-stream">
            {postWork.map((entry) => (
              <WorkEntry key={entry.id} entry={entry} />
            ))}
          </ol>
          <hr className="history-rule" />
          <ol className="stream agency-grid">
            {agencyWork.map((entry) => (
              <WorkEntry key={entry.id} entry={entry} compact />
            ))}
          </ol>
          <section className="about" id="about">
            <h2>About</h2>
            <p>
              I’m based in Harlem and have spent 14 years designing web and mobile products. At The Post, I built and led a design organization of more than 30; at Rippling, I’m working hands-on with product and engineering to shape what ships.
            </p>
          </section>
          <section className="contact" id="contact">
            <div className="contact-inner">
              <h2>Let’s make something together.</h2>
              <a href="mailto:hello@paul.best">hello@paul.best</a>
              <p>Based in Harlem, NYC.</p>
            </div>
          </section>
          </main>
        </div>
        <footer className="footer">
          <span>Paul Best</span>
          <a href="#top">Back to top ↑</a>
        </footer>
        <button
          type="button"
          className="theme-toggle"
          aria-label={resolvedDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(resolvedDark ? 'light' : 'dark')}
        >
          {resolvedDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6" />
              </g>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
            </svg>
          )}
        </button>
      </Page>
    </>
  );
};

export default WireframeHome;
