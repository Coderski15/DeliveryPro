import React, { useEffect, useState } from "react";
import client from "../../lib/axios";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice"; // Assuming logout action exists in your slice

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const [editingUser, setEditingUser] = useState(null); // Track the user being edited
    const token = localStorage.getItem("authToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await client.get("/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const createUser = async () => {
        try {
            const response = await client.post("/admin/users", newUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers([...users, response.data]);
            setNewUser({ username: "", email: "", password: "" });
            toast.success("User created successfully!");
        } catch (error) {
            console.error("Error creating user", error);
            toast.error("Error creating user!");
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            const response = await client.put(`/admin/users/${id}`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.map((user) => (user._id === id ? response.data : user)));
            setEditingUser(null); // Close the edit form after update
            toast.success("User updated successfully!");
        } catch (error) {
            console.error("Error updating user", error);
            toast.error("Error updating user!");
        }
    };

    const deleteUser = async (id) => {
        try {
            await client.delete(`/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== id));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user", error);
            toast.error("Error deleting user!");
        }
    };

    const handleLogout = async () => {
        try {
            await client.delete('/auth/logout'); // Adjust the endpoint as needed
            localStorage.removeItem("authToken")
            dispatch(logout());
            navigate("/login"); // Redirect to login page after logout
            window.location.reload(); // Refresh page after logout
            toast.success("Logout successful!")
        } catch (error) {
            toast.error("Logout failed!")
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">User Management</h2>

            {/* Create User Form */}
            <div className="mb-6 p-4 border rounded-lg bg-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Add New User</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={createUser}
                        className="w-full bg-indigo-600 text-white p-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition duration-300"
                    >
                        <FaPlusCircle />
                        <span>Create User</span>
                    </button>
                </div>
            </div>

            {/* Edit User Form */}
            {editingUser && (
                <div className="mb-6 p-4 border rounded-lg bg-white shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Edit User</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={editingUser.username}
                            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            onClick={() => updateUser(editingUser._id, editingUser)}
                            className="w-full bg-indigo-600 text-white p-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition duration-300"
                        >
                            <FaEdit />
                            <span>Update User</span>
                        </button>
                    </div>
                </div>
            )}

            {/* User List */}
            <div>
                <h3 className="text-xl font-semibold mb-4">User List</h3>
                {users.length > 0 ? (
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user._id} className="p-4 border rounded-lg bg-white shadow-md flex justify-between items-center">
                                <div>
                                    <span className="text-lg font-semibold">{user.username}</span>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setEditingUser(user)} // Set user for editing
                                        className="text-yellow-500 hover:text-yellow-600 transition duration-200"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user._id)} // Call deleteUser
                                        className="text-red-500 hover:text-red-600 transition duration-200"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
