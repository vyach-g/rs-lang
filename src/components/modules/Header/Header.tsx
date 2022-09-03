import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MuiAppBar from '@mui/material/AppBar';
import { Typography, styled, Drawer, IconButton, Link as LinkOuter } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { Navigation } from './Navigation.tsx/Navigation';
import storage from '../../../storage/storage';

const HeaderCustom = styled(MuiAppBar)({
  background: 'rgb(255,255,255)',
  color: 'black',
  boxShadow: 'none',
  width: '100%',
  opacity: '0.9',
});

const HeaderContainer = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  minHeight: '70px',
  maxWidth: '1280px',
  width: '100%',
  marginInline: 'auto',
  paddingInline: '24px',
  boxSizing: 'border-box',
});

const HeaderGeneral = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: '70px',
  position: 'relative',
  zIndex: '1000',
});

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { auth: isAuth, setAuth } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = (): void => {
    setAuth(null);
    storage.clear();
    navigate('/');
  };

  const handleDrawerToggle = (): void => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <HeaderCustom position="sticky">
      <HeaderContainer>
        <HeaderGeneral>
          <Typography variant="h6" component="div">
            <LinkOuter href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
              RSLang
            </LinkOuter>
          </Typography>
          <IconButton
            sx={{ display: ['flex', 'none'], color: 'black' }}
            onClick={handleDrawerToggle}
          >
            {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </HeaderGeneral>
        <Navigation isAuth={isAuth} callback={handleLogout} />
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          anchor="top"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: ['flex', 'none'],
            position: 'relative',
            zIndex: '10',
            '& .MuiDrawer-paper': { width: '100%', height: '100vh' },
            '& .css-1nvnyqx-MuiPaper-root-MuiDrawer-paper': {
              boxShadow: 'none !important',
            },
            '& * .css-uc62by-MuiList-root': {
              display: 'flex',
            },
          }}
        >
          <Navigation isAuth={isAuth} callback={handleLogout} />
        </Drawer>
      </HeaderContainer>
    </HeaderCustom>
  );
};

export { Header };
