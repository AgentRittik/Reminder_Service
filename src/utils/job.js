const cron = require('node-cron');
const emailService = require('../services/email-service')
const sender = require('../config/emailConfig');

/**
 * 10:00 am
 * cron jobs every 5 minutes
 * we will check are there any pending emails which was expwcted to be seny
 * by now
 */

const setupJobs = ()=>{
    cron.schedule('*/2 * * * *', async() => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject : email.subject,
                text : email.content
            }, async(err, data) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.UpdateTicket(email.id, {status: "SUCCESS"});
                }
            })
        });
        console.log(response);
    });
}

module.exports = setupJobs;