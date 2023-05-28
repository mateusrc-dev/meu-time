import Image from 'next/image'
import { styled } from '../../styles'

export const Container = styled('button', {
  padding: '1rem',
  backgroundColor: '$blue_100',
  width: '12rem',
  border: '2px solid transparent',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  borderRadius: '10px',
  transition: 'all 0.3s',
  cursor: 'pointer',

  '&:hover': {
    boxShadow: '6px 6px 5px rgba(0, 0, 0, 0.5)',
    transform: 'translate(-6px, -6px)',
    borderColor: '$red_100',
  },
})

export const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',

  p: {
    fontStyle: 'italic',
    fontSize: '1rem',
    textDecoration: 'underline',
    color: '$white_100',
  },
})

export const ImageCountry = styled(Image, {
  borderRadius: '10px',
  border: '2px solid $blue_200',
})
