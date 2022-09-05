import * as React from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CardCustomProps {
  side: string;
}

const CardCustom = styled(Card)<CardCustomProps>(({ theme, side }) => ({
  maxWidth: '340px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
  [theme.breakpoints.down('md')]: {
    maxWidth: '320px',
  },
  [theme.breakpoints.down('md')]: {
    '& .css-46bh2p-MuiCardContent-root': {
      padding: side === 'lr' ? '0.5rem 0.5rem 0.5rem 1rem' : '0.5rem 1rem 0.5rem 0.5rem',
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    maxWidth: '520px',
    flexDirection: side === 'lr' ? 'row' : 'row-reverse',
    '& .MuiCardMedia-img': {
      maxWidth: '200px',
      objectFit: 'cover',
    },
    textAlign: side === 'lr' ? 'left' : 'right',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '260px',
    '& .css-1pnmrwp-MuiTypography-root': {
      fontSize: '0.9rem',
    },
  },
}));

interface Props {
  name: string;
  description: string;
  location: string;
  img: string;
  side: number;
}

const MemberCard: React.FC<Props> = ({ name, description, location, img, side }) => {
  return (
    <CardCustom side={side ? 'rl' : 'lr'}>
      <CardMedia
        component="img"
        image={img}
        alt="Team Member"
        sx={{ height: ['180px', '200px', '250px'] }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: '600', fontSize: ['1.3rem', '1.3rem', '1.5rem'] }}
        >
          {name}
        </Typography>
        <Typography
          gutterBottom
          component="div"
          sx={{ fontWeight: '500', fontSize: ['1.1rem', '1.1rem', '1.2rem'], marginTop: '-0.4rem' }}
        >
          {location}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: ['1rem', '1rem'] }}>
          {description}
        </Typography>
      </CardContent>
    </CardCustom>
  );
};

export { MemberCard };
