const {Schema, model, mongoose } = require('mongoose');
const { validate } = require('uuid');


const userRoleSchema = Schema({
    // id: {
    //     type:mongoose.SchemaTypes.UUID,
    //     required:true
    // },
    roleName: {
        type:String, 
        required: true
    },
    isDefault: {
        type:Boolean,
        default: false
    },
    isStaff: {
        type:Boolean,
        default: false
    },
    isOfficeAdmin: {
        type:Boolean,
        default: false
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    isSuperAdmin: {
        type:Boolean,
        default: false
    },
    dateCreated: {
        type:Date,
        default: Date.now
    },
    description: {
        type:String, 
    },
    isActive: {
        type:Boolean,
        default: false
    },
    //Example of custom validator
    // tags: {
    //     type: Array,
    //     validate: {
    //         validator: function(value) {
    //             return value.length > 0;
    //         },
    //         message: 'A user role should have at least one tag.'
    //     }
    // },
    // names: {
    //     type: Array,
    //     validate: {
    //         isAsync: true,
    //         validator: function(value, callback) {
    //             callback(value.length > 0);
    //         },
    //         message: 'A user role should have at least one tag.'
    //     }
    // }
});


// mongoose.pluralize(null);//=
var userRole = mongoose.model('UserRole', userRoleSchema);
module.exports = {
    userRoleSchema: userRoleSchema,
    userRole: userRole
}
