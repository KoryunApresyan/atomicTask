const mongoose = require('mongoose');
const {logger} = require('./logger');
require('dotenv').config();


const mongooseConnectionString = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};


mongoose.connect(mongooseConnectionString, options, function (err) {
    logger.info(`mongoose trying to connect to mongodb : ${mongooseConnectionString}`);
    if (err) {
        logger.error(`mongoose connection error : ${err}`);
        throw err;
    } else {
        logger.info('success');
    }
});


exports.disconnect = () => {
    mongoose.disconnect()
        .then(() => {
            logger.info('Mongoose server has disconnected!!!');
        })
        .catch(error => {
            logger.error(`Mongoose disconnecting from server failed ${error}`);
        })
}
