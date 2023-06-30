import React , {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
const Register = () => {
const firebase = useFirebase(null);
const navigate = useNavigate();
const [ email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("Signin up a user...");
    await firebase.signup(email,password);
    console.log("Successful");
}
useEffect(()=>
{
    if(firebase.isLoggedIn){
        navigate("/")
    }
} , [firebase , navigate])


  return (
    <div className='container mt-5'>
         <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button  variant="primary" type="submit">
       Create Acoount
      </Button>
    </Form>
    </div>
  )
}

export default Register