import { MultiStep } from '../components/MultiStep'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Season from '../components/season'
import {
  ArrowBendRightDown,
  ArrowBendUpLeft,
  SignOut,
  SoccerBall,
} from 'phosphor-react'

import {
  Container,
  ContainerSeasons,
  HeaderSeasons,
} from '../styles/pages/selectSeasons'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import { Header, LogoImage, SignOutContainer } from '../styles/pages/app'
import Image from 'next/image'
import logoImg from '../assets/ball.svg'
import ShowLoading from '../components/Loading'

export default function SelectSeasons() {
  const [seasons, setSeasons] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>()
  const {
    handleSeason,
    handleCountry,
    handleLeague,
    handleUserKey,
    userKey,
    country,
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

  function handleClickSeason(season: number) {
    router.push('/selectLeagues')
    handleSeason(season)
  }

  function handleReturn() {
    router.push('/selectCountries')
  }

  useEffect(() => {
    async function handleFindCountries() {
      try {
        setLoading(true)
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
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
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
      {!loading ? (
        <>
          {country !== null && userKey !== null ? (
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
      ) : (
        <>
          <ShowLoading />
        </>
      )}
    </>
  )
}
