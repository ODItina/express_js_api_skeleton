const mongoose = require('mongoose');

const auditTrailSchema = mongoose.Schema({
    // id: {
    //     type:mongoose.SchemaTypes.UUID,
    //     required:true
    // },
    userID: {
        type:mongoose.SchemaTypes.ObjectId
    },
    action: {
        type:String,
        default: null
    },
    description: {
        type:String,
        default: null
    },
    dateCreated: {
        type:Date,
        default: Date.now
    },
    performedBy: {
        type:mongoose.SchemaTypes.UUID,
        default: null
    }

});
// mongoose.pluralize(null);//
var auditTrail = mongoose.model('AuditTrail',auditTrailSchema);
module.exports = auditTrail;


