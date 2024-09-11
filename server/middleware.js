import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user info to request object
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token is not valid' });
    }
};

