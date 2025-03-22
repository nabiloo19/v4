import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'HTML/CSS/JS',
    `Twig`,
    `End to end APIs`,
    'Markdown',
    'VueJS',
    'Stoplight',
    'Vuetify',
    `JSON`,
    'Gitbook',
    'Git & Github',
    'APIDog',
    'Swagger',
    'Postman',
    'Hoppscotch',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I’m Nabil Mohammed, also known as the <b>"Dev Docs Wizard"</b>. With over <b>6</b>{' '}
              years of experience as a <b>Senior Technical Writer</b>, I specialize in creating
              developer-focused content and API documentation that bridges the gap between complex
              technical concepts and clear, actionable insights.
            </p>

            <p>
              I’ve had the privilege of working across diverse industries, including{' '}
              <a aria-label="Google Community Group" href="https://gdg.community.dev/gdg-addis/">
                Google Developer Groups
              </a>
              ,{' '}
              <a aria-label="Addis Software Start-Up" href="https://addissoftware.com/">
                a start-up
              </a>
              ,{' '}
              <a aria-label="KAPSARC Research Body" href="https://www.kapsarc.org/">
                a governmental research body
              </a>
              ,{' '}
              <a aria-label="Yemenis in Exile Podcast" href="https://soundcloud.com/yemenisinexile">
                podcaster
              </a>
              ,{' '}
              <a
                aria-label="Digital Conflict Interventionist"
                href="https://howtobuildup.org/programs/peace-innovators/meet-the-fellows/yemeni-diaspora-digital-steps-fellows-2020/#:~:text=Yemeni%2DSwedish%20society.-,Yemenis%20in%20Exile,-Yemenis%20In%20Exile">
                digital conflict interventionist
              </a>
              , and{' '}
              <a
                aria-label="Freelance Writing Portfolio"
                href="https://nabil-alanssi19.medium.com/">
                freelance writer
              </a>
              . Currently, I create inclusive, developer-centric content at{' '}
              <a aria-label="Salla Developer Portal" href="https://salla.dev/">
                Salla
              </a>
              , empowering over <b>5,000</b> E-commerce developers with innovative tools and
              documentation that led to a <b>75%</b> improvement in developer integrations.
            </p>

            <p>
              My expertise spans managing documentation for <b>7+ products</b>, producing{' '}
              <b>300+ API documents</b>, SDK guides, 90+ integration tutorials, and more. I’m
              proficient with tools like <b>APIDog, GitBook, Swagger, Stoplight</b>, and{' '}
              <b>Markdown / MDX</b>. My efforts have driven a <b>58%</b> increase in self-service
              adoption and reduced support inquiries by <b>63%</b> within the developer community.
            </p>

            <p>
              When I’m not immersed in technical documentation, you’ll find me geeking out over my{' '}
              <b>50+</b> video game collection 🎮, re-watching{' '}
              <a aria-label="Friends TV Show" href="https://en.wikipedia.org/wiki/Friends">
                Friends
              </a>
              🍿 and{' '}
              <a
                aria-label="The Big Bang Theory TV Show"
                href="https://en.wikipedia.org/wiki/The_Big_Bang_Theory">
                The Big Bang Theory
              </a>
              🎥, or exploring creative ways to simplify complex ideas.
            </p>
            <p>Here are a few technologies/frameworks I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me01.jpeg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
