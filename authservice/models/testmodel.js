import mongoose from "mongoose";

const testschema =new mongoose.Schema({
    title : String,
    cast : String
})

export const Movies = mongoose.model('movies' , testschema)