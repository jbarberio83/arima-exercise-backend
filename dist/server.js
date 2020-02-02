"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const carRouter_1 = require("./router/carRouter");
class Server {
    constructor() {
        this.app = express();
        this._setConfig();
        this._setMongoConfig();
        this._setRoutes();
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Listening on port', this.app.get('port'));
        });
    }
    _setConfig() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }
    _setMongoConfig() {
        const MONGODB_URL = 'mongodb+srv://arima:arimaexercise@cluster0-q5d2d.mongodb.net/arimaexercisedb?retryWrites=true&w=majority';
        //const MONGODB_URL = 'mongodb://localhost:27017/arimaexercisedb';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGODB_URL || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(db => console.log("Arima exercice database connected!"));
    }
    _setRoutes() {
        const router = express.Router();
        this.app.use('/api/cars', carRouter_1.default);
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map