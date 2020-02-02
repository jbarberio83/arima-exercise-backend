"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_1 = require("../models/car");
const paginate = require("jw-paginate");
class CarController {
    getCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = (parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
            const size = (parseInt(req.query.size)) ? parseInt(req.query.size) : 20;
            let filterDate = {};
            if (req.query.sDate && req.query.eDate) {
                filterDate = {
                    "date": {
                        "$gte": new Date(req.query.sDate),
                        "$lte": new Date(req.query.eDate)
                    }
                };
            }
            yield car_1.Car.countDocuments(filterDate, (error, totalCount) => {
                if (error) {
                    this._errorFetchingData(res);
                }
                else {
                    car_1.Car.find(filterDate, function (error, data) {
                        if (error) {
                            this._errorFetchingData(res);
                        }
                        else {
                            const pager = paginate(totalCount, page, size);
                            res.json({
                                error: false,
                                pager: pager,
                                data: data
                            });
                        }
                    }).skip(size * (page - 1)).limit(size);
                }
            });
        });
    }
    _errorFetchingData(res) {
        res.json({
            error: true,
            message: "Error fetching data"
        });
    }
}
exports.CarController = CarController;
//# sourceMappingURL=carController.js.map