import { Container } from "./styles";

interface Props {
  season: number
}

export default function Season({ season }: Props) {
  console.log(season)

return (
    <Container>
        {season}
    </Container>
  )
}