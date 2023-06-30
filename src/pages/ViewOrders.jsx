import React , {useEffect, useState}from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../Components/Card';
import { CardGroup,Row,Col } from 'react-bootstrap';

const ViewOrders = () => {
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);


    useEffect(()=>{
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid).then((books)=>{
            setBooks(books.docs)
        });
    },[firebase]);

    console.log(books);

    if(!firebase.isLoggedIn) return <h1>Please Login first</h1>
  return (
    
    <div>
        <Row>
        {
            books.map((book) => (
                <Col key={book.id} md={6} lg={4} sm={6}>
            <BookCard key={book.id} link= {`/book/orders/${book.id}`} id= {book.id} {...book.data()}/>
            </Col>
            ))
        }
        </Row>
    </div>
  )
}

export default ViewOrders