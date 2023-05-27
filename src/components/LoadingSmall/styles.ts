import { keyframes, styled } from '../../styles'

const isRotating = keyframes({
  to: {
    transform: 'rotate(1turn)',
  },
})

export const Container = styled('div', {
  '.Loading': {
    width: '15px',
    height: '15px',
    border: '5px solid $blue_200',
    borderTopColor: '$blue_100',
    borderRadius: '50%',
    animation: `${isRotating} 1s infinite`,
  },
})
