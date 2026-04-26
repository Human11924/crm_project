import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function UserProvider({ children }) {
    const [users, setUsers] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getUsers = async () => {
        setLoading(true);
        setError(null);

        try {
        const res = await fetch("https://dummyjson.com/users")
        const data = await res.json()

        setUsers(data.users);
        } catch (err) {
        setError("Ошибка при загрузке пользователей")
        }

        setLoading(false);
    }

    const addUser = (newUser) => {
        const user = {
            id: Date.now(),
            image: newUser.image || "https://dummyjson.com/icon/user/128",
            ...newUser,
        }

        setUsers([user, ...users])
    }

    const updateUser = (id, updatedUser) => {
        const updatedUsers = users.map((user) => {

        if (user.id === id) {
            return { ...user, ...updatedUser }
        }

        return user;

        })

        setUsers(updatedUsers)
    }



    useEffect(() => {
        getUsers();
    }, [])

    return (
        <UserContext.Provider
            value={{ users, loading, error, addUser, updateUser, }} >
            {children}
        </UserContext.Provider>
    );
}