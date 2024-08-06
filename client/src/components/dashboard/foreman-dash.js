import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SITE_PLANS, APPROVE_PLAN, GET_USERS_UNDER_FOREMAN } from '../../apollo/queries';

const ForemanDashboard = ({ user }) => {
  const { loading: plansLoading, error: plansError, data: plansData } = useQuery(GET_SITE_PLANS);
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS_UNDER_FOREMAN, {
    variables: { foremanId: user.id },
  });
  const [approvePlan] = useMutation(APPROVE_PLAN);

  const handleApprove = async (planId) => {
    try {
      await approvePlan({ variables: { planId } });
      // Refresh the list or handle successful approval
    } catch (error) {
      console.error('Error approving plan:', error);
    }
  };

  if (plansLoading || usersLoading) return <p>Loading...</p>;
  if (plansError) return <p>Error loading plans: {plansError.message}</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <div>
      <h1>Foreman Dashboard</h1>
      <h2>Site Plans</h2>
      <ul>
        {plansData.sitePlans.map((plan) => (
          <li key={plan.id}>
            <h3>{plan.title}</h3>
            <p>Status: {plan.status}</p>
            <button onClick={() => handleApprove(plan.id)}>Approve</button>
          </li>
        ))}
      </ul>
      <h2>Team Members</h2>
      <ul>
        {usersData.usersUnderForeman.map((user) => (
          <li key={user.id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForemanDashboard;