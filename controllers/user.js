const {logger} = require('../components/logger');
const User = require('../models/user');
const Joi = require('@hapi/joi');
const Validator = require('../apiSchema/userSchema');

const addUser = (req, res) => {
    logger.info('Start adduser - - -');
    const {error, value} = Joi.validate(req.body, Validator.User);
    if (error && error.details) {
        logger.error(`Validate Error: ${error}`);
        return res.json({success: false, message: `User add Failed ${error}`});
    }
    const newUser = new User(value);
    newUser.save(newUser, (err) => {
        if (err) {
            logger.error(`User add Error: ${err}`);
            return res.json({success: false, message: `User add Failed ${err}`});
        }
        return res.json({success: true, message: 'User add Complete'});
    });
}

module.exports = {
    addUser
}
	