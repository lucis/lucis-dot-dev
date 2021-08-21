import React, { useContext } from 'react';
import { Header } from 'components/theme';
import { Container, Layout, SEO } from 'components/common';
import { Wrapper } from 'components/landing/Projects/styles';
import { useAllLinks } from 'components/landing/Links';
import { Links } from 'components/landing/Links/Links';
import { ThemeContext } from 'providers/ThemeProvider';

export default () => {
  const { theme } = useContext(ThemeContext);
  const links = useAllLinks();

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
