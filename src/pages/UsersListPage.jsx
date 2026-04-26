import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";

export default function UsersListPage() {
  const { users, loading, error } = useContext(UserContext);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase());
  });

  return (
    <div className="page">
      <h1>Mini CRM</h1>

      <SearchInput value={search} onSearch={setSearch} />

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      <div className="users-list">
        {filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.image} alt={user.firstName} />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <a href={`/users/${user.id}`}>Открыть профиль</a>
          </div>
        ))}
      </div>
    </div>
  );
}