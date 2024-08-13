function EmployeePage() {
    return (
        <>
        <div class="bg-gray-300 w-full lg:w-3/4 transition-all duration-200 ease-in-out">
          <div class="flex items-center w-full mt-2">
           
          </div>
  
          <div class="grid grid-cols-1 gap-4 p-4">
            <div class="bg-white p-4 rounded-md">
              <h2 class="text-gray-600 text-lg font-semibold pb-4">
                Current Project
              </h2>
              <div
                class="chart-container, flex items-center justify-center"
               
              >
                
                <object
                  class="pdf"
                  data="Blueprint2-1.pdf"
                  width="140%"
                  height="500"
                ></object>
              </div>
            </div>
  
            <div class="bg-white p-4 rounded-md">
              <h2 class="text-gray-600 text-lg font-semibold">
                Project Details
              </h2>
              <div
                class="chart-container"
                style={{
                  position: "relative",
                  height: "200px",
                  width: "auto",
                }}             
              > <div class="flex w-auto h-full items-center justify-center shadow-lg mt-3 p-5 mb-4">
              <p > PLACE HOLDER </p>       
              </div>      
                <canvas id="commercesChart"></canvas>
              </div>
            </div>
  
            <div class="bg-white p-4 rounded-md">
              <h2 class="text-gray-600 text-lg font-semibold">
                Create New Details To project
              </h2>
              <div class="flex mx-auto items-center justify-center shadow-lg mt-5 mb-4">
                <form class="flex w-auto bg-white rounded-lg px-4 pt-2">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-full px-3 mb-2 mt-2">
                      <textarea
                        class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="Type Your Details"
                        required
                      ></textarea>
                    </div>
                    <div class="w-full md:w-full flex items-start md:w-full px-3">
                      <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                        <svg
                          fill="none"
                          class="w-5 h-5 text-gray-600 mr-1"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p class="text-xs md:text-sm pt-px">
                          when submitted, details will be public
                        </p>
                      </div>
                      <div class="-mr-1">
                        <input
                          id="pdf-upload"
                          type="submit"
                          class="bg-white  text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide m-4 hover:bg-gray-100"
                          value="+PDF"
                        />
                        <input
                          id = "submit"
                          type="submit"
                          class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                          value="Post Details"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default EmployeePage;