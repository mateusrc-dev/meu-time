import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect /* useState */ } from 'react'
import {
  Container,
  ContainerTeamDetails,
  HeaderTeam,
} from '../../styles/pages/detailsTeam'
import { ArrowBendRightDown, ArrowBendUpLeft, SoccerBall } from 'phosphor-react'
import { OptionsSelectedContext } from '../../contexts/saveSelectedOptions'
import Image from 'next/image'

/* interface TeamProps {
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

interface PlayersProps {
  age: number
  birth: {
    country: string
    date: string
    place: string
  }
  firstname: string
  height: string
  id: number
  injured: boolean
  lastname: string
  name: string
  nationality: string
  photo: string
  weight: string
}

interface StatisticsProps {
  biggest: {
    goals: {
      against: {
        away: number | null
        home: number | null
      }
      for: {
        away: number | null
        home: number | null
      }
    }
    loses: {
      away: number | null
      home: number | null
    }
    streak: {
      draws: number | null
      loses: number | null
      wins: number | null
    }
    wins: {
      home: number | null
      away: number | null
    }
  }
  lineups: {
    formation: string
    played: number
  }[]
  goals: {
    against: {
      average: {
        away: string
        home: string
        total: string
      }
      minute: {
        '0-15': {
          total: string | null
          percentage: string | null
        }
        '16-30': {
          total: string | null
          percentage: string | null
        }
        '31-45': {
          total: string | null
          percentage: string | null
        }
        '46-60': {
          total: string | null
          percentage: string | null
        }
        '61-75': {
          total: string | null
          percentage: string | null
        }
        '76-90': {
          total: string | null
          percentage: string | null
        }
        '91-105': {
          total: string | null
          percentage: string | null
        }
        '106-120': {
          total: string | null
          percentage: string | null
        }
      }
      total: {
        home: number | null
        away: number | null
        total: number | null
      }
    }
  }
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
          headers: {
            'x-rapidapi-key': `${userKey}`,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setTeamDetails(res.data.response)
    }
    async function handleGetPlayers() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/players?season=${season}&team=${query.id}`,
        {
          headers: {
            'x-rapidapi-key': `${userKey}`,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )
      console.log(res.data)
      // setPlayers(res.data.response)
    }
    async function handleGetTeamStatistic() {
      const res = await axios.get(
        `https://v3.football.api-sports.io/teams/statistics?league=${league}&team=${query.id}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': `${userKey}`,
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
  }, [query, userKey, season, league])

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
          <ContainerTeamDetails>
            <span>Nome do time</span>
            <span>Fluminense</span>
          </ContainerTeamDetails>
          <h2>Nacionalidade do time</h2>
          <h2>Cidade do time</h2>
          <h2>Ano de fundação</h2>
          <Image src="" alt="logo do time" width={100} height={80} />
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
            Você não está logado ou ainda não selecionou um país, uma temporada
            e uma liga!
          </h1>
        </div>
      )}
    </>
  )
}
