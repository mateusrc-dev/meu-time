import Image from "next/image";
import { Body, Container, ImageCountry } from "./styles";

interface Props {
  image: string
  country: string
}

export default function Country({ image, country }: Props) {
return (
    <Container>
      <Body>
        <ImageCountry src={image} alt="imagem do país" width="150" height="100" />
        <h1>{country}</h1>
      </Body>
    </Container>
  )
}