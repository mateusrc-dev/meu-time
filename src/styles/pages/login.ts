import { keyframes, styled } from '..'

const downTop = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(3rem)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '5rem',
  heigh: '100%',
})

export const ContainerBody = styled('div', {
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
})

export const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: '$blue_200',
  borderRadius: '5px',
  boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',
  animationName: `${downTop}`,
  animationDirection: 'normal',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',
})

export const Input = styled('input', {
  background: '$blue_300',
  border: '2px solid transparent',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  marginTop: '1rem',
  width: '100%',
  color: '$blue_100',

  '&::placeholder': {
    color: '$blue_200',
  },

  '&:focus': {
    borderColor: '$red_100',
    outline: 0,
  },
})

export const Button = styled('button', {
  background: '$blue_300',
  border: '1px solid transparent',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  marginTop: '1rem',
  color: '$blue_100',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '&:hover': {
    borderColor: '$white_100',
    backgroundColor: '$blue_200',
    color: '$white_100',
  },

  '&:disabled': {
    filter: 'brightness(0.8)',
    cursor: 'not-allowed',
  },
})
