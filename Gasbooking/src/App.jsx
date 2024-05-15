import React from "react"
import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
//import { loader as userLoader } from "./components/Dashboard";
import Dashboard from "./components/Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
 // useRouteLoaderData
} from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
    <div className="App">
     <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/" >Home</Nav.Link>
            <Nav.Link as={Link} to="/Register" >Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
    <div>
      <Routes>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
    </div>
    </BrowserRouter>

  )
}

export default App
