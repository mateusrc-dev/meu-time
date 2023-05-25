import { Body, Container, ImageCountry } from './styles'

interface Props {
  image: string
  country: string
  handleClick: (country: string) => void
}

export default function Country({ image, country, handleClick }: Props) {
  return (
    <Container onClick={() => handleClick(country)}>
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
