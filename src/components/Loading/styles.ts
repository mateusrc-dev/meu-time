import { keyframes, styled } from '../../styles'

const isRotating = keyframes({
  to: {
    transform: 'rotate(1turn)',
  },
})

export const Container = styled('div', {
  '.loading': {
    background: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    zIndex: 4,
    width: '100%',
    height: '100vh',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '.Loading': {
      width: '100px',
      height: '100px',
      border: '15px solid $blue_200',
      borderTopColor: '$blue_100',
      borderRadius: '50%',
      animation: `${isRotating} 1s infinite`,
    },
  },
})
