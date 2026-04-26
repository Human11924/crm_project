import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function UserProfilePage() {
  const { users } = useContext(UserContext);
  const { id } = useParams();

  const user = users.find((item) => item.id === Number(id));

  if (!user) {
    return (
      <div className="page profile-page">
        <h2>User not found</h2>
        <Link className="secondary-btn back-btn" to="/">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <Link className="secondary-btn back-btn" to="/">
        Back
      </Link>

      <div className="profile-card">
        <h1>
          {user.firstName} {user.lastName}
        </h1>

        <img src={user.image} alt={user.firstName} />

        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Phone: {user.phone}</p>
        <p>Gender: {user.gender}</p>
      </div>
    </div>
  );
}
