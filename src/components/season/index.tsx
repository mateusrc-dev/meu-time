import { Container } from './styles'

interface Props {
  season: number
  handleClick: (season: number) => void
}

export default function Season({ season, handleClick }: Props) {
  console.log(season)

  return <Container onClick={() => handleClick(season)}>{season}</Container>
}
