import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 1rem 6rem 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: 'DM Serif Display', serif;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  font-size: 1.15rem;
  color: #444;
  margin-bottom: 2.5rem;
`;

const EmailLink = styled.a`
  display: inline-block;
  background: #f5f5f5;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 2rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: background 0.18s, border 0.18s;
  &:hover {
    background: #e6e6e6;
    border: 1px solid #bbb;
  }
`;

const Contact = () => (
  <ContactContainer>
    <Title>Let's Talk</Title>
    <Message>
      Interested in working together, collaborating, or just want to say hello? Drop me a line and I'll get back to you soon.
    </Message>
    <EmailLink href="mailto:hello@paul.best">hello@paul.best</EmailLink>
  </ContactContainer>
);

export default Contact; 