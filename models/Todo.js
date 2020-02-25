const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        },
});

module.exports = model('Todo', schema)
