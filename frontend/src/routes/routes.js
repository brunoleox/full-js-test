import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import Quotes from "../pages/quotes";
import Historic from "../pages/historic";
import Gains from "../pages/gains";
import Compare from "../pages/compare";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/" exact />
           <Route component = { Quotes }  path="/quotes" />
           <Route component = { Historic }  path="/historic" />
           <Route component = { Gains }  path="/gains" />
           <Route component = { Compare }  path="/comapare" />
       </BrowserRouter>
   )
}

export default Routes;