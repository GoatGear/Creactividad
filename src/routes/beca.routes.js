import { Router } from "express";
import { crearBeca, validateBeca } from '../controllers/beca.controller.js'; 

const router = Router();

router.post('/nuevasBecas', crearBeca);
router.post('/validatebeca', validateBeca);

export default router