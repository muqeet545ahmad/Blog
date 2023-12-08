import React, { useState } from "react";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
const Login = ({ setLogedUser, setuserId, LogedUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataobj = { email: formData.email, password: formData.password };
    try {
      const response = await fetch("http://localhost:5000/api/login", {
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
        console.log("Hello Login Success");
        navigate("/");
      } else {
        navigate("/Signup");
        console.error("Error submitting form:", response.statusText);
        // Handle error, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handelCreateAccount = () => {
    navigate("/Signup");
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {/* ... (your existing JSX code) */}
              <div className="d-grid gap-2 mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Log-in
                </button>
                <button
                  type="Create"
                  className="btn btn-success btn-lg btn-block"
                  onClick={handelCreateAccount}
                >
                  Create Account
                </button>
              </div>

              {/* ... (your existing JSX code) */}
            </form>
            <div className="divider d-flex align-items-center my-1">
              <p
                className="text-center fw-bold mx-3 mb-0 text-muted"
                style={{ color: "red" }}
              >
                Or
              </p>{" "}
            </div>
            <a
              className="btn btn-primary btn-lg btn-block"
              style={{ backgroundColor: "#3b5998" }}
              href="/https://www.google.com/"
              role="button"
            >
              <i className="fab fa-google-f me-1" />
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
