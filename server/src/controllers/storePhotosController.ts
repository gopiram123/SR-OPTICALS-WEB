import { Request, Response } from 'express';
import { dataService } from '../services/dataService.js';

export const getStorePhotos = async (req: Request, res: Response) => {
  try {
    const photos = await dataService.getStorePhotos();
    res.json(photos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addStorePhoto = async (req: Request, res: Response) => {
  try {
    const photo = await dataService.addStorePhoto(req.body);
    res.status(201).json(photo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStorePhoto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await dataService.deleteStorePhoto(id);
    res.json({ success: true, message: 'Store photo deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
