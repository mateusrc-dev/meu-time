import { MultiStep } from '../components/MultiStep'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowBendRightDown, ArrowBendUpLeft, SoccerBall } from 'phosphor-react'

import {
  Container,
  ContainerTeams,
  HeaderTeams,
} from '../styles/pages/selectTeams'
import Team from '../components/team'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'

interface TeamsProps {
  team_id: string
  name: string
  code: string
  logo: string
}

export default function SelectTeams() {
  const [teams /* setTeams */] = useState<TeamsProps[]>([])
  const { league, season } = useContext(OptionsSelectedContext)
  const router = useRouter()

  function handleClickTeam(teamId: string) {
    router.push(`/detailsTeam/${teamId}`)
  }

  function handleReturn() {
    router.push('/selectLeagues')
  }

  console.log(teams)

  useEffect(() => {
    async function handleFindTeams() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/teams?league=${league}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setTeams(res.data.response)
    }
    handleFindTeams()
  }, [league, season])

  return (
    <Container>
      <HeaderTeams>
        <h1>
          <SoccerBall /> Escolha um time <ArrowBendRightDown />
        </h1>
        <h1 onClick={handleReturn}>
          <ArrowBendUpLeft /> retornar
        </h1>
      </HeaderTeams>
      <ContainerTeams>
        {/* {teams.map((item) => (
            <Team key={String(item)} season={item} />
          ))
          } */}
        <Team
          teamName="time bacana"
          teamLogo="https://github.com/mateusrc-dev.png"
          handleClick={handleClickTeam}
          teamId="1"
        />
      </ContainerTeams>
      <MultiStep currentStep={4} size={4} />
    </Container>
  )
}
