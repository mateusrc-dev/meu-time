import { styled, keyframes } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5rem',
})

export const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2rem',
  padding: '1rem',
  backgroundColor: '$blue_200',
  borderRadius: '5px',
  boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',
})

export const Input = styled('input', {
  background: '$blue_300',
  border: '2px solid transparent',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  marginTop: '1rem',
  width: '100%',
  color: '$blue_100',

  '&::placeholder': {
    color: '$blue_200',
  },

  '&:focus': {
    borderColor: '$red_100',
    outline: 0,
  },
})

export const Button = styled('button', {
  background: '$blue_300',
  border: '1px solid transparent',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  marginTop: '1rem',
  color: '$blue_100',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '&:hover': {
    borderColor: '$white_100',
    backgroundColor: '$blue_200',
    color: '$white_100',
  },
})
