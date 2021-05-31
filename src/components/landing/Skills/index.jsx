import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import dev from 'assets/illustrations/skills.svg';
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
        <Thumbnail>
          <img src="/img/about-me.png" alt="I’m John and I’m a Backend & Devops engineer!" />
        </Thumbnail>
        <Details theme={theme}>
          <h1>More about me</h1>
          <p>
            My name is <b>Luciano Júnior</b> I currently work at a great company called{' '}
            <a href="https://vtex.com">VTEX</a>. I have a bachelor's degree in Computer Science from{' '}
            <a href="https://www.ufcg.edu.br">UFCG</a>, where I've had some great experiences.
          </p>
          <Button as="a" target="_blank" href="https://linkedin.com/in/lcnjnr">
            Check my LinkedIn
          </Button>
        </Details>
      </SkillsWrapper>
    </Wrapper>
  );
};
