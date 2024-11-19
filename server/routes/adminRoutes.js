import express from "express";
import { deleteUser, getalluser } from "../controller/userController.js";
const router = express.Router();

router.get("/",getalluser)
router.delete("/deleteUser/:userId",deleteUser)

export default router;