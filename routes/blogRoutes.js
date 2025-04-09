import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlog, updateBlog } from '../controllers/blogControllers.js';
import {authenticateUser, authorizeRoles} from '../middlewares/authmiddleware.js'

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/create', authenticateUser, createBlog);
router.get('/my-blogs', authenticateUser, getMyBlogs)
router.get('/:id', getSingleBlog)
router.put('/:id', authenticateUser, updateBlog);
router.delete('/:id', authenticateUser, deleteBlog);

export default router;