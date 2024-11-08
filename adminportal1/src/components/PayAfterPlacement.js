import React, { useState } from 'react'
import axios from 'axios'

export const PayAfterPlacement = () => {
    const [courseData, setCourseData] = useState({
        category: '',
        heading: '',
        ProgramOverview: {
            Courseoverview: ' ',
            MODEOFTRAINING: ' ',
            PAPBENEFITS: ' ',
        },
        faqs: []
    });

    const handleCategorySelect = (category) => {
        setCourseData({ ...courseData, category });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['Courseoverview', 'MODEOFTRAINING', 'PAPBENEFITS'].includes(name)) {
            setCourseData({
                ...courseData,
                ProgramOverview: { ...courseData.ProgramOverview, [name]: value }
            });
        } else {
            setCourseData({ ...courseData, [name]: value });
        }
    };

    const addFaq = () => {
        if (newQuestion && newAnswer) {
            const newFaq = { question: newQuestion, answer: newAnswer };
            setCourseData({
                ...courseData,
                faqs: [...courseData.faqs, newFaq]
            });
            setNewQuestion('');
            setNewAnswer('');
        } else {
            alert('Please enter both question and answer');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/addPayAfterPlacement', courseData);
            console.log('Course added successfully:', response.data);
            alert("Course added successfully");

            setCourseData({
                category: '',
                heading: '',
                ProgramOverview: {
                    Courseoverview: '',
                    MODEOFTraining: '',
                    PAPBENEFITS: '',
                },
                faqs: []
            });
            setNewQuestion('');
            setNewAnswer('');
        } catch (error) {
            console.error('Error adding course', error.response ? error.response.data : error.message);
            alert("Error adding course, please try again");
        }
    };   

    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const categories = ["Full Stack Web Development", "Data Science", "Artificial INTELLIGENCE/MACHINE LEARNING"];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2>Add PayAfterPlacement Program Details</h2>

            {/* Category Selection Buttons */}
            <div>
                <h3>Select Category</h3>
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => handleCategorySelect(category)}
                        className={`p-2 m-2 ${courseData.category === category ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Render other fields only if a category is selected */}
            {courseData.category && (
                <>
                    <div>
                        <label>Heading</label>
                        <input
                            type="text"
                            name="heading"
                            value={courseData.heading}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <h3>Program Overview</h3>
                        <div>
                            <label>Overview</label>
                            <textarea
                                name="Courseoverview"
                                value={courseData.ProgramOverview.Courseoverview}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label>MODE OF Training</label>
                            <textarea
                                name="MODEOFTRAINING"
                                value={courseData.ProgramOverview.MODEOFTRAINING}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>

                        <div>
                            <label>PAP BENEFITS</label>
                            <textarea
                                name="PAPBENEFITS"
                                value={courseData.ProgramOverview.PAPBENEFITS}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>FAQ Question</label>
                        <textarea
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            className="border p-2 w-full"
                        />
                        <label>FAQ Answer</label>
                        <textarea
                            type="text"
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            className="border p-2 w-full"
                        />
                        <button type="button" onClick={addFaq} className="mt-2 p-2 bg-blue-500 text-white">
                            Add FAQ
                        </button>
                    </div>

                    <div>
                        <h4>FAQs:</h4>
                        <ul>
                            {courseData.faqs.map((faq, index) => (
                                <li key={index}>
                                    <p><strong>Q:</strong> {faq.question}</p>
                                    <p><strong>A:</strong> {faq.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit" className="p-2 bg-green-500 text-white">Submit Course</button>
                </>
            )}
        </form>
    )
}






