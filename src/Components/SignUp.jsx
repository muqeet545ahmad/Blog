import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ setLogedUser, setuserId, LogedUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataobj = {
      name: formData.Name,
      email: formData.Email,
      password: formData.Password,
    };

    try {
      // const response = await fetch('http://localhost:5000/SignUp/blog', {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataobj),
      });

      if (response.ok) {
        const user = await response.json();

        localStorage.setItem("userId", user._id);
        localStorage.setItem("userName", user.name);
        setuserId(user._id);
        setLogedUser(user.name);
        navigate("/"); // Navigate to the login page after successful signup
      } else {
        console.error("Error submitting form:", response.statusText);
        // Handle error, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <section
      className="vh-100"
      style={{
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="card text-black" style={{ borderRadius: 25 }}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  {/* ... (other form elements) */}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example1c">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="Name"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example3c">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="Email"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example4c">
                        Password
                      </label>
                      <input
                        type="password"
                        id="Password"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* ... (other form elements) */}
                  <button type="submit" className="btn btn-primary btn-lg">
                    Register
                  </button>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid"
                  alt="Sample"
                />
              </div>
              {/* ... (other elements) */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
