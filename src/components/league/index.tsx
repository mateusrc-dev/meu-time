import { Body, Container, ImageLeague } from './styles'

interface Props {
  leagueName: string
  leagueLogo: string
  handleClick: (season: number) => void
  leagueId: number
}

export default function League({
  leagueId,
  leagueName,
  leagueLogo,
  handleClick,
}: Props) {
  return (
    <Container onClick={() => handleClick(leagueId)}>
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
