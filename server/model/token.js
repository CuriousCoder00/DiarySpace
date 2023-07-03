import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: true
    }
})

const Token = mongoose.model("token", TokenSchema);
export default Token;