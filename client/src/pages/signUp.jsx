import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SIGN_UP, GET_USERS } from '../apollo/queries';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Basic User',
    organization: '',
    foreman: '',
  });
  const [signUp] = useMutation(SIGN_UP);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data) {
      setFormData((prevData) => ({
        ...prevData,
        foreman: data.users.find((user) => user.role === 'Foreman')?.id || '',
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp({ variables: { ...formData } });
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
// TODO: Remove references to username. Email is used for login so username is unecessary
// TODO: Fix foremen selection option
  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Sign Up</div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              name="email"
              placeholder="Email"
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

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-4">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          required
        />
      </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            >
              <option value="Basic User">Basic User</option>
              <option value="Foreman">Foreman</option>
            </select>
          </div>

          {formData.role === 'Basic User' && (
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <select
                name="foreman"
                value={formData.foreman}
                onChange={handleChange}
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              >
                {loading && <option>Loading foremen...</option>}
                {error && <option>Error loading foremen</option>}
                {data &&
                  data.users
                    .filter((user) => user.role === 'Foreman')
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            Sign Up
          </button>
          <p className="text-center text-lg">
          Already have an account?{' '}
          <Link
            to="/"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
        </form>
      </section>
    </main>
  );
};

export default SignUp;