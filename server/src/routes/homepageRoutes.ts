import { Router } from 'express';
import { getHomepageConfig, updateHomepageConfig } from '../controllers/homepageController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getHomepageConfig);
router.put('/', requireAdminAuth, updateHomepageConfig);

export default router;
