import { Resend } from 'resend';
import { apikey } from '../config.js';

const resend = new Resend(apikey);

export const sendConfirmationEmail = async (user) => {
    try {
        await resend.emails.send({
            from: 'contacto@accesos.site',
            to: user.correo,
            subject: 'Confirmación de Registro',
            html: `
                <p>Bienvenido ${user.profesion} ${user.nombre} ${user.apellido},</p>
                <p>Gracias por registrarse.</p>
                <img src="https://raw.githubusercontent.com/GoatGear/FrontendSomeec/main/public/someec.png?token=GHSAT0AAAAAACTAJJKMELVI47MANRW7KUUUZWOAXGQ" alt="Imagen de Bienvenida" style="width:100%; max-width:600px;">
                `
        });
        console.log('Correo enviado');
    } catch (error) {
        console.error('Error enviando el correo de confirmación:', error);
        throw error;
    }
};
