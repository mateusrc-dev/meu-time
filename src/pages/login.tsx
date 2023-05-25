import { SignIn } from 'phosphor-react'
import { Body, Button, Container, Input } from '../styles/pages/login'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  function handleEnter() {
    // depois fazer aqui a validação de key do usuário
    router.push('/selectCountries')
  }

  return (
    <Container>
      <Body>
        <p>Insira abaixo o key da sua conta da API-Football</p>
        <Input placeholder="Insira aqui o key da sua conta!" />
        <Button onClick={handleEnter}>
          Entrar <SignIn color="#1d3557" weight="duotone" size={16} />
        </Button>
      </Body>
    </Container>
  )
}
