"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Server Error:', err);
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'An internal server error occurred.',
        status
    });
};
exports.errorHandler = errorHandler;
