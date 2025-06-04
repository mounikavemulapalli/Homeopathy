/** @format */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { universalURL } from "../UniversalURL";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${universalURL}/api/auth/signup`,
        formData
      );
      console.log("Sign Up Data:", response.data);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.response.data);
      alert("Error during signup: " + error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                placeholder='abc'
                required
                value={formData.name}
                onChange={handleChange}
                className='w-full p-3 mt-1 border border-gray-300 rounded-md'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='abc@gmail.com'
                required
                value={formData.email}
                onChange={handleChange}
                className='w-full p-3 mt-1 border border-gray-300 rounded-md'
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='abc@1234'
                required
                value={formData.password}
                onChange={handleChange}
                className='w-full p-3 mt-1 border border-gray-300 rounded-md'
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className='text-center'>
          <p className='mt-4 text-black-600'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='mt-4 text-blue-600 hover:text-blue-800'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
