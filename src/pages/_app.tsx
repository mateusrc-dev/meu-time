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
import { useRouter } from 'next/router'
import { OptionsSelectedProvider } from '../contexts/saveSelectedOptions'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  function handleSignOut() {
    localStorage.removeItem('@meu-time:league')
    localStorage.removeItem('@meu-time:country')
    localStorage.removeItem('@meu-time:season')
    localStorage.removeItem('@meu-time:userKey')
    router.push('/login')
  }

  console.log(router.asPath)

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
          {router.asPath === '/login' || router.asPath === '/' ? null : (
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
