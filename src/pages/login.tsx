import { SignIn, Warning } from 'phosphor-react'
import {
  Body,
  Button,
  Container,
  ContainerBody,
  Input,
} from '../styles/pages/login'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import axios from 'axios'
import { OptionsSelectedContext } from '../contexts/saveSelectedOptions'
import ShowLoadingSmall from '../components/LoadingSmall'
import { Header, LogoImage } from '../styles/pages/app'
import Image from 'next/image'
import logoImg from '../assets/ball.svg'

export default function Login() {
  const [keyUser, setKeyUser] = useState<string>('')
  const { handleUserKey } = useContext(OptionsSelectedContext)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  async function handleEnter() {
    try {
      setLoading(true)
      const res = await axios.get('http://v3.football.api-sports.io/status', {
        headers: {
          'x-rapidapi-key': `${keyUser}`,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      })
      if (res.data?.response?.account?.email) {
        handleUserKey(keyUser)
        router.push('/selectCountries')
      } else {
        alert('Não foi possível entrar!')
      }
    } catch (err) {
      console.log(err)
      alert('Não foi possível entrar!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LogoImage>
            <Image src={logoImg} width={50} height={50} alt="logo" />
          </LogoImage>
          <h2>Meu Time</h2>
        </div>
      </Header>
      <ContainerBody>
        <Body>
          <p>Insira abaixo o key da sua conta da API-Football</p>
          <Input
            placeholder="Insira aqui o key da sua conta!"
            onChange={(e) => setKeyUser(e.target.value)}
            type="password"
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
      </ContainerBody>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Warning size={100} color="#e63946" />
        <h1
          style={{
            fontSize: '1rem',
            color: '#1d3557',
          }}
        >
          Para acessar a aplicação crie uma conta{' '}
          <a
            style={{
              color: '#e63946',
              fontStyle: 'italic',
              textDecoration: 'underline',
            }}
            href="https://dashboard.api-football.com/login"
            target="_blank"
          >
            nesse site (API-FOOTBALL)
          </a>{' '}
          e cole a api-key fornecida dentro da sua conta no espaço acima. É
          possível fazer apenas 100 pedidos por dia e 10 pedidos por minuto,
          após atingidos esses limites os dados dos times, temporadas, ligas e
          países param de ser enviados.
        </h1>
      </div>
    </Container>
  )
}
