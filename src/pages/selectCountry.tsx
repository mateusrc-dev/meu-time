import { useEffect, useState } from "react";
import axios from "axios";
import Country from "../components/country";

export default function SelectCountry() {
  const [country, setCountry] = useState()

  console.log(country)

  useEffect(() => {
  var config = {
    method: 'get',
    url: "https://v3.football.api-sports.io/countries",
    headers: {
      'x-rapidapi-key': '2010395751e2acaf74677abf98fd09f8',
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
      <>
        <h1>Escolha o país do seu time</h1>
        <Country country="Brasil" image="https://github.com/mateusrc-dev.png" />
        <p>colocar o step para idenficar a evolução nas páginas</p>
      </>
    )
}