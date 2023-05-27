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
  width: '100%',
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

export const ContainerAllBar = styled('div', {
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '0.5rem',
  overflow: 'auto',
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
