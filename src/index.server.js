const express = require('express');
const app = express();  //used to create app
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require("path");
const cors = require('cors');


//routes
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//mongodb connection
// mongodb+srv://root:<password>@cluster0.z75yu.mongodb.net/<dbname>?retryWrites=true&w=majority

//env variable or constants
env.config();

mongoose.connect(
    `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.z75yu.mongodb.net:27017,cluster0-shard-00-01.z75yu.mongodb.net:27017,cluster0-shard-00-02.z75yu.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-s1e8yn-shard-0&authSource=admin&retryWrites=true&w=majority`, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true         //used to create index
}
).then(()=>{
    console.log("database connected");
});


app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));

app.use('/api',authRoutes);

app.use('/api',adminAuthRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

//listen the app 
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})