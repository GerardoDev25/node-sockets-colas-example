const path = require("path");
const fs = require("fs");

class Ticket {
   constructor(number, desktop) {
      this.number = number;
      this.desktop = desktop;
   }
}

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

   // ? function that add new ticket
   next() {
      this.last += 1;
      const ticket = new Ticket(this.last, null);
      this.tickets.push(ticket);

      this.saveDB();
      return "Ticket: " + ticket.number;
   }

   // ? function that attend last ticket
   attendTicket(desktop) {
      if (!this.tickets.length) return null;

      // * get last ticket and delete
      const ticket = this.tickets.shift();

      ticket.desktop = desktop;

      // * add to init the ticket to array
      this.last4.unshift(ticket);

      if (this.last4.length > 4) this.last4.splice(-1, 1);

      // * save to data
      this.saveDB();

      return ticket;
   }
}

module.exports = TicketControl;
