import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the subscription, e.g., make an API call
    console.log("Email submitted:", email);
    // Clear the input field after submission
    setEmail("");
  };

  return (
    <div className="container-fluid bg-white text-black">
      <div>
        <h3>Become a Member</h3>
        <p>
          Join our community as a member to unlock exclusive content, engage in
          discussions, and connect with fellow enthusiasts.
        </p>
      </div>
      <footer className="text-center">
        <div className="container p-2 pb-0">
          <section>
            <form onSubmit={handleSubmit}>
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
                <div className="col-md-5 col-12">
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      placeholder="Email-Address"
                      id="form5Example2"
                      className="form-control"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-4">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div
          className="text-center text-dark p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", margin: "-10px" }}
        >
          © 2023 Copyright:
          <a className="text-dark" href="http://localhost:3000">
            Adventure.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
