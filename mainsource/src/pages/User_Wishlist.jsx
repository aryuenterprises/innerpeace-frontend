import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let MyProfile_Sidebar = lazy(() => import("../components/MyProfile_Sidebar"));
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";

import { PiStarFourFill } from "react-icons/pi";
import defaultimage from "../assets/defaultimg.png"; /* Sidebar */
import axios from "axios";
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";
import TopHeader from "../components/TopHeader";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GoToTop from "../components/GoToTop";

const User_Wishlist = () => {
  const [userLogedIn, setUserLogedIn] = useState("");
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("loginid");
  const [apiData, setApiData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Wishlist - Innerpece";
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 200); // Adjust time as needed

    // return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  useEffect(() => {
    const loggedUserDetails = localStorage.getItem("loginDetails")
      ? JSON.parse(localStorage.getItem("loginDetails"))
      : null;

    if (loggedUserDetails) {
      setUserLogedIn(true);
      const { id } = loggedUserDetails;
      setUserId(id);
    } else {
      setUserLogedIn(false);
    }
  }, []);

  useEffect(() => {
    const getWishlistData = async () => {
      setLoading(true); // Start loading
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        let response = await axios.get(
          "https://backoffice.innerpece.com/api/get-wishlist",
          {
            params: {
              user_id: userId,
            },
            headers,
          }
        );
        setApiData(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getWishlistData();
  }, [userId]); // Add `userId` as a dependency

  const onClickLogin = () => {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const onClickView = (id, title, type) => {
    if (type === "stay") {
      navigate(`/staysdetails/${id}`, {
        state: { id, title },
      });
    } else if (type === "program") {
      const formattedTitleName = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

      navigate(`/${id}/${formattedTitleName}`, {
        state: { id, title },
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
  //       <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
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

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        {/* <TopHeader/> */}

        <Header />

        <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>

          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">Wishlist</p>
        </div>

        <div className="flex flex-col md:flex-row pt-10 pb-4 px-5 md:px-10 gap-5">
          {/* Sidebar */}
          <div className="basis-1/12">
            <MyProfile_Sidebar />
          </div>

          {/* {userLogedIn && (
            <div className="flex flex-col shadow-md basis-full md:basis-3/4 py-5 h-fit overflow-x-auto bg-white px-5 gap-5 rounded-md ">
              {loading ? ( // Show loading animation
                <div className="flex justify-center items-center h-[50vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-opacity-80"></div>
                </div>
              ) : apiData.length > 0 ? (
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                      <th className="border border-gray-300 px-4 py-2">S.no</th>
                      <th className="border border-gray-300 px-4 py-2">Date</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Title
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData
                      .slice()
                      
                      .map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {item.created_at.split("T")[0]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {item?.stay_dts?.stay_title}
                            {item?.program_dts?.title}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                item?.program_dts
                                  ? onClickView(
                                      item.program_dts?.id,
                                      item.program_dts?.title,
                                      "program"
                                    )
                                  : item?.stay_dts
                                  ? onClickView(
                                      item.stay_dts?.id,
                                      item.stay_dts?.stay_title,
                                      "stay"
                                    )
                                  : null
                              }
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
                <div className="h-[50vh]">
                  <p className="text-xl mx-auto text-center w-full font-medium">
                    No Wishlist Found
                  </p>
                </div>
              )}
            </div>
          )} */}
      {userLogedIn && (
  <div className="flex flex-col shadow-lg border border-gray-100 basis-full md:basis-3/4 py-6 bg-white rounded-2xl overflow-hidden">
    {/* Header Section */}
    <div className="px-6 flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800 tracking-tight">My Wishlist</h2>
      <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
        {apiData.length} Items
      </span>
    </div>

    {loading ? (
      <div className="flex justify-center items-center h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-50 border-t-blue-600"></div>
      </div>
    ) : apiData.length > 0 ? (
      /* Wrapper for horizontal scroll on mobile */
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[600px] w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="sticky left-0 bg-gray-50 z-10 px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                Title & Category
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {apiData.map((item, index) => {
              const isProgram = !!item?.program_dts;
              const data = isProgram ? item.program_dts : item?.stay_dts;
              
              return (
                <tr key={index} className="group hover:bg-blue-50/30 transition-all duration-150">
                  {/* Sticky ID column for mobile reference */}
                  <td className="sticky left-0 bg-white group-hover:bg-blue-50/30 z-10 px-6 py-5 text-sm font-medium text-gray-400 border-b border-transparent">
                    {index + 1}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                    {item.created_at.split("T")[0]}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col min-w-[200px]">
                      <span className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {data?.title || data?.stay_title}
                      </span>
                      <span className={`text-[10px] font-black uppercase mt-1 ${isProgram ? 'text-purple-500' : 'text-emerald-500'}`}>
                        {isProgram ? "Program" : "Stay"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <button
                      onClick={() => onClickView(data?.id, data?.title || data?.stay_title, isProgram ? "program" : "stay")}
                      className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all transform active:scale-95 shadow-md hover:shadow-blue-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Mobile-only Hint */}
        <div className="md:hidden px-6 py-3 bg-gray-50 text-[10px] text-gray-400 text-center italic">
          ← Swipe horizontally to see more details →
        </div>
      </div>
    ) : (
      <div className="h-[30vh] flex items-center justify-center">
        <p className="text-gray-400 font-medium">No items in your wishlist.</p>
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
                to view your wishlist
              </h1>
            </div>
          )}
        </div>

        <Footer />
      </Suspense>
    </div>
  );
};

export default User_Wishlist;
