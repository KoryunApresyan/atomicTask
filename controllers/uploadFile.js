const multer = require('multer');
const {logger} = require('../components/logger');
const File = require('../models/file');
const Joi = require('@hapi/joi');
const Validator = require('../apiSchema/fileSchema');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'front-app/src/assets/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({storage: storage});

const uploadFile = async (req, res) => {
    logger.info('Start Upload file - - -')
    console.log(req.file);
    const {error, value} = Joi.validate(req.file, Validator.File);
    if (error && error.details) {
        logger.error(`Validate Error: ${error}`);
        return res.json({success: false, message: `User add Failed ${error}`});
    }
    const userId = req.body.userId;
    console.log(value);
    if (!value) {
        const err = new Error('Please upload a file');
        logger.error(` ${err}`);
        return res.status(404).json({success: false, message: err});
    }
    try {
        await File.updateOne({userId}, value, {upsert: true}).lean();
        return res.status(200).json({success: true, message: 'Upload file Completed', data: value});
    } catch (error) {
        logger.error(`User File Save Failed: ${error}`);
        return res.status(500).json({success: false, message: `User File Save Failed ${error}`});
    }
}
const openUploadFile = async (req, res) => {
    logger.info('Start Open Upload File User - - -');
    const {userId} = req.query;
    console.log(userId);
    try {
        const data = await File.findOne({userId}).lean();
        console.log(data);
        if (!data) {
            return res.status(404).json({success: false, message: "Not Found"});
        }
        ;
        return res.status(200).json({success: true, message: 'File Open Completed', data: data});
    } catch (error) {
        logger.error(`File Open Failed: ${error}`);
        return res.status(500).json({success: false, message: `File Open Error ${error}`});
    }
}
module.exports = {
    uploadFile,
    upload,
    openUploadFile
}
