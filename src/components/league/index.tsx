import { Body, Container, ImageLeague } from './styles'

interface Props {
  leagueName: string
  leagueLogo: string
}

export default function League({ leagueName, leagueLogo }: Props) {
  return (
    <Container>
      <Body>
        <ImageLeague
          src={leagueLogo}
          alt="imagem do país"
          width="132"
          height="100"
        />
        <p>{leagueName}</p>
      </Body>
    </Container>
  )
}
