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
    `API Dog`,
    'Stoplight',
    'Vuetify',
    `JSON`,
    'Gitbook',
    'Git & Github',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Howdy👋 My name is Nabil and I love creating content that correlates with developers.
              With over <b>6</b> years of writing experience, I have a passion for making complex
              topics easier to understand by breaking them down and presenting them in a clear and
              concise manner, whether in articles, tutorials, videos, or more formats that are
              friendly for the audience.
            </p>

            <p>
              Fast-forward to today, I’ve had the privilege of working at{' '}
              <a aria-label="Personal Projects" href="https://gdg.community.dev/gdg-addis/">
                Google Community Group
              </a>
              ,{' '}
              <a aria-label="Personal Projects" href="https://addissoftware.com/">
                a start-up
              </a>
              ,{' '}
              <a aria-label="Personal Projects" href="https://www.kapsarc.org/">
                a governmental research body
              </a>
              ,{' '}
              <a aria-label="Personal Projects" href="https://soundcloud.com/yemenisinexile">
                podcaster
              </a>
              ,
              <a
                aria-label="Personal Projects"
                href="https://howtobuildup.org/programs/peace-innovators/meet-the-fellows/yemeni-diaspora-digital-steps-fellows-2020/#:~:text=Yemeni%2DSwedish%20society.-,Yemenis%20in%20Exile,-Yemenis%20In%20Exile">
                digital conflict interventionist
              </a>
              , and <a href="https://nabil-alanssi19.medium.com/">a freelance writer</a> for
              esteemed writing agencies. My main focus these days is building accessible, inclusive
              products, digital experiences, and developer-focused material at{' '}
              <a aria-label="Personal Projects" href="https://salla.dev/">
                Salla{' '}
              </a>{' '}
              for over <b>2,000</b> E-commerce developers.
            </p>

            <p>
              When I'm not writing technical documents, I'm probably geeking out over my Video Game
              collection 🎮 or watching reruns of{' '}
              <a aria-label="Personal Hobbies" href="https://en.wikipedia.org/wiki/Friends">
                Friends
              </a>{' '}
              🍿 &{' '}
              <a
                aria-label="Personal Hobbies"
                href="https://en.wikipedia.org/wiki/The_Big_Bang_Theory">
                The Big Bang Theory
              </a>{' '}
              🎥. I love to find the humor and humanity in every project I take on - no matter how
              complex the technical concept.
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
