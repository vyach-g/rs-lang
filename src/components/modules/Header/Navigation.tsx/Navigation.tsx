import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, styled, ListItem } from '@mui/material';

import { SignInDTO } from '../../../../api/apiCalls.types';

const NavContainer = styled(List)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '2rem',
    paddingTop: '80px',
    paddingBottom: '0',
  },
  position: 'relative',
  zIndex: '1',
}));

const NavItem = styled(ListItem)({
  width: 'auto',
  display: 'inline-block',
  padding: '0.7rem 0.5rem 0 0.5rem',
  marginInline: '0.5rem',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block',
    height: '100%',
    '&:hover': {
      backgroundColor: 'white',
    },
    '&::after': {
      content: '""',
      display: 'block',
      marginTop: '0.5rem',
      width: '0',
      height: '2px',
      background: 'black',
      transition: 'width .25s',
    },
    '&:hover::after': {
      width: '100%',
    },
  },
});

interface Props {
  isAuth: SignInDTO | null;
  callback: () => void;
}

const Navigation: React.FC<Props> = ({ isAuth, callback }) => {
  return (
    <NavContainer>
      <NavItem>
        <Link to="/">Главная</Link>
      </NavItem>
      <NavItem>
        <Link to="/textbook">Учебник</Link>
      </NavItem>
      <NavItem>
        <Link to="/games">Игры</Link>
      </NavItem>
      <NavItem>
        <Link to="/statistics">Статистика</Link>
      </NavItem>
      <NavItem>
        {isAuth ? (
          <a onClick={callback} style={{ cursor: 'pointer' }}>
            Выйти
          </a>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </NavItem>
    </NavContainer>
  );
};

export { Navigation };
