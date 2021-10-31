import React, { useEffect } from 'react'
import Nav from './Nav/nav'
import Header from './Header/header'
import About from './About/About'
import Services from './Services/Services'
import Contact from './Contact/Contact'
import Premium from './Premium/Premium'

import { firstAdmin } from '../../actions'
import { useDispatch} from "react-redux";

const Home = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(firstAdmin({name:"Grupo", surname:"4", email:"paseadorescuidadores@gmail.com", password:"walker2021"}))
    }, [])

    
    return (
        <div className='app'>
            <Nav/>
            <Header />
            <About />
            <Services />
            <Premium />
            <Contact />
        </div>
    )
}

export default Home
