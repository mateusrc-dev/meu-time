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

export const HeaderTeam = styled('div', {
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

export const ContainerTeamDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  backgroundColor: '$blue_200',
  width: '10rem',
  padding: '0.5rem 2rem',
  borderRadius: '5px',
  boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.5)',
})
