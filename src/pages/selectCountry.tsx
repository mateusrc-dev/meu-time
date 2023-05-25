import { useEffect, useState } from "react";
import axios from "axios";
import Country from "../components/country";
import { MultiStep } from "../components/MultiStep";
import { Container, ContainerCountry, ContainerMultiStep } from "../styles/pages/selectCountry";

export default function SelectCountry() {
  const [country, setCountry] = useState()

  console.log(country)

  useEffect(() => {
    var config = {
      method: 'get',
      url: "https://v3.football.api-sports.io/countries",
      headers: {
        'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      setCountry(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
      <Container>
        <h1>Escolha o país do seu time</h1>
        <ContainerCountry>
          <Country country="Brasil" image="https://github.com/mateusrc-dev.png" />
          <Country country="Brasil" image="https://github.com/mateusrc-dev.png" />
          <Country country="Brasil" image="https://github.com/mateusrc-dev.png" />
          <Country country="Brasil" image="https://github.com/mateusrc-dev.png" />
          <Country country="Brasil" image="https://github.com/mateusrc-dev.png" />
        </ContainerCountry>      
        <MultiStep currentStep={1} size={3} />
      </Container>
    )
}