const mongoose = require('mongoose');
const PayAfterPlacementSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    ProgramOverview: {
        Courseoverview: {
            type: String,
            required: true
        },
        MODEOFTRAINING: {
            type: String,
            required: true
        },
        PAPBENEFITS: {
            type: String,
            required: true
        },
    },
    faqs: []
});

const PayAfterPlacement = mongoose.model('PayAfterPlacement', PayAfterPlacementSchema);
module.exports = { PayAfterPlacement };

