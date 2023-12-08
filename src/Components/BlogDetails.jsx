import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BlogDetails = ({ blog, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "lightblue",
          color: "black",
          textAlign: "center",
        }}
      >
        <Modal.Title style={{ marginLeft: "auto" }}>{blog.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1GfN_JcIqFLIVUs8G29YNZ5snyMM06SaEA&usqp=CAU"
            alt="Blog Image"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "15px" }}
          />
          <p>
            <strong>Author Name:</strong> {blog.authorName}
            <br />
            <strong>Number of Likes:</strong> {blog.numLikes}
            <br />
            <strong>Blog Number:</strong> {blog.blogNumber}
            <br />
            <strong>Description:</strong> {blog.description}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "gray" }}>
        <Button style={{ margin: "auto" }} variant="success" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogDetails;
