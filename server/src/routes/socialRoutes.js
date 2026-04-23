import { Router } from 'express';
import { body } from 'express-validator';
import { createReview, getConversations, getFavorites, sendMessage, toggleFavorite } from '../controllers/socialController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/favorites', requireAuth, getFavorites);
router.post('/favorites/toggle', requireAuth, [body('listingId').notEmpty()], validate, toggleFavorite);
router.get('/messages', requireAuth, getConversations);
router.post('/messages', requireAuth, [body('receiverId').notEmpty(), body('content').isLength({ min: 1 })], validate, sendMessage);
router.post('/reviews', requireAuth, [body('rating').isInt({ min: 1, max: 5 }), body('listingId').notEmpty(), body('sellerId').notEmpty()], validate, createReview);

export default router;
