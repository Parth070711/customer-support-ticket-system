import { useEffect, useMemo, useState } from "react";

const initialTickets = [
  {
    id: "TKT-001",
    customerName: "Rahul",
    email: "rahul@example.com",
    subject: "Unable to login",
    description: "I am unable to login to my account.",
    priority: "High",
    status: "Open",
  },
  {
    id: "TKT-002",
    customerName: "Priya",
    email: "priya@example.com",
    subject: "Payment issue",
    description: "My payment was completed but the order is not showing.",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "TKT-003",
    customerName: "Amit",
    email: "amit@example.com",
    subject: "Password reset",
    description: "I need help resetting my password.",
    priority: "Medium",
    status: "Resolved",
  },
];

const styles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #0f172a;
  color: #e5e7eb;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
}

/* NAVBAR */

.navbar {
  background: #111827;
  border-bottom: 1px solid #1f2937;
  padding: 18px 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #60a5fa;
  font-size: 22px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-btn {
  background: transparent;
  color: #cbd5e1;
  border: none;
  padding: 5px;
}

.nav-btn:hover,
.nav-btn.active {
  color: #60a5fa;
}

/* MAIN */

.container {
  max-width: 1200px;
  margin: auto;
  padding: 35px 20px;
}

.page-title {
  font-size: 30px;
  color: #f8fafc;
  margin-bottom: 25px;
}

/* DASHBOARD */

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
}

.stat-title {
  color: #cbd5e1;
  font-weight: 600;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 34px;
  font-weight: bold;
  color: #60a5fa;
}

/* TOOLBAR */

.toolbar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

/* INPUTS */

input,
select,
textarea {
  background: #1e293b;
  color: #e5e7eb;
  border: 1px solid #475569;
  border-radius: 7px;
  padding: 11px 13px;
}

input::placeholder,
textarea::placeholder {
  color: #94a3b8;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.search {
  min-width: 260px;
  flex: 1;
}

/* TICKETS */

.ticket-card {
  margin-bottom: 18px;
}

.ticket-id {
  color: #60a5fa;
  font-size: 19px;
  margin-bottom: 10px;
}

.ticket-card p {
  color: #cbd5e1;
  margin: 7px 0;
  line-height: 1.5;
}

.ticket-controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
}

.small-label {
  color: #cbd5e1;
  font-weight: 600;
}

/* BUTTONS */

.primary {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 7px;
  padding: 10px 16px;
}

.primary:hover {
  background: #1d4ed8;
}

.danger {
  background: #dc2626;
}

.danger:hover {
  background: #b91c1c;
}

.secondary {
  background: #334155;
  color: white;
  border: none;
  border-radius: 7px;
  padding: 10px 16px;
}

/* FORM */

.form-card {
  max-width: 850px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  color: #cbd5e1;
  font-weight: 600;
  margin-bottom: 7px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
}

textarea {
  min-height: 130px;
  resize: vertical;
}

/* MESSAGES */

.message {
  margin-top: 15px;
  padding: 11px 14px;
  border-radius: 7px;
  background: #172554;
  color: #bfdbfe;
}

.error {
  margin-top: 15px;
  padding: 11px 14px;
  border-radius: 7px;
  background: #450a0a;
  color: #fecaca;
}

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 40px;
}

/* EDIT MODAL */

.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
}

.modal {
  width: min(650px, 100%);
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 12px;
  padding: 25px;
}

.modal h2 {
  margin-bottom: 20px;
  color: #f8fafc;
}

/* RESPONSIVE */

@media (max-width: 800px) {

  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 18px 20px;
  }
}

