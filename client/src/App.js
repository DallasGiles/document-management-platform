import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <nav class="bg-white border-b border-gray-300">
          <div class="flex justify-between items-center px-6">
            <button id="menu-button" onclick="expandSidebar()">
              <i class="fas fa-bars text-cyan-500 text-lg"></i>
            </button>
            <div class="mx-auto h-16 flex items-center">
              <h1>JOB COMS</h1>
            </div>
            <div class="space-x-4">
              <button>
                <i class="fas fa-bell text-cyan-500 text-lg"></i>
              </button>
              <button>
                <i class="fas fa-user text-cyan-500 text-lg"></i>
              </button>
            </div>
          </div>
        </nav>

        {/* SIDEBAR */}
        <div
          id="sidebar"
          class="w-auto bg-white h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden"
        >
          <div class="p-2 space-y-4">
            <button
              class="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onclick="highlightSidebarItem(this)"
            >
              <i class="fas fa-home text-lg"></i>
              <span class="font-medium transition-all duration-200 opacity-0">
                Inicio
              </span>
            </button>

            <button
              class="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onclick="highlightSidebarItem(this)"
            >
              <i class="fas fa-check-circle"></i>
              <span class="font-medium transition-all duration-200 opacity-0">
                Autorizaciones
              </span>
            </button>

            <button
              class="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onclick="highlightSidebarItem(this)"
            >
              <i class="fas fa-users"></i>
              <span class="font-medium transition-all duration-200 opacity-0">
                Usuarios
              </span>
            </button>

            <button
              class="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onclick="highlightSidebarItem(this)"
            >
              <i class="fas fa-store"></i>
              <span class="font-medium transition-all duration-200 opacity-0">
                Comercios
              </span>
            </button>

            <button
              class="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onclick="highlightSidebarItem(this)"
            >
              <i class="fas fa-exchange-alt"></i>
              <span class="font-medium transition-all duration-200 opacity-0">
                Transacciones
              </span>
            </button>

            <button
              class="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onclick="highlightSidebarItem(this)"
            >
              <i class="fas fa-sign-out-alt"></i>
              <span class="font-medium transition-all duration-200 opacity-0">
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
        {/* SIDEBAR ENDS */}
        <div class="z-50 relative">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

{
  /* <script>
    function expandSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.ml-16');

        if (sidebar.style.width === '16rem') {
            sidebar.style.width = '4rem';
            mainContent.style.marginLeft = '4rem';
            sidebar.classList.remove('text-left', 'px-6');
            sidebar.classList.add('text-center', 'px-0');
        } else {
            sidebar.style.width = '16rem';
            mainContent.style.marginLeft = '16rem';
            sidebar.classList.add('text-left', 'px-6');
            sidebar.classList.remove('text-center', 'px-0');
        }

        const labels = sidebar.querySelectorAll('span');
        labels.forEach(label => label.classList.toggle('opacity-0'));
    }

    function highlightSidebarItem(element) {
    const buttons = document.querySelectorAll("#sidebar button");
    buttons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-cyan-500', 'text-white', 'w-48', 'ml-0');
        btn.firstChild.nextSibling.classList.remove('text-white');
    });
    element.classList.add('bg-gradient-to-r', 'from-cyan-400', 'to-cyan-500', 'w-56', 'h-10','ml-0');
    element.firstChild.nextSibling.classList.add('text-white');
    }

    // Para la gráfica de Usuarios
    var ctx = document.getElementById('usersChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Usuarios Nuevos', 'Usuarios Registrados'],
            datasets: [{
                data: [50, 50],
                backgroundColor: ['cyan', 'yellow'],
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Para la gráfica de Comercios
    var ctx2 = document.getElementById('commercesChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Comercios Nuevos', 'Comercios Registrados'],
            datasets: [{
                data: [60, 40],
                backgroundColor: ['cyan', 'yellow'],
            }]
        },
        options: {
            responsive: true,
        }
    });
</script> */
}
