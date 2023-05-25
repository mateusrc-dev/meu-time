import { Body, Container, ImageTeam } from './styles'

interface Props {
  teamName: string
  teamLogo: string
}

export default function Team({ teamName, teamLogo }: Props) {
  return (
    <Container>
      <Body>
        <ImageTeam
          src={teamLogo}
          alt="imagem do país"
          width="132"
          height="100"
        />
        <p>{teamName}</p>
      </Body>
    </Container>
  )
}
