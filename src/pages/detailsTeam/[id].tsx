import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import {
  ButtonTeam,
  Container,
  ContainerDetailsTeams,
  ContainerTeamDetails,
  HeaderTeam,
  ImageTeam,
  TableTeam,
} from '../../styles/pages/detailsTeam'
import {
  ArrowBendRightDown,
  ArrowBendUpLeft,
  ArrowLeft,
  ArrowRight,
  SoccerBall,
} from 'phosphor-react'
import { OptionsSelectedContext } from '../../contexts/saveSelectedOptions'
import { BarGraph } from '../../components/BarGraph'

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
          total: number | null
          percentage: string | null
        }
        '16-30': {
          total: number | null
          percentage: string | null
        }
        '31-45': {
          total: number | null
          percentage: string | null
        }
        '46-60': {
          total: number | null
          percentage: string | null
        }
        '61-75': {
          total: number | null
          percentage: string | null
        }
        '76-90': {
          total: number | null
          percentage: string | null
        }
        '91-105': {
          total: number | null
          percentage: string | null
        }
        '106-120': {
          total: number | null
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
  const [page, setPage] = useState<number>(1)
  const { query, push } = useRouter()
  const { league, season, country, userKey } = useContext(
    OptionsSelectedContext,
  )

  function handlePagesAdd() {
    if (page < 3) {
      setPage((prevState) => prevState + 1)
    }
  }

  function handlePagesSub() {
    if (page > 1) {
      setPage((prevState) => prevState - 1)
    }
  }

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <p style={{ color: '#1d3557', fontStyle: 'italic' }}>
                page {page} de 3
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <ButtonTeam onClick={() => handlePagesSub()}>
                  <ArrowLeft color={'#1d3557'} />
                </ButtonTeam>
                <ButtonTeam onClick={() => handlePagesAdd()}>
                  <ArrowRight color={'#1d3557'} />
                </ButtonTeam>
              </div>
              <p onClick={handleReturn}>
                <ArrowBendUpLeft /> retornar
              </p>
            </div>
          </HeaderTeam>
          {page === 1 && (
            <>
              <HeaderTeam>
                <h1>
                  <SoccerBall /> Informações sobre o time <ArrowBendRightDown />
                </h1>
              </HeaderTeam>
              <ContainerDetailsTeams>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome do time:
                  </span>
                  <span>Fluminense</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade do time:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Cidade do time:
                  </span>
                  <span>Rio de Janeiro</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Ano de fundação:
                  </span>
                  <span>1953</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <ImageTeam
                    src="https://github.com/mateusrc-dev.png"
                    alt="logo do time"
                    width={175}
                    height={80}
                  />
                </ContainerTeamDetails>
              </ContainerDetailsTeams>
              <HeaderTeam>
                <h1>
                  <SoccerBall /> Jogadores do time <ArrowBendRightDown />
                </h1>
              </HeaderTeam>
              <ContainerDetailsTeams>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nome:
                  </span>
                  <span>Mateus Raimundo</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Idade:
                  </span>
                  <span>28</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Nacionalidade:
                  </span>
                  <span>Brasil</span>
                </ContainerTeamDetails>
              </ContainerDetailsTeams>
            </>
          )}
          {page === 2 && (
            <>
              <HeaderTeam>
                <h1>
                  <SoccerBall /> Formação mais utilizada da temporada{' '}
                  <ArrowBendRightDown />
                </h1>
              </HeaderTeam>
              <ContainerDetailsTeams>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Formação:
                  </span>
                  <span>3-4-5-3</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Jogo:
                  </span>
                  <span>2</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Formação:
                  </span>
                  <span>3-4-5-3</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Jogo:
                  </span>
                  <span>2</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Formação:
                  </span>
                  <span>3-4-5-3</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Jogo:
                  </span>
                  <span>2</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Formação:
                  </span>
                  <span>3-4-5-3</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Jogo:
                  </span>
                  <span>2</span>
                </ContainerTeamDetails>
                <ContainerTeamDetails>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Formação:
                  </span>
                  <span>3-4-5-3</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Jogo:
                  </span>
                  <span>2</span>
                </ContainerTeamDetails>
              </ContainerDetailsTeams>
              <HeaderTeam>
                <h1>
                  <SoccerBall />
                  Tabela de resultados <ArrowBendRightDown />
                </h1>
              </HeaderTeam>
              <TableTeam>
                <thead>
                  <tr>
                    <th>total de jogos</th>
                    <th>total de vitórias</th>
                    <th>total de derrotas</th>
                    <th>total de empates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10</td>
                    <td>5</td>
                    <td>5</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </TableTeam>
            </>
          )}
          {page === 3 && (
            <>
              <h1>gráfico</h1>
              <BarGraph size={100} currentBar={60} />
            </>
          )}
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
