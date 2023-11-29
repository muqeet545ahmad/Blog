import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import BlogDetails from './BlogDetails'; // Import the new component
import { FaHeart, FaShare } from 'react-icons/fa';
import { FaWhatsapp, FaTiktok, FaYoutube } from 'react-icons/fa';

const Blogs_API_BASE_URL = 'http://localhost:5000/api/blogs';
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showFullContent,setShowFullContent] = useState(false);
  const [creatingBlog, setCreatingBlog] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showShareIcons, setShowShareIcons] = useState(false);

  const handleShareClick = () => {
    setShowShareIcons(!showShareIcons);
  };

  const handleShare = (platform, blog) => {
    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)} - ${encodeURIComponent(blog.Data)}`);
        // window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)} - ${encodeURIComponent(blog.Data)}`);
        break;
      case 'tiktok':
        // You may need to provide a link to your TikTok video or content
        window.open('https://www.tiktok.com/');
        break;
      case 'youtube':
        // You may need to provide a link to your YouTube video or content
        window.open('https://www.youtube.com/');
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
    title: '',
    authorName: '',
    description:'',
    numLikes: 0,
    blogNumber: 0,
  });


    const [isHeartClicked, setIsHeartClicked] = useState('true');


  
    const handleHeartClick = () => {
      setIsHeartClicked(!isHeartClicked);
    };
  useEffect(() => {
    getblogs()
  }, []);

const getblogs = (async()=>{
  axios.get(`${Blogs_API_BASE_URL}`)
  .then(response => {
  console.log(response);
    setBlogs(response.data);
    console.log("response", response);
  })
  .catch(error => console.error('Error getting blogs', error));
})

  
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
        title: '',
        authorName: '',
        description:'',
        numLikes: 0,
        blogNumber: 0,
      });
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };

  return (
    <>
    <br />
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ padding: '0 50px' }}>
            <img src="images/C1.avif" width={1000} height={400} alt="Error To Get Image" />
          </div>
          <div className="carousel-item" style={{ padding: '0 50px' }}>
            <img src="images/C2.avif" width={1000} height={400} alt="Error To Get Image" />
          </div>
          <div className="carousel-item" style={{ padding: '0 50px' }}>
            <img src="images/C3.avif" width={1000} height={400} alt="Error To Get Image" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
<br />
      <Container style={{ backgroundColor: 'gray', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'right', justifyContent: 'right' }}>
        <Row xs={1} md={3} className="justify-content-center text-left">
          {blogs.map((blog, index) => (
            <Col key={index}>
              <Card style={{ width: '18rem', margin: '10px', backgroundColor: 'white' }}>
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1GfN_JcIqFLIVUs8G29YNZ5snyMM06SaEA&usqp=CAU" />
                <Card.Body>
                  {/* <Card.Title>Title-{blog.title}</Card.Title>
                  <Card.Title>{blog.name}</Card.Title>
                  <Card.Title>Number of Likes{blog.nLikes}</Card.Title> */}
                  <Card.Text>
                  <Card.Title>{blog.title}</Card.Title>
                    {/* <strong>Title:</strong> {blog.title} */}
                    
                    <strong>Number of Likes:</strong> {blog.numLikes}
                    <br />
                    <strong>Author Name:</strong> {blog.authorName}
                    <br />
                    <strong>Blog Number:</strong> {blog.blogNumber}
                    <br />
                    <strong>Description:</strong> {blog.Data}
                    <br />
                  </Card.Text>
                  <Row className="justify-content-center" style={{ backgroundColor: 'lightblue', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}>
                <Col xs="auto">
                  <button style={{ backgroundColor: 'blue', color: 'white', cursor: 'pointer' }} onClick={() => handleDetails(index)}>
                    Read More
                  </button>
                </Col>
              </Row>

              <Row className="justify-content-center" style={{ backgroundColor: 'lightblue', padding: '5px', borderRadius: '5px' }}>
      <Col xs="auto">
        {/* Heart Icon */}
        <FaHeart
          style={{ marginRight: '5px', cursor: 'pointer', color: isHeartClicked ? 'red' : 'black' }}
          onClick={handleHeartClick}
        />
      </Col>
      <Col xs="auto">
        {/* Share Icons */}
        <div style={{ position: 'relative' }}>
          <FaWhatsapp
            style={{ marginRight: '5px', cursor: 'pointer', display: showShareIcons ? 'inline-block' : 'none' }}
            onClick={() => handleShare('whatsapp')}
          />
          <FaTiktok
            style={{ marginRight: '5px', cursor: 'pointer', display: showShareIcons ? 'inline-block' : 'none' }}
            onClick={() => handleShare('tiktok')}
          />
          <FaYoutube
            style={{ marginRight: '5px', cursor: 'pointer', display: showShareIcons ? 'inline-block' : 'none' }}
            onClick={() => handleShare('youtube')}
          />
        </div>
        {/* Share Icon */}
        <FaShare style={{ marginRight: '5px', cursor: 'pointer' }} onClick={handleShareClick} />
      </Col>
    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {showDetails && (
        <BlogDetails blog={blogs[selectedCardIndex]} onClose={() => setShowDetails(false)} />
      )}

<div style={{ backgroundColor: 'gray', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'end', margin: '0', width: '100%'}}>
  {/* {!creatingBlog && (
    <Row className="justify-content-center" style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '280px',marginRight:'40px' }}>
      <button style={{ backgroundColor: 'blue', color: 'white', cursor: 'pointer' }} onClick={handleCreateBlog}>
        Create Blog
      </button>
    </Row>
  )} */}
  {creatingBlog && (
    <div style={{ margin: '0', backgroundColor: 'white', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2>Create a New Blog</h2>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Title:</label>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
          style={{ width: 'calc(100% - 110px)' }}
        />
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Author Name:</label>
        <input
          type="text"
          name="authorName"
          value={newBlog.authorName}
          onChange={handleInputChange}
          style={{ width: 'calc(100% - 110px)' }}
        />
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Number of Likes:</label>
        <input
          type="number"
          name="nLikes"
          value={newBlog.numLikes}
          onChange={handleInputChange}
          style={{ width: 'calc(100% - 110px)' }}
        />
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Blog Number:</label>
        <input
          type="number"
          name="BlogNum"
          value={newBlog.blogNumber}
          onChange={handleInputChange}
          style={{ width: 'calc(100% - 110px)' }}
        />
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Description:</label>
        <input
          type="text"
          name="description"
          value={newBlog.description}
          onChange={handleInputChange}
          style={{ height: '130px', width: 'calc(100% - 110px)' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }} onClick={handleCreate}>
          Create
        </button>
        <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleCancelCreate}>
          Cancel
        </button>
      </div>
   
    </div>
  )}
</div>
      </Container>
    </>
  );
};

export default Home;
