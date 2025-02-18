import { Form, Result } from "./styles";
import Input from "../../components/input";
import Title from "../../components/title";
import Button from "../../components/button";
import axios from "axios";

import { useState } from "react";
import Loader from "../../components/skeleton";

const Historic = () => {
  const [stock, setStock] = useState("");
  const [resStoks, setResStocks] = useState();
  const [loader, setLoader] = useState(false);

  function onChange(ev) {
    const { name, value } = ev.target;

    setStock({ ...stock, [name]: value });
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setLoader(true);
    await axios
      .get(
        `http://localhost:3003/stocks/${stock.stock_name}/history?from=${stock.from}&to=${stock.to}`
      )
      .then((res) => {
        setResStocks(res.data);
        setLoader(false);
      });
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Title
          title="Histórico de uma empresa"
          subtitle="Insira abaixo a tag de identificação da empresa, data inicial e final."
        ></Title>
        <div>
          <Input
            id="stock_name"
            name="stock_name"
            onChange={onChange}
            placeholder="Exemplos de empresas: IBM, AMD, VALE..."
            type="text"
          ></Input>
          <Input
            id="from"
            name="from"
            onChange={onChange}
            placeholder="Informe uma data inicial ex: 20211020"
            type="date"
          ></Input>
          <Input
            id="to"
            name="to"
            onChange={onChange}
            placeholder="Informe uma data final ex: 20211022"
            type="date"
          ></Input>
          <Button type="submit" name="Pesquisar"></Button>
        </div>
      </Form>

      <Result>
        {loader && <Loader />}
        {resStoks && (
          <div>
            <div>
              <ul>
                <li>Nome da Empresa: {resStoks.name}</li>
              </ul>
            </div>
            <div>
              {resStoks.prices.map((price, index) => (
                <table key={index}>
                  <tbody>
                    <tr>
                      <td>Aberto</td>
                      <td>Baixa</td>
                      <td>Alta</td>
                      <td>Fechamento</td>
                      <td>Data</td>
                    </tr>
                    <tr style={{ fontWeight: 300 }}>
                      <td>R$ {price.opening}</td>
                      <td>R$ {price.low}</td>
                      <td>R$ {price.high}</td>
                      <td>R$ {price.opening}</td>
                      <td>{price.pricedAt}</td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        )}
      </Result>
    </>
  );
};
export default Historic;
