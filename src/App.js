import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MyNavbar from './Components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login'
import { Route,Routes } from 'react-router-dom';
import List from './pages/List'
import Home from './pages/Home';
import Details from './pages/Details';
import ViewOrders from './pages/ViewOrders';
import ViewOrderDetailPage from './pages/ViewOrderDetailPage';
function App() {
  return (
    <div>
      <MyNavbar />
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login />}/>
    <Route path = '/book/list' element={<List/>}/>
    <Route path='/book/view/:bookId' element={<Details/>}/>
    <Route path='/book/orders' element={<ViewOrders/>}/>
    <Route path='/book/orders/:bookId' element={<ViewOrderDetailPage/>}/>
    </Routes>
   </div>
  );
}

export default App;
