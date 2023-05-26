import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect /* useState */ } from 'react'
import { Container, HeaderTeam } from '../../styles/pages/detailsTeam'
import { ArrowBendRightDown, ArrowBendUpLeft, SoccerBall } from 'phosphor-react'
import { OptionsSelectedContext } from '../../contexts/saveSelectedOptions'

/* interface TeamProps {
  team_id: string
  name: string
  code: string
  logo: string
} */

export default function DetailsTime() {
  // const [teamDetails, setTeamDetails] = useState<TeamProps>()
  // const [players, setPlayers] = useState([])
  // const [teamStatistic, setTeamStatistic] = useState()
  const { query, push } = useRouter()
  const { league, season, country, userKey } = useContext(
    OptionsSelectedContext,
  )

  function handleReturn() {
    push('/selectTeams')
  }

  useEffect(() => {
    if (userKey === null) {
      push('/login')
    }

    if (country === null) {
      push('/selectCountries')
    }

    if (season === null) {
      push('/selectSeasons')
    }

    if (league === null) {
      push('/selectSeasons')
    }
  }, [userKey, country, season, league, push])

  useEffect(() => {
    async function handleFindDetailsTeam() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/teams?id=${query.id}`,
        {
          // aqui temos como colocar query params - vamos pegar o valor desses query params pelas rotas
          headers: {
            'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setTeamDetails(res.data.response)
    }
    async function handleGetPlayers() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/players?season=2018&team=${query.id}`,
        {
          // aqui temos como colocar query params - vamos pegar o valor desses query params pelas rotas
          headers: {
            'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setPlayers(res.data.response)
    }
    async function handleGetTeamStatistic() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/teams/statistics?league=39&team=${query.id}&season=2019`,
        {
          // aqui temos como colocar query params - vamos pegar o valor desses query params pelas rotas
          headers: {
            'x-rapidapi-key': 'd9b4ea21a1cdeb03bfef53a5c77411f2',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setTeamStatistic(res.data.response)
    }
    handleFindDetailsTeam()
    handleGetPlayers()
    handleGetTeamStatistic()
  }, [query])

  return (
    <>
      {country !== null &&
      userKey !== null &&
      season !== null &&
      league !== null ? (
        <Container>
          <HeaderTeam>
            <h1>
              <SoccerBall /> Detalhes do time <ArrowBendRightDown />
            </h1>
            <h1 onClick={handleReturn}>
              <ArrowBendUpLeft /> retornar
            </h1>
          </HeaderTeam>
          <h1>vamos analisar o que vai chegar pela api depois</h1>
        </Container>
      ) : (
        <h1>
          Você não está logado ou ainda não selecionou um país, uma temporada e
          uma liga!
        </h1>
      )}
    </>
  )
}
