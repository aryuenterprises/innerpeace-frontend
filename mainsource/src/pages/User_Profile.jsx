import React, { useState } from "react";
import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
let MyProfile_Sidebar = lazy(() => import("../components/MyProfile_Sidebar"));
import axios from "axios";
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";
import Swal from "sweetalert2";

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

          {/* Profile Form */}
          {userLogedIn && (
            <div className="flex flex-col p-6 bg-white rounded-lg shadow-md basis-full ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                My Profile
              </h2>
              <hr />
              <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-6">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="firstName"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    First Name
                  </label>
                  <input
                    autoComplete="on"
                    id="firstName"
                    name="FirstName"
                    value={firstName}
                    type="text"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="lastName"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    Last Name
                  </label>
                  <input
                    autoComplete="on"
                    id="lastName"
                    name="LastName"
                    type="text"
                    value={lastName}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="email"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    Email
                  </label>
                  <input
                    readOnly
                    autoComplete="on"
                    id="email"
                    name="Email"
                    type="email"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={email}
                    // onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="phone"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    Phone No
                  </label>
                  <input
                    autoComplete="on"
                    id="phone"
                    name="PhoneNo"
                    type="number"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={phoneNo}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="dob"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    DOB
                  </label>
                  <input
                    id="dob"
                    name="Dob"
                    type="date"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={dob}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="street"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    Street
                  </label>
                  <input
                    id="street"
                    name="Street"
                    type="text"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={street}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="city"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="City"
                    type="text"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={city}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="state"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    name="State"
                    type="text"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={state}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="zipCode"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    Zip/Postal Code
                  </label>
                  <input
                    id="zipCode"
                    name="ZipCode"
                    type="number"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={zipCode}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="country"
                    className="text-gray-600 font-medium w-1/3"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    name="Country"
                    type="text"
                    autoComplete="on"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    value={country}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>
              </div>

              {changesHappen && (
                <button
                  onClick={onClickSaveChanges}
                  className="mt-6 bg-blue-600 w-fit text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
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
