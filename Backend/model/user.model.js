import mongoose from "mongoose";
// schema : blue print of a document 
// defines field data type  validation rules

// model 
//  compiles version of schema
// used to create/ read/update/ delete documets

// schema 
// blue print of a house
//  model
// contracyor that build a house



// const userSchema = new mongoose.Schema ({
//     name:{
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     password: {
//         type: String,
//     }
// });

// const User = mongoose.model("user", userSchema);
// export default User;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpires:{
    type: Date,
  },

  resetVerified:{
    type: Boolean,
    default: false,
  }



}, { timestamps: true });


const User = mongoose.model("User",userSchema)

export default User