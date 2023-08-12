import { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  OutlinedInput,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../services/Api";

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: 0
  }
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTexTField = styled(OutlinedInput)`
flex: 1;
margin: 0 30px;
font-size: 25px;
`;

const StyledButton = styled(Button)`
  background-color: #de6811;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  border: none;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(initialPost);
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";

  const [file, setFile] = useState("");

  const { account } = useContext(DataContext);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // const getImage = async () => {
  //   if (file) {
  //     const data = new FormData();
  //     data.append("name", file.name);
  //     data.append("file", file);

  //     const res = await API.uploadFile(data);
  //     post.picture = res.data;
  //   }
  // };
  
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
  
        const res = await API.uploadFile(data);
        post.picture = res.data;
      }
    }
    getImage();
    post.category = location.search?.split("=")[1] || "All";
    post.username = account.username;
    // eslint-disable-next-line
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    navigate("/");
  };

  return (
    <>
      <Container>
          <Image src={url} />
        <StyledFormControl>
          <label htmlFor="fileInput" style={{ padding: "10px" }}>
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTexTField
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <StyledButton
            variant="contained"
            style={{ marginLeft: "3px" }}
            onClick={savePost}
          >
            Publish
          </StyledButton>
        </StyledFormControl>
        <TextArea
          minRows={6}
          placeholder="Write Your Blog here...."
          name="description"
          onChange={handleChange}
        />
      </Container>
    </>
  );
};

export default CreatePost;
