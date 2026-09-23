"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviews = void 0;
const dataService_js_1 = require("../services/dataService.js");
const getReviews = async (req, res) => {
    try {
        const onlyVisible = req.query.visible === 'true';
        const reviews = await dataService_js_1.dataService.getReviews(onlyVisible);
        res.json(reviews);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getReviews = getReviews;
const createReview = async (req, res) => {
    try {
        const review = await dataService_js_1.dataService.createReview(req.body);
        res.status(201).json(review);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await dataService_js_1.dataService.updateReview(id, req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        await dataService_js_1.dataService.deleteReview(id);
        res.json({ success: true, message: 'Review deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteReview = deleteReview;
