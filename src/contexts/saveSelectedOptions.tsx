import { ReactNode, useState, createContext, useEffect } from 'react'

interface selectOptionsContextType {
  country: string
  season: number
  league: number
  userKey: string
  handleCountry: (country: string) => void
  handleSeason: (season: number) => void
  handleLeague: (league: number) => void
  handleUserKey: (key: string) => void
}

export const OptionsSelectedContext = createContext<selectOptionsContextType>(
  {} as selectOptionsContextType,
)

interface OptionsSelectedProviderProps {
  children: ReactNode
}

export function OptionsSelectedProvider({
  children,
}: OptionsSelectedProviderProps) {
  const [country, setCountry] = useState<string | null>(null)
  const [season, setSeason] = useState<number | null>(null)
  const [league, setLeague] = useState<number | null>(null)
  const [userKey, setUserKey] = useState<string | null>(null)

  useEffect(() => {
    const storedCountryJSON = localStorage.getItem('@meu-time:country')
    const countryParse = JSON.parse(storedCountryJSON)
    setCountry(countryParse)
    const storedSeasonJSON = localStorage.getItem('@meu-time:season')
    const seasonParse = JSON.parse(storedSeasonJSON)
    setSeason(seasonParse)
    const storedLeagueJSON = localStorage.getItem('@meu-time:league')
    const leagueParse = JSON.parse(storedLeagueJSON)
    setLeague(leagueParse)
    const storedUserKeyJSON = localStorage.getItem('@meu-time:userKey')
    const userKeyParse = JSON.parse(storedUserKeyJSON)
    setUserKey(userKeyParse)
  }, [])

  function handleCountry(country: string) {
    setCountry(country)
    const countryJSON = JSON.stringify(country)
    localStorage.setItem('@meu-time:country', countryJSON)
  }

  function handleSeason(season: number) {
    setSeason(season)
    const seasonJSON = JSON.stringify(season)
    localStorage.setItem('@meu-time:season', seasonJSON)
  }

  function handleLeague(league: number) {
    setLeague(league)
    const leagueJSON = JSON.stringify(league)
    localStorage.setItem('@meu-time:league', leagueJSON)
  }

  function handleUserKey(key: string) {
    setUserKey(key)
    const userKeyJSON = JSON.stringify(key)
    localStorage.setItem('@meu-time:userKey', userKeyJSON)
  }

  return (
    <OptionsSelectedContext.Provider
      value={{
        country,
        handleCountry,
        handleLeague,
        handleSeason,
        handleUserKey,
        league,
        season,
        userKey,
      }}
    >
      {children}
    </OptionsSelectedContext.Provider>
  )
}
