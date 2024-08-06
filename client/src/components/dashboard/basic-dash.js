import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SITE_PLANS } from '../../apollo/queries';

const BasicUserDashboard = () => {
  const { loading, error, data } = useQuery(GET_SITE_PLANS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Basic User Dashboard</h1>
      <ul>
        {data.sitePlans.map((plan) => (
          <li key={plan.id}>
            <h2>{plan.title}</h2>
            <p>Status: {plan.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasicUserDashboard;