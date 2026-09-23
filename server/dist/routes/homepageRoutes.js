"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepageController_js_1 = require("../controllers/homepageController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = (0, express_1.Router)();
router.get('/', homepageController_js_1.getHomepageConfig);
router.put('/', authMiddleware_js_1.requireAdminAuth, homepageController_js_1.updateHomepageConfig);
exports.default = router;
