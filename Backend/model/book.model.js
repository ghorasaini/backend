import mongoose from "mongoose";


const bookSchema = new mongoose.Schema ({
    title:{
        type: String,
        require:true,
    },

    image:{
        type:String,
        require:true,
    },
    author: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    copies: {
        type: Number,
        default: 1,
    },
    borrowedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Book = mongoose.model("book1", bookSchema);
export default Book;
