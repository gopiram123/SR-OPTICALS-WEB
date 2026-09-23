"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shopInfoController_js_1 = require("../controllers/shopInfoController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = (0, express_1.Router)();
router.get('/', shopInfoController_js_1.getShopInfo);
router.put('/', authMiddleware_js_1.requireAdminAuth, shopInfoController_js_1.updateShopInfo);
exports.default = router;
