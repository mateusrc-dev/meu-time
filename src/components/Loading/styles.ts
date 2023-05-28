import { keyframes, styled } from '../../styles'

const isRotating = keyframes({
  to: {
    transform: 'rotate(1turn)',
  },
})

export const Container = styled('div', {
  '.loading': {
    background: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    zIndex: 4,
    width: '100%',
    height: '100vh',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '.Loading': {
      width: '50px',
      height: '50px',
      border: '10px solid $blue_200',
      borderTopColor: '$blue_100',
      borderRadius: '50%',
      animation: `${isRotating} 1s infinite`,
    },
  },
})
