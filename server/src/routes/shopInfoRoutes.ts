import { Router } from 'express';
import { getShopInfo, updateShopInfo } from '../controllers/shopInfoController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getShopInfo);
router.put('/', requireAdminAuth, updateShopInfo);

export default router;
