var ltmDbConn = require("../../config/legendTimeDb.config");

var Reports = function (user) {
    this.ID = user.id,
    this.Employee = user.employee,
    this.Customer = user.customer,
    this.Activity = user.activity,
    this.Clients_Anydesk = user.clientsAnydesk, 
    this.Phone_Number = user.phoneNumber,
    this.StartTime = user.startTime,
    this.EndTime = user.endTime,
    this.Duration = user.duration,
    this.Type = user.type,
    this.Solution = user.solution,
    this.Support_No = user.supportNo, 
    this.Comments = user.comments,
    this.FollowUp = user.followUp,
    this.Completed = user.completed,
    this.name = user.name,
    this.number_of_days = user.numberofdays,
    this.Time_Taken = user.timeTaken,
    this.IssueType = user.issueType,
    this.Taken = user.Taken,
    this.Priority = user.Priority
};

Reports.getClientHistoryReport = (req, result) => {
    ltmDbConn.query("SELECT t.ID, t.Customer, t.Activity, t.Support_No, t.StartTime, t.EndTime, t.Duration, t.Comments, t.Phone_Number, t.Solution, t.IssueType, t.Phone_Number, t.Support_No, t.Employee, c.Surname, t.Type, t.name FROM legendtime.tbltime t JOIN legendtime.tbltechnicians c ON t.Employee = c.Technician WHERE STR_TO_DATE(t.StartTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') ORDER BY t.Employee, t.StartTime DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Calls Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Calls Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getCallTimesReport = (req, result) => {
    ltmDbConn.query(
        `SELECT 
            ID,
            Customer, 
            COUNT(*) AS CallCount, 
            IF(CAST(SUM(TIME_TO_SEC(CONCAT(
                SUBSTRING_INDEX(Duration, 'h', 1), ':', 
                SUBSTRING_INDEX(SUBSTRING_INDEX(Duration, 'm', 1), 'h ', -1), ':', 
                SUBSTRING_INDEX(Duration, 's', 1)
            ))) / COUNT(*) / 3600 AS DECIMAL(19, 2)) < 1,
            CONCAT(ROUND(SUM(TIME_TO_SEC(CONCAT(
                SUBSTRING_INDEX(Duration, 'h', 1), ':', 
                SUBSTRING_INDEX(SUBSTRING_INDEX(Duration, 'm', 1), 'h ', -1), ':', 
                SUBSTRING_INDEX(Duration, 's', 1)
            ))) / COUNT(*) / 60, 2), ' Min'),
            CONCAT(ROUND(SUM(TIME_TO_SEC(CONCAT(
                SUBSTRING_INDEX(Duration, 'h', 1), ':', 
                SUBSTRING_INDEX(SUBSTRING_INDEX(Duration, 'm', 1), 'h ', -1), ':', 
                SUBSTRING_INDEX(Duration, 's', 1)
            ))) / COUNT(*) / 3600, 2), ' Hours')) AS AverageTime,
            CONCAT(
                FLOOR(SUM(TIME_TO_SEC(CONCAT(
                    SUBSTRING_INDEX(Duration, 'h', 1), ':', 
                    SUBSTRING_INDEX(SUBSTRING_INDEX(Duration, 'm', 1), 'h ', -1), ':', 
                    SUBSTRING_INDEX(Duration, 's', 1)
                ))) / 3600), 'h ', 
                FLOOR((SUM(TIME_TO_SEC(CONCAT(
                    SUBSTRING_INDEX(Duration, 'h', 1), ':', 
                    SUBSTRING_INDEX(SUBSTRING_INDEX(Duration, 'm', 1), 'h ', -1), ':', 
                    SUBSTRING_INDEX(Duration, 's', 1)
                ))) % 3600) / 60), 'm ', 
                FLOOR(SUM(TIME_TO_SEC(CONCAT(
                    SUBSTRING_INDEX(Duration, 'h', 1), ':', 
                    SUBSTRING_INDEX(SUBSTRING_INDEX(Duration, 'm', 1), 'h ', -1), ':', 
                    SUBSTRING_INDEX(Duration, 's', 1)
                ))) % 60), 's') AS TotalTime 
        FROM legendtime.tbltime 
        WHERE STR_TO_DATE(StartTime, '%a %b %d %Y %H:%i:%s') 
            BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') 
            AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') 
        GROUP BY Customer`,
        [req.params.starttime, req.params.endtime],
        (err, res) => {
            if (err) {
                console.log('Error while getting the Customer Calls Report Data:', err);
                result(null, err);
            } else {
                console.log('Fetching the Customer Calls Report Data was Successful:', res);
                result(null, res);
            }
        }
    );
};





// Reports.getCustomerCallsReport = (req, result) => {
//     ltmDbConn.query("SELECT ID, Customer, Activity, COUNT(Customer) AS CallCount FROM legendtime.tbltime WHERE (StartTime) BETWEEN ? and ? GROUP BY Customer ORDER BY CallCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
//         if (err) {
//             console.log('Error while getting the Customer Calls Report Data:' + err);
//             result(null, err);
//         } else {
//             console.log('Fetching the Customer Calls Report Data was Successful:', res);
//             result(null, res);
//         }
//     });
// }
Reports.getCustomerCallsReport = (req, result) => {
    ltmDbConn.query("SELECT ID, Customer, Activity, COUNT(Customer) AS CallCount FROM legendtime.tbltime WHERE STR_TO_DATE(StartTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') GROUP BY Customer ORDER BY CallCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Calls Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Calls Report Data was Successful:', res);
            result(null, res);
        }
    });
}


