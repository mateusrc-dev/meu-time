import { createStitches } from '@stitches/react'

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      blue_100: '#1d3557',
      blue_200: '#457b9d',
      blue_300: '#a8dadc',

      white_100: '#f1faee',

      red_100: '#e63946',
    },
  },
})
