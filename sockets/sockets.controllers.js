const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

// ? funtion make all in the connection and disconnetion
const socketsControllers = (socket) => {
   //

   socket.emit("last-ticket", ticketControl.last);

   // * when the client send a message
   socket.on("next-ticket", (payload, callback) => {
      const next = ticketControl.next();

      callback(next);

      // todo next ticket
   });

   // * event that attend a ticket
   socket.on("attend-ticket", ({ desktop }, callback) => {
      if (!desktop)
         return callback({
            ok: false,
            msg: "the desktop is required",
         });

      const ticket = ticketControl.attendTicket(desktop);
      if (!ticket)
         return callback({
            ok: false,
            msg: "there are not tickets",
         });
      else
         return callback({
            ok: true,
            ticket,
         });
   });
};

module.exports = { socketsControllers };
