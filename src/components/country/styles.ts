import Image from 'next/image'
import { keyframes, styled } from '../../styles'

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

export const Container = styled('button', {
  padding: '1rem',
  backgroundColor: '$blue_100',
  width: '12rem',
  border: '2px solid transparent',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  borderRadius: '10px',
  transition: 'all 0.3s',
  cursor: 'pointer',
  animationName: `${scaleAnimation}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',

  '&:hover': {
    boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.5)',
    transform: 'translate(-6px, -6px)',
    borderColor: '$red_100',
    backgroundColor: '$blue_200',
  },
})

export const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',

  p: {
    fontStyle: 'italic',
    fontSize: '1rem',
    textDecoration: 'underline',
    color: '$white_100',
  },
})

export const ImageCountry = styled(Image, {
  borderRadius: '10px',
  border: '2px solid $blue_200',
})
