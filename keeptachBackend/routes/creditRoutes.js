import express from 'express';
import { applyForCredit, getCreditDetails } from '../controllers/creditController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, applyForCredit);
router.get('/:creditId', authenticate, getCreditDetails);

export default router;