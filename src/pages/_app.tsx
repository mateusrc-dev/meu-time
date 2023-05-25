import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import {
  Body,
  Container,
  Header,
  LogoImage,
  SignOutContainer,
} from '../styles/pages/app'
import logoImg from '../assets/ball.svg'
import Image from 'next/image'
import { SignOut } from 'phosphor-react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Body>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogoImage>
              <Image src={logoImg} width={50} height={50} alt="logo" />
            </LogoImage>
            <h1>Meu Time</h1>
          </div>
          <SignOutContainer>
            <SignOut color="#1d3557" weight="duotone" size="25" />
          </SignOutContainer>
        </Header>
        <Component {...pageProps} />
      </Body>
    </Container>
  )
}
