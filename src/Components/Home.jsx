import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaHeart, FaShare } from "react-icons/fa";
import axios from "axios";
import BlogDetails from "./BlogDetails"; // Import the new component
import { FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa";

const Blogs_API_BASE_URL = "http://localhost:5000/api/blogs";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [creatingBlog, setCreatingBlog] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showShareIcons, setShowShareIcons] = useState(false);

  const handleShareClick = (indx) => {
    setSelectedCardIndex(indx);
    setShowShareIcons(!showShareIcons);
  };

  const handleShare = (platform, blog) => {
    switch (platform) {
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=
          Title: ${encodeURIComponent(blog.title)}\n
          - Id: ${encodeURIComponent(blog._id)}\n
          - Author Name: ${encodeURIComponent(blog.authorName)}\n
          - Description: ${encodeURIComponent(blog.description)}\n
          - Number of Likes: ${encodeURIComponent(blog.numLikes)}\n
          - Blog Number: ${encodeURIComponent(blog.blogNumber)}
        `);
        break;

        // window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)} - ${encodeURIComponent(blog.Data)}`);
        break;
      case "tiktok":
        // You may need to provide a link to your TikTok video or content
        window.open("https://www.tiktok.com/");
        break;
      case "youtube":
        // You may need to provide a link to your YouTube video or content
        window.open("https://www.youtube.com/");
        break;
      default:
        break;
    }
  };
  // Function to open/close the details modal
  const handleDetails = (index) => {
    setSelectedCardIndex(index);
    setShowDetails(true);
  };
  const [newBlog, setNewBlog] = useState({
    title: "",
    authorName: "",
    description: "",
    numLikes: 0,
    blogNumber: 0,
  });
  const [isHeartClicked, setIsHeartClicked] = useState("true");
  const handleHeartClick = (index) => {
    setIsHeartClicked(!isHeartClicked);
  };
  useEffect(() => {
    getblogs();
  }, []);

  const getblogs = async () => {
    axios
      .get(`${Blogs_API_BASE_URL}`)
      .then((response) => {
        console.log(response);
        setBlogs(response.data);
        console.log("response", response);
      })
      .catch((error) => console.error("Error getting blogs", error));
  };

  const handleReadMore = (index) => {
    setSelectedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleCreateBlog = () => {
    setCreatingBlog(true);
  };
  const handleCancelCreate = () => {
    setCreatingBlog(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };
  const handleCreate = async () => {
    try {
      // Make an API call to create a new blog
      await axios.post(`${Blogs_API_BASE_URL}`, newBlog);

      // Fetch the updated blog list
      const response = await axios.get(`${Blogs_API_BASE_URL}`);
      setBlogs(response.data);

      // Reset the form and close the create blog section
      setCreatingBlog(false);
      setNewBlog({
        title: "",
        authorName: "",
        description: "",
        numLikes: 0,
        blogNumber: 0,
      });
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };
  return (
    <>
      <br />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ padding: "0 50px" }}>
            <img
              src="images/C1.avif"
              width={1000}
              height={400}
              alt="Error To Get Image"
            />
          </div>
          <div className="carousel-item" style={{ padding: "0 50px" }}>
            <img
              src="images/C2.avif"
              width={1000}
              height={400}
              alt="Error To Get Image"
            />
          </div>
          <div className="carousel-item" style={{ padding: "0 50px" }}>
            <img
              src="images/C3.avif"
              width={1000}
              height={400}
              alt="Error To Get Image"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <Container
        style={{
          backgroundColor: "gray",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
          justifyContent: "right",
        }}
      >
        <Row xs={1} md={3} className="justify-content-center text-left">
          {blogs.map((blog, index) => (
            <Col key={index}>
              <Card
                style={{
                  width: "22rem",
                  margin: "10px",
                  backgroundColor: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1GfN_JcIqFLIVUs8G29YNZ5snyMM06SaEA&usqp=CAU"
                />
                <Card.Body>
                  <Card.Text>
                    <Card.Title>{blog.title}</Card.Title>
                    <strong>Number of Likes:</strong> {blog.numLikes}
                    <br />
                    <strong>Author Name:</strong> {blog.authorName}
                    <br />
                    <strong>Blog Number:</strong> {blog.blogNumber}
                    <br />
                    <strong>Description:</strong> {blog.Data}
                    <br />
                  </Card.Text>
                  <Row
                    className="justify-content-center"
                    style={{
                      backgroundColor: "lightblue",
                      padding: "5px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    <Col xs="auto">
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDetails(index)}
                      >
                        Read More
                      </button>
                    </Col>
                  </Row>

                  <Row
                    className="justify-content-center"
                    style={{
                      backgroundColor: "lightblue",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <Col xs="auto">
                      {/* Heart Icon */}
                      <FaHeart
                        style={{
                          marginRight: "5px",
                          cursor: "pointer",
                          color: isHeartClicked ? "red" : "black",
                        }}
                        onClick={handleHeartClick}
                      />
                    </Col>
                    <Col xs="auto">
                      {/* Share Icons */}
                      <div
                        style={{
                          position: "relative",
                          display:
                            selectedCardIndex === index
                              ? "inline-block"
                              : "none",
                        }}
                      >
                        <FaWhatsapp
                          style={{
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShare("whatsapp", blog)}
                        />
                        <FaTiktok
                          style={{
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShare("tiktok")}
                        />
                        <FaYoutube
                          style={{
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShare("youtube")}
                        />
                      </div>
                      {/* Share Icon */}
                      <FaShare
                        style={{ marginRight: "5px", cursor: "pointer" }}
                        onClick={() => handleShareClick(index)}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {showDetails && (
          <BlogDetails
            blog={blogs[selectedCardIndex]}
            onClose={() => setShowDetails(false)}
          />
        )}
        <div
          style={{
            backgroundColor: "gray",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            margin: "0",
            width: "100%",
          }}
        >
          {creatingBlog && (
            <div
              style={{
                margin: "0",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h2>Create a New Blog</h2>
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <label style={{ width: "100px", marginRight: "10px" }}>
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={newBlog.title}
                  onChange={handleInputChange}
                  style={{ width: "calc(100% - 110px)" }}
                />
              </div>
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <label style={{ width: "100px", marginRight: "10px" }}>
                  Author Name:
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={newBlog.authorName}
                  onChange={handleInputChange}
                  style={{ width: "calc(100% - 110px)" }}
                />
              </div>
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <label style={{ width: "100px", marginRight: "10px" }}>
                  Number of Likes:
                </label>
                <input
                  type="number"
                  name="nLikes"
                  value={newBlog.numLikes}
                  onChange={handleInputChange}
                  style={{ width: "calc(100% - 110px)" }}
                />
              </div>
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <label style={{ width: "100px", marginRight: "10px" }}>
                  Blog Number:
                </label>
                <input
                  type="number"
                  name="BlogNum"
                  value={newBlog.blogNumber}
                  onChange={handleInputChange}
                  style={{ width: "calc(100% - 110px)" }}
                />
              </div>
              <div style={{ marginBottom: "10px", width: "100%" }}>
                <label style={{ width: "100px", marginRight: "10px" }}>
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  value={newBlog.description}
                  onChange={handleInputChange}
                  style={{ height: "130px", width: "calc(100% - 110px)" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={handleCreate}
                >
                  Create
                </button>
                <button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={handleCancelCreate}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="container mt-3">
          <h2 className="text-center mb-3">Our Expertise</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <img
                  src="images/creater2.jpg"
                  className="card-img-top"
                  alt="Blog Post 1"
                />
                <div className="card-body">
                  <h5 className="card-title">Title of Blog Post 1</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in justo auctor, sagittis turpis in, mattis metus.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <img
                  src="images/creater1.jpeg"
                  className="card-img-top"
                  alt="Blog Post 2"
                />
                <div className="card-body">
                  <h5 className="card-title">Title of Blog Post 2</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in justo auctor, sagittis turpis in, mattis metus.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  src="images/creater3.jpeg"
                  className="card-img-top"
                  alt="Blog Post 3"
                />
                <div className="card-body">
                  <h5 className="card-title">Title of Blog Post 3</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in justo auctor, sagittis turpis in, mattis metus.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <br />
      <br />
      <h3 className="mb-10">Office Location</h3>
      <section className=" d-flex  justify-content-center">
        <div className="row">
          <div className="col-lg-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00599512526003!3d40.72586666928451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61d68!2sBroadway-Lafayette%20St!5e0!3m2!1spl!2spl!4v1624523797308!5m2!1spl!2spl"
              className="h-150 w-200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              width="1100"
              height="400"
            ></iframe>
          </div>
        </div>
      </section>
      <br />
      
    </>
  );
};

export default Home;
