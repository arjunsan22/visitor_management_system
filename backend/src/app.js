import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import visitorRoutes from './routes/visitorRoutes.js'
import adminRoutes from "./routes/adminRoutes.js";
import securityRoutes from "./routes/securityRoutes.js";
const app = express();

//cors 
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true,
    })
)


import path from 'path';

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}, express.static(path.join(process.cwd(), 'uploads')));

//routes
app.use("/api/auth",authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/security",securityRoutes);
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