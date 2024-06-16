const { Types } = require('mongoose');
const { validateNonIntegerRequestID, validationErrorMessageResolver } = require('../input_validators');
const userRoleService =  require('../requesthandlers/rqh.userRole'),
    Joi = require('joi');


module.exports = function(app){
    
 
    
    app.route('/api/roles')
        // .get(system.requiresLogin, rqh.getAddressInfosByPatient)
        .get(async (req, res)=> { return res.send(await userRoleService.listUserRoles())});

    app.route('/api/roles/paged')
        // .get(system.requiresLogin, rqh.getAddressInfosByPatient)
        .get(async (req, res)=> { return res.send(await userRoleService.pagedListUserRoles(req.body))});

    app.route('/api/roles/:id')
        .get(async (req, res)=> { 
            const inputCheck = validateNonIntegerRequestID("id", req.params.id, 16)
            if(!!inputCheck.error){
                return res.status(400).send(validationErrorMessageResolver(inputCheck.error));
            }
            if(!!!Types.ObjectId.isValid(req.params.id)){
                return res.status(400).send("'id' is invalid");
            }
            const result = await userRoleService.detailsUserRoles(req.params);

            if(result == null){
                return res.status(204).send();
            }
            return res.send(result)

        });

};

