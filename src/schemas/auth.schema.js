import { z } from "zod";

export const registerSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre de usuario requerido'
    }),
    apellido: z.string({
        required_error: 'Apellido de usuario requerido'
    }),
    profesion: z.string({
        required_error: 'Profesion de usuario requerido'
    }),
    especialidad: z.string({
        required_error: 'Especialidad de usuario requerido'
    }),
    correo: z.string({
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
    correo: z.string({
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