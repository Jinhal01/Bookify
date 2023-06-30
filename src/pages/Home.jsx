import React,{useEffect,useState} from 'react'
import { CardGroup,Row,Col } from 'react-bootstrap';
import BookCard from '../Components/Card';
import { useFirebase } from '../context/Firebase'

const Home = () => {
    const firebase = useFirebase();
    const [books,setBooks] =useState([]);
    useEffect(()=>{
        firebase.listAllBooks().then((books) => setBooks(books.docs) );
    },[]);
  return (
    <div >
        <Row>
        {books.map((book) => (
          <Col key={book.id} md={6} lg={4} sm={6}>
            <BookCard link={`/book/view/${book.id}`} id={book.id} {...book.data()} />
          </Col>
        ))}
      </Row>
</div>)}

export default Home