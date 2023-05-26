import { keyframes, styled } from '../../styles'

const changeColor = keyframes({
  '0%': {
    backgroundColor: '$white_100',
  },

  '50%': {
    backgroundColor: '$red_100',
  },

  '100%': {
    backgroundColor: '$white_100',
  },
})

export const BarGraphContainer = styled('div', {
  width: '60rem',
})

export const Bar = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--barGraph-size), 1fr)',
  marginTop: '1rem',
  'div:first-child': {
    borderRadius: '100px 0 0 100px',
  },
  'div:last-child': {
    borderRadius: '0px 100px 100px 0px',
  },
})

export const FragmentBar = styled('div', {
  height: '2rem',
  backgroundColor: '$white_100',

  variants: {
    active: {
      true: {
        animationName: `${changeColor}`,
        animationDirection: 'normal',
        animationDuration: '1s',
        animationTimingFunction: 'ease-in',
        animationIterationCount: 'infinite',
      },
    },
  },
})
