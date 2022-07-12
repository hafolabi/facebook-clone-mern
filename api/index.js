const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./route/users')
const authRoute = require('./route/auth')
const postRoute = require('./route/posts')
const path = require('path')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.MONGO_URL )
    .then(()=>{
        console.log('DB Connection Successful')
    });

app.use("/images", express.static(path.join(__dirname, "/images")))


//middleware    
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

app.use('/api/users', userRoute) 
app.use('/api/auth', authRoute)
app.use("/api/posts", postRoute)  

app.listen(process.env.PORT || "3001", ()=>{
    console.log('Backend server is running')
});