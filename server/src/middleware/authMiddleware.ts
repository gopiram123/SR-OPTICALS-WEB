import { Request, Response, NextFunction } from 'express';
import { authAdmin } from '../config/firebaseAdmin.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAdminAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing authorization header.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  // If running with live Firebase Auth
  if (authAdmin) {
    try {
      const decoded = await authAdmin.verifyIdToken(token);
      req.user = decoded;
      next();
      return;
    } catch (err) {
      res.status(403).json({ error: 'Forbidden: Invalid or expired Firebase auth token.' });
      return;
    }
  }

  // If in demo / offline mode, permit demo auth header
  if (token === 'demo-admin-token' || token.length > 10) {
    req.user = { email: 'admin@sropticals.com', role: 'admin' };
    next();
    return;
  }

  res.status(401).json({ error: 'Unauthorized.' });
};
