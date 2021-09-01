const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

// ? funtion make all in the connection and disconnetion
const socketsControllers = (socket) => {
   //

   socket.emit('last-ticket', ticketControl.last)
   
   // * when the client sned a message
   socket.on("next-ticket", (payload, callback) => {
      const next = ticketControl.next();

      callback(next);

      // todo next ticket
   });
};

module.exports = { socketsControllers };
