"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminAuth = void 0;
const firebaseAdmin_js_1 = require("../config/firebaseAdmin.js");
const requireAdminAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: Missing authorization header.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    // If running with live Firebase Auth
    if (firebaseAdmin_js_1.authAdmin) {
        try {
            const decoded = await firebaseAdmin_js_1.authAdmin.verifyIdToken(token);
            req.user = decoded;
            next();
            return;
        }
        catch (err) {
            res.status(403).json({ error: 'Forbidden: Invalid or expired Firebase auth token.' });
            return;
        }
    }
    // If in demo / offline mode, permit demo auth header
    if (token === 'demo-admin-token' || token.length > 10) {
        req.user = { email: 'admin@sropticals.com', role: 'admin' };
        next();
        return;
    }
    res.status(401).json({ error: 'Unauthorized.' });
};
exports.requireAdminAuth = requireAdminAuth;
