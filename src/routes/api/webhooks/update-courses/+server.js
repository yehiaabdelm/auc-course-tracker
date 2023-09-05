import { json } from '@sveltejs/kit'
import cheerio from 'cheerio'
import { Course, Email } from '$lib/server/models.js'
import { sendEmail } from '$lib/server/email';
import { AUTH } from '$env/static/private'
// update the courses for in the database and find courses with seats remaining > 0 and send emails to the emails in the database
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    console.log(request.headers)
    const authorizationHeader = request.headers.get('Authorization');

    if (authorizationHeader !== AUTH) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const crnsAndEmails = await Course.find({});

    const response = await fetch('https://ssb-prod.ec.aucegypt.edu/PROD/crse_submit.submit_proc', {
        method: 'POST',
        body: new URLSearchParams([
            ['term_in', '202410'],
            ['sel_subj', 'dummy'],
            ['sel_day', 'dummy'],
            ['sel_schd', 'dummy'],
            ['sel_insm', 'dummy'],
            ['sel_camp', 'dummy'],
            ['sel_levl', 'dummy'],
            ['sel_sess', 'dummy'],
            ['sel_instr', 'dummy'],
            ['sel_ptrm', 'dummy'],
            ['sel_attr', 'dummy'],
            ['sel_subj', 'ACCT'],
            ['sel_subj', 'AIAS'],
            ['sel_subj', 'AMST'],
            ['sel_subj', 'ANTH'],
            ['sel_subj', 'APLN'],
            ['sel_subj', 'ARIC'],
            ['sel_subj', 'ALIN'],
            ['sel_subj', 'ALNG'],
            ['sel_subj', 'ALWT'],
            ['sel_subj', 'ARCH'],
            ['sel_subj', 'BIOL'],
            ['sel_subj', 'BIOT'],
            ['sel_subj', 'BADM'],
            ['sel_subj', 'CHEM'],
            ['sel_subj', 'CSCE'],
            ['sel_subj', 'CENG'],
            ['sel_subj', 'CORE'],
            ['sel_subj', 'DSCI'],
            ['sel_subj', 'ECON'],
            ['sel_subj', 'EDUC'],
            ['sel_subj', 'EGPT'],
            ['sel_subj', 'ECNG'],
            ['sel_subj', 'ENGR'],
            ['sel_subj', 'ECLT'],
            ['sel_subj', 'ENTR'],
            ['sel_subj', 'ENVE'],
            ['sel_subj', 'FILM'],
            ['sel_subj', 'FINC'],
            ['sel_subj', 'GWST'],
            ['sel_subj', 'GHHE'],
            ['sel_subj', 'DSGN'],
            ['sel_subj', 'HIST'],
            ['sel_subj', 'CEMS'],
            ['sel_subj', 'JRMC'],
            ['sel_subj', 'LAW'],
            ['sel_subj', 'LALT'],
            ['sel_subj', 'LING'],
            ['sel_subj', 'MGMT'],
            ['sel_subj', 'MOIS'],
            ['sel_subj', 'MKTG'],
            ['sel_subj', 'MACT'],
            ['sel_subj', 'MENG'],
            ['sel_subj', 'MEST'],
            ['sel_subj', 'MRS'],
            ['sel_subj', 'MUSC'],
            ['sel_subj', 'NANO'],
            ['sel_subj', 'OPMG'],
            ['sel_subj', 'PENG'],
            ['sel_subj', 'PHDS'],
            ['sel_subj', 'PHDE'],
            ['sel_subj', 'PHIL'],
            ['sel_subj', 'PHYS'],
            ['sel_subj', 'POLS'],
            ['sel_subj', 'PSYC'],
            ['sel_subj', 'PPAD'],
            ['sel_subj', 'RHET'],
            ['sel_subj', 'RCSS'],
            ['sel_subj', 'SCI'],
            ['sel_subj', 'SEMR'],
            ['sel_subj', 'SOC'],
            ['sel_subj', 'GREN'],
            ['sel_subj', 'THTR'],
            ['sel_subj', 'TVDJ'],
            ['sel_subj', 'ARTV'],
            ['sel_crse', ''],
            ['sel_title', ''],
            ['sel_schd', '%'],
            ['sel_from_cred', ''],
            ['sel_to_cred', ''],
            ['sel_camp', '%'],
            ['sel_levl', '%'],
            ['sel_ptrm', '%'],
            ['sel_attr', '%'],
            ['begin_hh', '0'],
            ['begin_mi', '0'],
            ['begin_ap', 'a'],
            ['end_hh', '0'],
            ['end_mi', '0'],
            ['end_ap', 'a']
        ])
    });

    const text = await response.text();

    const $ = cheerio.load(text);

    const tableRows = $('tr');

    const crnsToSendEmailFor = [];
    tableRows.each((index, row) => {
        const crnElement = $(row).find('td:nth-child(1) a');
        const courseNameElement = $(row).find('td:nth-child(7)');
        const remainingPlacesElement = $(row).find('td:nth-child(13)');
        const instructorElement = $(row).find('td:nth-child(14)');

        if (crnElement.length && courseNameElement.length && remainingPlacesElement.length) {
            const crn = crnElement.text().trim();

            // if someone has added this course to the database check if it has remaining seats and send an email
            const exists = crnsAndEmails.find(crnAndEmail => crnAndEmail.crn === crn)
            if (exists && exists.emails.length > 0) { // if the course exists in the database and has emails
                const courseName = courseNameElement.text().trim();
                const remainingPlaces = Number(remainingPlacesElement.text().trim());

                // Extract the instructor name and abbreviation
                const instructorText = instructorElement.text().trim();
                const match = instructorText.match(/^(.*?)\s+\(<ABBR[^>]*>[^<]*<\/ABBR>\)$/);
                const instructorName = match ? match[1] : instructorText;
                if (remainingPlaces > 0) {
                    crnsToSendEmailFor.push({ crn, courseName, remainingPlaces, instructorName, emails: exists.emails });
                }
            }
        }
    });


    for (const c of crnsToSendEmailFor) {
        const { crn, courseName, remainingPlaces, instructorName, emails } = c;
        const emailBody = `Hello, <br><br> ${courseName} (${crn}) has ${remainingPlaces} remaining places. <br><br> The instructor is ${instructorName}. <br><br> Best regards, <br> AUC Course Tracker <br> <br> If you want to opt out visit <a href="https://auc-course-tracker.vercel.app/stop-emails">this link</a>.`;
        const emailSubject = `AUC Course Tracker: ${courseName} (${crn}) has ${remainingPlaces} remaining places`;
        await sendEmail(emails, emailSubject, emailBody);
        await Email.create({
            recipients: emails,
            subject: emailSubject,
            body: emailBody
        })
    }

    return json(crnsToSendEmailFor);
};