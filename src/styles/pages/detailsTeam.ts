import Image from 'next/image'
import { keyframes, styled } from '..'

const scaleAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

const leftAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(-3rem)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  animationName: `${scaleAnimation}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',

  p: {
    fontSize: '1rem',
    color: '$blue_100',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
})

export const ContainerDetailsTeams = styled('div', {
  padding: '0rem 0rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  height: '15rem',
  flexWrap: 'wrap',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 15,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$blue_100',
    borderRadius: 10,
    width: 0,
    backgroundClip: 'padding-box',
    border: '3px solid transparent',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '$blue_200',
    width: 0,
    borderRadius: 10,
    backgroundClip: 'padding-box',
    border: '3px solid transparent',
  },
})

export const HeaderTeam = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  animationName: `${leftAnimation}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',
  marginTop: '0.5rem',

  p: {
    color: '$blue_100',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      textDecoration: 'underline',
      filter: 'brightness(0.8)',
    },
  },
})

export const ContainerTeamDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '0.5rem',
  backgroundColor: '$blue_200',
  minWidth: '15rem',
  minHeight: '6.5rem',
  padding: '0.5rem 0.5rem',
  borderRadius: '5px',
  boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)',
  animationName: `${leftAnimation}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',
})

export const ImageTeam = styled(Image, {
  border: '4px solid $blue_100',
  borderRadius: '5px',
})

export const ButtonTeam = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#f1faee',
  cursor: 'pointer',
  '&:hover': {
    filter: 'brightness(0.8)',
  },
})

export const TableTeam = styled('table', {
  margin: '20px auto',
  border: 'none',
  minWidth: '500px',
  minHeight: '150px',
  padding: '5px 2.5px',
  backgroundColor: '$blue_100',
  boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)',
  borderSpacing: '5px',
  borderRadius: '5px',
  animationName: `${leftAnimation}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',

  thead: {
    backgroundColor: '$blue_300',
    color: '$blue_100',
  },

  'thead tr th': {
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
  },

  tbody: {
    textAlign: 'center',
    color: '$white_100',
  },

  'tbody tr td': {
    border: '1px solid $white_100',
    backgroundColor: '$blue_200',
    borderRadius: '5px',
  },
})
