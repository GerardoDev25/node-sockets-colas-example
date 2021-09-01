const cors = require("cors");
const express = require("express");

// * controllers
const {
   socketsControllers,
} = require("../sockets/sockets.controllers");

class Server {
   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      // * socket server
      this.server = require("http").createServer(this.app);
      this.io = require("socket.io")(this.server);

      // * paths
      this.paths = {};

      // * middlewares
      this.middlewares();

      // * routes
      this.routes();

      // * Sockets config
      this.sockets();
   }

   // ? function that contains all middlewares of the app
   middlewares() {
      // * cors
      this.app.use(cors());

      // * public directory
      this.app.use(express.static("public"));
   }

   // ? function that handle the routes of the app
   routes() {
      // this.app.use(
      //    this.paths.uploads,
      //    require("../routes/upload.routes.js")
      // );
   }

   // ? function that config the Sockets
   sockets() {
      // * listen when the client connect
      this.io.on("connection", socketsControllers);
   }

   // ? funtion that listen the app in the port
   listen() {
      this.server.listen(this.port, () => {
         console.log("server run in port ", this.port);
      });
   }
}

module.exports = Server;
