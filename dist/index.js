"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_validator_1 = require("class-transformer-validator");
var isProd = process.env.NODE_ENV === 'production';
function makeValidateBody(c, whitelist, errorHandler) {
    if (whitelist === void 0) { whitelist = true; }
    return function ExpressClassValidate(req, res, next) {
        var toValidate = req.body;
        if (!toValidate) {
            if (errorHandler) {
                errorHandler({ type: 'no-body' }, req, res, next);
            }
            else {
                res.status(400).json(__assign({ error: true, message: 'Validation failed' }, (isProd
                    ? {}
                    : { originalError: { message: 'No request body found' } })));
            }
        }
        else {
            class_transformer_validator_1.transformAndValidate(c, toValidate, { validator: { whitelist: whitelist } })
                .then(function (transformed) {
                req.body = transformed;
                next();
            })
                .catch(function (err) {
                if (errorHandler) {
                    errorHandler(err, req, res, next);
                }
                else {
                    res.status(400).json(__assign({ error: true, message: 'Validation failed' }, (isProd
                        ? {}
                        : { originalError: err })));
                }
            });
        }
    };
}
exports.makeValidateBody = makeValidateBody;
