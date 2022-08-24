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
  maxWidth: '300px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
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
  side: number;
}

const MemberCard: React.FC<Props> = ({ name, description, side }) => {
  return (
    <CardCustom side={side ? 'rl' : 'lr'}>
      <CardMedia
        component="img"
        image="https://cdn.dribbble.com/users/79571/screenshots/5848110/illustration_4x.png"
        alt="Member"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </CardContent>
    </CardCustom>
  );
};

export { MemberCard };
