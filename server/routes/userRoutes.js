// routes/authRoutes.js
import express from 'express';
import { signup, login, forgotPassword, verifyCode, resetPassword } from '../controller/userController.js';

const router = express.Router();

// Sign-up and Login
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyCode',verifyCode);
router.post('/resetPassword', resetPassword);

//Add routes, get all routes, update and delete//agency
// router.post('/addroute',authenticateJWT, addRoute);


export default router;
