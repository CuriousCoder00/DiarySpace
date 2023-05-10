import express from 'express';
import { SignupUser } from '../controllers/user-controller.js';

const router = express.Router();

router.post('/signup', SignupUser);



export default router;