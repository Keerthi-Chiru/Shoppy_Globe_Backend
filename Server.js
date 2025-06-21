import express, { json } from 'express';
import mongoose from 'mongoose';
import { routes } from './Routes/routes.js';

// Initialize Express app
const app = new express(); // You can also just write: const app = express();

// Start the server on port 7000
app.listen(7000, () => {
    console.log("Server started on port: 7000");
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
    dbName: 'Shoppy_Globe',
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Access the default database connection
const db = mongoose.connection;

// Log when DB connection is successful
db.on("open", () => {
    console.log("Database connection successful");
});

// Log when there is a DB connection error
db.on("error", (err) => {
    console.error("Database connection error:", err);
});

// Register all routes from the routes module
routes(app);

// Default route for testing
app.get("/", (req, res) => {
    res.send("API is working perfectly");
});
