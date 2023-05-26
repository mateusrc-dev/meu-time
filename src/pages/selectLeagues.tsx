import { MultiStep } from '../components/MultiStep'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowBendRightDown, ArrowBendUpLeft, SoccerBall } from 'phosphor-react'

import {
  Container,
  ContainerLeagues,
  HeaderLeagues,
} from '../styles/pages/selectLeagues'
import League from '../components/league'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'

interface LeaguesProps {
  country: {
    name: string
    code: string | null
    flag: string | null
  }
  league: {
    id: number
    logo: string
    name: string
    type: string
  }
  seasons: {
    year: number
    start: string
    end: string
    current: boolean
  }[]
}

export default function SelectLeagues() {
  const [leagues /* setLeagues */] = useState<LeaguesProps[]>([])
  const { handleLeague, country, season, userKey } = useContext(
    OptionsSelectedContext,
  )
  const router = useRouter()

  console.log(leagues)

  function handleClickLeague(leagueId: number) {
    handleLeague(leagueId)
    router.push('/selectTeams')
  }

  function handleReturn() {
    router.push('/selectSeasons')
  }

  useEffect(() => {
    async function handleFindLeagues() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/leagues?country=${country}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setLeagues(res.data.response)
    }
    handleFindLeagues()
  }, [country, season])

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
  }, [userKey, router, country, season])

  return (
    <>
      {country !== null && userKey !== null && season !== null ? (
        <Container>
          <HeaderLeagues>
            <h1>
              <SoccerBall /> Escolha uma liga <ArrowBendRightDown />
            </h1>
            <h1 onClick={handleReturn}>
              <ArrowBendUpLeft /> retornar
            </h1>
          </HeaderLeagues>
          <ContainerLeagues>
            {/* {leagues.map((item) => (
            <League key={String(item)} season={item} handleClick={handleClickLeague} />
          ))
          } */}
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
            <League
              leagueName="liga bacana"
              leagueLogo="https://github.com/mateusrc-dev.png"
              handleClick={handleClickLeague}
              leagueId={1}
            />
          </ContainerLeagues>
          <MultiStep currentStep={3} size={4} />
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
            Você não está logado ou ainda não selecionou um país e uma
            temporada!
          </h1>
        </div>
      )}
    </>
  )
}
