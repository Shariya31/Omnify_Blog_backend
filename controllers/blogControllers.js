import TryCatch from '../utils/TryCatch.js'
import Errorhandler from '../utils/Errorhandler.js'
import Blog from '../models/Blog.js';
import User from '../models/User.js'

export const createBlog = TryCatch(async(req, res, next)=>{
    const {title, content} = req.body;

    if(!title || !content) return next(new Errorhandler("Please fill all the fields", 401));

    const blog = await Blog.create({
        title, 
        content, 
        user: req.user
    });

    const user = await User.findById(req.user.id);
    if(!user) return next(new Errorhandler('User Not Found', 404));
    user.blogs.push({blog: blog._id});
    await user.save();

    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        blog, 
        user
    })

})

export const getAllBlogs = TryCatch(async(req, res, next)=>{
    let {search} = req.query;
    let query = {}

    if(search){
        query.$or = [
            {title: {$regex: search, $options: "i"} },
            {content: {$regex: search, $options: "i"} },
        ]
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5
    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query).populate('user', 'name email').sort({createdAt: -1}).skip(skip).limit(limit)

    const total = await Blog.countDocuments();

    res.status(200).json({
      success: true,
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
});

export const getSingleBlog = TryCatch(async(req, res, next)=>{
    const id = req.params.id
    
    const blog = await Blog.findById(id).populate('user', 'name email')
    
    if(!blog) return next(new Errorhandler("Blog Not Found", 404));

    res.status(200).json({
        success: true,
        blog
    })
})

export const updateBlog = TryCatch(async(req, res, next)=>{
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if(!blog) return next(new Errorhandler('Blog Not Found', 404));

    if(blog.user.toString() !== req.user._id.toString()){
        return next(new Errorhandler('Unauthorized', 403));
    }

    const {title, content} = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content
    await blog.save();

    res.status(200).json({
        success: true,
        message: "Blog Updated",
        blog
    })
})

export const deleteBlog = TryCatch(async(req, res, next)=>{
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if(!blog) return next(new Errorhandler("Blog Not Found", 404));

    if(blog.user.toString() !== req.user._id.toString()){
        return next(new Errorhandler('Unauthorized', 403));
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true, 
        message: 'Blog Deleted Successfully'
    });
});

export const getMyBlogs = TryCatch(async(req, res, next)=>{
    let {search} = req.query;
    let query = {}

    if(search){
        query.$or = [
            {title: {$regex: search, $options: "i"} },
            {content: {$regex: search, $options: "i"} },
        ]
    }
    const blogs = await Blog.find({user: req.user._id, ...query}).sort({createdAt: -1})
    res.status(200).json({
        success: true, 
        message: "Fetched",
        blogs
    })
})
