import React from 'react';
import { styled } from '@mui/material/styles';

import { Grid, Typography } from '@mui/material';
import { MemberCard } from '../../base';

const CrewCustom = styled('section')(({ theme }) => ({
  display: 'block',
  padding: '3.5rem 0',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem 0',
    textAlign: 'center',
  },
}));

const CrewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '1.4rem',
  padding: '0 24px',
  [theme.breakpoints.down('sm')]: {
    rowGap: '1rem',
  },
}));

const CrewHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  color: 'inherit',
  fontWeight: '600',
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
  },
}));

const CrewDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'inherit',
  fontWeight: '400',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const CrewMembers = [
  {
    name: '	Vyacheslav',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas. In egestas erat imperdiet sed euismod nisi porta lorem mollis.',
  },
  {
    name: 'Inna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas. In egestas erat imperdiet sed euismod nisi porta lorem mollis.',
  },
  {
    name: 'Ivan',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas. In egestas erat imperdiet sed euismod nisi porta lorem mollis.',
  },
];

const Crew = () => {
  return (
    <CrewCustom>
      <CrewContainer>
        <CrewHeading>Meet our team members</CrewHeading>
        <CrewDescription>
          A team of enthusiasts gathered together from all around the world <br /> And made a great
          product only for you to use
        </CrewDescription>
        <Grid
          container
          justifyContent="center"
          xl="auto"
          spacing={4}
          sx={{
            flexWrap: ['wrap', 'wrap', 'nowrap', 'wrap'],
          }}
        >
          {CrewMembers.map((member, index) => (
            <Grid key={member.name} item>
              <MemberCard name={member.name} description={member.description} side={index % 2} />
            </Grid>
          ))}
        </Grid>
      </CrewContainer>
    </CrewCustom>
  );
};

export { Crew };
