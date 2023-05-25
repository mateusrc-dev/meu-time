import { MultiStep } from "../components/MultiStep";
import { useEffect, useState } from "react";
import axios from "axios";
import Season from "../components/season";
import { ArrowBendRightDown, ArrowBendUpLeft } from "phosphor-react";
import { SoccerBall } from "phosphor-react";
import { Container, ContainerSeasons, HeaderSeasons } from "../styles/pages/selectSeasons";


export default function SelectSeasons() {
  const [seasons, setSeasons] = useState<number[]>([])

  useEffect(() => {
    async function handleFindCountries() {
    const res = await axios.get("https://v3.football.api-sports.io/leagues/seasons", {
      headers: {
        'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
    })
    setSeasons(res.data.response)
  }
  handleFindCountries()   
  }, [])

  return (
      <Container>
        <HeaderSeasons>
          <h1><SoccerBall /> Escolha uma temporada <ArrowBendRightDown /></h1>
          <h1><ArrowBendUpLeft /> retornar</h1>
        </HeaderSeasons>
        <ContainerSeasons>
          {seasons.map((item) => (
            <Season key={String(item)} season={item} />
          ))
          }
        </ContainerSeasons>
        <MultiStep currentStep={2} size={3} />
      </Container>
    )
}