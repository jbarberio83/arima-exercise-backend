"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CarSchema = new mongoose_1.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    color: { type: String, required: true },
    km: { type: Number, required: true },
    vin: { type: String, required: true }
});
exports.Car = mongoose_1.model('Car', CarSchema);
//# sourceMappingURL=car.js.map