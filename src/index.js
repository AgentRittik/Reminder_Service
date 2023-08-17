const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig')
const { sendBasicEmail } = require('./services/email-service')
const setupJobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');

const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () =>{
        console.log(`server started at ${PORT}`);
        setupJobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'mydevelopmentserver@gmail.com',
        //     'This is a testing mail',
        //     'Testing Testing Testing Testing'
        // )
    });
}
setUpAndStartServer();


