import { useRouter } from "next/router"

export default function DetailsTime() {
  const { query } = useRouter()

  return (
      <>
        <h1>Aqui vai aparecer detalhes do time selecionado, vamos buscar os detalhes na api através do id do time que vamos obter por meio do parâmetro da rota</h1>
        <p>Id: {JSON.stringify(query)}</p>
      </>
    )
}