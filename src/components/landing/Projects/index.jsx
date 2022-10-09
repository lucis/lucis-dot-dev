import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Card, TitleWrap } from 'components/common';
import { Wrapper, Grid, Item, Content, Stats, Languages } from './styles';

const projects = [
  {
    repo: 'lucis/ufcg-pro',
    description: 'Browser extension to help students and teachers from Federal University of Campina Grande',
    tech: ['Vue.js', 'Javascript'],
  },
  {
    repo: 'alt-zap/alt-zap',
    description: 'Online platform to help small merchants to sell online with delivery',
    tech: ['Gatsby.js', 'Typescript', 'Firebase'],
  },
  {
    repo: 'lucis/accordionist',
    description: '[WIP] Web app to help musicians in daily exercises',
    tech: ['Elixir', 'Phoenix Liveview'],
  },
  {
    repo: 'meu-santinho/meu-santinho',
    description: 'Web app that generates digital ballot paper for Brazilian elections.',
    tech: ['Deno', 'Fresh'],
  },
  {
    repo: 'lucis/ejdcard',
    description: 'Web app to track credit in a mid-size indoor event',
    tech: ['React.js', 'Javascript'],
  },
];
export const Projects = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper as={Container} id="projects">
      <h2>My favorite projects</h2>
      <Grid>
        {projects.map(({ repo, description, tech }) => (
          <Item
            key={repo}
            as="a"
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            theme={theme}
          >
            <Card theme={theme}>
              <Content>
                <h4>{repo}</h4>
                <p>{description}</p>
              </Content>
              <TitleWrap>
                <Stats theme={theme}>
                  <Languages>
                    {tech.map(a => (
                      <span key={a}>{a}</span>
                    ))}
                  </Languages>
                </Stats>
              </TitleWrap>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};
