import express from "express";
import { SignupUser, UserLogin, UserLogout } from "../controllers/user-controller.js";
import { getImage, uploadImage } from "../controllers/image-controller.js";
import { newComment, getComments, deleteComment } from "../controllers/comment-controller.js";
import { createPost, updatePost, deletePost, getAllPosts, getPost } from "../controllers/post-controller.js";
import { verifyToken, createNewToken } from "../controllers/jwt-controller.js";

import upload from '../middleware/upload.js'

const router = express.Router();

router.post('/login', UserLogin);
router.post('/signup', SignupUser);
router.post('/logout', UserLogout);

router.post('/token', createNewToken);

router.post('/create', verifyToken, createPost);
router.put('/update/:id', verifyToken, updatePost);
router.delete('/delete/:id', verifyToken, deletePost);

router.get('/post/:id', verifyToken, getPost);
router.get('/posts', verifyToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', verifyToken, newComment);
router.get('/comments/:id', verifyToken, getComments);
router.delete('/comment/delete/:id', verifyToken, deleteComment);


export default router;
