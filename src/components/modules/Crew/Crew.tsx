import React from 'react';
import { styled } from '@mui/material/styles';

import { Grid, Typography } from '@mui/material';
import { MemberCard } from '../../base';

import vyachImg from '../../../assets/vyach_crew.jpeg';
import innaImg from '../../../assets/inna_crew.png';
import ivanImg from '../../../assets/ivan_crew.png';

const CrewCustom = styled('section')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4.5rem 0',
  [theme.breakpoints.down('md')]: {
    padding: '2.5rem 0',
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
  textAlign: 'center',
  lineHeight: '130%',
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
    name: 'Вячеслав',
    location: 'г. Петропавловск, Казахстан',
    image: vyachImg,
    description:
      'Тим-лид проекта. Координировал работу команды. Отвечал за создание электронного учебника, долгосрочной статистики.',
  },
  {
    name: 'Инна',
    location: 'г. Астана, Казахстан',
    image: innaImg,
    description:
      'Разработчик. Настроила регистрацию и авторизацию пользователя. Автор игры "Спринт". Сделала страницу статистики.',
  },
  {
    name: 'Иван',
    location: 'г. Архангельск, Россия',
    image: ivanImg,
    description:
      'Разработчик. Отвечал за архитектуру приложения. Создатель главной страницы приложения. Автор игр "Аудиовызов" и "Саванна".',
  },
];

const Crew = () => {
  return (
    <CrewCustom>
      <CrewContainer>
        <CrewHeading>
          Знакомься с Командой
          <br /> Разрабочиков
        </CrewHeading>
        <CrewDescription>
          Группа энтузиастов из разных стран, собравшихся вместе
          <br /> Чтобы сделать замечательный продукт исключительно для тебя
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
              <MemberCard
                name={member.name}
                description={member.description}
                img={member.image}
                location={member.location}
                side={index % 2}
              />
            </Grid>
          ))}
        </Grid>
      </CrewContainer>
    </CrewCustom>
  );
};

export { Crew };
