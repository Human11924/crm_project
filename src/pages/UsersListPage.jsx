import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import Modal from "../components/Modal";
import UserFormModal from "../components/UserFormModal";
import UserItem from "../components/UserItem";

export default function UsersListPage() {
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

  return (
    <div className="page">
      <h1>Mini CRM</h1>

      <button className="primary-btn" onClick={openAddModal}>
        Add User
      </button>

      <SearchInput value={search} onSearch={setSearch} />

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      <div className="users-list">
        {filteredUsers.map((user) => (
          <UserItem key={user.id} user={user} onEdit={openEditModal} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserFormModal user={selectedUser} onClose={closeModal} />
      </Modal>
    </div>
  );
}