import express from "express";
import Connection from "./DB.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";

import cors from 'cors';
import bodyParser from "body-parser";


dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

Connection();
