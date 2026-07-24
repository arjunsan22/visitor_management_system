import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import visitorRoutes from './routes/visitorRoutes.js'

const app = express();

//cors 
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true,
    })
)


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/visitors", visitorRoutes);
//testing

app.get('/',(req,res)=>{
    res.json({
        sucess:true,
        message:"visitor management system api running "
    })
})

//server error   checking
app.use(errorMiddleware);

export default app;