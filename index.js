import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {errorMiddleware} from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js';

// routes import 
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

//database connection
const mongoUri = process.env.MONGO_URI || ""
connectDB(mongoUri)

app.get('/', (req, res)=>{
    res.send("Server is running fine");
});

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
