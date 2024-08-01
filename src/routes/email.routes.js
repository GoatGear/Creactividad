import { Router } from "express";
import { verifyToken } from '../controllers/auth.controller.js';
import { createAccessToken } from '../libs/jwt.js';

const router = Router();

router.post('/email', verifyToken, async (req, res) => {
    try {
        const token = await createAccessToken({ id: req.user.id, role: req.user.role });
        res.cookie('token', token);
        res.json({ message: 'Token generado y almacenado en cookies', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router