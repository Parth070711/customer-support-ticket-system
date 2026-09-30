import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Customer Support</h2>

      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/create-ticket">Create Ticket</Link>
      </div>
    </nav>
  );
}

export default Navbar;