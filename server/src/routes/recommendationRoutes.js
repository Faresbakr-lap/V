import { Router } from 'express';
import { body } from 'express-validator';
import { getRecommendations, logBrowsingEvent } from '../controllers/recommendationController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/events', requireAuth, [body('listingId').notEmpty(), body('action').isIn(['VIEW', 'CLICK', 'FAVORITE'])], validate, logBrowsingEvent);
router.get('/', requireAuth, getRecommendations);

export default router;
