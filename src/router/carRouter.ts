import { Router } from 'express';
import * as carController from "../controllers/carController";

class CarRouter {

    public router: Router;
    private carService: carController.CarController;

    constructor() {
        this.carService = new carController.CarController();
        this.router = Router();
        this._routes();
    }

    private _routes() {
        this.router.get('/', this.carService.getCars);
    }

}

const carRouter = new CarRouter();
export default carRouter.router;