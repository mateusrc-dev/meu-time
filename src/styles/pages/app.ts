import { styled, keyframes } from ".."

const isRotating = keyframes({
  to: {
    transform: 'rotate(1turn)',
  },
})

export const Container = styled('div', {
  display: 'flex',
})

export const Body = styled('div', {
  margin: '2rem',
  padding: '2rem',
  width: '100%',
  height: 'calc(100vh - 4rem)',
  backgroundColor: '$blue_300',
  borderRadius: '5px',
})

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$blue_200',
  padding: '0.5rem 2rem',
  borderRadius: '10px',
  boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',

  'h1': {
    display: 'flex',
    fontStyle: 'italic',
    fontWeight: 'bold',
    alignItems: 'center',
    gap: '1rem',
  }
})

export const LogoImage = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animationName: `${isRotating}`,
  animationDirection: 'normal',
  animationDuration: '3s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite'
})