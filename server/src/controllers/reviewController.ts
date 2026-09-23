import { Request, Response } from 'express';
import { dataService } from '../services/dataService.js';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const onlyVisible = req.query.visible === 'true';
    const reviews = await dataService.getReviews(onlyVisible);
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await dataService.createReview(req.body);
    res.status(201).json(review);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updated = await dataService.updateReview(id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await dataService.deleteReview(id);
    res.json({ success: true, message: 'Review deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
