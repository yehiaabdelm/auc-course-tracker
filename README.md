# 1:37 AM, Tue 5 Sep

I need to register a course, but don't want to keep checking self service banner. The university has an open "Dynamic Schedule" so it shouldn't be hard to run a cron job to programmatically check if a course has empty slots. After a quick chat with Seif Shalan, creator of https://gadwal.co, this should be easy.

# 1:53 AM

I actually don't need to store all the courses in the database (my initial conclusion). (Push)

# 3:45 AM

Don't know why this took so long, but the database and form submission works for now. (Push)

# 4:45 AM

Wrote the code for the webhook that should be called ~2 times an hour (maybe more?). This webhook fetches fresh course data and checks whether any of the CRNs that are already in the database have any remaining places (>0). If yes, it sends an email to everyone who is tracking these courses.

Two main challenges here:
1. Vercel serverless functions timeout after 10 seconds (on the free plan), so I might have to just look for an alternative if the function doesn't fast enough.
2. I don't know if the email sending will be the bottle neck. Right now it's finishing after around 6.7s, without sending any emails.
(Push)