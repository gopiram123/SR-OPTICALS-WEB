import { Router } from 'express';
import {
  getStorePhotos,
  addStorePhoto,
  deleteStorePhoto
} from '../controllers/storePhotosController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getStorePhotos);
router.post('/', requireAdminAuth, addStorePhoto);
router.delete('/:id', requireAdminAuth, deleteStorePhoto);

export default router;
