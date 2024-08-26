import mongoose from "mongoose";

async function connect (){
    try {
        await mongoose.connect("mongodb://localhost:27017/test")
    } catch (error) {
        console.log('mongo db has error' , error)
    }
}

export default connect