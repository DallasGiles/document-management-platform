import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SITE_PLANS } from '../apollo/queries';

const Home = () => {
  const { loading, error, data } = useQuery(GET_SITE_PLANS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Site Plans</h1>
      <ul>
        {data.sitePlans.map(plan => (
          <li key={plan.id}>{plan.title} - {plan.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;