import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    crn: {
        type: String,
        index: true,
    },
    remaining_seats: Number,
    emails: [String],
}, { timestamps: true });

const emailSchema = new mongoose.Schema({
    recipients: [String],
    subject: String,
    body: String
},{timestamps: true})

const Course = mongoose.model('course', courseSchema);
const Email = mongoose.model('email',emailSchema)

export { Course, Email }
