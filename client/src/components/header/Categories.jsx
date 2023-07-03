import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Box
} from "@mui/material";
import { Link, useSearchParams } from 'react-router-dom';
const categ = ["Music", "Movies", "Sports", "Tech", "Fashion"];

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224);
`;
const Container = styled(Box)`
    display: flex;
    justify-content: center;
    align-item: center;
    height: 3rem;
    margin: 5px;
`;
const StyledButton = styled(Button)`
    font-size: .9rem;
    width: 88%;
    background-color: #de6811;
    @media (max-width: 1100px) {
        font-size: .8rem;
        }
    @media (max-width: 1000px) {
        font-size: .7rem;
        }
    @media (max-width: 900px) {
        font-size: .59rem;
        }
    @media (max-width: 800px) {
        font-size: .46rem;
        }
    @media (max-width: 650px) {
        font-size: .39rem;
        }
    @media (max-width: 650px) {
        font-size: .9rem;
        }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
  const [ searchParams ] = useSearchParams();
  const category = searchParams.get('category');
  return (
    <>
    <Container>
    <StyledButton variant="contained">
        <StyledLink to={`/create?category=${category || ''}`} style={{textDecoration: 'none', color: '#fff'}}>
       Create Blog +
        </StyledLink>
        </StyledButton>
    </Container>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to = '/'>All Categories</StyledLink>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categ.map((cate) => (
            <TableRow key={cate}>
              <TableCell>
                <StyledLink to={`/?category=${cate.toLowerCase()}`}>{cate}</StyledLink>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
