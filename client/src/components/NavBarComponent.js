
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link, withRouter} from 'react-router-dom'
import { useFirebase} from 'react-redux-firebase';
import logoImg from '../img/logo.jpg'

export default withRouter(function NavBarComponent(props){
    
  async function logout(){
    await firebase.logout()
    props.history.push('/login')
  }
  const firebase = useFirebase()
    return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "black"}} >
            <p style={{height: 47, width: 119}} >
               <img src={logoImg} style={{height: 59, width: 78 }}   alt="profil user"/></p>
 
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                       <Link className="py-3 px-md-6 text-light pFont" to="/privateArea">Private-Area</Link>
                       <Link className="py-3 px-md-3 text-light pFont" to="/">Home-Page</Link>
                </Nav>
                <Nav>
                    <Link className="py-3 px-md-3 text-light pFont" to="/login">login</Link>
                    <button type="button" className="btn btn-light pFont" onClick={logout}>logout</button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
})



