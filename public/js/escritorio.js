const lblDestop = document.querySelector("h1");
const btnNew = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
   window.location = "index.html";
   throw new Error("the desktop is required");
}

const desktop = searchParams.get("escritorio");
divAlerta.style.display = "none";

lblDestop.textContent = desktop;

const socket = io();

socket.on("connect", () => {
   btnNew.disabled = false;
});

socket.on("disconnect", () => {
   btnNew.disabled = true;
});

socket.on("total-tickets", (totalTickets) => {
   if (!totalTickets) lblPendientes.style.display = "none";
   else {
      lblPendientes.style.display = "";
      lblPendientes.textContent = totalTickets;
   }
});

btnNew.addEventListener("click", () => {
   socket.emit(
      "attend-ticket",
      { desktop },
      ({ ok, ticket, msg }) => {
         if (!ok) {
            lblTicket.textContent = `.Any`;

            return (divAlerta.style.display = "");
         }
         lblTicket.textContent = `Ticket: ${ticket.number}`;
      }
   );
});
