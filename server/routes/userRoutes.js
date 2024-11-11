// import { getAllSchedules } from "../controller/routeandschedule.js";
import express from "express";
import {
  signup,
  login,
  forgotPassword,
  verifyCode,
  resetPassword,
  feedback,
} from "../controller/userController.js";
import { authenticateJWT } from "../Middleware/checkToken.js";
import { roleBasedRedirect } from "../Middleware/Redriect.js";
import { getUserProfile, updateEmail, updateNames, updatePassword, updatePhone } from "../controller/accountController.js";

const router = express.Router();

// Sign-up and Login
router.post("/signup", signup);
router.post("/login", login);
router.get("/redirect", authenticateJWT, roleBasedRedirect);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyCode", verifyCode);
router.post("/resetPassword/:userId", resetPassword);
router.get("/profile/:userId", getUserProfile)
router.put('/update-names/:userId', updateNames);
router.put('/update-email/:userId', updateEmail);
router.put('/update-phone/:userId', updatePhone);
router.put('/update-password/:userId', updatePassword);
router.post('/',feedback)
export default router;

