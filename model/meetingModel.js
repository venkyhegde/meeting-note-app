// require the mongoose
var mongoose = require('mongoose');


// create a schema instance
var Schema = mongoose.Schema;

// schema definition
var meetingSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return (value.length > 0 && value.toLocaleLowerCase() !== 'none');
            },
            message: 'Select a valid name'
        },
    },
    project: {
        type:String,
        required: true,
        validate: {
            validator: function(value) {
                var value = value.trim();
                return value.length > 0;
                
            },
            message: '{PATH} Please Select a Project'
        },
    },
    yestDayWork: {
        type:String,
        required: true,
        validate: {
            validator: function(value) {
                var value = value.trim();
                return value.length > 0;
            
            },
            message: '{PATH} Yesterday work can not be empty'
        },
    },
    toDaysWork: {
        type:String,
        required: true,
        validate: {
            validator: function(value) {
                var value = value.trim();
                return value.length > 0;
            
            },
            message: '{PATH} Today work can not be empty'
        },
    },
    impediments: {
        type:String,
        default:"None",
        
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

// export the model
module.exports = mongoose.model('Meeting', meetingSchema);