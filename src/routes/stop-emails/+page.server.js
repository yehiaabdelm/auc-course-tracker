import { fail } from '@sveltejs/kit';
import { Course } from '$lib/db/models';

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { email } = formData;
        try {
            await Course.updateMany({}, {
                $pull: { emails: email },
            }, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Removed ${email} from all courses`);
                }
            });
            return {
                error: false,
                message: `Removed ${email} from all courses`
            }
        }
        catch (e) {
            return fail(400,
                {
                    error: true,
                    message: 'An error happened while removing your email from all courses',
                }
            );
        }
    }


}