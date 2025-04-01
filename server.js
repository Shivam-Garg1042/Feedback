import express from "express";

//to import dotenv dependency
import dotenv from "dotenv";
dotenv.config();

//Importing connectDB to connect to the database
import connectDB from "./config/database.js";

import cors from "cors";
// import authRegister from "./routes/auth.register.js";
// import authLogin from "./routes/auth.login.js";
// import authRole from "./routes/auth.role.js";

// Import the survey routes
import surveyRoutes from "./routes/survey.routes.js";

//app has all the functionality of express
const app = express();

//This imported function connect to the mongoDB
connectDB();

// app.use(cors({
//     origin: 'localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
app.use(cors({
    origin: 'https://feedback-1pwh.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line


// app.use('/api/auth',authRegister);
// app.use('/api/auth',authLogin);
// app.use('/api/auth',authRole);

// Use the survey routes
app.use('/api/survey', surveyRoutes);

// to get the server
app.get('/',(req,res)=>{
    res.send("ready");
})

// listen to a local port in the system
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is Ready at port ${port}!!`);
});