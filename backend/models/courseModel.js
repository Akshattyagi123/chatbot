const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    courseOverview: {
        overview: {
            type: String,
            required: true
        },
        keySkills: {
            type: String,
            required: true
        },
        whatsIncluded: {
            type: String,
            required: true
        },
        highlights: {
            type: String,
            required: true
        }
    },
    faqs: []
});

const Course = mongoose.model('Course', courseSchema);



module.exports = { Course };

