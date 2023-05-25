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
import { useState } from 'react'
import { useRouter } from 'next/router'
import { OptionsSelectedProvider } from '../contexts/saveSelectedOptions'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [state /* setState */] = useState<boolean>(true)
  const router = useRouter()

  function handleSignOut() {
    router.push('/login')
  }

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
          {state && (
            <SignOutContainer onClick={handleSignOut}>
              <SignOut color="#1d3557" weight="duotone" size="25" />
            </SignOutContainer>
          )}
        </Header>
        <OptionsSelectedProvider>
          <Component {...pageProps} />
        </OptionsSelectedProvider>
      </Body>
    </Container>
  )
}
