import { keyframes, styled } from '../../styles'

const changeColor = keyframes({
  '0%': {
    backgroundColor: '$blue_100'
  },

  '50%': {
    backgroundColor: '#a8dadc'
  },

  '100%': {
    backgroundColor: '$blue_100'
  },
})

export const MultiStepContainer = styled('div', {})

export const Steps = styled('div', {
  display: 'grid',
  gap: '0.5rem',
  gridTemplateColumns: 'repeat(var(--steps-size), 1fr)',
  marginTop: '1rem',
})

export const Step = styled('div', {
  height: '5px',
  borderRadius: '10px',
  backgroundColor: '$blue_200',

  variants: {
    active: {
      true: {
        animationName: `${changeColor}`,
        animationDirection: 'normal',
        animationDuration: '1s',
        animationTimingFunction: 'ease-in',
        animationIterationCount: 'infinite'
      },
    },
  },
})
