import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.'});
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user =  decoded;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: ' Invalid token.'});
    }
}