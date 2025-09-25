import React from "react";
import telegram from "../assets/telegram.png";
import customerservice from "../assets/customerservice.png";
import approve from "../assets/approve.png";
import insurance from "../assets/insurance.png";
import pricetag from "../assets/pricetag.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultimg from "../assets/defaultimg.png";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaChildReaching } from "react-icons/fa6";
import { FaChild } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberSharp } from "react-icons/io5";

const SendEnquiryForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [yourResidenceLocation, setYourResidenceLocation] = useState("");
  const [dob, setDob] = useState("");
  const [engagementDate, setEngagementDate] = useState("");
  const [howManyDays, setHowManyDays] = useState("");
  const [travelDestination, setTravelDestination] = useState("");
  const [budgetPerHead, setBudgetPerHead] = useState("");
  const [isCabNeed, setIsCabNeed] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [maleCount, setMaleCount] = useState("");
  const [femaleCount, setFemaleCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [howManyRoomsYouNeed, setHowManyRoomsYouNeed] = useState("");
  const [comments, setCommends] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [reference_id, setReferenceId] = useState("");
  const [userId, setUserId] = useState("");
  const [childAge, setChildAge] = useState([]);

  useEffect(() => {
    const storedReferenceId = sessionStorage.getItem("reference_id");
    setReferenceId(storedReferenceId);
    setUserId(localStorage.getItem("loginid"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({}); // Reset errors on submit

    setFailure("");
    setSuccess("");

    try {
      setLoading("Sending...");

      const authToken = userId; // Replace with the actual token

      const response = await axios.post(
        "https://backoffice.innerpece.com/api/v1/home-enquiry-form",
        {
          name,
          email,
          phone,
          comments,
          budget_per_head: budgetPerHead,
          cab_need: isCabNeed,
          days: howManyDays,
          location: yourResidenceLocation,
          rooms_count: howManyRoomsYouNeed,
          total_count: totalCount,
          travel_date: travelDate,
          travel_destination: travelDestination,
          male_count: maleCount,
          female_count: femaleCount,
          reference_id: reference_id,
          child_count: childCount,
          child_age: childAge,
          engagement_date: dob,
          birth_date: engagementDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

      // Successful submission
      setLoading("");
      setFailure("");
      setSuccess(response.data.message);

      // Clear form values
      // setName("");
      // setPhone("");
      // setEmail("");
      setCommends("");
      setBudgetPerHead("");
      setIsCabNeed("");
      setHowManyDays("");
      // setYourResidenceLocation("");
      setHowManyRoomsYouNeed("");
      setTotalCount("");
      setTravelDate("");
      setTravelDestination("");
      setMaleCount("");
      setFemaleCount("");
      setChildCount("");
      setChildAge([]);
      setDob("");
      setEngagementDate("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000); // 5000 ms = 5 seconds
    } catch (error) {
      setLoading("");
      setFailure("Please fill all the fields");
      // Handle validation errors if any
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const loggedUserDetails = localStorage.getItem("loginDetails")
      ? JSON.parse(localStorage.getItem("loginDetails"))
      : null;

    if (loggedUserDetails) {
      const {
        first_name: loggedUser_fistName,
        last_name: loggedUser_lastName,
        email: loggedUser_email,
        phone: loggedUser_phone,
        city: loggedUser_city,
      } = loggedUserDetails;

      setName(loggedUser_fistName + " " + loggedUser_lastName);
      setEmail(loggedUser_email);
      setPhone(loggedUser_phone);
      setYourResidenceLocation(loggedUser_city);
    }
  }, []);

  const onChangeChildAge = (e, key, index) => {
    const updatedChildCount = [...childAge];
    updatedChildCount[index] = e.target.value;
    setChildAge(updatedChildCount);
  };

  return (
    <div className="flex items-center justify-center mt-8 md:mt-16">
      <div className="w-[95vw] sm:w-[90vw] md:w-[95vw] lg:w-[80vw]  shadow-2xl  shadow-black/30 rounded-md">
        <div className="flex justify-start gap-2 md:gap-4  h-full w-full px-2 md:px-4 py-4">
          <div className=' bg-[url("././assets/sendenquiry_formimage2.jpg")] max-md:hidden  w-1/2 flex-shrink bg-cover  bg-center bg-no-repeat rounded-3xl'></div>

          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4">
                {/* name and email */}
                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/* Name Input */}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <IoIosContact />
                      </span>
                      <input
                        autoComplete="on"
                        id="name"
                        type="text"
                        name="name"
                        className="w-full p-2 border-l focus:outline-none  placeholder:text-gray-600 placeholder:text-sm me-2 "
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name[0]}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <AiOutlineMail />
                      </span>
                      <input
                        autoComplete="on"
                        type="email"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs ">{errors.email[0]}</p>
                    )}
                  </div>
                </div>

                {/* phone no and location */}
                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/* Phone Input */}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <MdOutlinePhone />
                      </span>
                      <input
                        autoComplete="on"
                        type="text"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Phone"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone[0]}</p>
                    )}
                  </div>

                  {/* your residence location */}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <FaLocationDot />
                      </span>
                      <input
                        type="text"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Your Residence Location"
                        id="Your Residence Location"
                        name="Your Residence Location"
                        value={yourResidenceLocation}
                        onChange={(e) =>
                          setYourResidenceLocation(e.target.value)
                        }
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-xs">
                        {errors.location[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* DOB and engagement date */}
                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/* DOB Input */}
                  {/* <div className="flex flex-col sm:w-1/2 ">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <FaBirthdayCake />
                      </span>
                      <input
                        autoComplete="on"
                        type="text"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Select DOB"
                        id="dob"
                        name="dob"
                        value={dob}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                   
                  </div> */}

                  {/* <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2 ">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <FaBirthdayCake />
                      </span>
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        placeholderText="Select DOB"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 "
                        icon={true}
                      />
                      <IoCalendarNumberSharp className="me-3" />
                    </div>
                  </div> */}

                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="relative flex items-center border rounded-md w-full">
                      {/* Left Icon */}
                      <span className="p-2">
                        <FaBirthdayCake />
                      </span>

                      {/* Datepicker Input */}
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        placeholderText="Select DOB"
                        className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                      />

                      {/* Right Icon */}
                      <span className="absolute right-2 text-gray-500 pointer-events-none">
                        <IoCalendarNumberSharp />
                      </span>
                    </div>
                  </div>

                  {/* engagement date */}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="relative flex items-center border rounded-md w-full">
                      {/* Left Icon */}
                      <span className="p-2">
                        <FaBirthdayCake />
                      </span>

                      {/* Datepicker Input */}
                      <DatePicker
                        selected={engagementDate}
                        onChange={(e) => setEngagementDate(e)}
                        placeholderText="Select Engagement Date"
                        className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                      />

                      {/* Right Icon */}
                      <span className="absolute right-2 text-gray-500 pointer-events-none">
                        <IoCalendarNumberSharp />
                      </span>
                    </div>
                  </div>
                </div>

                {/*influencer id*/}
                {reference_id && (
                  <div className="flex flex-col">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <MdEmojiPeople />
                      </span>
                      <input
                        // readOnly
                        className="w-full text-gray-800 p-2 border-l focus:outline-none me-2"
                        id="How Many Days"
                        value={reference_id}
                      />
                    </div>
                  </div>
                )}

                {/* how many days & travel destination */}
                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/*how many days*/}
                  <div className="flex flex-col  sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <FaCalendarDays />
                      </span>
                      <input
                        type="number"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="No of days you would like to travel"
                        id="No of days you would like to travel"
                        value={howManyDays}
                        onChange={(e) => setHowManyDays(e.target.value)}
                      />
                    </div>
                    {errors.days && (
                      <p className="text-red-500 text-xs">{errors.days[0]}</p>
                    )}
                  </div>

                  {/*travel destination*/}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <LiaPlaceOfWorshipSolid />
                      </span>
                      <input
                        type="text"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Travel Destination"
                        id="Travel Destination"
                        value={travelDestination}
                        onChange={(e) => setTravelDestination(e.target.value)}
                      />
                    </div>
                    {errors.travel_destination && (
                      <p className="text-red-500 text-xs">
                        {errors.travel_destination[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/*Budget Per Head */}
                  <div className="flex flex-col  sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <RiMoneyRupeeCircleFill />
                      </span>
                      <input
                        type="number"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Budget Per Head"
                        id="Budget Per Head"
                        value={budgetPerHead}
                        onChange={(e) => setBudgetPerHead(e.target.value)}
                      />
                    </div>
                    <p className="text-gray-500 text-xs">
                      Note : Excluding flight/train cost
                    </p>
                    {errors.budget_per_head && (
                      <p className="text-red-500 text-xs">
                        {errors.budget_per_head[0]}
                      </p>
                    )}
                  </div>

                  {/*total count*/}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <FaPeopleLine />
                      </span>
                      <input
                        type="number"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="Total Count"
                        id="Total Count"
                        value={totalCount}
                        onChange={(e) => setTotalCount(e.target.value)}
                      />
                    </div>
                    {errors.total_count && (
                      <p className="text-red-500 text-xs">
                        {errors.total_count[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/*male &  count*/}
                <div className="flex flex-col">
                  <div className="flex gap-4  w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                    <div className="flex flex-col sm:w-1/3 md:w-full lg:w-1/3">
                      <div className="flex items-center border rounded-md">
                        <span className="p-2">
                          <FaMale />
                        </span>
                        <input
                          type="number"
                          className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                          placeholder="Male Count"
                          id="Male Count"
                          value={maleCount}
                          onChange={(e) => setMaleCount(e.target.value)}
                        />
                      </div>
                      {errors.male_count && (
                        <p className="text-red-500 text-xs">
                          {errors.male_count[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:w-1/3 md:w-full lg:w-1/3">
                      <div className="flex items-center border rounded-md">
                        <span className="p-2">
                          <FaFemale />
                        </span>
                        <input
                          type="number"
                          className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                          placeholder="Female Count"
                          id="Female Count"
                          value={femaleCount}
                          onChange={(e) => setFemaleCount(e.target.value)}
                        />
                      </div>
                      {errors.female_count && (
                        <p className="text-red-500 text-xs">
                          {errors.female_count[0]}
                        </p>
                      )}
                    </div>

                    {/*Child count*/}
                    <div className="flex flex-col sm:w-1/3 md:w-full lg:w-1/3">
                      <div className="flex items-center border rounded-md">
                        <span className="p-2">
                          <FaChildReaching />
                        </span>
                        <input
                          type="number"
                          className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                          placeholder="Child Count"
                          id="Child Count"
                          value={childCount}
                          onChange={(e) => setChildCount(e.target.value)}
                        />
                      </div>
                      {errors.child_count && (
                        <p className="text-red-500 text-xs">
                          {errors.child_count[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* child age based on child count */}
                {childCount > 0 && (
                  <div className="flex flex-wrap gap-4 flex-col sm:flex-row w-full">
                    {Array(Number(childCount))
                      .fill(null)
                      .map((item, index) => (
                        <div className="grid grid-row-1 md:grid-row-3 flex-grow  ">
                          <div className="flex items-center w-full border rounded-md">
                            <span className="p-2">
                              <FaChild />
                            </span>
                            <input
                              type="number"
                              placeholder={` ${index + 1}st Child Age`}
                              className="p-2 border-l w-full focus:outline-none me-2"
                              onChange={(e) =>
                                onChangeChildAge(
                                  e,
                                  ` ${index + 1}st_Child_Age`,
                                  index
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                {errors.child_age && (
                  <p className="text-red-500 text-xs">{errors.child_age[0]}</p>
                )}

                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/*travel date*/}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    {/* <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <MdOutlineCalendarMonth />
                      </span>
                      <input
                        type="text"
                        className="w-full p-2 border-l text-black placeholder:text-gray-600 focus:outline-none sm:w-1/2 placeholder:text-sm me-2"
                        id="Travel Date"
                        value={travelDate}
                        placeholder="Select travel date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        onChange={(e) => setTravelDate(e.target.value)}
                      />
                    </div> */}

                    <div className="relative flex items-center border rounded-md w-full">
                      {/* Left Icon */}
                      <span className="p-2">
                        <FaBirthdayCake />
                      </span>

                      {/* Datepicker Input */}
                      <DatePicker
                        selected={travelDate}
                        onChange={(date) => setTravelDate(date)}
                        placeholderText="Select travel date"
                        className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                      />

                      {/* Right Icon */}
                      <span className="absolute right-2 text-gray-500 pointer-events-none">
                        <IoCalendarNumberSharp />
                      </span>
                    </div>
                    {errors.travel_date && (
                      <p className="text-red-500 text-xs">
                        {errors.travel_date[0]}
                      </p>
                    )}
                  </div>
                  {/*how many rooms you need*/}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <FaHouse />
                      </span>
                      <input
                        type="number"
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        placeholder="No of rooms required"
                        id="No of rooms required"
                        value={howManyRoomsYouNeed}
                        onChange={(e) => setHowManyRoomsYouNeed(e.target.value)}
                      />
                    </div>
                    {errors.rooms_count && (
                      <p className="text-red-500 text-xs">
                        {errors.rooms_count[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 w-full flex-col sm:flex-row md:flex-col lg:flex-row">
                  {/*Cab Need*/}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2 border-r">
                        <FaCar />
                      </span>
                      <p className="ms-2 text-black text-sm">Cab Needed</p>

                      <div className="flex gap-1 p-2 ms-3">
                        <input
                          type="radio"
                          name="cab_need"
                          id="yes"
                          value="yes"
                          checked={isCabNeed === "yes"}
                          onChange={(e) => setIsCabNeed(e.target.value)}
                        />
                        <label htmlFor="yes">Yes</label>
                      </div>
                      <div className="flex gap-1 p-2">
                        <input
                          type="radio"
                          name="cab_need"
                          id="no"
                          value="no"
                          checked={isCabNeed === "no"}
                          onChange={(e) => setIsCabNeed(e.target.value)}
                        />
                        <label htmlFor="no">No</label>
                      </div>
                    </div>
                    {errors?.cab_need && (
                      <p className="text-red-500 text-xs">
                        {errors.cab_need[0]}
                      </p>
                    )}
                  </div>

                  {/* Comments Input */}
                  <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                    <div className="flex items-center border rounded-md">
                      <span className="p-2">
                        <BiMessageRoundedDots />
                      </span>
                      <textarea
                        className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                        id="message"
                        placeholder="Comments"
                        rows={1}
                        value={comments}
                        onChange={(e) => setCommends(e.target.value)}
                      ></textarea>
                    </div>
                    {errors.comments && (
                      <p className="text-red-500 text-xs ">
                        {errors.comments[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {success && (
                <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                  {success}
                </div>
              )}
              {loading && (
                <div className="bg-orange-100  text-orange-700 p-2 rounded mb-4">
                  {loading}
                </div>
              )}
              {failure && (
                <div className="bg-red-100  text-red-700 p-2 rounded mb-4">
                  {failure}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-7 ">
                <button
                  disabled={loading}
                  type="submit"
                  className={` ${
                    loading ? "bg-gray-400" : "bg-blue-600"
                  } text-white py-2 px-4 rounded hover:bg-blue-700`}
                >
                  Send me Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEnquiryForm;
