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
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido</title>
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
                    ¡Bienvenido!
                </div>
                <div class="content">
                    <p>Hola <strong>${user.profesion} ${user.nombre} ${user.apellido}</strong>,</p>
                    <p>Se ha registrado exitosamente al <strong>Curso Internacional de Arritmias y Marcapasos, Monterrey</strong> que se realizará el <strong>23, 24 y 25 de Septiembre</strong> en el <strong>Show Center Airó, N.L.</strong></p>
                    <p>Recuerda realizar tu pago correspondiente el día del evento en la recepción.</strong></p>
        
                    <!-- Tabla de costos del evento -->
                    <table class="cost-table" style="width: 100%; margin-bottom: 20px; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr>
                                <th style="border-bottom: 2px solid #ddd; padding: 10px;">Categoría</th>
                                <th style="border-bottom: 2px solid #ddd; padding: 10px;">Costo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border-bottom: 1px solid #ddd; padding: 10px;">Especialistas</td>
                                <td style="border-bottom: 1px solid #ddd; padding: 10px;">$2,000.00</td>
                            </tr>
                            <tr>
                                <td style="border-bottom: 1px solid #ddd; padding: 10px;">Residentes</td>
                                <td style="border-bottom: 1px solid #ddd; padding: 10px;">$1,000.00</td>
                            </tr>
                            <tr>
                                <td style="border-bottom: 1px solid #ddd; padding: 10px;">Enfermería</td>
                                <td style="border-bottom: 1px solid #ddd; padding: 10px;">$500.00</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <!-- Imagen de Bienvenida -->
                    <img src="https://raw.githubusercontent.com/GoatGear/FrontendCreactividad/main/public/someec.png" alt="Imagen de Bienvenida" style="width: 100%; max-width: 600px; margin: 0 auto; display: block;">
        
                    <p></p>
                    <p>¡Lo esperamos!</p>
                </div>
                <div class="footer">
                    &copy; 2024.
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
