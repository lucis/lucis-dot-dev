import React, { useContext, useMemo } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
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

const query = graphql`
  query MyQuery {
    allNotion {
      edges {
        node {
          title
          updatedAt
          properties {
            URL {
              value
            }
            Tags {
              value {
                name
              }
            }
            Comments {
              value
            }
            Public {
              value
            }
          }
        }
      }
    }
  }
`;

export const useAllLinks = () => {
  const data = useStaticQuery(query);
  const links = useMemo(
    () =>
      (data ? data.allNotion.edges : [])
        .map(({ node }) => node)
        .map(({ properties, title }) => {
          const props = Object.keys(properties).reduce((acc, key) => {
            if (!properties[key]) return acc;
            acc[key] = properties[key].value;
            return acc;
          }, {});
          return {
            title,
            isPublic: props.Public,
            url: props.URL,
            tags: props.Tags.map(({ name }) => name),
            comment: props.Comments,
          };
        })
        .filter(({ isPublic }) => isPublic),
    [data]
  );

  return links;
};

export const Links = () => {
  const { theme } = useContext(ThemeContext);
  const links = useAllLinks().slice(0, 5);

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
