import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../model/userModel.js'; // Adjust path to your User model

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD);

const connectToDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection successful');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1); // Exit process with failure code
  }
};

const hashExistingPasswords = async () => {
  try {
    // Find all users
    const users = await User.find();

    for (const user of users) {
      console.log(`Current password for ${user.email}: ${user.password}`); // Debugging line to log passwords

      // Check if password is already hashed (bcrypt hashes are 60 characters long and start with $2a$ or $2b$)
      if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$') && user.password.length < 60) {
        console.log(`Hashing password for user: ${user.email}`);

        // Hash the plain-text password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Update user password with hashed password
        user.password = hashedPassword;
        await user.save();
        console.log(`Password updated for user: ${user.email}`);
      } else {
        console.log(`Password already hashed for user: ${user.email}`);
      }
    }

    console.log('Finished processing all users.');
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    mongoose.disconnect(); // Ensure disconnection in all cases
  }
};

const main = async () => {
  await connectToDB();
  await hashExistingPasswords();
};

main();
