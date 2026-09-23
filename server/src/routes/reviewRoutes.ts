import { Router } from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getReviews);
router.post('/', requireAdminAuth, createReview);
router.put('/:id', requireAdminAuth, updateReview);
router.delete('/:id', requireAdminAuth, deleteReview);

export default router;
