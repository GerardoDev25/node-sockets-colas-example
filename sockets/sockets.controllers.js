// ? funtion make all in the connection and disconnetion
const socketsControllers = (socket) => {
   console.log("client connect: ", socket.id);

   // * listen when the client disconnect
   socket.on("disconnect", () => {
      console.log("client disconnect: ", socket.id);
   });

   // * when the client sned a message
   socket.on("send-message", (payload, callback) => {
      const id = 123456789;

      // * send message to client
      callback({ id });

      // * send message all other clients connects
      socket.broadcast.emit("send-message", payload);
   });
};

module.exports = { socketsControllers };
