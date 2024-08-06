import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SITE_PLANS, APPROVE_PLAN } from '../../apollo/queries';

const ForemanDashboard = () => {
  const { loading, error, data } = useQuery(GET_SITE_PLANS);
  const [approvePlan] = useMutation(APPROVE_PLAN);

  const handleApprove = async (planId) => {
    try {
      await approvePlan({ variables: { planId } });
      // Refresh the list or handle successful approval
    } catch (error) {
      console.error('Error approving plan:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Foreman Dashboard</h1>
      <ul>
        {data.sitePlans.map((plan) => (
          <li key={plan.id}>
            <h2>{plan.title}</h2>
            <p>Status: {plan.status}</p>
            <button onClick={() => handleApprove(plan.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForemanDashboard;