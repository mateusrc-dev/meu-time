import { styled } from '../../styles'

export const Container = styled('div', {
  padding: '1rem',
  backgroundColor: '$blue_100',
  width: '12rem',
  border: '2px solid transparent',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  borderRadius: '10px',
  transition: 'all 0.3s',
  cursor: 'pointer',
  fontStyle: 'italic',
  fontSize: '1rem',
  textDecoration: 'none',
  color: '$white_100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.5)',
    transform: 'translate(-6px, -6px)',
    borderColor: '$red_100',
    textDecoration: 'underline',
    backgroundColor: '$blue_200',
  },
})
