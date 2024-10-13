// routes/authRoutes.js
import express from "express";
import {
  signup,
  login,
  forgotPassword,
  verifyCode,
  resetPassword,
  logout,
  checkLogin
} from "../controller/userController.js";
import { authenticateJWT } from "../Middleware/checkToken.js";
import { roleBasedRedirect } from "../Middleware/Redriect.js";
import { validateDriver } from "../Middleware/vaildateItsfromagency.js";
import {
  registerMember,
  getAllMembers,
  updateMember,
  deleteMember,
} from "../controller/memberController.js";
import { registerBus } from "../controller/busController.js";

const router = express.Router();

// Sign-up and Login
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-login", checkLogin);
router.get("/redirect", authenticateJWT, roleBasedRedirect);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyCode", verifyCode);
router.post("/resetPassword", resetPassword);

//Agency member
router.post("/registermember", registerMember);
router.get("/members/agency/:agencyId", getAllMembers);
router.put("/updatemember/:memberId", updateMember);
router.delete("/deletemember/:memberId", deleteMember);

//Agency Bus
router.post("/registerbus", validateDriver, registerBus);
export default router;
