const mongoose = require('mongoose');
// define schema for the collections.
const schemaObj = {
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
}
const courseSchema = new mongoose.Schema(schemaObj);

// here const Course is a class which represents the collection of data.
// the document name has to be in singular form and not plural like courses.
const Course = mongoose.model('Course', courseSchema);

exports.Course = Course;