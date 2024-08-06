import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SIGN_UP, GET_USERS } from '../../apollo/queries';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
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
      history.push('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="organization"
        placeholder="Organization"
        value={formData.organization}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Basic User">Basic User</option>
        <option value="Foreman">Foreman</option>
      </select>
      {formData.role === 'Basic User' && (
        <select name="foreman" value={formData.foreman} onChange={handleChange}>
          {loading && <option>Loading foremen...</option>}
          {error && <option>Error loading foremen</option>}
          {data && data.users
            .filter(user => user.role === 'Foreman')
            .map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </select>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;