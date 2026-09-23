"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomepageConfig = exports.getHomepageConfig = void 0;
const dataService_js_1 = require("../services/dataService.js");
const getHomepageConfig = async (req, res) => {
    try {
        const config = await dataService_js_1.dataService.getHomepageConfig();
        res.json(config);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getHomepageConfig = getHomepageConfig;
const updateHomepageConfig = async (req, res) => {
    try {
        const updated = await dataService_js_1.dataService.updateHomepageConfig(req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateHomepageConfig = updateHomepageConfig;
