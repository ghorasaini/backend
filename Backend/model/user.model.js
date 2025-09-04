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



const userSchema = new mongoose.Schema ({
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

const User = mongoose.model("user", userSchema);
export default User;