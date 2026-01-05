import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Register = () => {
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') || 'student';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: initialRole,
        phone: '',
        location: ''
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="student">Student</option>
                        <option value="runner">Runner</option>
                        <option value="shopkeeper">Shopkeeper</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input name="name" type="text" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input name="email" type="email" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input name="password" type="password" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Phone</label>
                    <input name="phone" type="text" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                {formData.role === 'student' && (
                    <div>
                        <label className="block text-gray-700">Dorm/Location</label>
                        <input name="location" type="text" onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                )}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Register;
