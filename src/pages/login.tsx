import { SignIn } from "phosphor-react";
import { Body, Button, Container, Input } from "../styles/pages/login";

export default function Login() {
  return (
      <Container>
        <Body>
          <p>Insira abaixo o key da sua conta da API-Football</p>
          <Input placeholder="Insira aqui o key da sua conta!" />
          <Button>Entrar <SignIn color="#1d3557" weight="duotone" size={16} /></Button>
        </Body>
      </Container>
    )
}