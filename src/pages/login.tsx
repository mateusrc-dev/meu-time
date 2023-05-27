import { SignIn } from 'phosphor-react'
import { Body, Button, Container, Input } from '../styles/pages/login'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import axios from 'axios'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import ShowLoadingSmall from '../components/LoadingSmall'

export default function Login() {
  const [keyUser, setKeyUser] = useState<string>('')
  const { handleUserKey } = useContext(OptionsSelectedContext)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  console.log(keyUser)

  async function handleEnter() {
    try {
      setLoading(true)
      const res = await axios.get('https://v3.football.api-sports.io/status', {
        headers: {
          'x-rapidapi-key': `${keyUser}`,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      })

      if (res.data.response.account?.email) {
        handleUserKey(keyUser)
        router.push('/selectCountries')
      } else {
        alert('Não foi possível entrar!')
      }
    } catch (err) {
      alert('Não foi possível entrar!')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Body>
        <p>Insira abaixo o key da sua conta da API-Football</p>
        <Input
          placeholder="Insira aqui o key da sua conta!"
          onChange={(e) => setKeyUser(e.target.value)}
        />
        <Button onClick={handleEnter} disabled={loading}>
          {loading ? (
            <ShowLoadingSmall />
          ) : (
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Entrar <SignIn color="#1d3557" weight="duotone" size={16} />
            </span>
          )}
        </Button>
      </Body>
    </Container>
  )
}
