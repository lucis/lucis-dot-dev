import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import NavbarLinks from '../NavbarLinks';
import ForPages from '../NavbarLinks/forPages';
import { Wrapper } from './styles';

const Sidebar = ({ sidebar, toggle, isHome }) => {
  const { theme } = useContext(ThemeContext);

  const NavComponent = isHome ? NavbarLinks : ForPages;

  return (
    <Wrapper active={sidebar} onClick={toggle} theme={theme}>
      <NavComponent />
    </Wrapper>
  );
};

export default Sidebar;
