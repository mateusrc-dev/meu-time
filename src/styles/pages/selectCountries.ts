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
  padding: '1rem 1rem',
  marginTop: '1rem',
  marginBottom: 'auto',
  display: 'flex',
  alignItems: 'center',
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
