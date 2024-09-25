import jwt from 'jsonwebtoken';

export const roleBasedRedirect = (req, res, next) => {
    // Extract the token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    try {
        // Verify the JWT token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get the user's role from the decoded payload
        const userRole = decoded.user.role;

        // Role-based redirection
        switch (userRole) {
            case 'Admin':
                return res.redirect('/admin-dashboard'); // Change to your admin route
            case 'Customer':
                return res.redirect('/customer-dashboard'); // Change to your customer route
            case 'Agency':
                return res.redirect('/agency-dashboard'); // Change to your agency route
            case 'Ticket Agent':
                return res.redirect('/ticket-agent-dashboard'); // Change to your ticket agent route
            default:
                return res.status(403).json({ message: 'Unauthorized role' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token, authorization denied.' });
    }
};