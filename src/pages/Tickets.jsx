import { useEffect, useState } from "react";
import ticketsData from "../data/tickets";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");

  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");

    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      localStorage.setItem("tickets", JSON.stringify(ticketsData));
      setTickets(ticketsData);
    }
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const updatePriority = (id, newPriority) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, priority: newPriority } : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const deleteTicket = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) return;

    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const saveEdit = (e) => {
    e.preventDefault();

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === editingTicket.id ? editingTicket : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    setEditingTicket(null);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priority === "All" || ticket.priority === priority;

    const matchesStatus =
      status === "All" || ticket.status === status;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div>
      <h1>Support Tickets</h1>

      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      {filteredTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        filteredTickets.map((ticket) => (
          <div key={ticket.id}>
            <h3>{ticket.id}</h3>

            <p>Customer: {ticket.customerName}</p>
            <p>Email: {ticket.email}</p>
            <p>Subject: {ticket.subject}</p>
            <p>Description: {ticket.description}</p>

            <label>Priority: </label>

            <select
              value={ticket.priority}
              onChange={(e) =>
                updatePriority(ticket.id, e.target.value)
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <br />

            <label>Status: </label>

            <select
              value={ticket.status}
              onChange={(e) =>
                updateStatus(ticket.id, e.target.value)
              }
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <br />

            <button onClick={() => setEditingTicket({ ...ticket })}>
              Edit
            </button>

            <button onClick={() => deleteTicket(ticket.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}

      {editingTicket && (
        <div>
          <h2>Edit Ticket</h2>

          <form onSubmit={saveEdit}>
            <label>Subject</label>

            <input
              type="text"
              value={editingTicket.subject}
              onChange={(e) =>
                setEditingTicket({
                  ...editingTicket,
                  subject: e.target.value,
                })
              }
            />

            <br />

            <label>Description</label>

            <textarea
              value={editingTicket.description}
              onChange={(e) =>
                setEditingTicket({
                  ...editingTicket,
                  description: e.target.value,
                })
              }
            />

            <br />

            <button type="submit">Save Changes</button>

            <button
              type="button"
              onClick={() => setEditingTicket(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tickets;