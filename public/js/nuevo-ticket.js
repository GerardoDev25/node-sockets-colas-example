const ele = (element) => document.querySelector(element);

const lblNuevoTicket = ele("#lblNuevoTicket");
const buttonCreate = ele("button");

const socket = io();

socket.on("connect", () => {
   buttonCreate.disabled = false;
});

socket.on("disconnect", () => {
   buttonCreate.disabled = true;
});

socket.on("last-ticket", (last) => {
   lblNuevoTicket.textContent = "Ticket: " + last;
});

buttonCreate.addEventListener("click", () => {
   socket.emit("next-ticket", null, (ticket) => {
      lblNuevoTicket.textContent = ticket;
   });
});
