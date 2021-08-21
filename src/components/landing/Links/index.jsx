import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import styled from 'styled-components';
import { Wrapper } from '../Projects/styles';
import { Links as LinksComponent } from './Links';

const Desc = styled.p`
  color: #616161;
`;

const More = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const SeeMoreLink = styled(props => <Link {...props} />)`
  &:hover {
    text-decoration: underline;
  }
`;

export const Links = () => {
  const { theme } = useContext(ThemeContext);
  const links = [
    { url: 'https://news.ycombinator.com/', title: 'Hacker News', tags: ['Tech', 'Javascript'], comment: 'Oi' },
    {
      url: 'https://news.ycombinator.com/news.ycombinator.comnews.ycombinator.comnews.ycombinator.comj',
      title: 'Second News',
      tags: ['Tech', 'Javascript'],
      comment: 'Oi',
    },
  ];
  return (
    <Wrapper as={Container} id="links">
      <h2>Recommended Links</h2>
      <Desc>From time to time I save some links that I find interesting. Here are some of them: </Desc>
      <LinksComponent links={links} theme={theme} />
      <More>
        <SeeMoreLink to="/links">See more</SeeMoreLink>
      </More>
    </Wrapper>
  );
};
