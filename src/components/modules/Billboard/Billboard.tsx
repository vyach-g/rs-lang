import React from 'react';
import { styled } from '@mui/material/styles';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import BgImage from '../../../assets/bg-1.png';

const BillboardCustom = styled('section')(({ theme }) => ({
  display: 'block',
  padding: '3rem 0',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem 0',
    textAlign: 'center',
  },
}));

const BillboardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '1.4rem',
  columnGap: '4rem',
  padding: '0 24px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    columnGap: '0',
  },
}));

const BillboardInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: '1.4rem',
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    rowGap: '1rem',
  },
}));

const BillboardHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  color: 'inherit',
  fontWeight: '600',
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
  },
}));

const BillboardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'inherit',
  fontWeight: '400',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const BillboardSubmit = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  fontWeight: '600',
  borderRadius: '3px',
  borderWidth: '2px',
  borderColor: 'black',
  color: 'black',
  padding: '.3rem 1.5rem',
  '&:hover': {
    borderColor: 'black',
    borderWidth: '2px',
    backgroundColor: '#E4F1FF',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const BillboardImage = styled('img')(({ theme }) => ({
  maxWidth: '400px',
  width: '100%',
  height: 'auto',
  opacity: '0.8',
  [theme.breakpoints.down('md')]: {
    maxWidth: '320px',
    marginTop: '0',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '280px',
    marginTop: '0',
  },
}));

const Billboard = () => {
  return (
    <BillboardCustom>
      <BillboardContainer>
        <BillboardInfo>
          <BillboardHeading variant="h1">
            Want to learn new English words?
            <br />
            Our platform is the right choice for you
          </BillboardHeading>
          <BillboardDescription>
            An easy and accessable way of learning, only on our platform <br />
            We grant you a way to grantly improve your vocabulary
          </BillboardDescription>
          <BillboardSubmit variant="outlined">Explore further</BillboardSubmit>
        </BillboardInfo>
        <BillboardImage src={BgImage} />
      </BillboardContainer>
    </BillboardCustom>
  );
};

export { Billboard };
