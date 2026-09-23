import { Request, Response } from 'express';
import { dataService } from '../services/dataService.js';

export const getHomepageConfig = async (req: Request, res: Response) => {
  try {
    const config = await dataService.getHomepageConfig();
    res.json(config);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHomepageConfig = async (req: Request, res: Response) => {
  try {
    const updated = await dataService.updateHomepageConfig(req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
