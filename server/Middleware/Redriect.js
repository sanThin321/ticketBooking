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
        const userId=decoded.user.id;
        const memberrole=decoded.member.role;
        const memberId=decoded.member.id;
        if(memberrole){
            return res.redirect(`/ticket-agent-dashboard/${memberId}`);
        }else{
            switch (userRole) {
                case 'Admin':
                    return res.redirect(`/admin-dashboard/${userId}`); // Change to your admin route
                case 'Customer':
                    return res.redirect(`/customer-dashboard/${userId}`); // Change to your customer route
                case 'Agency':
                    return res.redirect(`/agency-dashboard/${userId}`); // Change to your agency route
                default:
                    return res.status(403).json({ message: 'Unauthorized role' });
            }
        } 
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token, authorization denied.' });
    }
};