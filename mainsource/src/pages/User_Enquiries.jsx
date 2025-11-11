import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MyProfile_Sidebar from "../components/MyProfile_Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import whatsapp from "../assets/whatsapp.svg";
import TopHeader from "../components/TopHeader";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GoToTop from "../components/GoToTop";

const User_Enquiries = () => {
  const [userLogedIn, setUserLogedIn] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const token = localStorage.getItem("loginid");
  const [apiData, setApiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Enquiries - Innerpece";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const onClickLogin = () => {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const loggedUserDetails = localStorage.getItem("loginDetails")
      ? JSON.parse(localStorage.getItem("loginDetails"))
      : null;

    if (loggedUserDetails) {
      setUserLogedIn(true);
      const { email } = loggedUserDetails;
      setUserEmail(email);
    } else {
      setUserLogedIn(false);
    }
  }, []);

  useEffect(() => {
    const getEnquiryDetails = async () => {
      const loggedUserDetails = localStorage.getItem("loginDetails")
        ? JSON.parse(localStorage.getItem("loginDetails"))
        : null;

      try {
        setIsLoading(true); // Start loading
        const payload = {
          email: loggedUserDetails.email,
        };

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        let response = await axios.post(
          "https://backoffice.innerpece.com/api/getEnquiryDetailsByEmail",
          payload,
          { headers }
        );

        

        setApiData(response.data.data);
        // setApiData([
        //   ...response.data.data.stay_enquiry,
        //   ...response.data.data.program_enquiry,
        // ]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    getEnquiryDetails();
  }, []);

  const onClickView = (index) => {
    setSelectedDetails(apiData[index]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDetails(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }




  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* <div
        onClick={() => window.open("https://wa.me/6384131642")}
        className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
      >
        <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
          <p>Whatsapp Enquiry</p>
        </div>
        <img
          src={whatsapp}
          className="h-10 w-10  transition-all duration-500"
        />
      </div> */}
      <GoToTop/>


      {/* <TopHeader/> */}

      <Header />

      <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>
         
          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">
             Enquiries
          </p>
        </div>

      <div className="flex flex-col md:flex-row pt-10 pb-4 px-5 md:px-10 gap-5">
        {/* Sidebar */}
        <div className="basis-1/12">
          <MyProfile_Sidebar />
        </div>
        {userLogedIn && (
          <div className="basis-full shadow-md md:basis-3/4 overflow-x-auto bg-white text-black px-6 rounded-md p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-opacity-80"></div>
              </div>
            ) : apiData.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    <th className="border border-gray-300 px-4 py-2">S.no</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Title</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.slice().map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {item.created_at.split("T")[0]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {item.program_title}
                        {item.stay_title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => onClickView(index)}
                          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-[50vh] flex items-center justify-center">
                <p className="text-xl text-center w-full font-medium">
                  No Enquiries Found
                </p>
              </div>
            )}
          </div>
        )}

        {userLogedIn === false && (
          <div className="flex justify-center w-full mt-10 h-screen">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              Please{" "}
              <span
                onClick={onClickLogin}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>{" "}
              to view your enquiries
            </h1>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/20">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {selectedDetails.program_title}
              {selectedDetails.stay_title}
            </h2>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span>{" "}
                {selectedDetails.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {selectedDetails.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span>{" "}
                {selectedDetails.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">My Location:</span>{" "}
                {selectedDetails.location}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Days to Travel:</span>{" "}
                {selectedDetails.days
                  ? selectedDetails.days
                  : selectedDetails.no_of_days}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Destination:</span>{" "}
                {selectedDetails.travel_destination
                  ? selectedDetails.travel_destination
                  : selectedDetails.location}
              </p>
              {selectedDetails.budget_per_head && (
                <p className="text-gray-700">
                  <span className="font-semibold">Budget per Head:</span>{" "}
                  {selectedDetails.budget_per_head}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Total Count:</span>{" "}
                {selectedDetails.total_count}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Male Count:</span>{" "}
                {selectedDetails.male_count}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Female Count:</span>{" "}
                {selectedDetails.female_count}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Child Count:</span>{" "}
                {selectedDetails.child_count}
              </p>

              {selectedDetails.travel_date && (
                <p className="text-gray-700">
                  <span className="font-semibold">Travel Date:</span>{" "}
                  {selectedDetails.travel_date}
                </p>
              )}

              {selectedDetails.rooms_count && (
                <p className="text-gray-700">
                  <span className="font-semibold">Rooms Required:</span>{" "}
                  {selectedDetails.rooms_count}
                </p>
              )}
              {selectedDetails.checkin_date && (
                <p className="text-gray-700">
                  <span className="font-semibold">Checkin Date:</span>{" "}
                  {selectedDetails.checkin_date}
                </p>
              )}
              {selectedDetails.checkout_date && (
                <p className="text-gray-700">
                  <span className="font-semibold">Checkout Date:</span>{" "}
                  {selectedDetails.checkout_date}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Cab Needed:</span>{" "}
                {selectedDetails.cab_need
                  ? selectedDetails.cab_need
                  : selectedDetails.cab}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Comments:</span>{" "}
                {selectedDetails.comments}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-fit px-5 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default User_Enquiries;
