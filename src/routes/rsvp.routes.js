import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getRsvps, 
    getRsvp, 
    updateRsvp, 
    createRsvp, 
    deleteRsvp
} from '../controllers/rsvp.controller.js'; 

import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRsvpSchema } from "../schemas/rsvp.schema.js";

const router = Router();

router.get('/rsvps', authRequired, getRsvps);
router.get('/rsvp/:id', authRequired, getRsvp);
router.post('/rsvps', authRequired, validateSchema(createRsvpSchema), createRsvp);
router.delete('/rsvp/:id', authRequired, deleteRsvp);
router.put('/rsvp/:id', authRequired, updateRsvp);

export default router