import { z } from "zod";

export const createRsvpSchema = z.object({
    reservacion: z.string({
        required_error: 'Confirmación requerida'
    })
});