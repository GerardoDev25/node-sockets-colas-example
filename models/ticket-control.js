const path = require("path");
const fs = require("fs");

class TicketControl {
   constructor() {
      this.last = 0;
      this.day = new Date().getDate();
      this.tickets = [];
      this.last4 = [];

      this.init();
   }

   // ? return the info current
   get toJson() {
      return {
         last: this.last,
         day: this.day,
         tickets: this.tickets,
         last4: this.last4,
      };
   }

   // ? function that get all info update
   init() {
      const {
         last,
         day,
         tickets,
         last4,
      } = require("../db/data.json");

      if (day === this.day) {
         this.tickets = tickets;
         this.last = last;
         this.last4 = last4;
      } else this.saveDB();
   }

   // ? function that save the info
   saveDB() {
      const dbpath = path.join(__dirname, "../db/data.json");
      fs.writeFileSync(dbpath, JSON.stringify(this.toJson));
   }
}

module.exports = TicketControl;
