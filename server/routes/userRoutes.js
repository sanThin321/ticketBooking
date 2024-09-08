// routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controller/userController.js';

const router = express.Router();

// Sign-up Route
router.post('/signup', signup);
router.post('/login', login);

export default router;
