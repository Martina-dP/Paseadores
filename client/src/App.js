import React from "react";
import "./App.css";
import  ReactNotification  from  'react-notifications-component';

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

const App = () => {

    return (
        <Router>
            <Routes/>
            
        </Router>
    )

}

export default App
