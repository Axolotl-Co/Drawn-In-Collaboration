const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    elements: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Canvas', CanvasSchema);