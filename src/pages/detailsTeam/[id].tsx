import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect /* useState */ } from 'react'

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
  const { query } = useRouter()

  // `https://v3.football.api-sports.io/players?season=2018&team=${query.id}`

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
      <h1>vamos analisar o que vai chegar pela api depois</h1>
    </>
  )
}
