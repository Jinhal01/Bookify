import React ,{useState,useEffect}from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
  const [url,setUrl] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();
  
 useEffect(()=>{
   firebase.getImageURl(props.imageURL).then((url) => setUrl(url))
 },[])
 console.log(props);
  return (
    
  <Card style={{ width: '18rem' ,margin:"25px"}} >
  <Card.Img variant="top" src={url} style ={{width:"content-fit" , height:"250px" }} />
  <Card.Body>
    <Card.Title>{props.name}</Card.Title>
    <Card.Text>
     This Book has a title {props.name} and this book is sold by {props.displayName} and this book costs Rs.{props.price}
    </Card.Text>
    <Button variant="primary" onClick={(e) => navigate(props.link)} >View</Button>
  </Card.Body>
</Card>
   
  )
}

export default BookCard