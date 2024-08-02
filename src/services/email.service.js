import { Resend } from 'resend';
import { apikey } from '../config.js';


const resend = new Resend(apikey);

export const sendConfirmationEmail = async (user) => {
    const message = {
        from: 'contacto@accesos.site', 
        to: user.email,
        subject: 'Confirmación de Registro',
        text: `Hola ${user.username},\n\nGracias por registrarte.`,
    };

    try {
        await resend.emails.send(message);
    } catch (error) {
        console.error('Error enviando el correo de confirmación:', error);
        throw error;
    }
};

