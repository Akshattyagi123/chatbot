const { Internship } = require('../models/InternshipModel');

exports.addInternship = async (req, res) => {
    try {
        const { category, heading, InternshipOverview, CurriculumBreakdown, faqs } = req.body;
        console.log(category, heading, InternshipOverview, CurriculumBreakdown, faqs);

        const { overview, keySkills } = InternshipOverview;
        console.log(InternshipOverview.overview);

        const { StudyContent, Coursehighlights } = CurriculumBreakdown;
        console.log(StudyContent, Coursehighlights);

        const newInternship = new Internship({
            category,
            heading,
            InternshipOverview: {
                overview,
                keySkills,
            },
            CurriculumBreakdown: {
                StudyContent,
                Coursehighlights
            },
            faqs: faqs.map((faqData) => ({
                question: faqData.question,
                answer: faqData.answer,
            })),
        });
        await newInternship.save(); // Save to MongoDB

        res.status(201).json({
            message: 'Internship added successfully!',
            internship: newInternship,
        });
    } catch (error) {
        console.error("Error in addInternship:", error);
        res.status(500).json({ message: 'Error adding internship', error });
    }
};

// Controller to handle fetching all internships
exports.getInternship = async (req, res) => {
    try {
        const allInternships = await Internship.find();
        res.status(200).json(allInternships);
    } catch (error) {
        console.error("Error in getInternships:", error);
        res.status(500).json({ message: 'Error fetching internships', error });
    }
};


