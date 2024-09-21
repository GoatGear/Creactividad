import { Router } from 'express';
import { getUsers, registerUser, deleteUser, createRsvpAdmin } from '../controllers/admin.controller.js';

const router = Router();

router.get('/users', getUsers);
router.post('/createuser', registerUser);
router.delete('/deleteuser/:id', deleteUser);
router.post('/rsvpadmin', createRsvpAdmin);

export default router