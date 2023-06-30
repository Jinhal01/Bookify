import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import Swal from 'sweetalert2'
const List = () => {
    const firebase = useFirebase();
    const [ name,setName] = useState('');
    const [ isbn,setIsbn] = useState('');
    const [ price,setPrice] = useState('');
    const [ coverPic,setCoverPic] = useState('');

const handleSubmit = async(e)=>{
   e.preventDefault();
 await firebase.handleCreateList(name,isbn,price,coverPic).then((result) => {
  console.log('Email sent successfully:', result.text);
  Swal.fire({
      icon:'success',
      title:'Message sent sucessfully 👍'
    })
})
.catch((error) => {
  console.log('Error sending email:', error);
  Swal.fire({
      icon:'error',
      title:"Something went wrong!",
      text:error.text,
    })
  });
  e.target.reset();
         
    }

  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter Book Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control onChange={(e) => setIsbn(e.target.value)} value={isbn} type="text" placeholder="Enter ISBN number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder="Enter Price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover Picture</Form.Label>
        <Form.Control onChange={(e) => setCoverPic(e.target.files[0])} type="file" placeholder="Cover Pic" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>

      <Button  variant="primary" type="submit">
       Create
      </Button>
    </Form>
    </div>
  )
}

export default List