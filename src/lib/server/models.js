import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    crn: String,
    remaining_seats: Number,
    emails: [String],
});

const Course = mongoose.model('course', courseSchema);

export { Course }