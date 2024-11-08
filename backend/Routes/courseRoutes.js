const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');
const InternshipProgramController = require('../controllers/InternshipProgramController');
const PayAfterPlacementController = require('../controllers/PayAfterPlacementController');


router.post('/addCourse', courseController.addCourse);
router.post('/addInternship', InternshipProgramController.addInternship);
router.post('/addPayAfterPlacement', PayAfterPlacementController.addPlacementdetails);



router.get('/courses', courseController.getCourses);
router.get('/Internship', InternshipProgramController.getInternship);
router.get('/PayAfterPlacement', PayAfterPlacementController.getPlacementdetails);

module.exports = router;