Reports.getCustomerErrorReport = (req, result) => {
    ltmDbConn.query("SELECT ID, Activity, Customer, COUNT(Activity) AS ErrorCount FROM legendtime.tbltime WHERE STR_TO_DATE(StartTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') GROUP BY Activity ORDER BY ErrorCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Customer Error Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Customer Error Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getEmployeeAvgReport = (req, result) => {
    ltmDbConn.query("SELECT t.ID, t.Employee, c.Surname AS Surname, t.Type, COUNT(*) AS EmployeeCount, IF(CAST((SUM(TIME_TO_SEC(CONCAT(SUBSTRING_INDEX(t.Duration, 'h', 1), ':', SUBSTRING_INDEX(SUBSTRING_INDEX(t.Duration, 'm', 1), 'h ', -1), ':', SUBSTRING_INDEX(t.Duration, 's', 1)))) / COUNT(*)) / 3600 AS DECIMAL(19,2)) < 1, CONCAT(CAST((SUM(TIME_TO_SEC(CONCAT(SUBSTRING_INDEX(t.Duration, 'h', 1), ':', SUBSTRING_INDEX(SUBSTRING_INDEX(t.Duration, 'm', 1), 'h ', -1), ':', SUBSTRING_INDEX(t.Duration, 's', 1)))) / COUNT(*)) / 60 AS DECIMAL(19,2)), ' Min'), CONCAT(ROUND((SUM(TIME_TO_SEC(CONCAT(SUBSTRING_INDEX(t.Duration, 'h', 1), ':', SUBSTRING_INDEX(SUBSTRING_INDEX(t.Duration, 'm', 1), 'h ', -1), ':', SUBSTRING_INDEX(t.Duration, 's', 1)))) / COUNT(*)) / 3600, 2), ' Hours')) AS AvgTimePerTicket, SUM(1) AS TotalTickets, MIN(STR_TO_DATE(t.StartTime, '%a %b %d %Y %H:%i:%s')) AS MinStartTime, MAX(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) AS MaxEndTime, (SELECT COUNT(*) FROM legendtime.tbltime WHERE STR_TO_DATE(EndTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND EndTime IS NOT NULL) AS TotalAllEmpTickets FROM legendtime.tbltime t JOIN legendtime.tbltechnicians c ON t.Employee = c.Technician WHERE STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND t.EndTime IS NOT NULL GROUP BY t.Employee ORDER BY TotalTickets DESC", [req.params.starttime, req.params.endtime, req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Employee Average Time Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Average Time Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getEmployeeTaskReport = (req, result) => {
    ltmDbConn.query("SELECT t.ID, t.Employee, c.Surname AS Surname, t.Activity, COUNT(t.Activity) AS TaskCount FROM legendtime.tbltime t JOIN legendtime.tbltechnicians c ON t.Employee = c.Technician WHERE STR_TO_DATE(t.StartTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND t.IssueType = 'Task' GROUP BY t.Employee, t.Activity ORDER BY TaskCount DESC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Employee Tasks Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Tasks Report Data was Successful:', res);
            result(null, res);
        }
    });
}

Reports.getEmployeeSummaryReport = (req, result) => {
    ltmDbConn.query("SELECT t.ID, t.Employee, c.Surname AS Surname, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Monday' THEN 1 ELSE 0 END) AS Monday, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Tuesday' THEN 1 ELSE 0 END) AS Tuesday, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Wednesday' THEN 1 ELSE 0 END) AS Wednesday, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Thursday' THEN 1 ELSE 0 END) AS Thursday, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Friday' THEN 1 ELSE 0 END) AS Friday, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Saturday' THEN 1 ELSE 0 END) AS Saturday, SUM(CASE WHEN DAYNAME(STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s')) = 'Sunday' THEN 1 ELSE 0 END) AS Sunday, COUNT(*) AS OverallTotal FROM legendtime.tbltime t JOIN legendtime.tbltechnicians c ON t.Employee = c.Technician WHERE STR_TO_DATE(t.EndTime, '%a %b %d %Y %H:%i:%s') BETWEEN STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') AND STR_TO_DATE(?, '%a %b %d %Y %H:%i:%s') GROUP BY t.Employee ORDER BY t.Employee ASC", [req.params.starttime, req.params.endtime], (err, res) => {
        if (err) {
            console.log('Error while getting the Employee Summary Report Data:' + err);
            result(null, err);
        } else {
            console.log('Fetching the Employee Summary Report was Successful:', res);
            result(null, res);
        }
    });
}

//getClientHistoryReport, getCustomerErrorReport
module.exports = Reports; 