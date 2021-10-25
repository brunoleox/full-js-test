
import { Form, Result } from "./styles"
import Input from "../../components/input"
import Title from "../../components/title"
import Button from "../../components/button"
import axios from "axios"

import { useState } from "react"

const Gains = () => {

    const [stock, setStock] = useState("")
    const [resStoks, setResStocks] = useState()

    function onChange(ev) {
        const { name, value } = ev.target

        setStock({ ...stock, [name]: value })
        console.log(name, value)
    }

    console.log()
    async function onSubmit(ev) {
        ev.preventDefault()

        await axios.get(`http://localhost:3003/stocks/${stock.stock_name}/gains`,
            {
                params: {
                    purchasedAmount: +stock.purchasedAmount,
                    purchasedAt: stock.purchasedAt
                }

            }).then((res) => {
                setResStocks(res.data)
                console.log(res.data)
            })
    }

    console.log(stock.stock_name, +stock.purchasedAmount, stock.purchasedAt)

    return (
        <>
            <Form onSubmit={onSubmit}>

                <Title
                    title="Projeção de ganhos"
                    subtitle="Insira abaixo a tag de identificação da empresa, valor de investimento e uma data"
                >
                </Title>
                <div >
                    <Input
                        id="stock_name"
                        name="stock_name"
                        onChange={onChange}
                        placeholder="Exemplos de empresas: IBM, AMD, VALE..."
                        type="text"
                    >
                    </Input>
                    <Input
                        id="purchasedAmount"
                        name="purchasedAmount"
                        onChange={onChange}
                        placeholder="Insira uma quantidade"
                        type="number"
                    >
                    </Input>
                    <Input
                        id="purchasedAt"
                        name="purchasedAt"
                        onChange={onChange}
                        placeholder="Informe uma data"
                        type="date"
                    >
                    </Input>
                    <Button
                        type="submit"
                        name="Pesquisar"
                    >
                    </Button>

                </div>
            </Form>

            <Result>
                {resStoks && <div>
                    <div>
                        <ul style={{fontWeight: 300}}>
                            <li><strong>Nome da Empresa: </strong> {resStoks.name}</li>
                            <li><strong>Valor Investido: </strong> R$ {resStoks.purchasedAmount}</li>
                            <li><strong>Investido em: </strong> {resStoks.purchasedAt}</li>
                            <li><strong>Ganho de capital estimado: </strong> R$ {resStoks.capitalGains}</li>
                        </ul>
                    </div>
                    <div>
                        {resStoks.prices.map((price, index) => (
                            <table key={index}>
                                <tbody>
                                    <tr>
                                        <th>Valor</th>
                                        <th>Data</th>

                                    </tr>
                                    <tr style={{ fontWeight: 300 }}>
                                        <td>R$ {price.pricedAtDate}</td>
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
export default Gains