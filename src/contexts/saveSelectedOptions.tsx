import { ReactNode, useState, createContext } from 'react'

interface selectOptionsContextType {
  country: string
  season: number
  league: string
  handleCountry: (country: string) => void
  handleSeason: (season: number) => void
  handleLeague: (league: string) => void
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
  const [country, setCountry] = useState<string>('')
  const [season, setSeason] = useState<number>(0)
  const [league, setLeague] = useState<string>('')

  function handleCountry(country: string) {
    setCountry(country)
  }

  function handleSeason(season: number) {
    setSeason(season)
  }

  function handleLeague(league: string) {
    setLeague(league)
  }

  return (
    <OptionsSelectedContext.Provider
      value={{
        country,
        handleCountry,
        handleLeague,
        handleSeason,
        league,
        season,
      }}
    >
      {children}
    </OptionsSelectedContext.Provider>
  )
}
