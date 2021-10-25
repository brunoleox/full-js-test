import logo from "../assets/logo.png";
import { Link, Switch, Route } from "react-router-dom";
// import Routes from "../routes/routes"
import {
  Card,
  Container,
  LeftPanel,
  RightPanel,
  Links,
  InternalCard,
} from "./styles.js";
import Quotes from "../pages/quotes";
import Historic from "../pages/historic";
import Gains from "../pages/gains";
import Compare from "../pages/compare";
import Home from "../pages/home";

const Layout = () => {
  return (
    <Container>
      <Card>
        <LeftPanel>
          <img src={logo} alt="Logo" style={{ width: 100 }} />

          <Link to="/quotes">
            <Links>
              <span> Cotas </span>
            </Links>
          </Link>

          <Link to="/historic">
            <Links>
              <span> Histórico </span>
            </Links>
          </Link>

          <Link to="/gains">
            <Links>
              <span> Ganhos </span>
            </Links>
          </Link>

          <Link to="/compare">
            <Links>
              <span> Comparar </span>
            </Links>
          </Link>
        </LeftPanel>
        <RightPanel>
          <Switch>
            <InternalCard>
              <Switch>
                <Route path="/quotes">
                  <Quotes></Quotes>
                </Route>
                <Route path="/historic">
                  <Historic></Historic>
                </Route>
                <Route path="/gains">
                  <Gains></Gains>
                </Route>
                <Route path="/compare">
                  <Compare></Compare>
                </Route>
                <Route path="/">
                  <Home></Home>
                </Route>
              </Switch>
            </InternalCard>
          </Switch>
        </RightPanel>
      </Card>
    </Container>
  );
};

export default Layout;

// Frontend
// O importante nesta parte do desafio é que saibamos como você lida com os componentes que formam
// as técnicas contemporâneas de desenvolvimento client-side, no que tange processamento de assets,
// transpilers, separação de responsabilidades, minificação, armazenamento local, etc. Por isso, estética não é primordial.

// As funcionalidades esperadas são:

// Incluir ações no portifólio;
// Ver situação atual das ações (último preço e data e hora da atualização);
// Ver histórico de preços de uma ação, podendo delimitar datas de início e fim;
// Fazer projeção de ganhos de uma ação, determinando o número de ações compradas e a data de compra no passado.
// Se você não tiver ideia de como organizar essas funcionalidades, não há problema nenhum em se inspirar no Yahoo Finance, ou fazer uma arquitetura master-detail simples.