@media (max-width: 520px) {

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .nav-links {
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  .search {
    min-width: 100%;
  }
}
`;

/* ================= DASHBOARD ================= */

function Dashboard({ tickets }) {
  const total = tickets.length;

  const open = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <main className="container">
      <h1 className="page-title">
        Customer Support Dashboard
      </h1>

      <div className="dashboard-grid">

        <div className="card">
          <div className="stat-title">
            Total Tickets
          </div>

          <div className="stat-number">
            {total}
          </div>
        </div>

        <div className="card">
          <div className="stat-title">
            Open Tickets
          </div>

          <div className="stat-number">
            {open}
          </div>
        </div>

        <div className="card">
          <div className="stat-title">
            In Progress
          </div>

          <div className="stat-number">
            {inProgress}
          </div>
        </div>

        <div className="card">
          <div className="stat-title">
            Resolved
          </div>

          <div className="stat-number">
            {resolved}
          </div>
        </div>

      </div>
    </main>
  );
}

/* ================= TICKETS ================= */

function Tickets({
  tickets,
  setTickets,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");

  const updateTicket = (id, changes) => {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...changes }
          : ticket
      )
    );
  };

  const deleteTicket = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) {
      return;
    }

    setTickets((previousTickets) =>
      previousTickets.filter(
        (ticket) => ticket.id !== id
      )
    );
  };

  const filteredTickets = useMemo(() => {

    const searchText = search.toLowerCase();

    return tickets.filter((ticket) => {

      const matchesSearch =
        ticket.id
          .toLowerCase()
          .includes(searchText) ||

        ticket.customerName
          .toLowerCase()
          .includes(searchText) ||

        ticket.subject
          .toLowerCase()
          .includes(searchText);

      const matchesPriority =
        priority === "All" ||
        ticket.priority === priority;

      const matchesStatus =
        status === "All" ||
        ticket.status === status;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    });

  }, [tickets, search, priority, status]);

  return (
    <main className="container">

      <h1 className="page-title">
        Support Tickets
      </h1>

      <div className="toolbar">

        <input
          className="search"
          placeholder="Search tickets..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option value="All">
            All Priorities
          </option>

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>
        </select>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Open">
            Open
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>
        </select>

      </div>

      {filteredTickets.length === 0 ? (

        <div className="card empty">
          No tickets found.
        </div>

      ) : (

        filteredTickets.map((ticket) => (

          <div
            className="card ticket-card"
            key={ticket.id}
          >

            <h3 className="ticket-id">
              {ticket.id}
            </h3>

            <p>
              <strong>Customer:</strong>{" "}
              {ticket.customerName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {ticket.email}
            </p>

            <p>
              <strong>Subject:</strong>{" "}
              {ticket.subject}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {ticket.description}
            </p>

            <div className="ticket-controls">

              <span className="small-label">
                Priority:
              </span>

              <select
                value={ticket.priority}
                onChange={(event) =>
                  updateTicket(
                    ticket.id,
                    {
                      priority:
                        event.target.value,
                    }
                  )
                }
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>

              <span className="small-label">
                Status:
              </span>

              <select
                value={ticket.status}
                onChange={(event) =>
                  updateTicket(
                    ticket.id,
                    {
                      status:
                        event.target.value,
                    }
                  )
                }
              >
                <option value="Open">
                  Open
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>
              </select>

              <button
                className="primary"
                onClick={() =>
                  onEdit(ticket)
                }
              >
                Edit
              </button>

              <button
                className="primary danger"
                onClick={() =>
                  deleteTicket(ticket.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))

      )}

    </main>
  );
}

/* ================= CREATE TICKET ================= */

function CreateTicket({
  tickets,
  setTickets,
}) {

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    subject: "",
    description: "",
    priority: "Medium",
  });

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleChange = (event) => {

    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    if (
      !form.customerName ||
      !form.email ||
      !form.subject ||
      !form.description
    ) {
      setError(
        "Please fill all fields."
      );

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {

      setError(
        "Please enter a valid email."
      );

      return;
    }

    let highestNumber = 0;

    tickets.forEach((ticket) => {

      const number =
        Number(
          ticket.id.replace(
            "TKT-",
            ""
          )
        );

      if (number > highestNumber) {
        highestNumber = number;
      }

    });

    const newTicket = {

      id: `TKT-${String(
        highestNumber + 1
      ).padStart(3, "0")}`,

      customerName:
        form.customerName,

      email:
        form.email,

      subject:
        form.subject,

      description:
        form.description,

      priority:
        form.priority,

      status:
        "Open",
    };

    setTickets([
      ...tickets,
      newTicket,
    ]);

    setForm({
      customerName: "",
      email: "",
      subject: "",
      description: "",
      priority: "Medium",
    });

    setMessage(
      "Ticket created successfully!"
    );
  };

  return (
    <main className="container">

      <h1 className="page-title">
        Create Support Ticket
      </h1>

      <form
        className="card form-card"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Customer Name
          </label>

          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Priority
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

        </div>

        <button
          className="primary"
          type="submit"
        >
          Create Ticket
        </button>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

      </form>

    </main>
  );
}

/* ================= EDIT MODAL ================= */

function EditModal({
  ticket,
  setTicket,
  onSave,
  onClose,
}) {

  if (!ticket) {
    return null;
  }

  return (
    <div className="modal-bg">

      <div className="modal">

        <h2>
          Edit Ticket
        </h2>

        <div className="form-group">

          <label>
            Subject
          </label>

          <input
            value={ticket.subject}
            onChange={(event) =>
              setTicket({
                ...ticket,
                subject:
                  event.target.value,
              })
            }
          />

        </div>

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            value={ticket.description}
            onChange={(event) =>
              setTicket({
                ...ticket,
                description:
                  event.target.value,
              })
            }
          />

        </div>

        <button
          className="primary"
          onClick={onSave}
        >
          Save Changes
        </button>

        <button
          className="secondary"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

/* ================= MAIN APP ================= */

export default function App() {

  const [page, setPage] =
    useState("dashboard");

  const [tickets, setTickets] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "tickets"
          );

        return saved
          ? JSON.parse(saved)
          : initialTickets;

      } catch {

        return initialTickets;

      }

    });

  const [editingTicket, setEditingTicket] =
    useState(null);

  /*
    Save ticket data whenever it changes.
  */
  useEffect(() => {

    localStorage.setItem(
      "tickets",
      JSON.stringify(tickets)
    );

  }, [tickets]);

  /*
    Add all CSS from this file.
  */
  useEffect(() => {

    const style =
      document.createElement("style");

    style.textContent = styles;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };

  }, []);

  const saveEdit = () => {

    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === editingTicket.id
          ? editingTicket
          : ticket
      )
    );

    setEditingTicket(null);
  };

  return (

    <div className="app">

      {/* NAVIGATION */}

      <nav className="navbar">

        <div className="logo">
          Customer Support
        </div>

        <div className="nav-links">

          <button
            className={`nav-btn ${
              page === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className={`nav-btn ${
              page === "tickets"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("tickets")
            }
          >
            Tickets
          </button>

          <button
            className={`nav-btn ${
              page === "create"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("create")
            }
          >
            Create Ticket
          </button>

        </div>

      </nav>

      {/* DASHBOARD */}

      {page === "dashboard" && (
        <Dashboard
          tickets={tickets}
        />
      )}

      {/* TICKETS */}

      {page === "tickets" && (
        <Tickets
          tickets={tickets}
          setTickets={setTickets}
          onEdit={setEditingTicket}
        />
      )}

      {/* CREATE TICKET */}

      {page === "create" && (
        <CreateTicket
          tickets={tickets}
          setTickets={setTickets}
        />
      )}

      {/* EDIT MODAL */}

      <EditModal
        ticket={editingTicket}
        setTicket={setEditingTicket}
        onSave={saveEdit}
        onClose={() =>
          setEditingTicket(null)
        }
      />

    </div>
  );
}