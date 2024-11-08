import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [qualification, setQualification] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedHeading, setSelectedHeading] = useState('');
    const [showFaqs, setShowFaqs] = useState(false);
    const [serviceDetails, setServiceDetails] = useState(null);
    const [availableHeadings, setAvailableHeadings] = useState([]);
    const [expandedHeading, setExpandedHeading] = useState(null); // Track which heading is expanded for details

    const qualifications = ['High School', 'Undergraduate', 'Postgraduate'];
    const graduationYears = ['2024', '2025', '2026'];
    const services = ['Credit Courses Offered', 'Pay After Placement', 'Internship Training Program'];

    const services1 = {
        "Credit Courses Offered": {
            relatedServices: [
                'Full Stack Development',
                'Data Science',
                'UI/UX Design',
                'Mobile App Development',
                'Business Intelligence'
            ]
        },
        "Pay After Placement": {
            relatedServices: [
                'Software Development',
                'Data Science PAP',
                'Machine Learning PAP'
            ]
        }
    };

    const handleQualificationSelect = (e) => {
        const selectedQualification = e.target.value;
        setQualification(selectedQualification);
        setMessages([...messages, `You selected: ${selectedQualification}`]);
        setMessages(prevMessages => [...prevMessages, "Please select your expected graduation year:"]);
    };

    const handleGraduationYearSelect = (e) => {
        const selectedYear = e.target.value;
        setGraduationYear(selectedYear);
        setMessages([...messages, `You selected: ${selectedYear}`]);
        setMessages(prevMessages => [...prevMessages, "These are the services we offer. Please select the one you are looking for:"]);
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setMessages([...messages, `You selected: ${service}`]);
    };

    const handleHeadingClick = async (category) => {
        setSelectedHeading(category);
        setMessages([...messages, `Loading courses under ${category}...`]);

        try {
            const response = await axios.get("http://localhost:5000/api/courses");
            const data = response.data;

            // Filter data by matching category and then map to unique headings
            const filteredHeadings = data
                .filter(item => item.category === category)
                .map(item => item.heading);

            setAvailableHeadings(filteredHeadings);
            setMessages(prevMessages => [...prevMessages, `Available courses under ${category}:`]);
        } catch (error) {
            console.error('Error fetching service details:', error);
            setMessages(prevMessages => [...prevMessages, "Error fetching service details. Please try again."]);
        }
    };

    const handleWhatWeOfferClick = async (heading) => {
        try {
            const response = await axios.get("http://localhost:5000/api/courses");
            const data = response.data;

            // Find service details for the specific heading
            const selectedServiceDetails = data.find(item => item.heading === heading);
            if (selectedServiceDetails) {
                setServiceDetails(selectedServiceDetails);
                setExpandedHeading(heading); // Set the heading as expanded to show details
                setMessages(prevMessages => [...prevMessages, `Showing details for ${heading}`]);
            } else {
                setMessages(prevMessages => [...prevMessages, "No details available for this service."]);
            }
        } catch (error) {
            console.error('Error fetching service details:', error);
            setMessages(prevMessages => [...prevMessages, "Error fetching service details. Please try again."]);
        }
    };

    const handleBackToOptions1 = () => {
        setAvailableHeadings([]);
        setSelectedService(null);
        setMessages([...messages, "Please select a service from the available options."]);
    };
    const handleBackToOptions = () => {
        setExpandedHeading(null); // Collapse any expanded details
        setServiceDetails(null);
        setShowFaqs(!showFaqs);
        setMessages([...messages, "Please select a service from the available options."]);
    };
    const handleNeedHelp = () => {
        setShowFaqs(!showFaqs); // Toggle FAQ visibility
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                        {msg}
                    </div>
                ))}

                {messages.length === 0 && (
                    <div>
                        <p className="text-lg">Hi there! Welcome to Hoping Minds, your gateway to unlocking new skills and career opportunities. I'm your personal assistant here to help you explore our courses, internship programs, and other services.</p>
                        <p className="mt-4">To get started, could you please tell me your current qualification?</p>
                        <select
                            value={qualification}
                            onChange={handleQualificationSelect}
                            className="mt-2 border p-2 rounded w-full"
                        >
                            <option value="">Select Qualification</option>
                            {qualifications.map((qual, index) => (
                                <option key={index} value={qual}>{qual}</option>
                            ))}
                        </select>
                    </div>
                )}

                {messages.length > 0 && qualification && graduationYear === '' && (
                    <select
                        value={graduationYear}
                        onChange={handleGraduationYearSelect}
                        className="mt-2 border p-2 rounded w-full"
                    >
                        <option value="">Select Graduation Year</option>
                        {graduationYears.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                )}

                {graduationYear && !selectedService && (
                    <div className="mt-4 space-y-2">
                        {services.map((service, index) => (
                            <button
                                key={index}
                                onClick={() => handleServiceSelect(service)}
                                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                {service}
                            </button>
                        ))}
                    </div>
                )}

                {selectedService && !availableHeadings.length && (
                    <div>
                        <p className="mt-4">Here are the courses offered under {selectedService}:</p>
                        <div className="mt-4 space-y-2">
                            {services1[selectedService].relatedServices.map((service, index) => (
                                <div key={index} className="space-y-2">
                                    <button

                                        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition mb-2"
                                    >
                                        {service}
                                    </button>
                                    <button
                                        onClick={() => handleHeadingClick(service)}
                                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-2"
                                    >
                                        Courses We Offer
                                    </button>
                                </div>

                            ))}
                        </div>
                    </div>
                )}

                {availableHeadings.length > 0 && (
                    <div className="mt-4">
                        {availableHeadings.map((heading, index) => (
                            <div key={index} className="mt-2">
                                <button
                                    className="w-full p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition mb-2"

                                >
                                    {heading}
                                </button>

                                {/* Three buttons under each heading */}
                                <div className="flex gap-4 mt-2">
                                    <button
                                        className="w-1/3 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        onClick={handleBackToOptions1}
                                    >
                                        BackToptions
                                    </button>
                                    <button
                                        className="w-1/3 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        onClick={() => handleWhatWeOfferClick(heading)}
                                    >
                                        whatweoffer
                                    </button>
                                    <button
                                        className="w-1/3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"

                                    >
                                        EnrollNow
                                    </button>
                                </div>

                                {expandedHeading === heading && (
                                    <div className="mt-2 p-4 bg-gray-200 rounded">
                                        {serviceDetails ? (
                                            <div className="mt-2 p-4 bg-gray-200 rounded">
                                                {/* Course Overview */}
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-semibold">Course Overview</h3>
                                                    <p>{serviceDetails.courseOverview?.overview}</p>
                                                </div>

                                                {/* Key Skills Covered */}
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-semibold">Key Skills Covered</h3>
                                                    <p>{serviceDetails.courseOverview?.keySkills}</p>
                                                </div>

                                                {/* What's Included */}
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-semibold">What's Included</h3>
                                                    <p>{serviceDetails.courseOverview?.whatsIncluded}</p>
                                                </div>

                                                {/* Course Highlights */}
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-semibold">Course Highlights</h3>
                                                    <p>{serviceDetails.courseOverview?.highlights}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Loading details...</p>
                                        )}


                                        <div className="flex gap-2 mt-4">
                                            <button
                                                className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                                onClick={handleBackToOptions}
                                            >
                                                Back to Options
                                            </button>
                                            <button
                                                className="flex-1 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"

                                            >
                                                EnrollNow
                                            </button>
                                            <button
                                                className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                                onClick={handleNeedHelp}
                                            >
                                                NeedHelp?
                                            </button>
                                        </div>
                                        {showFaqs && serviceDetails.faqs && (
                                            <div className="mt-4">
                                                <h3 className="text-lg font-semibold">FAQs</h3>
                                                {serviceDetails.faqs.map((faq, index) => (
                                                    <div key={index} className="p-2 bg-gray-100 rounded mb-2">
                                                        <p><strong>Q:</strong> {faq.question}</p>
                                                        <p><strong>A:</strong> {faq.answer}</p>
                                                    </div>
                                                ))}

                                                <div className="flex gap-4 mt-2">
                                                    <button
                                                        className="w-1/3 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                        onClick={handleBackToOptions}
                                                    >
                                                        BackTooptions
                                                    </button>
                                                    <button
                                                        className="w-1/3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"

                                                    >
                                                        EnrollNow
                                                    </button>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ChatBot;
