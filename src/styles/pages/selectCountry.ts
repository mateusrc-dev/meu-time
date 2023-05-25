import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 4rem)',

  'h1': {
    marginTop: '2rem',
    fontSize: '1rem',
    color: '$blue_100'
  }
})

export const ContainerCountry = styled('div', {
  marginTop: '1rem',
  marginBottom: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  flexWrap: 'wrap',
})

export const ContainerMultiStep = styled('div', {})