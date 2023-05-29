import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Country from '../components/country'
import { MultiStep } from '../components/MultiStep'
import { Container, ContainerCountries } from '../styles/pages/selectCountries'
import {
  ArrowBendRightDown,
  ArrowLeft,
  ArrowRight,
  SignOut,
  SoccerBall,
} from 'phosphor-react'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import { ButtonTeam } from '../styles/pages/detailsTeam'
import ShowLoading from '../components/Loading'
import { Header, LogoImage, SignOutContainer } from '../styles/pages/app'
import Image from 'next/image'
import logoImg from '../assets/ball.svg'

interface CountryProps {
  name: string
  code: string
  flag: string
}

export default function SelectCountries() {
  const [countries, setCountries] = useState<CountryProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [countriesCurrent, setCountriesCurrent] = useState<CountryProps[]>([])
  const [numberPages, setNumberPages] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageStartCurrent, setPageStartCurrent] = useState<number>(0)
  const [pageEndCurrent, setPageEndCurrent] = useState<number>(19)
  const { handleCountry, handleLeague, handleSeason, handleUserKey, userKey } =
    useContext(OptionsSelectedContext)
  const router = useRouter()

  function handleClickCountry(country: string) {
    handleCountry(country)
    router.push('/selectSeasons')
  }

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

  function handlePagesAdd() {
    if (page < numberPages) {
      setPage((prevState) => prevState + 1)
      setPageStartCurrent((prevState) => prevState + 20)
      setPageEndCurrent((prevState) => prevState + 20)
    }
  }

  function handlePagesSub() {
    if (page > 1) {
      setPage((prevState) => prevState - 1)
      setPageStartCurrent((prevState) => prevState - 20)
      setPageEndCurrent((prevState) => prevState - 20)
    }
  }

  useEffect(() => {
    const currentCountries = countries.filter(
      (_, index) => index >= pageStartCurrent && index <= pageEndCurrent,
    )
    setCountriesCurrent(currentCountries)
  }, [countries, pageStartCurrent, pageEndCurrent])

  useEffect(() => {
    const numPagesTemp = countries.length / 20
    setNumberPages(Math.ceil(numPagesTemp))
  }, [countries])

  useEffect(() => {
    async function handleFindCountries() {
      try {
        setLoading(true)
        const res = await axios.get(
          'https://v3.football.api-sports.io/countries',
          {
            headers: {
              'x-rapidapi-key': `${userKey}`,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        )

        setCountries(res.data.response)
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
  }, [userKey, router, handleCountry])

  return (
    <>
      {!loading ? (
        <>
          {userKey !== null ? (
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h1>
                  <SoccerBall /> Escolha o país do seu time{' '}
                  <ArrowBendRightDown />
                </h1>
                <div
                  className="pagesControl"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <SoccerBall color={'#1d3557'} />
                  <p style={{ color: '#1d3557', fontStyle: 'italic' }}>
                    page {page} de {numberPages}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ButtonTeam onClick={() => handlePagesSub()}>
                      <ArrowLeft color={'#1d3557'} />
                    </ButtonTeam>
                    <ButtonTeam onClick={() => handlePagesAdd()}>
                      <ArrowRight color={'#1d3557'} />
                    </ButtonTeam>
                  </div>
                </div>
              </div>
              <ContainerCountries>
                {countriesCurrent &&
                  countriesCurrent.map(
                    (item) =>
                      item.flag && (
                        <Country
                          key={String(item.code)}
                          country={item.name}
                          image={item.flag}
                          handleClick={handleClickCountry}
                        />
                      ),
                  )}
              </ContainerCountries>

              <MultiStep currentStep={1} size={4} />
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
              <h1>Você não está logado!</h1>
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
