// src/App.js
import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import Home from './pages/Home';
import ForemanDashboard from './components/Dashboard/ForemanDashboard';
import BasicUserDashboard from './components/Dashboard/BasicUserDashboard';
import { AuthContext } from './context/AuthContext'; // Assuming you have an AuthContext to provide user info

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {user.role === 'Foreman' ? (
          <ForemanDashboard />
        ) : (
          <BasicUserDashboard />
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;