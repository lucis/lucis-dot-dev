import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
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
            So, my name is <b>Luciano Júnior</b> and I currently work at an amazing company called{' '}
            <a href="https://coastapp.com">Coast</a>. I have a bachelor's degree in Computer Science from{' '}
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
