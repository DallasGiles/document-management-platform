import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { Outlet } from "react-router-dom";
//import { AuthContext } from './context/AuthContext'; // Assuming you have an AuthContext to provide user info

function App() {
  // const { user } = useContext(AuthContext);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <nav className="bg-blue-950 w-full pt-2 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div className="mx-auto h-16 flex items-center">
              <h1 className="flex flex-col text-center font-mono font-bold pl-16 text-2xl text-white">
                CONSTRUCT COMMS
              </h1>
            </div>
            <div className="space-x-3 flex">
              <button>
                <i
                  className="fas fa-bell text-white text-lg hover:text-green-500"
                  id="notification"
                ></i>
              </button>
              <button>
                <i
                  className="fas fa-user pr-4 text-white text-lg hover:text-green-500"
                  id="profile"
                ></i>
              </button>
            </div>
          </div>
        </nav>

        <div className="z-50 relative">
          <Outlet />
        </div>
        <div>
          <footer class="footer footer-center p-3 bg-gray-300 text-gray-800">
            <div class="text-center">
              <p>
                Copyright © 2024          
              </p>
            </div>
          </footer>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
