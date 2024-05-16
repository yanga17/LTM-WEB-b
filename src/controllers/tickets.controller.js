const TicketsModel = require('../models/tickets.model');

exports.getTickets = (req, res) => {
  TicketsModel.getTickets((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getEachTicket = (req, res) => {
  TicketsModel.getEachTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getActiveTickets = (req, res) => {
  TicketsModel.getActiveTickets((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getEachActiveTicket = (req, res) => {
  TicketsModel.getEachActiveTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


exports.insertLoggedTicket = (req, res) => {
  TicketsModel.insertLoggedTicket(req, (err, employee) => {
    if (err) {
      employee.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    employee.message = "Success";
    res.send(employee);
  })
}

//update logged ticket with endtime 4 tblcalls
exports.updateLoggedTicket = (req, res) => {
  TicketsModel.updateLoggedTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.endActiveTicket = (req, res) => {
  TicketsModel.endActiveTicket(req, (err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getCustomers = (req, res) => {
  TicketsModel.getCustomers((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getErrors = (req, res) => {
  TicketsModel.getErrors((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getEmployees = (req, res) => {
  TicketsModel.getEmployees((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getTypes = (req, res) => {
  TicketsModel.getTypes((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

//insert 4 StartCall
exports.insertStartCallTicket = (req, res) => {
  TicketsModel.insertStartCallTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while inserting the ticket.' });
    } else {
      res.send({ message: 'Ticket inserted successfully.', data: result });
    }
  });
}

exports.endActiveTicketSolution = (req, res) => {
  TicketsModel.endActiveTicketSolution(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while updating the ActiveTickets Solution.' });
    } else {
      res.send({ message: 'Ticket Solution updated successfully.', data: result });
    }
  });
}

exports.insertDeletedTicket = (req, res) => {
  TicketsModel.insertDeletedTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while inserting the ticket.' });
    } else {
      res.send({ message: 'Ticket inserted successfully.', data: result });
    }
  });
}

exports.deleteCallReason = (req, res) => {
  TicketsModel.deleteCallReason(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while updating the ActiveTickets Solution.' });
    } else {
      res.send({ message: 'Ticket Solution updated successfully.', data: result });
    }
  });
}

exports.deleteLoggedTicket = (req, res) => {
  TicketsModel.deleteLoggedTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'An error occurred while deleting the Logged Ticket.' });
    } else {
      res.send({ message: 'Logged Ticked has been deleted successfully.', data: result });
    }
  });
}


exports.insertStartActiveTicket = (req, res) => {
  TicketsModel.insertStartActiveTicket(req, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || 'An error occurred while starting an active ticket.' });
    } else {
      res.send({ message: 'Active Ticket inserted successfully.', data: result });
    }
  });
}