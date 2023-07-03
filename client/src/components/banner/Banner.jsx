import React from "react";
import { Box, Typography, styled } from "@mui/material";
import LOGO from '../../assets/logo.png';

const Image = styled(Box)`
  background: url("https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHx0ZWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")
    center repeat-x #000;
  width: 100%;
  height: 30vh;
`;

const DiarySpaceHeading = styled(Box)`
  display: flex;
  justify-content: center;
  & > img {
    width: 70%;
  }
`;
const DiarySpaceSubHeading = styled(Typography)`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  font-weight: 700;
  @media (max-width: 1000px) {
    font-size: 1.5rem;
    }
  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;
const Shadow = styled(Box)`
  background-color: #0000002e;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Banner = () => {
  return (
    <Image>
      <Shadow>
        <DiarySpaceHeading>
            <img src={LOGO} alt="" />
        </DiarySpaceHeading>
        <DiarySpaceSubHeading>Create a unique and beautiful blog easily.</DiarySpaceSubHeading>
      </Shadow>
    </Image>
  );
};

export default Banner;
