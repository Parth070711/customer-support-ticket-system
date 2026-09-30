import { useEffect, useState } from "react";
import ticketsData from "../data/tickets";

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");

    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      localStorage.setItem("tickets", JSON.stringify(ticketsData));
      setTickets(ticketsData);
    }
  }, []);

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <div>
      <h1>Customer Support Dashboard</h1>

      <div>
        <h2>Total Tickets</h2>
        <p>{totalTickets}</p>
      </div>

      <div>
        <h2>Open Tickets</h2>
        <p>{openTickets}</p>
      </div>

      <div>
        <h2>In Progress</h2>
        <p>{inProgressTickets}</p>
      </div>

      <div>
        <h2>Resolved</h2>
        <p>{resolvedTickets}</p>
      </div>
    </div>
  );
}

export default Dashboard;