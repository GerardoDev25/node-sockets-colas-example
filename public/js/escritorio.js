const lblDestop = document.querySelector("h1");
const btnNew = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
   window.location = "index.html";
   throw new Error("the desktop is required");
}

const desktop = searchParams.get("escritorio");
console.log(desktop);

lblDestop.textContent = desktop;

const socket = io();

socket.on("connect", () => {
   btnNew.disabled = false;
});

socket.on("disconnect", () => {
   btnNew.disabled = true;
});

socket.on("last-ticket", (last) => {
//    lblNuevoTicket.textContent = "Ticket: " + last;
});

btnNew.addEventListener("click", () => {
//    socket.emit("next-ticket", null, (ticket) => {
//       lblNuevoTicket.textContent = ticket;
//    });
});
