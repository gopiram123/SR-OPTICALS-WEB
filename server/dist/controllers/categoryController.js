"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const dataService_js_1 = require("../services/dataService.js");
const getCategories = async (req, res) => {
    try {
        const categories = await dataService_js_1.dataService.getCategories();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const category = await dataService_js_1.dataService.createCategory(req.body);
        res.status(201).json(category);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await dataService_js_1.dataService.updateCategory(id, req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await dataService_js_1.dataService.deleteCategory(id);
        res.json({ success: true, message: 'Category deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteCategory = deleteCategory;
