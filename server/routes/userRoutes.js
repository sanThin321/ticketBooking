// routes/authRoutes.js
import express from 'express';
import { signup, login, forgotPassword, verifyCode, resetPassword } from '../controller/userController.js';
import { addRoute, deleteMember, 
        deleteRoute, getAllMember, 
        getAllRoutes, register, 
        updateMember, updateRoute } 
        from '../controller/agencyController.js';

const router = express.Router();

// Sign-up and Login
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyCode',verifyCode);
router.post('/resetPassword', resetPassword);

//Add routes, get all routes, update and delete//agency
router.post('/addroute', addRoute);
router.get('/routes/:id', getAllRoutes);
router.put('/updateroute/:id', updateRoute);
router.delete('/deleteroute/:id', deleteRoute);

//Register member, get all members, update and delete member
router.post('/register', register);
router.get('/members', getAllMember);
router.put('/updatemember/:id', updateMember);
router.delete('/deletemember/:id', deleteMember);


export default router;
