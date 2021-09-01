const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl()

// ? funtion make all in the connection and disconnetion
const socketsControllers = (socket) => {
   //

   // * when the client sned a message
   socket.on("send-message", (payload, callback) => {
      const id = 123456789;

      // * send message to client
      callback(id);

      // * send message all other clients connects
      socket.broadcast.emit("send-message", payload);
   });
};

module.exports = { socketsControllers };
