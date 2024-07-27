import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido'
    }),
    email: z.string({
        required_error: 'Correo requerido'
    }).email({
        message: 'Correo no válido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6, { message: "Contraseña de al menos 6 caracteres" }),
    role: z.string().optional() 
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Correo requerido",
    }).email({
        message: "Correo no valido",
    }),
    password: z.string({
        required_error: "Contraseña requerida",
    }).min(6, {
        message: "Contraseña de al menos 6 caracteres",
    }),
    role: z.string().optional()
})