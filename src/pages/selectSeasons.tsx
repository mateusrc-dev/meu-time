import { MultiStep } from '../components/MultiStep'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Season from '../components/season'
import { ArrowBendRightDown, ArrowBendUpLeft, SoccerBall } from 'phosphor-react'

import {
  Container,
  ContainerSeasons,
  HeaderSeasons,
} from '../styles/pages/selectSeasons'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'

export default function SelectSeasons() {
  const [seasons, setSeasons] = useState<number[]>([])
  const { handleSeason, userKey, country } = useContext(OptionsSelectedContext)
  const router = useRouter()

  function handleClickSeason(season: number) {
    router.push('/selectLeagues')
    handleSeason(season)
  }

  function handleReturn() {
    router.push('/selectCountries')
  }

  useEffect(() => {
    async function handleFindCountries() {
      const res = await axios.get(
        'https://v3.football.api-sports.io/leagues/seasons',
        {
          headers: {
            'x-rapidapi-key': `${userKey}`,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      setSeasons(res.data.response)
    }
    handleFindCountries()
  }, [userKey])

  useEffect(() => {
    if (userKey === null) {
      router.push('/login')
    }

    if (country === null) {
      router.push('/selectCountries')
    }
  }, [userKey, router, country])

  return (
    <>
      {country !== null && userKey !== null ? (
        <Container>
          <HeaderSeasons>
            <h1>
              <SoccerBall /> Escolha uma temporada <ArrowBendRightDown />
            </h1>
            <h1 onClick={handleReturn}>
              <ArrowBendUpLeft /> retornar
            </h1>
          </HeaderSeasons>
          <ContainerSeasons>
            {seasons.map((item) => (
              <Season
                key={String(item)}
                season={item}
                handleClick={handleClickSeason}
              />
            ))}
            <Season season={2023} handleClick={handleClickSeason} />
          </ContainerSeasons>
          <MultiStep currentStep={2} size={4} />
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
          <h1>Você não está logado ou ainda não selecionou um país!</h1>
        </div>
      )}
    </>
  )
}
