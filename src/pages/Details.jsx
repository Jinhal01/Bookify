import { Button } from 'react-bootstrap';
import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import Form from 'react-bootstrap/Form'
import { async } from '@firebase/util';
const Details = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [data,setData] = useState("");   
    const [url,setUrl] = useState("");
    const [qty, setQty] = useState(1);
    console.log(data);
    useEffect(()=>{
       firebase.getBookbyId(params.bookId).then((value)=> setData(value.data()))
    },[]);

    useEffect(()=>{
      if(data){
        const imageURL = data.imageURL;
        firebase.getImageURl(imageURL).then((url)=>{setUrl(url)})
      }
    },[data])

    const placeorder = async() =>{
     const result = await firebase.placeOrder(params.bookId ,qty);
     console.log("order Placed", result);
    }

    if(data == null ) {
     return <h1>Loading...</h1>
    }
    
  return (
    <div className="container">
    

      <h1>{data.name}</h1>
      <img src={url} width="50%" height="500px" style={{borderRadius:"10px"}} />
      <h1>Details</h1>
      <p>Price Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control onChange={(e) => setQty(e.target.value)} value={qty} type="Number" placeholder="Enter Quantity" />
      </Form.Group>

      <Button onClick={placeorder} variant='success'>Buy Now</Button>
    </div>
  )
}

export default Details