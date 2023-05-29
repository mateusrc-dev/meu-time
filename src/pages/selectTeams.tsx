import { MultiStep } from '../components/MultiStep'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  ArrowBendRightDown,
  ArrowBendUpLeft,
  SignOut,
  SoccerBall,
} from 'phosphor-react'

import {
  Container,
  ContainerTeams,
  HeaderTeams,
} from '../styles/pages/selectTeams'
import Team from '../components/team'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import { Header, LogoImage, SignOutContainer } from '../styles/pages/app'
import Image from 'next/image'
import logoImg from '../assets/ball.svg'
import ShowLoading from '../components/Loading'

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
  const [loading, setLoading] = useState<boolean>(false)
  const {
    league,
    handleCountry,
    handleLeague,
    handleSeason,
    handleUserKey,
    season,
    country,
    userKey,
  } = useContext(OptionsSelectedContext)
  const router = useRouter()

  function handleSignOut() {
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

  function handleClickTeam(teamId: string) {
    router.push(`/detailsTeam/${teamId}`)
  }

  function handleReturn() {
    router.push('/selectLeagues')
  }

  useEffect(() => {
    async function handleFindTeams() {
      try {
        setLoading(true)
        const res = await axios.get(
          `https://v3.football.api-sports.io/teams?league=${league}&season=${season}`,
          {
            headers: {
              'x-rapidapi-key': `${userKey}`,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        )
        setTeams(res.data.response)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
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
      {!loading ? (
        <>
          {country !== null &&
          userKey !== null &&
          season !== null &&
          league !== null ? (
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
                {router.asPath === '/login' || router.asPath === '/' ? null : (
                  <SignOutContainer onClick={handleSignOut}>
                    <SignOut color="#1d3557" weight="duotone" size="25" />
                  </SignOutContainer>
                )}
              </Header>
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
                Você não está logado ou ainda não selecionou um país, uma
                temporada e uma liga!
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
