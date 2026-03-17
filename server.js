const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 7070;
const sequelize = require('./database/database');
const productRouter = require('./routes/productRouter')

const app = express();

app.use(express.json());

app.use(productRouter);

const DB = async () => {
    try {
        await sequelize.authenticate();
        console.log ('Database connected successfully')
    } catch (error) {
        console.log('Error connecting to databse ', error.message); 
    }
}

DB();

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});