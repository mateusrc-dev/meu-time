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

  h1: {
    marginTop: '2rem',
    fontSize: '1rem',
    color: '$blue_100',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    animationName: `${leftAnimation}`,
    animationDirection: 'normal',
    animationDuration: '1s',
    animationTimingFunction: 'ease-out',
  },

  'div.pagesControl': {
    animationName: `${leftAnimation}`,
    animationDirection: 'normal',
    animationDuration: '1s',
    animationTimingFunction: 'ease-out',
  },
})

export const ContainerCountries = styled('div', {
  position: 'relative',
  padding: '1rem 1rem',
  marginTop: '1rem',
  marginBottom: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  flexWrap: 'wrap',
  overflow: 'auto',
  animationName: `${scaleAnimation}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',
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

export const ButtonTeamRight = styled('button', {
  position: 'absolute',
  height: '100%',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2.5rem',
  border: 'none',
  borderRadius: '5px',
  background:
    'linear-gradient(90deg, rgba(0,116,196,0) 0%, rgba(47,120,171,1) 35%,  rgba(40,75,99,1) 100%)',
  cursor: 'pointer',
  '&:hover': {
    filter: 'brightness(0.8)',
  },
})

export const ButtonTeamLeft = styled('button', {
  position: 'absolute',
  height: '100%',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2.5rem',
  border: 'none',
  borderRadius: '5px',
  background:
    'linear-gradient(90deg, rgba(40,75,99,1) 0%, rgba(47,120,171,1) 35%, rgba(0,116,196,0) 100%)',
  cursor: 'pointer',
  '&:hover': {
    filter: 'brightness(0.8)',
  },
})
