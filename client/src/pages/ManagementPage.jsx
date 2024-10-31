import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import FileUpload from '../components/upload/fileUpload.jsx';
import { GET_SITE_PLANS } from '../apollo/queries';

function ManagementPage() {
  const [formDetails, setFormDetails] = useState(""); // State to store the textarea input
  const [projectDetails, setProjectDetails] = useState(""); // State to store submitted details

  const { loading: sitePlansLoading, error: sitePlansError, data: sitePlansData } = useQuery(GET_SITE_PLANS);

  useEffect(() => {
    if (sitePlansData) {
      console.log('getSitePlans', sitePlansData, sitePlansLoading, sitePlansError);

    }
  }, [sitePlansData]);

  // Handle textarea input change
  const handleDetailsChange = (event) => {
    setFormDetails(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setProjectDetails(formDetails); // Set the project details to display
    setFormDetails(""); // Clear the form input after submission
  };
 // TODO: We have the list of site plans in sitePlansData, we need to loop through them and display the title, status, and uploadedBy in a table with a button that opens the url of the siteplan
  return (
    <div className="bg-gray-900 w-full transition-all duration-200 ease-in-out">
      <div className="flex items-center w-full"></div>

      <div className="grid grid-cols-1  gap-6 p-6">
        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-gray-600 text-lg font-semibold">
            Current Project
          </h2>
          <button
            class="bg-blue-500 text-white shadow-lg font-medium mt-2 py-1 px-2 border border-gray-400 rounded-lg tracking-wide uppercase hover:bg-red-700"
            data-ripple-light="true"
          >
            delete
          </button>
          <div className="chart-container flex items-center px-8 py-3 justify-center">
            <object
              className="pdf"
              data="Blueprint2-1.pdf"
              width="140%"
              height="500"
            ></object>
          </div>
        </div>

        <div className="bg-gray-200  p-4 rounded-lg">
          <h2 className="text-gray-600 text-lg font-semibold">
            Project Details
          </h2>
          <button
            class="bg-blue-500 text-white shadow-lg font-medium mt-2 py-1 px-2 border border-gray-400 rounded-lg tracking-wide uppercase hover:bg-red-700"
            data-ripple-light="true"
          >
            delete
          </button>
          <div
            className="bg-white rounded-md chart-container"
            style={{
              position: "relative",
              height: "200px",
              width: "auto",
            }}
          >
            <div className="flex w-auto h-full items-center justify-center shadow-lg mt-3 p-5 mb-4">
              <p>PLACE HOLDER</p>
            </div>

            <canvas id="commercesChart"></canvas>
          </div>
          
        </div>

        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-gray-600 text-lg font-semibold">
            Create New Details To project
          </h2>
          <div className=" mx-auto items-center justify-center  mt-5 mb-4">
            <form className=" w-auto bg-white rounded-lg px-4 pt-2">
              <div className=" flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body"
                    placeholder="Type Your Details"
                    required
                  ></textarea>
                </div>
                <div className="w-full md:w-full  items-start md:w-full px-3">
                  <div className="flex items-start text-gray-700 px-2 mr-auto">
                    <svg
                      fill="none"
                      className="w-5 h-5 text-gray-600 mr-1"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs md:text-sm pt-px">
                      when submitted, details will be public
                    </p>
                  </div>
                  <div className="p-2">
                    <FileUpload />
                    <input
                      id="submit"
                      type="submit"
                      className="bg-blue-500 uppercase text-white shadow-lg font-medium p-2 mb-3 ml-2 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-green-400"
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
  );
}

export default ManagementPage;
