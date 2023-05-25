import { Body, Container, ImageCountry } from "./styles";

interface Props {
  leagueName: string
  leagueLogo: string
}

export default function League({ leagueName, leagueLogo }: Props) {
return (
    <Container>
      <Body>
        <ImageCountry src={leagueLogo} alt="imagem do país" width="132" height="100" />
        <p>{leagueName}</p>
      </Body>
    </Container>
  )
}