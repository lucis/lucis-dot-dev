import React, { useContext } from 'react';
import { Header } from 'components/theme';
import { Container, Layout, SEO } from 'components/common';
import { Wrapper } from 'components/landing/Projects/styles';
import { Links } from 'components/landing/Links/Links';
import { ThemeContext } from 'providers/ThemeProvider';

export default () => {
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
    <Layout>
      <SEO />
      <Header isHome={false} />
      <Wrapper as={Container} id="links">
        <h1>My favorite links</h1>
        <Links links={links} theme={theme} />
      </Wrapper>
    </Layout>
  );
};
