import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, setError } from '../../redux/features/auth/authSlice.jsx';
import client from '../../lib/axios.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [address, setAddress] = useState("");

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // Handle registration submission
  const handleSubmit = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      if (!name || !email || !password || !phone || !role || !address) {
        toast.error("Please fill in all fields.");
        return;
      }

      const response = await client.post("/auth/register", { name, email, password, phone, role, address });
      const data = response.data;

      localStorage.setItem('authToken', data.token);
      dispatch(login(data.user));
      toast.success("Registration successful!");

      navigate('/login');
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Registration failed"));
      toast.error("Registration failed! " + (error.response?.data?.message || ""));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center mt-20">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">Register Yourself!!</h2>
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 flex items-center gap-2"><AiOutlineUser /> Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 flex items-center gap-2"><AiOutlineMail /> Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 flex items-center gap-2"><AiOutlineLock /> Password</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 flex items-center gap-2"><AiOutlinePhone /> Phone</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700">Role</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 flex items-center gap-2"><AiOutlineHome /> Address</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="mt-6">
              <button onClick={handleSubmit} className={`w-full py-2 px-4 bg-blue-600 font-bold text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Already have an account?{' '}
                <span className="text-blue-600 cursor-pointer font-bold" onClick={() => navigate('/login')}>Sign in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;