import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


import Login from './pages/Login/index'
import Home from './pages/Home/index'
import Travel from './pages/Travel/index'
//import CadServidor from './pages/Cad_Servidor/index'
//import Relatorio from './pages/Relatorios/index'
//import EditServidor from './pages/Edit_Servidor/index'
// DocumentPdf from './pages/DocumentPdf/index'
//import NotFound from './pages/NotFound/index';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
    return (
    <>
    <BrowserRouter>
   
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/travel" exact component={Travel} />
            <PrivateRoute path="/list_servidor" exact component={Login} />
            
        </Switch> 
      
     </BrowserRouter>
    </>
   )
}

export default Routes