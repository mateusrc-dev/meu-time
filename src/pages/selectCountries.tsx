import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Country from '../components/country'
import { MultiStep } from '../components/MultiStep'
import { Container, ContainerCountries } from '../styles/pages/selectCountries'
import {
  ArrowBendRightDown,
  ArrowLeft,
  ArrowRight,
  SoccerBall,
} from 'phosphor-react'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import { ButtonTeam } from '../styles/pages/detailsTeam'

interface CountryProps {
  name: string
  code: string
  flag: string
}

export default function SelectCountries() {
  const [countries, setCountries] = useState<CountryProps[]>([])
  const [countriesCurrent, setCountriesCurrent] = useState<CountryProps[]>([])
  const [numberPages, setNumberPages] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageStartCurrent, setPageStartCurrent] = useState<number>(0)
  const [pageEndCurrent, setPageEndCurrent] = useState<number>(19)
  const { handleCountry, country, league, season, userKey } = useContext(
    OptionsSelectedContext,
  )
  const router = useRouter()

  function handleClickCountry(country: string) {
    handleCountry(country)
    router.push('/selectSeasons')
  }

  console.log(country)
  console.log(league)
  console.log(pageEndCurrent)
  console.log(season)

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
    setNumberPages(Math.round(numPagesTemp))
  }, [countries])

  useEffect(() => {
    async function handleFindCountries() {
      const res = await axios.get(
        'https://v3.football.api-sports.io/countries',
        {
          headers: {
            'x-rapidapi-key': `${userKey}`,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      setCountries(res.data.response)
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
      {userKey !== null ? (
        <Container>
          <h1>
            <SoccerBall /> Escolha o país do seu time <ArrowBendRightDown />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
          <Country
            country={'Brasil'}
            image={'https://github.com/mateusrc-dev.png'}
            handleClick={handleClickCountry}
          />
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
  )
}
