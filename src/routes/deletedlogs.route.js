const express = require('express');
const router = express.Router();

const DeletedLogsController = require('../controllers/deletedlogs.controller');

require('dotenv').config({ path: './configuration.env' });


router.get(`/getdeletedlogs`, DeletedLogsController.getDeletedLogs);
router.post('/insertcallticket', DeletedLogsController.undoCallTicket);
router.delete('/deleteticket/:idx', DeletedLogsController.deleteTicketLog);


module.exports = router;