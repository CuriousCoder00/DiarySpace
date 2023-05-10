
import User from '../model/user.js';

export const SignupUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg: 'Signup Successfull'});
    } catch (error) {
        return res.status(500).json({msg: 'Error while SingIngUp User'});
    }
}