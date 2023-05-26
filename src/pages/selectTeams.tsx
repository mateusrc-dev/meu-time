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
  team: {
    code: string
    country: string
    founded: number
    id: number
    logo: string
    name: string
    national: boolean
  }
  venue: {
    address: string
    capacity: number
    city: string
    id: number
    image: string
    name: string
    surface: string
  }
}

export default function SelectTeams() {
  const [teams, setTeams] = useState<TeamsProps[]>([])
  const { league, season, country, userKey } = useContext(
    OptionsSelectedContext,
  )
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
            'x-rapidapi-key': `${userKey}`,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      setTeams(res.data.response)
    }
    handleFindTeams()
  }, [league, season, userKey])

  useEffect(() => {
    if (userKey === null) {
      router.push('/login')
    }

    if (country === null) {
      router.push('/selectCountries')
    }

    if (season === null) {
      router.push('/selectSeasons')
    }

    if (league === null) {
      router.push('/selectSeasons')
    }
  }, [userKey, router, country, season, league])

  return (
    <>
      {country !== null &&
      userKey !== null &&
      season !== null &&
      league !== null ? (
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
            {teams.map((item) => (
              <Team
                key={String(item.team.id)}
                teamName={item.team.name}
                teamLogo={item.team.logo}
                handleClick={handleClickTeam}
                teamId={String(item.team.id)}
              />
            ))}
            <Team
              teamName="time bacana"
              teamLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickTeam}
              teamId="1"
            />
          </ContainerTeams>
          <MultiStep currentStep={4} size={4} />
        </Container>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20rem',
            textAlign: 'center',
          }}
        >
          <h1>
            Você não está logado ou ainda não selecionou um país, uma temporada
            e uma liga!
          </h1>
        </div>
      )}
    </>
  )
}
