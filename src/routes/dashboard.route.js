const express = require('express');
const router = express.Router();

const DashboardController = require('../controllers/dashboard.controller');

require('dotenv').config({ path: '.configuration.env' }); // Updated file path

//EmployeeBarChart
router.get('/getempsummary/:starttime/:endtime', DashboardController.getEmpTicketSummary);
//CustomerErrorsBarChart
router.get('/getcustomerdata/:starttime/:endtime', DashboardController.getCustomerSummary);
//CustomerCallsChart
router.get('/getcustomercalldata/:starttime/:endtime', DashboardController.getCustomerCallData);
//EmployeeTasksChartChart
router.get('/getemployeetasksdata/:starttime/:endtime', DashboardController.getEmployeeTasksData);

//GridData
router.get('/getclientsummary', DashboardController.getClientSummary);
router.get('/getcommonerrors', DashboardController.getCommonErrors);
router.get('/getcommontasks', DashboardController.getCommonTasks);
router.get('/geticketsummary', DashboardController.getTicketSummary);

router.get('/getemployees', DashboardController.getEmployees);
router.get('/getemployeeweeklydata/:starttime/:endtime', DashboardController.getEmployeeWeeklySummary);

module.exports = router;