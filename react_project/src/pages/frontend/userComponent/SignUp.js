import React, { useState } from 'react';
import UserService from '../../../services/UserService';
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        gender: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.store(formData);
            if (response.status) {
                // Handle successful signup, e.g., redirect to login page, display success message
                toast.success(response.message);
            } else {
                // Handle unsuccessful signup, e.g., display error message
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="signup-form-container">
            <ToastContainer/>
            <h2 className="signup-form-title">Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-form-group">
                    <label htmlFor="name" className="signup-form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="signup-form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="username" className="signup-form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="signup-form-input"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="password" className="signup-form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="signup-form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="gender" className="signup-form-label">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        className="signup-form-select"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="signup-form-group">
                    <label htmlFor="phone" className="signup-form-label">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="signup-form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="email" className="signup-form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="signup-form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="signup-form-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
