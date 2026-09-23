import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import shopInfoRoutes from './routes/shopInfoRoutes.js';
import homepageRoutes from './routes/homepageRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import storePhotosRoutes from './routes/storePhotosRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/shop-info', shopInfoRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/store-photos', storePhotosRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'SR OPTICALS',
    timestamp: new Date().toISOString()
  });
});

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`👓 SR OPTICALS API Server running on port ${PORT}`);
  console.log(`🌐 Health check endpoint: http://localhost:${PORT}/api/health`);
});

export default app;
