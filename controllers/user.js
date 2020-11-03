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
const getUser = async (req, res) => {
    logger.info('Start getUser - - -');
    const {skip, sortName, sortState, limit ,filter,role } = req.query;
    const sortObj = {};
    const search ={ $and: [
            {  '$or': [
        {'name'   : {'$regex': filter, "$options": "i"}},
        {'surname': {'$regex': filter, "$options": "i"}},
        {'email'  : {'$regex': filter, "$options": "i"}},
        {'role'   : {'$regex': filter, "$options": "i"}},

    ]}]};

    if(role) search.$and.push({'role'   : { $in:[role]}});
    sortObj[sortName] = sortState;

    Promise.all([
        User.find(search).sort(sortObj).skip(Number(skip)).limit(Number(limit)).lean(),
        User.count(search).lean()
    ])
        .then(([ user, totalItem ]) => {
            if (!user) return res.status(404).json({success: false, message: "Not Found"});
            return res.status(200).json({success: true, message: 'All User', data: user, totalItem: totalItem});
        })
        .catch((error) => {
            logger.error(`User GET Error: ${error}`);
            return res.status(500).json({success: false, message: "Internal server error."});
        })
}

const deleteUser = async (req, res) => {
    logger.info('Start User Delete - - -');
    const params = req.params;
    try {
        await User.findByIdAndRemove({_id: params.id}).lean();
        return res.status(200).json({success: true, message: 'Delete User Completed'});
    } catch (error) {
        logger.error(`User Delete Error: ${error}`);
        return res.status(500).json({ success:false , message: "Internal server error." });
    }
}

module.exports = {
    addUser,
    getUser,
    deleteUser
}
	