import { Resend } from 'resend';
import { apikey } from '../config.js';
import fs from 'fs';

const resend = new Resend(apikey);

export const sendConfirmationEmail = async (user, filePath) => {
    try {
        // Leer el archivo PDF en formato de buffer
        // const fileBuffer = fs.readFileSync(filePath);

        await resend.emails.send({
            from: 'contacto@accesos.site',
            to: user.email,
            subject: 'Confirmación de Registro',
            html: `
                <p>Hola ${user.username},</p>
                <p>Gracias por registrarte.</p>>`,
        });

        console.log('Correo enviado con PDF adjunto');
    } catch (error) {
        console.error('Error enviando el correo de confirmación:', error);
        throw error;
    }
};
