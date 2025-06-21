import express, { json } from 'express';
import mongoose from 'mongoose';
import { routes } from './Routes/routes.js';



const app = new express();

app.listen(7000, ()=>{
    console.log("Server started on port: 7000");
});

mongoose.connect("mongodb://localhost:27017",{
    dbName: 'Shoppy_Globe',
});

app.use(express.json());

const db = mongoose.connection;


db.on("open", () => {
    console.log("Database connection successful");
});

db.on("error", () => {
    console.log("Database connection successful");
});

routes(app);

app.get("/", (req, res)=>{
    res.send("API is working perfectly");
});



