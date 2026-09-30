import { useState } from "react";
import ticketsData from "../data/tickets";

function CreateTicket() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    subject: "",
    description: "",
    priority: "Medium",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.email ||
      !formData.subject ||
      !formData.description
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }

    const storedTickets = JSON.parse(
      localStorage.getItem("tickets") || "null"
    );

    const currentTickets = storedTickets || ticketsData;

    const newTicket = {
      id: `TKT-${String(currentTickets.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "Open",
    };

    localStorage.setItem(
      "tickets",
      JSON.stringify([...currentTickets, newTicket])
    );

    setMessage("Ticket created successfully!");

    setFormData({
      customerName: "",
      email: "",
      subject: "",
      description: "",
      priority: "Medium",
    });
  };

  return (
    <div>
      <h1>Create Support Ticket</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">Create Ticket</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTicket;