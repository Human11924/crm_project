import { useState } from "react";
import useUsers from "../hooks/useUsers";
import "../styles/components.css";

export default function UserFormModal({ user, onClose }) {
  const { addUser, updateUser } = useUsers();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      updateUser(user.id, formData);
    } else {
      addUser(formData);
    }

    onClose();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{user ? "Edit User" : "Add User"}</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit" className="primary-btn">
        {user ? "Save Changes" : "Add User"}
      </button>
    </form>
  );
}