const mongoose = require('mongoose');


// Course schema with embedded FAQs
const InternshipSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    InternshipOverview: {
        overview: {
            type: String,
            required: true
        },
        keySkills: {
            type: String,
            required: true
        },
    },
    CurriculumBreakdown: {
        StudyContent: {
            type: String,
            required: true
        },
        Coursehighlights: {
            type: String,
            required: true
        },
    },
    faqs: []
});

const Internship = mongoose.model('Internship', InternshipSchema);



module.exports = { Internship };

