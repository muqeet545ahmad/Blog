import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHeart, FaTrash, FaPencilAlt, FaShare, FaEye } from 'react-icons/fa';
import BlogDetails from './BlogDetails'; // Import the new component
import axios from 'axios';
import { FaWhatsapp, FaTiktok, FaYoutube } from 'react-icons/fa';

const Admin = ({userId}) => {
const Blogs_API_BASE_URL = 'http://localhost:5000/blog';

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [creatingBlog, setCreatingBlog] = useState(false);
  const [showShareIcons, setShowShareIcons] = useState(false);

  const handleShareClick = () => {
    setShowShareIcons(!showShareIcons);
  };

  // const handleShare = (platform, blog) => {
  //   switch (platform) {
  //     case 'whatsapp':
  //       window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' - ' + blog.Data)}`);
  //       break;
  //     case 'tiktok':
  //       // You may need to provide a link to your TikTok video or content
  //       window.open('https://www.tiktok.com/');
  //       break;
  //     case 'youtube':
  //       // You may need to provide a link to your YouTube video or content
  //       window.open('https://www.youtube.com/');
  //       break;
  //     default:
  //       console.error("Invalid platform:", platform);
  //       // Handle the case where the platform is not recognized
  //       break;
  //   }
  // };
  const handleShare = (platform, blog) => {
    try {
      if (!blog || !blog.title) {
        throw new Error('Invalid blog data. Missing title.');
      }
  
      switch (platform) {
        case 'whatsapp':
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' - ' + blog.Data)}`);
          break;
        // Other cases...
        default:
          break;
      }
    } catch (error) {
      console.error('Error in handleShare:', error.message);
    }
  };
  
  
  const [isHeartClicked, setIsHeartClicked] = useState('true');
  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };
  const [newBlog, setNewBlog] = useState({
    title: '',
    authorName: '',
    description: '',
    numLikes: 0,
    blogNumber: 0,
  });

  useEffect(() => {
    fetchUserBlogs()
  }, []);
  

  const fetchUserBlogs = () => {

    axios.get(`http://localhost:5000/api/user/${userId}/blogs`)
      .then(response => {
        console.log("response", response);

        setBlogs(response.data);
      })
      .catch(error => console.error('Error getting blogs', error));
  }

  const handleDetails = (index) => {
    setSelectedCardIndex(index);
    setShowDetails(true);
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
    console.log('Create button clicked'); // Add this line

    try {
      const { title, authorName, description, numLikes } = newBlog;
     

      if (!title) {
        console.error('Title is required');
        return; // Don't proceed if title is empty
      }
      const newBlogdata = {
        title,
        authorName,
        description,
        numLikes,
        blogNumber: numLikes,
        user: userId,
      };
  
      // Make an API call to create a new blog
      const respone=await axios.post(`http://localhost:5000/api/blogs`, newBlogdata);
  
      // Reset the form and close the create blog section
      setCreatingBlog(false);
      setNewBlog({
        title: '',
        authorName: '',
        description: '',
        numLikes: 0,
        blogNumber: 0,
      });
      fetchUserBlogs()

    } catch (error) {
      console.error('Error creating blog', error);
    }
  };
  
  
  const handleDelete = async (id) => {
    try {
      // Retrieve the user ID from local storage
      const userId = localStorage.getItem('userId');
  
      // Make an API call to delete the blog by ID
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          'Authorization': `Bearer ${userId}`
        }
      });
  
      fetchUserBlogs()
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };
  
  // Handler to initiate blog editing
  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  // Handler to update the blog data after editing
  const handleUpdate = async (id, updatedBlog) => {
    const specificBlogURL = `http://localhost:5000/api/blogs/${id}`;

    try {
      const userID = localStorage.getItem('userID');
    await axios.put(specificBlogURL, updatedBlog, {
      headers: {
        'Authorization': `Bearer ${userID}` // Assuming it's a bearer token
      }
    });
      // Clear the editing state
      setEditingBlog(null);

      fetchUserBlogs()
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  // Handler to cancel editing
  const handleCancel = () => {
    // Clear the editing state
    setEditingBlog(null);
  };

  return (
    // JSX structure for the Admin component
    <Container style={{ backgroundColor: 'gray', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'right', justifyContent: 'right' }}>
<div style={{ backgroundColor: 'gray', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'end', margin: '0', width: '100%'}}>
  {!creatingBlog && (
    <Row className="justify-content-center" style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '280px',marginRight:'420px' }}>
      <button style={{ backgroundColor: 'blue', color: 'white', cursor: 'pointer' }} onClick={handleCreateBlog}>
        Create Blog
      </button>
    </Row>
  )}
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
          name="numLikes"
          value={newBlog.numLikes}
          onChange={handleInputChange}
          style={{ width: 'calc(100% - 110px)' }}
        />
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Blog Number:</label>
        <input
          type="number"
          name="blogNumber"
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

      {/* Displaying blogs in cards */}
    {/* Displaying blogs in cards */}
<Row xs={1} md={3} className="justify-content-center text-left">
  {blogs.map((blog, index) => (
    <Col key={index}>
      <Card style={{ width: '18rem', margin: '10px', backgroundColor: 'white' }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1GfN_JcIqFLIVUs8G29YNZ5snyMM06SaEA&usqp=CAU" />
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <strong>Number of Likes:</strong> {blog.numLikes}
          <br />
          <strong>Author Name:</strong> {blog.authorName}
          <br />
          <strong>Blog Number:</strong> {blog.blogNumber}
          <br />
          <strong>Description:</strong> {blog.Data}
          <br />

          <Card.Text>
            {/* Add your conditional rendering logic here */}
          </Card.Text>

          <Row className="justify-content-center" style={{ backgroundColor: 'lightblue', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}>
            <Col xs="auto">
              <button style={{ backgroundColor: 'blue', color: 'white', cursor: 'pointer' }} onClick={() => handleDetails(index)}>
                Read More
              </button>
            </Col>
          </Row>

          <Row className="justify-content-between" style={{ backgroundColor: 'lightblue', padding: '5px', borderRadius: '5px' }}>
                  <Col xs="auto">
                  <Row className="justify-content-center" style={{ backgroundColor: 'lightblue', borderRadius: '5px' }}>
                    <Col xs="auto">
                      {/* Social Icons */}
                      <Row className="align-left" style={{ backgroundColor: 'lightblue', borderRadius: '5px' }}>
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
  onClick={() => handleShare('whatsapp', { title: 'Your Title', Data: 'Your Data' })}
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


                    </Col>
                  </Row>
                    {/* <FaHeart style={{ marginRight: '5px', cursor: 'pointer' }} />
                    <FaShare style={{ marginRight: '5px', cursor: 'pointer' }} /> */}
                  </Col>
                  {/* CRUD Icons */}
                  <Col xs="auto">
                    <FaTrash
                      style={{ marginRight: '5px', cursor: 'pointer' }}
                      onClick={() => handleDelete(blog._id)}
                    />
                    <FaPencilAlt
                      style={{ marginRight: '5px', cursor: 'pointer' }}
                      onClick={() => handleEdit(blog)}
                    />
                    <FaEye style={{ cursor: 'pointer' }}
                    onClick={() => handleDetails(index)} />
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

{/* Continue with the rest of your code */}

      {/* Edit Form */}
      {/* Displaying a modal for editing a blog */}
      {editingBlog && (
   <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
   <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '380px', height: '450px' }}>
     <h2 style={{ textAlign: 'center' }}>Edit Blog</h2>
            {/* Form for editing blog data */}
            <form>
              {/* Render form fields with current blog data */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>Description:</label>
                <input
                  type="text"
                  name="Description"
                  value={editingBlog.description}
                  onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>Author Name:</label>
                <input
                  type="text"
                  name="Autname"
                  value={editingBlog.authorName}
                  onChange={(e) => setEditingBlog({ ...editingBlog, authorName: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>Number of Likes:</label>
                <input
                  type="number"
                  name="nLikes"
                  value={editingBlog.numLikes}
                  onChange={(e) => setEditingBlog({ ...editingBlog, numLikes: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>Blog Number:</label>
                <input
                  type="number"
                  name="BlogNum"
                  value={editingBlog.blogNumber}
                  onChange={(e) => setEditingBlog({ ...editingBlog, blogNumber: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>

              {/* Buttons for updating and canceling blog edit */}
              <button
                type="button"
                style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                onClick={() => handleUpdate(editingBlog._id, editingBlog)}
              >
                Update
              </button>
              <button
                type="button"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}


    </Container>
  );
};

export default Admin;
