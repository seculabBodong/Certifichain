import express from "express";
import { deleteProof, createProof, getProofById } from "../controllers/Proof.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/proof/:id', verifyUser, getProofById);
router.post('/proof/', verifyUser, createProof);
router.delete('/proof/:id', verifyUser, deleteProof);

export default router;

