import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Body, Container, ContainerModeTheme } from '../styles/pages/app'

import { MoonStars, SunHorizon } from 'phosphor-react'
import { OptionsSelectedProvider } from '../contexts/saveSelectedOptions'
import { useState } from 'react'
import { createStitches } from '@stitches/react'

export default function App({ Component, pageProps }: AppProps) {
  const [modeTheme, setModeTheme] = useState<boolean>(true)
  globalStyles()

  createStitches({
    theme: {
      colors: {
        blue_100: !modeTheme ? '#1d3557' : '#353535',
        blue_200: !modeTheme ? '#457b9d' : '#284b63',
        blue_300: !modeTheme ? '#a8dadc' : '#3c6e71',

        white_100: !modeTheme ? '#f1faee' : '#d9d9d9',

        red_100: !modeTheme ? '#e63946' : '#ff006e',
      },
    },
  })

  function handleModeTheme() {
    if (modeTheme === true) {
      setModeTheme(false)
    } else {
      setModeTheme(true)
    }
  }

  return (
    <Container>
      <Body>
        <OptionsSelectedProvider>
          <Component {...pageProps} />
        </OptionsSelectedProvider>
      </Body>
      <ContainerModeTheme onClick={handleModeTheme}>
        {!modeTheme ? (
          <MoonStars size={30} color="#f1faee" />
        ) : (
          <SunHorizon size={30} color="#1d3557" />
        )}
      </ContainerModeTheme>
    </Container>
  )
}
