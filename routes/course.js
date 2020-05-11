const express = require('express');
const router = express.Router();
const { Course } = require('../models/courseModel');

/*
 * get all courses.
 */
router.get('/', async (req, res) => {
	try {
		const allCourses = await Course.find();
		if (allCourses === null) {
			res.status(200).send('No courses available!');
		}
		res.send(allCourses);
	} catch (error) {
		console.log(`Error: could not fetch all the courses ${error}`);
	}
});

/*
 * get single course.
 */
router.get('/:id', getCoursebyId, async (req, res) => {
	res.send(res.courseById);
});

/*
 * insert course.
 */
router.post('/', async (req, res) => {
	if (req.body.name == null || req.body.author == null) {
		res.status(400).send('Make sure to provide values for name and author!');
	}
	// create and initialise object and this will map to a document in mongodb database.
	const courseObj = new Course({
		name: req.body.name,
		author: req.body.author,
		tags: req.body.tags,
		isPublished: req.body.isPublished,
	});
	const result = await courseObj.save();
	console.log(result);
	res.send(result);
});

/* update course.
 * using patch helps us to update the specific property of the document.
 */
router.patch('/:id', getCoursebyId, async (req, res) => {
	// verify which property has been updated.
	if (req.body.name != null) {
		res.courseById.name = req.body.name;
	}
	if (req.body.author != null) {
		res.courseById.author = req.body.author;
	}
	if (req.body.tags != null) {
		res.courseById.tags = req.body.tags;
	}
	// save the document.
	try {
		const updateCourse = await res.courseById.save();
		res.status(200).send(updateCourse);
	} catch (err) {
		res.status(500).send('message:', err.message);
	}
});

/*
 * delete course.
 */
router.delete('/:id', getCoursebyId, async (req, res) => {
	try {
    await res.courseById.remove()
    res.status(200).send('Course successfully removed!');
  } catch(err) {
    res.status(500).send('message: ', err.message);
  }
});

/*
 * define middleware to fetch the course by id.
 */
async function getCoursebyId(req, res, next) {
	try {
		course = await Course.findById(req.params.id);
		if (course == null) {
      return res.status(404).send('Course not found!');
    }
	} catch (error) {
		return res.status(500).send('message', error);
	}
	res.courseById = course;
	next();
}

module.exports = router;