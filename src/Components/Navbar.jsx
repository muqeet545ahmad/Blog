import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser ,faUserPlus} from '@fortawesome/free-solid-svg-icons'; // Make sure to import the necessary FontAwesome icons
import { NavDropdown } from 'react-bootstrap';

const Navbar = ({setLogedUser ,setuserId ,LogedUser}) => {


  useEffect(() => {
    const userName = localStorage.getItem('userName');


    setLogedUser(userName)
      },[])

      const handleLogout = () => {
        // Clear localStorage when logging out
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        setLogedUser(null)
        setuserId(null)
        // Additional logout logic if needed
      };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: 'black', color: 'black', position: 'sticky', top: '0', zIndex: '1000' }}>
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand" to="/">Adventure.Com</Link>

          {/* Toggle Button */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/About">About</Link>
              <Link className="nav-link" to="/Contact">Contact-Us</Link>
            </div>
          </div>

          {/* Logout Icon */}

          <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>
  {LogedUser ? (
    <div style={{ display: "flex", alignItems: "center" }}>
    <Link to="/Admin" style={{ color: 'white', marginRight: '10px' }}>
  <FontAwesomeIcon icon={faUser} style={{ color: 'white', marginRight: '5px' }} />
  {LogedUser}
</Link>
      <button
        style={{
          width: "60px", // Adjust the width as needed
          background: "none",
          fontSize: "15px",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <span style={{ backgroundColor: 'red', padding: '5px', borderRadius: '5px' }}>Logout</span>
      </button>
    </div>
  ) : (
<>
          <NavDropdown title="Login" id="basic-nav-dropdown">
            <Link to="/Login" className="dropdown-item">
              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'green', marginRight: '5px' }} />
              <span style={{  color: 'black', padding: '5px', borderRadius: '5px' }}>Login</span>
            </Link>
            <NavDropdown.Divider />
            <Link to="/SignUp" className="dropdown-item">
              <FontAwesomeIcon icon={faUserPlus} style={{ color: 'green', marginRight: '5px' }} />
              <span style={{ color: 'black', padding: '5px', borderRadius: '5px' }}>Create Account</span>
            </Link>
          </NavDropdown>

</>
  )}
</div>



        </div>
      </nav>
    </>
  );
}

export default Navbar;
