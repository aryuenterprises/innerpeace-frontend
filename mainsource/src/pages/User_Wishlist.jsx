import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let MyProfile_Sidebar = lazy(() => import("../components/MyProfile_Sidebar"));
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";

import { PiStarFourFill } from "react-icons/pi";
import defaultimage from "../assets/defaultimg.png"; /* Sidebar */
import axios from "axios";
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";

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
      <div
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
      </div>

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />
        <div className="flex flex-col md:flex-row pt-10 pb-4 px-5 md:px-10 gap-5">
          {/* Sidebar */}
          <div className="basis-1/12">
            <MyProfile_Sidebar />
          </div>

          {userLogedIn && (
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
                      // .reverse()
                      .map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {item.created_at.split("T")[0]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {/* {item.program_dts.title} */}
                            {/* {item?.stay_dts?.stay_title} */}
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
