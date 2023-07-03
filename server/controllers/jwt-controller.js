import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Token from "../model/token.js";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (token === null) return res.status(401).json({ msg: "token not found" });

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ msg: "token not valid" });
    req.user = user;
    next();
  });
};

export const createNewToken = async (req, res) => {
  const refreshToken = req.body.token.split(" ")[1];
  if (!refreshToken) return res.status(401).json({ msg: "token not found" });
  const token = await Token.findOne({ token: refreshToken });

  if (!token) return res.status(403).json({ msg: "token not valid" });
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (error, user) => {
    if (error) return res.status(500).json({ msg: "token invalid" });
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    return res.status(200).json({ accessToken: accessToken });
  });
};
