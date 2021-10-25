import { Form, Result } from "./styles"
import Input from "../../components/input"
import Title from "../../components/title"
import Button from "../../components/button"
import axios from "axios"

import { useState } from "react"

const Quotes = () => {
    const [stock, setStock] = useState("")
    const [resStoks, setResStocks] = useState()

    function onChange(ev) {
        const { value } = ev.target
        setStock(value)
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        await axios.get(`http://localhost:3003/stocks/${stock}/quote`).then((res) => {
            setResStocks(res.data)
        })

    }
    return (
        <>
            <Form onSubmit={onSubmit}>

                <Title
                    title="Relatório atual de uma empresa"
                    subtitle="Insira abaixo a tag de identificação da empresa"
                >
                </Title>
                <div>
                    <Input
                        id="stock_name"
                        name="stock_name"
                        onChange={onChange}
                        placeholder="Exemplos de empresas: IBM, AMD, VALE..."
                        type="text"
                    >
                    </Input>
                    <Button
                        type="submit"
                        name="Pesquisar"
                    ></Button>
                </div>
            </Form>

            <Result>
                {resStoks && <div>

                    <ul style={{fontWeight: 300}}>
                        <li><strong>Nome da Empresa:</strong> {resStoks.Empresa}</li>
                        <li><strong>Valor atual: </strong> R$ {resStoks.Preço}</li>
                        <li><strong>Data da Cotação: </strong> {resStoks.Data}</li>
                    </ul>

                </div>}

            </Result>
        </>
    )
}

export default Quotes