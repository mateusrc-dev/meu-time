import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Country from '../components/country'
import { MultiStep } from '../components/MultiStep'
import { Container, ContainerCountries } from '../styles/pages/selectCountries'
import { ArrowBendRightDown, SoccerBall } from 'phosphor-react'
import { useRouter } from 'next/router'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'

interface CountryProps {
  name: string
  code: string
  flag: string
}

export default function SelectCountries() {
  const [countries, setCountries] = useState<CountryProps[]>([])
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
  console.log(season)
  console.log(userKey)

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
          <ContainerCountries>
            {countries &&
              countries.map(
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
            <Country
              country="Mateus"
              image="https://github.com/mateusrc-dev.png"
              handleClick={handleClickCountry}
            />
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
  )
}
