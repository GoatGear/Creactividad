import { z } from "zod";

export const createRsvpSchema = z.object({
    title: z.string({
        required_error: 'Titulo requerido'
    }),
    description: z.string({
        required_error : 'Descripcion demasiado corta'
    }),
    date: z.string().datetime().optional(),
});