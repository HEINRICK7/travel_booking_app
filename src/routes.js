import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


import Home from './pages/Home/index'
import Travel from './pages/Travel/index'
import TravelDetails from './pages/TravelDetails/index'

import Signin from './pages/SignIn/index'
import Dashboard from './pages/Dashboard'

 
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
            <Route path={`/travel_details/:id`} exact component={TravelDetails} />
            <Route path={"/signin"} exact component={Signin} />
            <PrivateRoute path={"/dashboard"} exact component={Dashboard}/>
        </Switch> 
      
     </BrowserRouter>
    </>
   )
}

export default Routes