import { MultiStep } from "../components/MultiStep";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBendRightDown, ArrowBendUpLeft } from "phosphor-react";
import { SoccerBall } from "phosphor-react";
import { Container, ContainerLeagues, HeaderLeagues } from "../styles/pages/selectLeagues";
import League from "../components/league";

interface LeaguesProps {
  country: {
    name: string,
    code: string | null,
    flag: string | null,
  },
  league: {
    id: number,
    logo: string,
    name: string,
    type: string,
  },
  seasons: {
    year: number,
    start: string,
    end: string,
    current: boolean
  }[]
}

export default function SelectLeagues() {
  const [leagues, setLeagues] = useState<LeaguesProps[]>([])

  console.log(leagues)

  useEffect(() => {
    async function handleFindCountries() {
    const res = await axios.get("https://v3.football.api-sports.io/leagues?country=england&season=2019", { // aqui temos como colocar query params - vamos pegar o valor desses query params pelas rotas
      headers: {
        'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
    })
    console.log(res.data)
    // setLeagues(res.data.response)
  }
  handleFindCountries()   
  }, [])

  return (
      <Container>
        <HeaderLeagues>
          <h1><SoccerBall /> Escolha uma liga <ArrowBendRightDown /></h1>
          <h1><ArrowBendUpLeft /> retornar</h1>
        </HeaderLeagues>
        <ContainerLeagues>
          {/* {leagues.map((item) => (
            <League key={String(item)} season={item} />
          ))
          } */}
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
          <League leagueName="liga bacana" leagueLogo="https://github.com/mateusrc-dev.png" />
        </ContainerLeagues>
        <MultiStep currentStep={3} size={4} />
      </Container>
    )
}