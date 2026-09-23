"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShopInfo = exports.getShopInfo = void 0;
const dataService_js_1 = require("../services/dataService.js");
const getShopInfo = async (req, res) => {
    try {
        const info = await dataService_js_1.dataService.getShopInfo();
        res.json(info);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getShopInfo = getShopInfo;
const updateShopInfo = async (req, res) => {
    try {
        const updated = await dataService_js_1.dataService.updateShopInfo(req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateShopInfo = updateShopInfo;
