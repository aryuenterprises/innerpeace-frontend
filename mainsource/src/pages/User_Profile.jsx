import React, { useState } from "react";
import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
let MyProfile_Sidebar = lazy(() => import("../components/MyProfile_Sidebar"));
import axios from "axios";
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";
import Swal from "sweetalert2";
import TopHeader from "../components/TopHeader";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GoToTop from "../components/GoToTop";

const User_Profile = () => {
  const navigate = useNavigate();
  const [userLogedIn, setUserLogedIn] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dob, setDob] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [changesHappen, setChangesHappen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Profile - Innerpece";
    // const timer = setTimeout(() => {+++++++++++++++++++++++++++
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

      const {
        first_name: loggedUser_fistName,
        last_name: loggedUser_lastName,
        email: loggedUser_email,
        phone: loggedUser_phone,
        dob: loggedUser_dob,
        street: loggedUser_street,
        city: loggedUser_city,
        state: loggedUser_state,
        zip_province_code: loggedUser_zipcode,
        country: loggedUser_county,
        id: loggedUser_id,
      } = loggedUserDetails;

      setFirstName(loggedUser_fistName);
      setLastName(loggedUser_lastName);
      setEmail(loggedUser_email);
      setPhoneNo(loggedUser_phone);
      setDob(loggedUser_dob);
      setStreet(loggedUser_street);
      setCity(loggedUser_city);
      setState(loggedUser_state);
      setZipCode(loggedUser_zipcode);
      setCountry(loggedUser_county);
      setUserId(loggedUser_id);
    } else {
      setUserLogedIn(false);
    }
  }, []);

  const onChangeInput = (e) => {
    setChangesHappen(true);
    const { value, name } = e.target;
    if (name === "FirstName") {
      setFirstName(value);
    }
    if (name === "LastName") {
      setLastName(value);
    }
    if (name === "Email") {
      setEmail(value);
    }
    if (name === "PhoneNo") {
      setPhoneNo(value.slice(0, 10));
    }
    if (name === "Dob") {
      setDob(value);
    }
    if (name === "Street") {
      setStreet(value);
    }
    if (name === "City") {
      setCity(value);
    }
    if (name === "State") {
      setState(value);
    }
    if (name === "ZipCode") {
      setZipCode(value);
    }
    if (name === "Country") {
      setCountry(value);
    }
  };

  const onClickLogin = () => {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const onClickSaveChanges = async () => {
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        dob: dob,
        phone: phoneNo,
        street: street,
        city: city,
        state: state,
        zip_province_code: zipCode,
        country: country,
      };

      const response = await axios.post(
        `https://backoffice.innerpece.com/api/v1/update-profile/${userId}`,
        payload
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      localStorage.setItem("loginDetails", JSON.stringify(response.data.user));

      setChangesHappen(false);
    } catch (err) {
      console.log(err);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
  //       <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <GoToTop />

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />

        <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>

          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">Profile</p>
        </div>

        <div className="flex flex-col md:flex-row pt-10 pb-4 px-5 md:px-10 gap-5">
          {/* Sidebar */}
          <div className="basis-1/12">
            <MyProfile_Sidebar />
          </div>

          {/* Profile Form */}
          {userLogedIn && (
            <div className="basis-full">
              <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
                {/* Header */}
                <div className="p-4 md:px-6 lg:px-8 py-6 border-b">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                    Profile Settings
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Manage your personal details and preferences
                  </p>
                </div>

                {changesHappen && (
                  <div className="p-4 md:px-6 lg:px-8 pb-8  flex justify-end">
                    <button
                      onClick={onClickSaveChanges}
                      className="px-5 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl bg-blue-600 text-white font-medium
              shadow-lg shadow-blue-600/20
              hover:bg-blue-700 hover:shadow-blue-700/30
              active:scale-95 transition-all text-sm md:text-base"
                    >
                      Save Changes
                    </button>
                  </div>
                )}

                {/* Form */}
                <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      label: "First Name",
                      name: "FirstName",
                      value: firstName,
                    },
                    { label: "Last Name", name: "LastName", value: lastName },
                    {
                      label: "Email",
                      name: "Email",
                      value: email,
                      readOnly: true,
                    },
                    { label: "Phone Number", name: "PhoneNo", value: phoneNo },
                    {
                      label: "Date of Birth",
                      name: "Dob",
                      value: dob,
                      type: "date",
                    },
                    { label: "Street Address", name: "Street", value: street },
                    { label: "City", name: "City", value: city },
                    { label: "State", name: "State", value: state },
                    { label: "ZIP Code", name: "ZipCode", value: zipCode },
                    { label: "Country", name: "Country", value: country },
                  ].map((field, i) => (
                    <div key={i} className="group">
                      <label className="text-sm font-medium text-gray-600 mb-1 block">
                        {field.label}
                      </label>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={field.value}
                        readOnly={field.readOnly}
                        onChange={(e) => onChangeInput(e)}
                        className={`w-full px-5 py-4 rounded-2xl border text-gray-900
                bg-gray-50/60
                focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100
                transition-all
                ${field.readOnly && "cursor-not-allowed opacity-70"}
              `}
                      />
                    </div>
                  ))}
                </div>

                {/* Footer */}
               {changesHappen && (
                  <div className="p-4 md:px-6 lg:px-8 pb-8  flex justify-end">
                    <button
                      onClick={onClickSaveChanges}
                      className="px-5 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl bg-blue-600 text-white font-medium
              shadow-lg shadow-blue-600/20
              hover:bg-blue-700 hover:shadow-blue-700/30
              active:scale-95 transition-all text-sm md:text-base"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
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
                to view your profile
              </h1>
            </div>
          )}
        </div>

        <Footer />
      </Suspense>
    </div>
  );
};

export default User_Profile;
