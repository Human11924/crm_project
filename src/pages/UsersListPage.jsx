import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import Modal from "../components/Modal";
import UserFormModal from "../components/UserFormModal";
import UserItem from "../components/UserItem";

export default function UsersListPage() {
  const location = useLocation();
  const { users, loading, error } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase());
  });

  const openAddModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!location.hash) return;

    const target = document.querySelector(location.hash);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
      <section className="intro-section" id="about-section">
        <div className="intro-content">
          <div className="intro-left">
            <h1 className="intro-title">MINI CRM</h1>
            <h2 className="intro-subtitle">MADE BY TEAM 3</h2>
            <p className="intro-team">ALTYNAI MIRGUL IMRAN ALMIRA NAZIKA</p>
          </div>

          <div className="intro-right">
            <h3 className="intro-right-title">About The Project</h3>
            <p className="intro-right-text">
              Mini CRM (Customer Relationship Management) helps teams manage
              contact information in one place.
              You can browse users, open detailed profiles, search by name, and
              edit records quickly from a clean interface.
            </p>
            <p className="intro-right-text">
              The goal of this project is to provide a simple and practical
              workflow for daily user management tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="users-section" id="users-section">
        <div className="page users-section-inner">
          <h1 className="users-page-title">Users</h1>

          <div className="users-page-toolbar">
            <button className="primary-btn" onClick={openAddModal}>
              Add User
            </button>

            <div className="users-search">
              <SearchInput value={search} onSearch={setSearch} />
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <div className="users-list">
            {filteredUsers.map((user) => (
              <UserItem key={user.id} user={user} onEdit={openEditModal} />
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserFormModal user={selectedUser} onClose={closeModal} />
      </Modal>
    </>
  );
}
