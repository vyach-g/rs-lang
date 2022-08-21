import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MuiAppBar from '@mui/material/AppBar';
import { List, Typography, styled, ListItem, Drawer, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

const ListCustom = styled(List)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '2rem',
    paddingTop: '80px',
    paddingBottom: '0',
  },
  position: 'relative',
  zIndex: '1',
}));

const ListItemCustom = styled(ListItem)({
  width: 'auto',
  display: 'inline-block',
  padding: '0.4rem 0.5rem 0 0.5rem',
  marginInline: '0.5rem',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
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
});

const DrawerHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: '70px',
  position: 'relative',
  zIndex: '1000',
});

const NavDefault = (
  <>
    <ListItemCustom>
      <Link to="/">Main</Link>
    </ListItemCustom>
    <ListItemCustom>
      <Link to="/textbook">Textbook</Link>
    </ListItemCustom>
    <ListItemCustom>
      <Link to="/games">Games</Link>
    </ListItemCustom>
    <ListItemCustom>
      <Link to="/statisticks">Statistics</Link>
    </ListItemCustom>
    <ListItemCustom>
      <Link to="/login">Login</Link>
    </ListItemCustom>
  </>
);

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <HeaderCustom position="sticky">
      <HeaderContainer>
        <DrawerHeader>
          <Typography variant="h6" component="div">
            LOGO
          </Typography>
          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'black' }}
            onClick={handleDrawerToggle}
          >
            {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <ListCustom sx={{ display: { xs: 'none', sm: 'flex' } }}>{NavDefault}</ListCustom>
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          anchor="top"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            position: 'relative',
            zIndex: '10',
            '& .MuiDrawer-paper': { width: '100%', height: '100vh' },
            '& .css-1nvnyqx-MuiPaper-root-MuiDrawer-paper': {
              boxShadow: 'none !important',
            },
          }}
        >
          <ListCustom>{NavDefault}</ListCustom>
        </Drawer>
      </HeaderContainer>
    </HeaderCustom>
  );
};

export { Header };
