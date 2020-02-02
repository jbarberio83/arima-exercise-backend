"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carController = require("../controllers/carController");
class CarRouter {
    constructor() {
        this.carService = new carController.CarController();
        this.router = express_1.Router();
        this._routes();
    }
    _routes() {
        this.router.get('/', this.carService.getCars);
    }
}
const carRouter = new CarRouter();
exports.default = carRouter.router;
//# sourceMappingURL=carRouter.js.map