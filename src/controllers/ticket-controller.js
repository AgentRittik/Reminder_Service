const ticketService = require('../services/email-service');

const create = async(req, res) => {
    try{
        const response = await ticketService.createNotification(req.body);
        console.log(req.body);
        return res.status(202).json({
            data : response,
            success : true,
            err: {},
            message: "sucessfully registered an email reminder"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: "unable to register an email reminder"
        });
    }
}

module.exports = {
    create
}