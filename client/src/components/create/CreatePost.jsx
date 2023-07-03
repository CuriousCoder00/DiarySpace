import { useState, useEffect, useContext } from 'react'
import { Box, styled, FormControl, OutlinedInput, Button, TextareaAutosize } from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../services/Api';

const Container = styled(Box)`
  margin: 10px 100px;
`;


const Image = styled('img')`
  width: 100%;
  height: 50vh;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTexTField = styled(OutlinedInput)`
  flex: 1;
  margin: 0 5px;
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
  title: '',
  description: '',
  picture: '',
  username: '',
  category: '',
  createdDate: new Date()
}

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const url = post.picture ? post.picture : "https://images.pexels.com/photos/3695297/pexels-photo-3695297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const [file, setFile] = useState('');

  const { account } = useContext(DataContext);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.value]: e.target.name})
  };

  const location = useLocation();

useEffect(() => {
  const getImage = async () => {
    if(file){
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      const res = await API.uploadFile(data);
      post.picture = res.data;
    }
  }
  getImage();
  post.category = location.search?.split('=')[1] || 'All';
  post.username = account.username;
  // eslint-disable-next-line
}, [file])


  return (
    <>
      <Container>
        <Image src={url}/>
        <StyledFormControl>
          <label htmlFor="fileInput" style={{padding: '10px'}}>
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTexTField placeholder="Title" onChange={(e)=>handleChange(e)} name="title"/>
          <StyledButton variant="contained" style={{marginLeft:'3px'}}>Publish</StyledButton>
        </StyledFormControl>
        <TextArea minRows={6} placeholder="Write Your Blog here...." onChange={(e)=>handleChange(e)} name="description"/>
      </Container>
    </>
  );
};

export default CreatePost;
