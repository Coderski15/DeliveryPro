import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, setError } from '../../redux/features/auth/authSlice.jsx';
import client from '../../lib/axios.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Access loading and error states from Redux store
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    // Handle login submission
    const handleSubmit = async () => {
        dispatch(setLoading(true)); // Set loading state
        dispatch(setError(null)); // Clear previous errors

        try {
            if (!email || !password) {
                toast.error("Please fill in all fields.");
                return;
            }

            const response = await client.post("/auth/login", { email, password });
            const data = response.data;
            // Save the token in localStorage (or use cookies/sessionStorage)
            localStorage.setItem('authToken', data.token);
            dispatch(login(data.user)); // Dispatch login action to Redux store
            toast.success("Login successful!");
            // Check the role and navigate accordingly
            if (data.user.role === 'customer') {
                navigate('/customer-dashboard'); // Redirect to customer dashboard
            } else if (data.user.role === 'delivery') {
                navigate('/delivery-dashboard'); // Redirect to delivery dashboard
            } else if (data.user.isAdmin) {
                navigate('/admindashboard'); // Redirect to admin dashboard
            } else {
                navigate('/'); // Default to home if no role matches
            }
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
            toast.error("Login failed! " + (error.response?.data?.message || ""));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
        >
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                {/* Login Card */}
                <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                    {/* Logo Image */}
                    <div className="flex justify-center">
                        {/* <img src={LogoImage} alt="Logo" className="w-24 h-24" /> */}
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">Welcome Back!!</h2>

                    {/* Form */}
                    <div className="mt-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-gray-700 flex items-center gap-2"><AiOutlineMail /> Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-700 flex items-center gap-2"><AiOutlineLock /> Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleSubmit}
                                className={`w-full py-2 px-4 bg-blue-600 font-bold text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>

                        {/* Register Link */}
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <span
                                    className="text-red-500 cursor-pointer font-bold"
                                    onClick={() => navigate('/register')}  // Navigate to the SignUp page
                                >
                                    Register Now
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;