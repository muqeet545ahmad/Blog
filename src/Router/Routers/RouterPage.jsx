import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Components/Home';
import About from '../../Components/About';
import Admin from '../../Components/Admin';
import Contact from '../../Components/Contact';
import Login from '../../Components/Login';
import SignUp from '../../Components/SignUp';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Error from '../../Components/Error';

function RouterPage() {

  const [LogedUser, setLogedUser] = useState(null);

  const [userId, setuserId] = useState(null);

useEffect(()=>{

 const id =  localStorage.getItem('userId');  

 const name =  localStorage.getItem('userName');  


 if (id) {
  setuserId(id)
 }

 if (name) {
  setLogedUser(name)
 }

},[])

  return (
    <div>
<Navbar style={{ color: 'black' }} setLogedUser={setLogedUser} setuserId={setuserId} LogedUser={LogedUser}/>
      {/* <h1 style={{ color: 'black' }}>Adventure.Com</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Admin" element={<Admin userId={userId}/>} />
        <Route path="/SignUp" element={<SignUp setLogedUser={setLogedUser} setuserId={setuserId}/>} />
        <Route path="/Login" element={<Login setLogedUser={setLogedUser} setuserId={setuserId}/>} />
        <Route path="/Error" element={<Error />} />
      </Routes>
      <Footer style={{ color: 'black' }} />

    </div>
  );
}

export default RouterPage;
