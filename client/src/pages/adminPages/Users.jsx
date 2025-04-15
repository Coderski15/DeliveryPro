import { useEffect, useState } from "react";
import client from "../../lib/axios";
import { FaUserAlt, FaEnvelope, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

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

    const deleteUser = async (id) => {
        const token = localStorage.getItem("authToken");
        try {
            await client.delete(`/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            <motion.h2
                className="text-3xl font-bold text-blue-700 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Users
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <motion.div
                        key={user._id}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <FaUserAlt className="text-blue-500 text-xl" />
                            <span className="font-semibold text-lg">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                            <FaEnvelope className="text-green-500 text-xl" />
                            <span className="text-gray-700">{user.email}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-3 capitalize">
                            Role: {user.role} {user.isAdmin && "(Admin)"}
                        </div>

                        <button
                            onClick={() => deleteUser(user._id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                        >
                            <FaTrashAlt />
                            Delete User
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Users;
