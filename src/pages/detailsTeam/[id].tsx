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

interface TeamProps {
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
  player: {
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
}

interface StatisticsProps {
  fixtures: {
    draws: {
      home: number
      away: number
      total: number
    }
    loses: {
      home: number
      away: number
      total: number
    }
    played: {
      home: number
      away: number
      total: number
    }
    wins: {
      home: number
      away: number
      total: number
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
}

export default function DetailsTime() {
  const [teamDetails, setTeamDetails] = useState<TeamProps[]>([])
  const [teamId, setTeamId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [players, setPlayers] = useState<PlayersProps[]>([])
  const [teamStatistic, setTeamStatistic] = useState<StatisticsProps>()
  const [page, setPage] = useState<number>(1)
  const { league, season, country, userKey } = useContext(
    OptionsSelectedContext,
  )
  const { query, push } = useRouter()

  console.log(teamId)

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
    setTeamId(Number(query.id))
  }, [query])

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
      try {
        setLoading(true)
        if (teamId !== null && isNaN(teamId) !== true) {
          const res = await axios.get(
            `https://v3.football.api-sports.io/teams?id=${teamId}`,
            {
              headers: {
                'x-rapidapi-key': `${userKey}`,
                'x-rapidapi-host': 'v3.football.api-sports.io',
              },
            },
          )
          console.log(res.data)
          setTeamDetails(res.data.response)
        } else {
          setTeamId(Number(query.id))
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    handleFindDetailsTeam()
  }, [teamId, userKey, query])

  useEffect(() => {
    async function handleGetPlayers() {
      try {
        setLoading(true)
        if (teamId !== null && isNaN(teamId) !== true) {
          const res = await axios.get(
            `https://v3.football.api-sports.io/players?season=${season}&team=${teamId}`,
            {
              headers: {
                'x-rapidapi-key': `${userKey}`,
                'x-rapidapi-host': 'v3.football.api-sports.io',
              },
            },
          )
          console.log(res.data)
          setPlayers(res.data.response)
        } else {
          setTeamId(Number(query.id))
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    handleGetPlayers()
  }, [season, teamId, userKey, query])

  useEffect(() => {
    async function handleGetTeamStatistic() {
      try {
        setLoading(true)
        if (teamId !== null && isNaN(teamId) !== true) {
          const res = await axios.get(
            `https://v3.football.api-sports.io/teams/statistics?league=${league}&team=${teamId}&season=${season}`,
            {
              headers: {
                'x-rapidapi-key': `${userKey}`,
                'x-rapidapi-host': 'v3.football.api-sports.io',
              },
            },
          )
          console.log(res.data)
          setTeamStatistic(res.data.response)
        } else {
          setTeamId(Number(query.id))
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    handleGetTeamStatistic()
  }, [league, userKey, teamId, season, query])

  return (
    <>
      {!loading ? (
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
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
                >
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
                      <SoccerBall /> Informações sobre o time{' '}
                      <ArrowBendRightDown />
                    </h1>
                  </HeaderTeam>
                  <ContainerDetailsTeams>
                    <ContainerTeamDetails>
                      <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                        Nome do time:
                      </span>
                      <span>{teamDetails[0]?.team?.name}</span>
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                        Cidade do time:
                      </span>
                      <span>{teamDetails[0]?.team?.country}</span>
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                        Ano de fundação:
                      </span>
                      <span>{teamDetails[0]?.team?.founded}</span>
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <ImageTeam
                        src={teamDetails[0]?.team?.logo}
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
                    {players.map((item) => (
                      <ContainerTeamDetails key={String(item.player.id)}>
                        <span
                          style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                        >
                          Nome:
                        </span>
                        <span>{item.player.name}</span>
                        <span
                          style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                        >
                          Idade:
                        </span>
                        <span>{item.player.age}</span>
                        <span
                          style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                        >
                          Nacionalidade:
                        </span>
                        <span>{item.player.nationality}</span>
                      </ContainerTeamDetails>
                    ))}
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
                    {teamStatistic?.lineups?.map((item) => (
                      <ContainerTeamDetails key={String(item.played)}>
                        <span
                          style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                        >
                          Formação:
                        </span>
                        <span>{item.formation}</span>
                        <span
                          style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                        >
                          Jogo:
                        </span>
                        <span>{item.played}</span>
                      </ContainerTeamDetails>
                    ))}
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
                        <td>{teamStatistic?.fixtures?.played?.total}</td>
                        <td>{teamStatistic?.fixtures?.wins?.total}</td>
                        <td>{teamStatistic?.fixtures?.loses?.total}</td>
                        <td>{teamStatistic?.fixtures?.draws?.total}</td>
                      </tr>
                    </tbody>
                  </TableTeam>
                </>
              )}
              {page === 3 && (
                <>
                  <HeaderTeam>
                    <h1>
                      <SoccerBall /> Gols marcados por tempo de jogo{' '}
                      <ArrowBendRightDown />
                    </h1>
                  </HeaderTeam>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>0-15</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['0-15']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['0-15']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['0-15']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>16-30</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['16-30']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['16-30']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['16-30']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>31-45</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['31-45']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['31-45']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute['31-45']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>46-60</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['46-60']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['46-60']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['46-60']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>61-75</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['61-75']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['61-75']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['61-75']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>76-90</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['76-90']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['76-90']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['76-90']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>91-105</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['91-105']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['91-105']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['91-105']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                    <ContainerTeamDetails>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            minuto:
                          </span>
                          <span>106-120</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            total:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['106-120']
                                ?.total
                            }
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                          >
                            porcentagem:
                          </span>
                          <span>
                            {
                              teamStatistic?.goals?.against?.minute?.['106-120']
                                ?.percentage
                            }
                          </span>
                        </div>
                      </div>
                      <BarGraph
                        size={100}
                        currentBar={Math.round(
                          Number(
                            String(
                              teamStatistic?.goals?.against?.minute?.['106-120']
                                ?.percentage,
                            ).replace('%', ''),
                          ),
                        )}
                      />
                    </ContainerTeamDetails>
                  </div>
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
                Você não está logado ou ainda não selecionou um país, uma
                temporada e uma liga!
              </h1>
            </div>
          )}
        </>
      ) : (
        <>
          <h1>Carregando...</h1>
        </>
      )}
    </>
  )
}
