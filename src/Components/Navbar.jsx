import React,{useState,useEffect} from 'react'
import { Container,Nav,Navbar } from 'react-bootstrap'
import {signOut, getAuth, onAuthStateChanged} from 'firebase/auth'
import { useFirebase } from '../context/Firebase'


const MyNavbar = () => {
  const firebase = useFirebase();
  const [user,setUser]=useState("");
useEffect(() =>{
  onAuthStateChanged(firebase.firebaseAuth,(user) =>{
    if(user){
      setUser(user);
    }else{
      console.log("You are logged out");
      setUser(null);
    }
  })
},[]);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Bookify</Navbar.Brand>
          <Nav className="me-auto ">
            <Nav.Link href="/">Home</Nav.Link>
            {firebase.isLoggedIn ? (<>
            <Nav.Link href="/book/list">Add Books</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            <button style={{borderRadius:"10px"}}onClick={()=> signOut(firebase.firebaseAuth)}>Logout</button></>):(
              <>
            <Nav.Link href="/register">SignUp</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
           
           
          </Nav>
        </Container>
      </Navbar>
  )
}

export default MyNavbar