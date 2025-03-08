import { useEffect, useState } from "react";
import client from "../../lib/axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("authToken");
        const response = await client.get("/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id} className="p-2 border-b">{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
