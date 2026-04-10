
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './pages/components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import API_URL from "./config";
import { useEffect } from "react";

function App() {

useEffect(() => {
  fetch(`${API_URL}/api/tickets`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => console.log(data));
}, []);
  
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>


            <Route path='/new-ticket' element={<PrivateRoute />}>
               <Route path='/new-ticket' element={<NewTicket />}/>
            </Route>

            < Route path='/tickets' element={<PrivateRoute />}>
               <Route path='/tickets' element={<Tickets />}/>
            </Route>

            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
               <Route path='/ticket/:ticketId' element={<Ticket />}/>
            </Route>
            
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>    
  );
}

export default App;
