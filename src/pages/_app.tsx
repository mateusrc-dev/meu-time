import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Body, Container, Header, LogoImage } from "../styles/pages/app"
import logoImg from "../assets/ball.svg"
import Image from "next/image"

globalStyles()

export default function App({Component, pageProps}: AppProps) {
  return (
      <Container>
        <Body>
          <Header>
            <h1>Meu Time</h1>
            <LogoImage>
              <Image src={logoImg} width={50} height={50} alt="logo"/>
            </LogoImage>
          </Header>
          <Component {...pageProps} />
        </Body>
      </Container>
    )
}