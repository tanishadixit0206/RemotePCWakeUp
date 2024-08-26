import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const usermodel = new mongoose.Schema({
    username : {
        unique : true,
        required : true,
        type: String
    },
    password : {
        required : true,
        type : String
    },
    email : {
        unique : true,
        required : true,
        type: String
    }
})

// usermodel.pre('save', async function (next) {
//     try {
//       if (!this.isModified('password')) {
//         return next();
//       }
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });

//   usermodel.methods.comparePassword = async function (userpassword){
//     return bcrypt.compare(userpassword , this.password)
//   }

export const User = mongoose.model('User' , usermodel)