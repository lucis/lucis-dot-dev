import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import styled from 'styled-components';
import NavbarLinks from '../NavbarLinks';
import { Wrapper, Brand } from './styles';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper as={Container}>
      <TitleDiv>
        <img src="/favicon/favicon-512.png" style={{ marginRight: '7px' }} width="20" alt="Lucis" />
        <Brand as={Link} to="/" theme={theme}>
          Lucis
        </Brand>
      </TitleDiv>
      <NavbarLinks desktop />
    </Wrapper>
  );
};

export default Navbar;

const TitleDiv = styled.div`
  display: flex;
`;
