import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import CarRouter from './router/carRouter';


class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this._setConfig();
        this._setMongoConfig();
        this._setRoutes();
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Listening on port', this.app.get('port'));
        })
    }

    private _setConfig(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    private _setMongoConfig(): void {
        const MONGODB_URL = 'mongodb+srv://arima:arimaexercise@cluster0-q5d2d.mongodb.net/arimaexercisedb?retryWrites=true&w=majority';
        //const MONGODB_URL = 'mongodb://localhost:27017/arimaexercisedb';
        mongoose.set('useFindAndModify', true)
        mongoose.connect(MONGODB_URL || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(db => console.log("Arima exercice database connected!"))
    }

    private _setRoutes(): void {
        const router: express.Router = express.Router();
        this.app.use('/api/cars', CarRouter);
    }

}

const server = new Server();
server.start();