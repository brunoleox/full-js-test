import { Form, Result } from "./styles"
import Input from "../../components/input"
import Title from "../../components/title"
import Button from "../../components/button"
import axios from "axios"

import { useState } from "react"

const Compare = () => {
    const [stock, setStock] = useState("")
    const [resStoks, setResStocks] = useState()

    function onChange(ev) {
        const { value } = ev.target
        setStock(value)
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        await axios.get(`http://localhost:3003/stocks/${stock}/compare`).then((res) => {
            setResStocks(res.data)
            console.log(res.data)
        })
    }

    return (
        <>
            <Form onSubmit={onSubmit}>

                <Title
                    title="Compare os valores atuais de uma empresa"
                    subtitle="Insira uma tag por vez, as empresas quais deseja obter o relatório."
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
                    <div>
                    <span><strong>Ultimos Preços</strong></span>
                        {resStoks.lastPrice.map((price, index) => (
                            <table key={index}>
                                <tbody>
                                    <tr>
                                        <th>Empresa: </th>
                                        <th>Preço</th>
                                        <th>Data</th>

                                    </tr>
                                    <tr style={{ fontWeight: 300 }}>
                                        <td>{price.name}</td>
                                        <td>R$ {price.lastPrice}</td>
                                        <td>{price.pricedAt}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                        <ul>
                        </ul>
                    </div>
                </div>}

            </Result>
        </>
    )
}

export default Compare