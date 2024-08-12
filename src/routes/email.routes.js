import { Router } from "express";
import { verifyToken } from '../controllers/auth.controller.js';
import { createAccessToken } from '../libs/jwt.js';
import { buildPDF } from '../services/pdfQr.service.js'
import fs from 'fs';
import path from 'path';

const router = Router();


router.get('/pdf', (req, res) => {
    const baseDir = 'src/services/';
    const filePath = path.join(baseDir, 'qrcode', 'pdfX.pdf');

    const writeStream = fs.createWriteStream(filePath);

    buildPDF(
        (data) => writeStream.write(data), 
        () => {
            writeStream.end();
            res.download(filePath, 'pdfX.pdf', (err) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al descargar el archivo',
                        error: err
                    });
                } else {
                    console.log('PDF guardado y descargado exitosamente.');
                }
            });
        }
    );
});



export default router