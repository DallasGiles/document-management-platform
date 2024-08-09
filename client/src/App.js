
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { Outlet } from "react-router-dom";
//import { AuthContext } from './context/AuthContext'; // Assuming you have an AuthContext to provide user info

function App() {
 //const { user } = useContext(AuthContext);

  return (
    <ApolloProvider client={client}>
          <Outlet />
    </ApolloProvider>
  );
}


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

export default App;

