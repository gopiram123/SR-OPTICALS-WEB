import { Request, Response } from 'express';
import { dataService } from '../services/dataService.js';

export const getShopInfo = async (req: Request, res: Response) => {
  try {
    const info = await dataService.getShopInfo();
    res.json(info);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateShopInfo = async (req: Request, res: Response) => {
  try {
    const updated = await dataService.updateShopInfo(req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
