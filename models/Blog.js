import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Store name is required"],
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [60, "Name cannot exceed 60 characters"],
        },

        content: {
            type: String,
            required: [true, "Content is required"],
            // maxlength: [800, "Content cannot exceed 800 characters"],
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {timestamps: true}
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog 