import React from 'react';
import styled from 'styled-components';

const LContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  margin: 0;
`;

const Link = styled.li`
  height: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }
  display: flex;
  margin-bottom: 8px;
  padding: 10px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.11);
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#181717')};

  &:hover {
    box-shadow: 0 1px 16px 0 rgba(0, 0, 0, 0.11);
  }

  h4 {
    color: ${({ theme }) => (theme === 'light' ? '#212121' : '#fff')};
  }

  p {
    color: ${({ theme }) => (theme === 'light' ? '#707070' : '#c7c7c7')};
  }
`;

const AHref = styled.a`
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-weight: bold;
`;

const LinkColumn = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  @media (min-width: 960px) {
    width: 50%;
    margin-bottom: 0;
  }
  margin-bottom: 10px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  padding: 7px;
  color: white;
  margin-right: 7px;
  font-size: 13px;
`;

const TagsColumn = styled.div`
  @media (min-width: 960px) {
    width: 20%;
    margin-top: 0;
  }
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  display: flex;
`;

const CommentColumn = styled.div`
  flex-direction: column;
  display: flex;
  @media (min-width: 960px) {
    width: 30%;
  }
`;

const URLA = styled.a`
  text-overflow: ellipsis;
  color: #b5b5b5;
  font-size: 0.8rem;
  max-width: 500px;
  &:hover {
    text-decoration: underline;
  }
`;

const colorPool = ['##38154f', '#422536', '#008791', '#507457', '#634044', '#bb7700'];

const hashWord = word => {
  let hash = 0;
  let i;
  let chr;
  if (word.length === 0) return hash;
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < word.length; i++) {
    chr = word.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const getColorForTag = tag => {
  const code = Math.abs(hashWord(tag));
  return colorPool[code % colorPool.length];
};

export const Links = ({ links, theme }) => (
  <LContainer>
    {links.map(({ url, title, tags, comment }) => (
      <Link theme={theme}>
        <LinkColumn>
          <AHref theme={theme} href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </AHref>
          <URLA href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </URLA>
        </LinkColumn>
        <CommentColumn>{comment}</CommentColumn>
        <TagsColumn>
          {tags.map(tag => (
            <Tag color={getColorForTag(tag)}>{tag}</Tag>
          ))}
        </TagsColumn>
      </Link>
    ))}
  </LContainer>
);
