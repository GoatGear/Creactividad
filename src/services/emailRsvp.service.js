import { Resend } from 'resend';
import { apikey } from '../config.js';


const resend = new Resend(apikey);

export const sendRsvpEmail = async (user) => {
    try {
        await resend.emails.send({
            from: 'contacto@accesos.site',
            to: user.correo,
            subject: 'Confirmación de Reservación',
            html: `
            <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Reservación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #0073e6;
            color: #ffffff;
            font-size: 24px;
        }
        .content {
            margin: 20px 0;
            line-height: 1.6;
        }
        .content p {
            margin: 10px 0;
        }
        .content img {
            width: 100%;
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 14px;
            color: #777777;
            border-top: 1px solid #dddddd;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ¡Reservación Confirmada!
        </div>
        <div class="content">
            <p>Hola <strong>${user.profesion} ${user.nombre} ${user.apellido}</strong>,</p>
            <p>Su reservación para el <strong>Curso Internacional de Arritmias y Marcapasos, Monterrey</strong> ha sido confirmada correctamente. Este evento se realizará el <strong>23, 24 y 25 de Septiembre</strong> en el <strong>Show Center Airó, N.L.</strong></p>
            <img src="cid:Volante.png" alt="Volante del Evento">
            <p>¡Lo esperamos!</p>
        </div>
        <div class="footer">
            &copy; 2024. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>

            `
        });
        console.log('Correo enviado');
    } catch (error) {
        console.error('Error enviando el correo de confirmación:', error);
        throw error;
    }
};
