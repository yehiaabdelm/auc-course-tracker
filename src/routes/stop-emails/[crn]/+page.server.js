import { Course } from '$lib/server/models';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, params }) {
    const courseName = url.searchParams.get('courseName')
    const { crn } = params;
    return {
        crn,
        courseName
    };
};

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { email, crn, courseName } = formData;
        console.log(email, crn, courseName)
        try{
            await Course.updateOne(
                { crn: crn },
                {
                    $pull: { emails: email },
                }
            );
        }
        catch (e) {
            return fail(400,
                {
                    error: true,
                    message: `An error occured while removing ${email} from ${courseName} (${crn})`,
                }
            );
        }
        return {
            error: false,
            message: `Removed ${email} from ${courseName} (${crn})`
        }


    }
}