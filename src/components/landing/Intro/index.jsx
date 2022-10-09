import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container } from 'components/common';
import styled from 'styled-components';
import { Wrapper, IntroWrapper, Details, Thumbnail } from './styles';

const TOPICS = [
  'Distributed Systems',
  'Deno',
  'Elixir/Erlang',
  'Typescript',
  'Firebase',
  'Remix',
  'Node.js',
  'Automations',
  'Ecommerce',
  'Serverless',
  'Open Source',
  'Podcasts',
  'Culture',
  'Product',
];

function shuffle(originalArray) {
  const array = [].concat(originalArray);
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const Intro = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Hello!</h1>
          <h4>I’m Lucis and I’m a software engineer.</h4>
          <TopicsTitle>My topics of interest:</TopicsTitle>
          <Topics>
            {shuffle(TOPICS).map(topic => (
              <Topic key={topic}>{topic}</Topic>
            ))}
          </Topics>
        </Details>
        <Thumbnail>
          <img src="/img/capa.png" alt="I’m John and I’m a JAMStack engineer!" />
        </Thumbnail>
      </IntroWrapper>
    </Wrapper>
  );
};

const Topic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #38154f;
  padding: 7px;
  color: white;
  margin: 0px 7px 7px 0;
  font-size: 13px;
`;

const Topics = styled.div`
  max-width: 400px;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;
const TopicsTitle = styled.span`
  color: gray;
`;
