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

   useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);
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

  // Helper Components for cleaner code
  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
        {label}
      </span>
      <span className="text-sm font-bold text-gray-800">{value}</span>
    </div>
  );

  const Badge = ({ icon, label, count, color }) => (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${color}`}
    >
      <span>{icon}</span>
      <span>
        {label}: {count || 0}
      </span>
    </div>
  );
  {
    /* Helper Components for cleaner responsive logic */
  }
  const ContactItem = ({ label, value, isLink }) => (
    <div className="space-y-0.5">
      <p className="text-[9px] sm:text-[10px] uppercase font-bold text-blue-600 tracking-tight">
        {label}
      </p>
      <p
        className={`text-gray-900 font-semibold text-base sm:text-lg break-all ${
          isLink ? "underline decoration-blue-200" : ""
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );

 

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
      <GoToTop />

      {/* <TopHeader/> */}

      <Header />

      <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
        <Link to="/">
          <p className="text-xs sm:text-sm">Home</p>
        </Link>

        <MdOutlineKeyboardArrowRight className="text-xl" />
        <p className="text-blue-500 font-medium sm:font-semibold">Enquiries</p>
      </div>

      <div className="flex flex-col md:flex-row pt-10 pb-4 px-5 md:px-10 gap-5">
        {/* Sidebar */}
        <div className="basis-1/12">
          <MyProfile_Sidebar />
        </div>
        {/* {userLogedIn && (
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
        )} */}

        {userLogedIn && (
          <div className="basis-full md:basis-3/4 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold text-gray-800">My Enquiries</h2>
              {!isLoading && apiData.length > 0 && (
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {apiData.length} Records
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-[50vh] space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-500"></div>
                <p className="text-sm text-gray-400 animate-pulse">
                  Fetching data...
                </p>
              </div>
            ) : apiData.length > 0 ? (
              /* RESPONSIVE TABLE WRAPPER 
         'overflow-x-auto' allows horizontal scrolling.
         'min-w-[600px]' (on the table) ensures it doesn't collapse on small screens.
      */
              <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full text-left border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        S.No
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        Date
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        Title
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {apiData.slice().map((item, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-blue-50/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-5 text-sm text-gray-400 font-medium">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {item.created_at.split("T")[0]}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {item.program_title || item.stay_title}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                              {item.program_title
                                ? "Program Enquiry"
                                : "Stay Enquiry"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => onClickView(index)}
                            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2 text-xs font-bold text-white hover:bg-blue-600 shadow-sm active:scale-95 transition-all"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Visual Swipe Indicator for Mobile */}
                <div className="md:hidden flex items-center justify-center space-x-2 py-3 bg-gray-50/50 text-[10px] text-gray-400 italic">
                  <span>← Swipe to view more →</span>
                </div>
              </div>
            ) : (
              <div className="h-[50vh] flex flex-col items-center justify-center space-y-3">
                <div className="bg-gray-50 p-4 rounded-full">
                  <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-500 font-medium">
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
      {/* {showModal && selectedDetails && (
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
      )} */}

      {showModal && selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop with stronger blur */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/60 transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Container: On mobile it slides from bottom (items-end), on desktop it centers */}
          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 sm:zoom-in duration-300 max-h-[95vh] flex flex-col">
            {/* Mobile Handle Bar (Visual cue for mobile users) */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

            {/* Header: Adjusted padding and font size for mobile */}
            <div className="bg-gray-900 px-5 py-5 sm:px-8 sm:py-6">
              <h2 className="text-lg md:text-2xl font-bold text-white leading-tight break-words">
                {selectedDetails.program_title || selectedDetails.stay_title}
              </h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1 font-bold">
                Enquiry Details
              </p>
            </div>

            {/* Content Area: Scrollable with responsive spacing */}
            <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              {/* Contact Information Section: Stacks on mobile (grid-cols-1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
                <ContactItem
                  label="Traveler Name"
                  value={selectedDetails.name}
                />
                <ContactItem
                  label="Email Address"
                  value={selectedDetails.email}
                  isLink
                />
                <ContactItem
                  label="Phone Number"
                  value={selectedDetails.phone}
                />
                <ContactItem
                  label="Home Location"
                  value={selectedDetails.location}
                />
              </div>

              <hr className="border-gray-100 mb-6 sm:mb-8" />

              {/* Itinerary Details: 2 columns on mobile, 3 on tablet+ */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100">
                <DetailItem
                  label="Destination"
                  value={
                    selectedDetails.travel_destination ||
                    selectedDetails.location
                  }
                />
                <DetailItem
                  label="Duration"
                  value={`${
                    selectedDetails.days || selectedDetails.no_of_days
                  } Days`}
                />
                <DetailItem
                  label="Travel Date"
                  value={
                    selectedDetails.travel_date ||
                    selectedDetails.checkin_date ||
                    "N/A"
                  }
                />
                <DetailItem
                  label="Cab"
                  value={
                    selectedDetails.cab_need || selectedDetails.cab || "No"
                  }
                />
                {selectedDetails.budget_per_head && (
                  <DetailItem
                    label="Budget/Head"
                    value={selectedDetails.budget_per_head}
                  />
                )}
                {selectedDetails.rooms_count && (
                  <DetailItem
                    label="Rooms"
                    value={selectedDetails.rooms_count}
                  />
                )}
              </div>

              {/* Passenger Breakdown: Dynamic wrapping for small screens */}
              <div className="mt-8">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest text-center sm:text-left">
                  Passenger Breakdown
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                  <Badge
                    icon="👥"
                    label="Total"
                    count={selectedDetails.total_count}
                    color="bg-blue-100 text-blue-700"
                  />
                  <Badge
                    icon="♂"
                    label="Male"
                    count={selectedDetails.male_count}
                    color="bg-gray-100 text-gray-700"
                  />
                  <Badge
                    icon="♀"
                    label="Female"
                    count={selectedDetails.female_count}
                    color="bg-gray-100 text-gray-700"
                  />
                  <Badge
                    icon="👶"
                    label="Child"
                    count={selectedDetails.child_count}
                    color="bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              {/* Comments Section */}
              {selectedDetails.comments && (
                <div className="mt-8 bg-blue-50/50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">
                    Additional Comments
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{selectedDetails.comments}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer: Full-width button on mobile */}
            <div className="px-5 py-4 sm:px-8 bg-gray-50 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="w-full sm:w-auto float-none sm:float-right px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition-all shadow-sm text-sm"
              >
                Close Preview
              </button>
              <div className="clear-both"></div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default User_Enquiries;
