import User from '../models/user.model.js';
import qrcode from "qrcode";
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { sendConfirmationEmail } from '../services/email.service.js';
import { buildPDF } from '../services/pdfQr.service.js';
import fs from 'fs';
import path from 'path';
export const register = async (req, res) => {
    const { email, password, username, role = 'user' } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json(["El correo ya está en uso"]);

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
        });
        const userSaved = await newUser.save();
        const qrCodeText = `${userSaved.id}`;
        const qrCodeImage = await qrcode.toDataURL(qrCodeText); // Genera el QR como base64
        userSaved.qrcodeImage = qrCodeImage; // Guarda el QR en base64

        // Genera el PDF
        const baseDir = 'src/services/';
        const filePath = path.join(baseDir, 'qrcode', `pdf_${userSaved._id}.pdf`);

        // Asegúrate de que el directorio existe
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        const writeStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
            buildPDF(userSaved, qrCodeImage, 
                (data) => writeStream.write(data), 
                async () => {
                    writeStream.end();
                    resolve(); // Resuelve la promesa cuando el PDF se completa
                }
            );
        });

        // Envía el correo de confirmación con el PDF adjunto
        await sendConfirmationEmail(userSaved, filePath);

        // Ahora crea el token y envía la respuesta al cliente
        const token = await createAccessToken({ id: userSaved._id, role: userSaved.role });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email })

        if (!userFound) return res.status(400).json({ message: "No encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = await createAccessToken({ id: userFound._id, role: userFound.role });
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "No autorizado no tok" });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' });
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No autorizado' });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            roll: userFound.role
        });
    })
}