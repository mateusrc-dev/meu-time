import axios from 'axios'
import 'dotenv/config'
import { expect, describe, it } from 'vitest'

describe('Tests of application', () => {
  it('should be able user do login with key', async () => {
    const res = await axios.get('https://v3.football.api-sports.io/status', {
      headers: {
        'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })

    expect(res.data.response.account?.email).toEqual(
      'mateus.raimundo1995@gmail.com',
    )
  })

  it('user should be able to select a country if logged in with key', async () => {
    const res = await axios.get('https://v3.football.api-sports.io/status', {
      headers: {
        'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })

    expect(res.data.response.account?.email).toEqual(
      'mateus.raimundo1995@gmail.com',
    )

    const responseCountries = await axios.get(
      'https://v3.football.api-sports.io/countries',
      {
        headers: {
          'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      },
    )

    expect(responseCountries.data.response[0].name).toEqual(expect.any(String))
  })

  it('user should be able to select a league if they are logged in and have chosen a season', async () => {
    const res = await axios.get('https://v3.football.api-sports.io/status', {
      headers: {
        'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })

    expect(res.data.response.account?.email).toEqual(
      'mateus.raimundo1995@gmail.com',
    )

    const country = 'Malta'
    const season = 2022

    const responseLeagues = await axios.get(
      `https://v3.football.api-sports.io/leagues?country=${country}&season=${season}`,
      {
        headers: {
          'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      },
    )

    expect(responseLeagues.data.response[0].league.name).toEqual(
      expect.any(String),
    )
  })

  it('user should be able to select a team if they are logged in and have chosen a league', async () => {
    const res = await axios.get('https://v3.football.api-sports.io/status', {
      headers: {
        'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })

    expect(res.data.response.account?.email).toEqual(
      'mateus.raimundo1995@gmail.com',
    )

    const league = 1
    const season = 2022

    const responseTeams = await axios.get(
      `https://v3.football.api-sports.io/teams?league=${league}&season=${season}`,
      {
        headers: {
          'x-rapidapi-key': process.env.USER_KEY_API_FOOTBALL,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      },
    )

    expect(responseTeams.data.response[0].team.name).toEqual(expect.any(String))
  })
})
