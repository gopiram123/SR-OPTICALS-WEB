"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const dataService_js_1 = require("../services/dataService.js");
const getProducts = async (req, res) => {
    try {
        const products = await dataService_js_1.dataService.getProducts();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await dataService_js_1.dataService.getProductById(id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const newProduct = await dataService_js_1.dataService.createProduct(req.body);
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await dataService_js_1.dataService.updateProduct(id, req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await dataService_js_1.dataService.deleteProduct(id);
        res.json({ success: true, message: 'Product deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProduct = deleteProduct;
