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
    const { nombre, apellido, profesion, especialidad, correo, password, role } = req.body

    try {
        const userFound = await User.findOne({ correo });
        if (userFound)
            return res.status(400).json(["El correo ya está en uso"]);

        const passwordHash = await bcrypt.hash(password, 10);
       
        const newUser = new User({
            nombre,
            apellido,
            profesion,
            especialidad,
            correo,
            password: passwordHash,
            role
        });
        const userSaved = await newUser.save();

        // const qrCodeText = `${userSaved.id}`;
        // const qrCodeImage = await qrcode.toDataURL(qrCodeText); // Genera el QR como base64
        // userSaved.qrcodeImage = qrCodeImage; // Guarda el QR en base64

        // // Genera el PDF
        // const baseDir = 'src/services/';
        // const filePath = path.join(baseDir, 'qrcode', `pdf_${userSaved._id}.pdf`);

        // Directorio
        // if (!fs.existsSync(path.dirname(filePath))) {
        //     fs.mkdirSync(path.dirname(filePath), { recursive: true });
        // }

        // const writeStream = fs.createWriteStream(filePath);

        // await new Promise((resolve, reject) => {
        //     buildPDF(userSaved, qrCodeImage, 
        //         (data) => writeStream.write(data), 
        //         async () => {
        //             writeStream.end();
        //             resolve(); 
        //         }
        //     );
        // });

        // Envía el correo de confirmación con el PDF adjunto
        await sendConfirmationEmail(userSaved);


        // Crea el token y envía la respuesta al cliente
        const token = await createAccessToken({ id: userSaved._id, role: userSaved.role });
        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            apellido: userSaved.apellido,
            profesion: userSaved.profesion,
            especialidad: userSaved.especialidad,
            correo: userSaved.correo,
            role: userSaved.role,
            token: token, // token
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {

    const { correo, password } = req.body

    try {
        const userFound = await User.findOne({ correo })

        if (!userFound) return res.status(400).json({ message: "No encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = await createAccessToken({ id: userFound._id, role: userFound.role });
        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            especialidad: userFound.especialidad,
            correo: userFound.correo,
            role: userFound.role,
            token: token, // token
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
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
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        profesion: userFound.profesion,
        especialidad: userFound.especialidad,
        correo: userFound.correo,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}

export const verifyToken = async (req, res) => {
    console.info(req.headers);
    const { token } = req.headers;
    if (!token) return res.status(401).json({ message: "No autorizado no tok" });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' });
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No autorizado' });
        return res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            profesion: userFound.profesion,
            especialidad: userFound.especialidad,
            correo: userFound.correo
        });
    })
}