const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('dotenv');


//routes
const authRoutes = require('./routes/auth');

//mongodb connection
// mongodb+srv://root:<password>@cluster0.z75yu.mongodb.net/<dbname>?retryWrites=true&w=majority
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.z75yu.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}
).then(()=>{
    console.log("database connected");
});

app.use(bodyParser());
app.use('/api',authRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})