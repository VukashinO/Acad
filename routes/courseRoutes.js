const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = 
require('../controlers/courseControler');

const express = require('express');
const Joi = require('joi');
const fs = require('fs');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;