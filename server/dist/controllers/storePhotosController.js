"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStorePhoto = exports.addStorePhoto = exports.getStorePhotos = void 0;
const dataService_js_1 = require("../services/dataService.js");
const getStorePhotos = async (req, res) => {
    try {
        const photos = await dataService_js_1.dataService.getStorePhotos();
        res.json(photos);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getStorePhotos = getStorePhotos;
const addStorePhoto = async (req, res) => {
    try {
        const photo = await dataService_js_1.dataService.addStorePhoto(req.body);
        res.status(201).json(photo);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.addStorePhoto = addStorePhoto;
const deleteStorePhoto = async (req, res) => {
    try {
        const id = req.params.id;
        await dataService_js_1.dataService.deleteStorePhoto(id);
        res.json({ success: true, message: 'Store photo deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteStorePhoto = deleteStorePhoto;
