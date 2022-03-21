import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import { Wrapper, SkillsWrapper, Details, Thumbnail, ButtonContainer } from './styles';

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
            I currently work at an amazing company called{' '}
            <a href="https://coastapp.com" target="_blank" rel="noopener noreferrer">
              Coast
            </a>
            . have a bachelor's degree in Computer Science from{' '}
            <a href="https://portal.ufcg.edu.br/" target="_blank" rel="noopener noreferrer">
              UFCG
            </a>
            , where I've had some great experiences.
          </p>
          <ButtonContainer>
            <Button as="a" secondary target="_blank" href="https://linkedin.com/in/lcnjnr">
              Check my LinkedIn
            </Button>
            <Button as="a" target="_blank" href="https://polywork.lucis.dev">
              Check my Polywork
            </Button>
          </ButtonContainer>
        </Details>
      </SkillsWrapper>
    </Wrapper>
  );
};
