import React, { useContext, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../helpers/AuthContext";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
function MyVerticallyCenteredModal(props) {
  const { userGlobal } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  console.log(author);
  const handleTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => setAuthor(userGlobal.authState.username));
  const handleSubmit = async () => {
    await axios
      .post(
        "http://localhost:5000/api/blog/create",
        {
          author: author,
          title: title,
          content: content,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => console.log(res.data));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Blog
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          onChange={handleAuthor}
          id="outlined-multiline-static"
          label="Author (Username)"
          margin="normal"
          defaultValue={userGlobal.authState.username}
          disabled
        />{" "}
        <br />
        <TextField
          onChange={handleTitle}
          id="outlined-multiline-static"
          label="Title"
          margin="normal"
        />
        <TextField
          onChange={handleContent}
          margin="normal"
          fullWidth
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={4}
          cols={5}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={props.onHide}
          type="submit"
          className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}
function Blog() {
  const [modalShow, setModalShow] = React.useState(false);

  const { userGlobal } = useContext(AuthContext);
  const [allBlog, setAllBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      await axios
        .get("http://localhost:5000/api/blog/")
        .then((res) => {
          setAllBlog(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err.message));
    };

    fetchBlog();
  }, [modalShow]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col ">
      <button
        onClick={() => setModalShow(true)}
        type="submit"
        className="my-6 mx-6 flex w-[120px] items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <AddIcon></AddIcon> Write
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div className="w-full">
        {allBlog.map((item) => {
          return (
            <div className=" my-10 border-b border-t flex align-items-center py-10">
              <div className="date">
                {" "}
                <div className="date text-indigo-600 font-bold text-xl text-center mx-5 mt-2">
                  {new Date(item.createdAt).getDate()} <br />
                  {monthNames[new Date(item.createdAt).getMonth()]} <br></br>
                  {new Date(item.createdAt).getFullYear()}
                </div>
              </div>
              <div className="wrapper">
                {" "}
                <a href={`/blogdetails/${item._id}`}>
                  {" "}
                  <div className="font-bold text-[20px] lg:text-[25px] m-0 p-0">
                    {item.title}
                  </div>
                </a>
                <div className="text-[12px] lg:text-[15px]">
                  by {item.author}
                </div>
                <div className="text-[18px] lg:text-[20px]">{`${item.content.substring(0,250)}`}  <a href={`/blogdetails/${item._id}`}>readmore</a></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Blog;
