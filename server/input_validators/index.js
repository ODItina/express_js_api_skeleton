const Joi = require('joi');

const validationErrorMessageResolver = function (args)
{
    let errorMessage = "";
    for (let i = 0; i < args.details.length; i++) {
        errorMessage += `\n ${args.details[i].message}`
    }

    return errorMessage;
}

const validateIntegerRequestID = function(idField, idValue)
{
    const schema = Joi.object({
        [idField]: Joi.number().required()
    })
    return schema.validate({ [idField]: idValue});
}

const validateNonIntegerRequestID = function(idField, idValue, minLength)
{
    const schema = Joi.object({
        [idField]: Joi.string().trim().min(minLength).required()
    })
    return schema.validate({ [idField]: idValue});
}


module.exports = {
    validationErrorMessageResolver : validationErrorMessageResolver,
    validateIntegerRequestID: validateIntegerRequestID,
    validateNonIntegerRequestID: validateNonIntegerRequestID
};

