import React, { useState } from 'react';

function Registration() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        // Update formData state as the user types
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your registration API endpoint
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // Handle the response (e.g., show success message or error)
            if (!response.ok) {
                // Handle HTTP errors (e.g., 404 Not Found, 500 Internal Server Error)
                throw new Error('Registration failed');
            }

            // If registration was successful, you can handle the success case here
            // For example, you can redirect the user to a login page or display a success message.
        } catch (error) {
            // Handle any other errors that may occur during the request
            console.error('Registration error:', error.message);
            // You can also set an error state and display an error message to the user.
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <p>dwdwdwdgwdu  </p>
                {/* Form fields for username, email, password */}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange} // Apply handleInputChange to the username input
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange} // Apply handleInputChange to the email input
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange} // Apply handleInputChange to the password input
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;
