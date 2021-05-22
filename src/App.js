import React  from 'react';
import './App.css'
import Header from './Component/Header.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Tablecases from './Component/NewsTab'
import "leaflet/dist/leaflet.css"
import IndiaCases from './Component/IndiaCases'
// import InfoBox from './Component/Infobox.js'
function App(){

    return ( 
       
<Router>
<div className="App"> 
<Switch>
    <Route path="/IndiaCasesByState">
        <IndiaCases />
    </Route>
    <Route path="/covidnews">
        <Tablecases />
    </Route>
    <Route path="/">
        <Header />
    </Route>
</Switch>

    </div>
</Router>


        
    )
}

export default App