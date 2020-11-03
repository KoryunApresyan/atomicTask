const Joi = require('@hapi/joi');
module.exports.User = Joi.object().keys({
    name: Joi.string().alphanum().min(3).required(),
    surname: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    role: Joi.string().alphanum().min(3).required()
});
