import { Body, Container, ImageTeam } from './styles'

interface Props {
  teamName: string
  teamLogo: string
  handleClick: (teamId: string) => void
  teamId: string
}

export default function Team({
  teamName,
  teamLogo,
  handleClick,
  teamId,
}: Props) {
  return (
    <Container onClick={() => handleClick(teamId)}>
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
