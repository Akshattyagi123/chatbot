const { Course } = require('../models/courseModel');



exports.addCourse = async (req, res) => {
    try {
        const { category, heading, courseOverview, faqs } = req.body;
        console.log("Request Data:", category, heading, courseOverview, faqs);

        const { overview, keySkills, whatsIncluded, highlights } = courseOverview;
        console.log("Course Overview:", overview, keySkills, whatsIncluded, highlights);

        const newCourse = new Course({
            category,
            heading,
            courseOverview: {
                overview,
                keySkills,
                whatsIncluded,
                highlights,
            },
            faqs: faqs.map((faqData) => ({
                question: faqData.question,
                answer: faqData.answer,
            })),
        });

        await newCourse.save(); // Save the course to MongoDB

        res.status(201).json({
            message: 'Course added successfully!',
            course: newCourse,
        });
    } catch (error) {
        console.error("Error in addCourse:", error);
        res.status(500).json({ message: 'Error adding course', error });
    }
};

// Controller to handle fetching all courses
exports.getCourses = async (req, res) => {
    try {
        const allCourses = await Course.find();  // Retrieve all courses from MongoDB
        res.status(200).json(allCourses);
    } catch (error) {
        console.error("Error in getCourses:", error);
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

