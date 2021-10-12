import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Home from './pages/Home/index'
import Travel from './pages/Travel/index'
import TravelDetails from './pages/TravelDetails/index'
//import CadServidor from './pages/Cad_Servidor/index'
//import Relatorio from './pages/Relatorios/index'
//import EditServidor from './pages/Edit_Servidor/index'
// DocumentPdf from './pages/DocumentPdf/index'
//import NotFound from './pages/NotFound/index';

const Routes = () => {
    return (
    <>
    <BrowserRouter>
   
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/travel" exact component={Travel} />
            <Route path={`/travel_details/:id`} exact component={TravelDetails} />
           
        </Switch> 
      
     </BrowserRouter>
    </>
   )
}

export default Routes