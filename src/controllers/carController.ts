import { Request, Response } from 'express';
import { Car } from '../models/car';
import paginate =  require('jw-paginate');

export class CarController {

    public async getCars(req: Request, res: Response): Promise<void> {
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

        await Car.countDocuments(filterDate, (error, totalCount) => {
            if (error) {
                this._errorFetchingData(res);
            } else {
                Car.find(filterDate, function (error, data) {
                    if (error) {
                        this._errorFetchingData(res);
                    } else {
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
    }

    private _errorFetchingData(res) : void{
        res.json({ 
            error: true, 
            message: "Error fetching data"
        });
    }

}