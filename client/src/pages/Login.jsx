import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../apollo/queries';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);
  const [loginMutation] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginMutation({ variables: { ...formData } });
      login(result.data.login);
      navigate('/management'); // This will trigger the useEffect in App.js to redirect based on role
    } catch (error) {
      console.error('Error logging in:', error);
    }

    login(result.data.login);  // Assuming login expects the login data
    navigate('/');  // Redirect on successful login
  } catch (error) {
    // Log the full error and raw response for debugging
    console.error('Error logging in:', error);
    if (error.networkError?.result) {
      console.error('Raw response:', error.networkError.result);
    } else {
      console.error('Error message:', error.message);
    }
    alert('Login failed. Please check your credentials and try again.');
  }
};

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            LOG IN
          </button>
        </form>

        <a
          href="#"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >
          FORGOT PASSWORD?
        </a>

        <p className="text-center text-lg">
          No account?{' '}
          <Link
            to="/signUp"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Create One
          </Link>
        </p>

        <div className="flex justify-center space-x-4">
          <a href="/management" className="text-indigo-500 underline hover:text-indigo-300">
            Management link
          </a>
          <a href="/employee" className="text-indigo-500 underline hover:text-indigo-300">
            Employee link
          </a>
        </div>
      </section>
    </main>
  );
};

export default Login;