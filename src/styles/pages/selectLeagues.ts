import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 4rem)',

  h1: {
    marginTop: '2rem',
    fontSize: '1rem',
    color: '$blue_100',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
})

export const HeaderLeagues = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  'h1:nth-child(2)': {
    color: '$red_100',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      textDecoration: 'underline',
      filter: 'brightness(0.8)',
    },
  },
})

export const ContainerLeagues = styled('div', {
  padding: '1rem 1rem',
  marginTop: '1rem',
  marginBottom: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  flexWrap: 'wrap',
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
