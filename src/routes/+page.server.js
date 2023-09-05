import { redirect, fail } from '@sveltejs/kit'
import { Course } from '$lib/server/models.js'

class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicateError"; // Set the error name
    }
}

// Inefficient, but I don't give a fuck
const addEmailToCourse = async (crn, userEmail) => {
    try {
        console.log(crn, userEmail);
        console.log('adding email to course');

        // Check if the email already exists in the array
        const course = await Course.findOne({ crn });

        if (course) {
            if (!course.emails.includes(userEmail)) {
                course.emails.push(userEmail);
                await course.save();
            } else {
                throw new DuplicateError(crn);
            }
        } else {
            // Course not found, create a new one with the email
            const newCourse = new Course({
                crn,
                emails: [userEmail],
            });
            await newCourse.save();
        }

        return course;
    } catch (error) {
        if (error instanceof DuplicateError) {
            console.log('error message',error.message);
            return { error: true, crn: error.message };
        } else {
            throw error; // Re-throw other errors
        }
    }
};




export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData())
        const { email, ...crns } = formData
        const duplicateCrns = [];

        console.log(email, crns)
        try {
            for (const key in crns) {
                const value = crns[key];
                if (value !== '') {
                    console.log(value, email)
                    const result = await addEmailToCourse(value, email)
                    if (result?.error) {
                        duplicateCrns.push(result.crn)
                    }
                };
            }
            
            if (duplicateCrns.length > 0) {
                console.log(duplicateCrns)
                return fail(400, {
                    message: `You are already signed up for these CRNs: ${duplicateCrns.join(', ')}. The rest of your CRNs have been added successfully.`,
                    failed_to_add_emails: true,
                });
            }
        }
        catch (e) {
            console.log(e)
            return fail(400, {
                message: "There was an issue processing your request",
                email,
                falied_to_add_emails: true
            })
        }

        throw redirect(300, '/success')
    },
}