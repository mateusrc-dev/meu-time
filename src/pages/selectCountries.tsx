import { useEffect, useState } from "react";
import axios from "axios";
import Country from "../components/country";
import { MultiStep } from "../components/MultiStep";
import { Container, ContainerCountries } from "../styles/pages/selectCountries";
import { ArrowBendRightDown } from "phosphor-react";
import { SoccerBall } from "phosphor-react";

interface CountryProps {
  name: string,
  code: string,
  flag: string,
}

export default function SelectCountries() {
  const [countries, setCountries] = useState<CountryProps[]>([])

  useEffect(() => {
    async function handleFindCountries() {
    const res = await axios.get("https://v3.football.api-sports.io/countries", {
      headers: {
        'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
    })
    setCountries(res.data.response)
  }
  handleFindCountries()   
  }, [])

  return (
      <Container>
        <h1><SoccerBall /> Escolha o país do seu time <ArrowBendRightDown /></h1>
        <ContainerCountries>
          {countries &&
              countries.map((item) => (
                item.flag &&
              <Country key={String(item.code)} country={item.name} image={item.flag} />
            ))
          }
        </ContainerCountries>      
        <MultiStep currentStep={1} size={3} />
      </Container>
    )
}