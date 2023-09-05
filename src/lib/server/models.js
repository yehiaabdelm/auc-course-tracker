import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    crn: {
        type: String,
        index: true,
    },
    remaining_seats: Number,
    emails: [String],
}, { timestamps: true });


const Course = mongoose.model('course', courseSchema);

export { Course }
