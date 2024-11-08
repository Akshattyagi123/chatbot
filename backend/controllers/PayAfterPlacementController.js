const { Course } = require('../models/courseModel');
const { PayAfterPlacement } = require('../models/PayAfterPlacement');



exports.addPlacementdetails = async (req, res) => {
    try {
        const { category, heading, ProgramOverview, faqs } = req.body;
        console.log(category, heading, ProgramOverview, faqs);

        const { Courseoverview, MODEOFTRAINING, PAPBENEFITS } = ProgramOverview;
        console.log(Courseoverview, MODEOFTRAINING, PAPBENEFITS);

        const newPayAfterPlacement = new PayAfterPlacement({
            category,
            heading,
            ProgramOverview: {
                Courseoverview,
                MODEOFTRAINING,
                PAPBENEFITS,
            },
            faqs: faqs.map((faqData) => ({
                question: faqData.question,
                answer: faqData.answer,
            })),
        });

        await newPayAfterPlacement.save();

        res.status(201).json({
            message: 'payAfterPlacement data  added successfully!',
            PayAfterPlacement: newPayAfterPlacement,
        });
    } catch (error) {
        console.error("Error in addCourse:", error);
        res.status(500).json({ message: 'Error adding course', error });
    }
};

exports.getPlacementdetails = async (req, res) => {
    try {
        const allCourses = await PayAfterPlacement.find();
        res.status(200).json(allCourses);
    } catch (error) {
        console.error("Error in getPayAfterPlacements:", error);
        res.status(500).json({ message: 'Error fetching PayAfterPlacements', error });
    }
};

