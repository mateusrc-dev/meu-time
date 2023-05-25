import { Body, Container, ImageCountry } from './styles'

interface Props {
  image: string
  country: string
}

export default function Country({ image, country }: Props) {
  return (
    <Container>
      <Body>
        <ImageCountry
          src={image}
          alt="imagem do país"
          width="132"
          height="100"
        />
        <p>{country}</p>
      </Body>
    </Container>
  )
}
