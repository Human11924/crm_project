import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2 className="navbar-title">Mini CRM</h2>
      </div>

      <nav className="navbar-nav">
        <Link className="navbar-link" to="/#about-section">
          About
        </Link>
        <Link className="navbar-link navbar-link-accent" to="/#users-section">
          Users
        </Link>
      </nav>
    </header>
  );
}
