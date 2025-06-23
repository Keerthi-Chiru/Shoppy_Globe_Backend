import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



// Middleware to authenticate requests using JWT
export function authMiddleware(req, res, next) {
    // Retrieve the token from the request headers
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.headers['authorization'];

    // If no token is provided, deny access
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach decoded token data to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return an error
        return res.status(400).json({ message: ' Invalid token.' });
    }
}
