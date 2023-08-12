import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const SignupUser = async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {username: req.body.username, name:req.body.name, password: hashedPassword};
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg: 'Signup Successfull'});
    } catch (error) {
        return res.status(500).json({msg: 'Error while Singup User'});
    }
}

export const UserLogin = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).json({msg: 'User Not Found'});
    try {
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordCorrect){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY, {expiresIn: '1d'});
            const newToken = new Token({token: refreshToken});
            await newToken.save();
            return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken, name:user.name, username:user.username});
        } else { 
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'Error while Login User'});
    } 
}

export const UserLogout = async (req, res) => {
    const token = req.body.token;
    await Token.deleteOne({token: token});
    localStorage.removeItem('user');
    res.status(204).json({msg: 'Logout Successfull'});
}