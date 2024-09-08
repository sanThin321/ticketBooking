import User from './model/userModel.js';  // Import User model

const createDefaultAdmin = async () => {
    try {
        // Check if an admin user already exists
        const adminExists = await User.findOne({ userType: 'Admin' });

        if (!adminExists) {
            // Create a default admin user
            const admin = new User({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                phoneNumber: 1234567890,
                userType: 'Admin',
                password: 'admin123'
            });
            
            // Save the admin user to the database
            await admin.save();
            console.log('Default admin user created.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating default admin:', error.message);
    }
};

export default createDefaultAdmin;