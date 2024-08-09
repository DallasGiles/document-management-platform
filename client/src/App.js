import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { Outlet } from "react-router-dom";
//import { AuthContext } from './context/AuthContext'; // Assuming you have an AuthContext to provide user info

function App() {
  //const { user } = useContext(AuthContext);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <nav class="bg-white w-screen border-b border-gray-300">
          <div class="flex justify-between items-center">
            <div class="mx-auto h-16 flex items-center">
              <h1>CONSTRUCT COMMS</h1>
            </div>
            <div class="space-x-4">
              <button>
                <i class="fas fa-bell text-cyan-500 text-lg" id="notification"></i>
              </button>
              <button>
                <i class="fas fa-user pr-6 text-cyan-500 text-lg" id="profile"></i>
              </button>
            </div>
          </div>
        </nav>

        <div class="z-50 relative">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
