import { Router } from 'express';
import { body } from 'express-validator';
import {
  createListing,
  deleteListing,
  getFeaturedListings,
  getListingById,
  getListings,
  updateListing,
} from '../controllers/listingController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', getListings);
router.get('/featured', getFeaturedListings);
router.get('/:id', getListingById);

router.post(
  '/',
  requireAuth,
  requireRole('SELLER', 'ADMIN'),
  [body('name').notEmpty(), body('price').isNumeric(), body('category').notEmpty(), body('audienceCountry').notEmpty()],
  validate,
  createListing,
);
router.patch('/:id', requireAuth, requireRole('SELLER', 'ADMIN'), updateListing);
router.delete('/:id', requireAuth, requireRole('SELLER', 'ADMIN', 'ADMIN'), deleteListing);

export default router;
