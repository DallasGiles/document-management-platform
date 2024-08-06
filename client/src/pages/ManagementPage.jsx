function ManagementPage() {
  return (
    <>
      <div class="ml-16 bg-gray-100 h-screen fixed w-full lg:w-3/4 transition-all duration-200 ease-in-out">
        <div class="flex items-center w-full mt-2 p-4">
          {/* <div class="relative w-full">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i class="fas fa-search text-gray-200"></i>
            </span>
            <input
              type="text"
              class="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
              placeholder="Buscar..."
            />
          </div> */}
        </div>

        <div class="grid grid-cols-1 gap-4 mt-2 p-4">
          <div class="bg-white p-4 rounded-md">
            <h2 class="text-gray-600 text-lg font-semibold pb-4">Usuarios</h2>
            <div
              class="chart-container"
              // style="position: relative; height:200px; width:200px"
              style={{
                position: "relative",
                height: "550px",
                width: "500px",
              }}
            >
              {/* <canvas id="usersChart"></canvas> */}
              <object class="pdf" 
            data=
"Blueprint2-1.pdf"
            width="800"
            height="500">
    </object>
            </div>
          </div>

          <div class="bg-white p-4 rounded-md">
            <h2 class="text-gray-600 text-lg font-semibold pb-4">Comercios</h2>
            <div
              class="chart-container"
              style={{
                position: "relative",
                height: "200px",
                width: "200px",
              }}
            >
              <canvas id="commercesChart"></canvas>
            </div>
          </div>

          <div class="bg-white p-4 rounded-md">
            <h2 class="text-gray-600 text-lg font-semibold pb-4">
              Autorizaciones Pendientes
            </h2>
            <table class="w-full table-auto">
              <thead>
                <tr class="text-sm leading-normal">
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Foto
                  </th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Rol
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-grey-lighter">
                  <td class="py-4 px-6 border-b border-grey-light">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Foto Perfil"
                      class="rounded-full h-10 w-10"
                    />
                  </td>
                  <td class="py-4 px-6 border-b border-grey-light">
                    Juan Pérez
                  </td>
                  <td class="py-4 px-6 border-b border-grey-light text-right">
                    Administrador
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-white p-4 rounded-md">
            <h2 class="text-gray-600 text-lg font-semibold pb-4">
              Transacciones
            </h2>
            <table class="w-full table-auto">
              <thead>
                <tr class="text-sm leading-normal">
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Fecha
                  </th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-grey-lighter">
                  <td class="py-4 px-6 border-b border-grey-light">
                    Carlos Sánchez
                  </td>
                  <td class="py-4 px-6 border-b border-grey-light">
                    27/07/2023
                  </td>
                  <td class="py-4 px-6 border-b border-grey-light text-right">
                    $1500
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagementPage;
