import { MultiStep } from '../components/MultiStep'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  ArrowBendRightDown,
  ArrowBendUpLeft,
  HouseLine,
  SignOut,
  SoccerBall,
} from 'phosphor-react'

import {
  Container,
  ContainerLeagues,
  HeaderLeagues,
} from '../styles/pages/selectLeagues'
import League from '../components/league'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import { Header, LogoImage, SignOutContainer } from '../styles/pages/app'
import Image from 'next/image'
import logoImg from '../assets/ball.svg'
import ShowLoading from '../components/Loading'

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
  const [leagues, setLeagues] = useState<LeaguesProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleCountry,
    handleSeason,
    handleUserKey,
    handleLeague,
    country,
    season,
    userKey,
  } = useContext(OptionsSelectedContext)
  const router = useRouter()

  function handleSignOut() {
    setLoading(true)
    localStorage.removeItem('@meu-time:league')
    localStorage.removeItem('@meu-time:country')
    localStorage.removeItem('@meu-time:season')
    localStorage.removeItem('@meu-time:userKey')
    handleCountry(null)
    handleLeague(null)
    handleSeason(null)
    handleUserKey(null)
    router.push('/login')
  }

  function handleClickLeague(leagueId: number) {
    handleLeague(leagueId)
    router.push('/selectTeams')
  }

  function handleReturn() {
    router.push('/selectSeasons')
  }

  function handleReturnsHome() {
    router.push('/selectCountries')
  }

  useEffect(() => {
    async function handleFindLeagues() {
      try {
        setLoading(true)
        const res = await axios.get(
          `https://v3.football.api-sports.io/leagues?season=${season}&country=${country}`,
          {
            headers: {
              'x-rapidapi-key': `${userKey}`,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        )
        setLeagues(res.data.response)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    handleFindLeagues()
  }, [country, season, userKey])

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
      {!loading ? (
        <>
          {country !== null && userKey !== null && season !== null ? (
            <Container>
              <Header>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <LogoImage>
                    <Image src={logoImg} width={50} height={50} alt="logo" />
                  </LogoImage>
                  <h2>Meu Time</h2>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {router.asPath === '/login' ||
                  router.asPath === '/' ? null : (
                    <SignOutContainer onClick={handleReturnsHome}>
                      <HouseLine color="#1d3557" weight="duotone" size="25" />
                    </SignOutContainer>
                  )}
                  {router.asPath === '/login' ||
                  router.asPath === '/' ? null : (
                    <SignOutContainer onClick={handleSignOut}>
                      <SignOut color="#1d3557" weight="duotone" size="25" />
                    </SignOutContainer>
                  )}
                </div>
              </Header>
              <HeaderLeagues>
                <h1>
                  <SoccerBall /> Escolha uma liga <ArrowBendRightDown />
                </h1>
                <h1 onClick={handleReturn}>
                  <ArrowBendUpLeft /> retornar
                </h1>
              </HeaderLeagues>
              <ContainerLeagues>
                {leagues.map((item) => (
                  <League
                    key={String(item.league.id)}
                    leagueName={item.league.name}
                    leagueLogo={item.league.logo}
                    handleClick={handleClickLeague}
                    leagueId={item.league.id}
                  />
                ))}
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
      ) : (
        <>
          <ShowLoading />
        </>
      )}
    </>
  )
}
