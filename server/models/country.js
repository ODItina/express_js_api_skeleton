const mongoose = require('mongoose'),
    config = require('config'),//configuration settings store retriever
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema();


var connection = mongoose.connect(dburl);

autoIncrement.initialize(connection);
     

const countrySchema = Schema({
    // id: {
    //     type:mongoose.SchemaTypes.UUID,
    //     required:true
    // },
    _id: false,
    countryCode: {
        type: Number, 
        unique: true,
        required: true
    },
    countryName: {
        type:String, 
        required: true
    },
    federalUnit: {
        type:String, 
        default: null
    },
    localUnit: {
        type:String, 
        default: null
    },
    dateCreated: {
        type:Date,
        default: Date.now
    },
    dateModified: {
        type:Date,
        default: null
    }

});



// mongoose.pluralize(null);//
var country = mongoose.model('Country',countrySchema);
// countrySchema.plugin(autoIncrement.plugin, 'Country');
countrySchema.plugin(autoIncrement.plugin, { model: 'Country', field: "countryCode"});
module.exports = {
    countrySchema: countrySchema,
    country: country
}
