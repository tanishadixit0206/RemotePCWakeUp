import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
      },
      displayName: String,
      email: String
})

export const googleUser = mongoose.model('googleuser' , userschema)