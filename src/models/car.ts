import { Schema, model } from 'mongoose';

const CarSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    color: { type: String, required: true },
    km: { type: Number, required: true },
    vin: { type: String, required: true }
});

export const Car = model('Car', CarSchema);