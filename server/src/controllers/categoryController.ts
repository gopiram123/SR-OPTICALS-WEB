import { Request, Response } from 'express';
import { dataService } from '../services/dataService.js';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await dataService.getCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await dataService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updated = await dataService.updateCategory(id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await dataService.deleteCategory(id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
