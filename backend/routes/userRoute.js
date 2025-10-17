import express from 'express'
import { updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id',verifyToken,deletUser)
export default router