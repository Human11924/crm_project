import { Link } from "react-router-dom";
import "../styles/components.css";

export default function UserItem({ user, onEdit }) {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.firstName} />

      <h3>
        {user.firstName} {user.lastName}
      </h3>

      <p>{user.email}</p>

      <div className="card-buttons">
        <Link className="secondary-btn" to={`/users/${user.id}`}>
          View Profile
        </Link>

        <button className="primary-btn" onClick={() => onEdit(user)}>
          Edit
        </button>
      </div>
    </div>
  );
}