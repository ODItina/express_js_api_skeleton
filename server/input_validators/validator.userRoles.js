const Joi = require('joi');

const validateUserRole = function (args)
{
    const schema = Joi.object({
        roleName: Joi.string().min(2).required(),
        description: Joi.string().min(2),
    })
    return schema.validate(args).error;
}



module.exports.validateUserRole = validateUserRole;