"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const categoryRoutes_js_1 = __importDefault(require("./routes/categoryRoutes.js"));
const shopInfoRoutes_js_1 = __importDefault(require("./routes/shopInfoRoutes.js"));
const homepageRoutes_js_1 = __importDefault(require("./routes/homepageRoutes.js"));
const reviewRoutes_js_1 = __importDefault(require("./routes/reviewRoutes.js"));
const storePhotosRoutes_js_1 = __importDefault(require("./routes/storePhotosRoutes.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// API Routes
app.use('/api/products', productRoutes_js_1.default);
app.use('/api/categories', categoryRoutes_js_1.default);
app.use('/api/shop-info', shopInfoRoutes_js_1.default);
app.use('/api/homepage', homepageRoutes_js_1.default);
app.use('/api/reviews', reviewRoutes_js_1.default);
app.use('/api/store-photos', storePhotosRoutes_js_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        brand: 'SR OPTICALS',
        timestamp: new Date().toISOString()
    });
});
// Centralized error handling
app.use(errorHandler_js_1.errorHandler);
app.listen(PORT, () => {
    console.log(`👓 SR OPTICALS API Server running on port ${PORT}`);
    console.log(`🌐 Health check endpoint: http://localhost:${PORT}/api/health`);
});
exports.default = app;
