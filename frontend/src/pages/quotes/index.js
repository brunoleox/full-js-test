import { Form } from "./styles"

import { useParams } from "react-router-dom"

import Input from "../../components/input"
import Title from "../../components/title"
import Button from "../../components/button"
import { useState } from "react"

const Quotes = () => {

    const { stock_name } = useParams()

    const [stock, setStock] = useState("")


    function handleChanges() {
    }


    return (
        <>
            <Form action={""}>

                <Title
                    title="Relatório atual de uma empresa"
                    subtitle="Insira abaixo a tag de identificação da empresa"
                >
                </Title>
                <div>
                    <Input
                        type="text"
                        placeholder="Exemplos de empresas: IBM, AMD, VALE..."
                        id="stock_name"
                        value={stock}
                        onChange={""}
                    >
                    </Input>
                    <Button
                        type="submit"
                        name="Pesquisar"
                        onClick={""}
                    ></Button>
                </div>
            </Form>

            <div style={{ margin: "20px 0" }}>
                aaaaa
            </div>
        </>
    )
}

export default Quotes