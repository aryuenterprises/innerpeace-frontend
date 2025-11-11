import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import random1 from "../assets/random1.jpg";
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
  let navigate = useNavigate();

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [dob, setDob] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_province_code, setZipProvinceCode] = useState("");
  const [country, setCountry] = useState("");
  const [preferred_lang, setPreferredLang] = useState("");
  const [newsletter_sub, setNewsletterSub] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [signupLoader, setSignupLoader] = useState(false);

  const [userDetailsError, setUserDetailsError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    dob: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip_province_code: "",
    country: "",
    preferred_lang: "",
    newsletter_sub: false,
    terms_condition: false,
    image_1: "",
  });

  function onClickBtn() {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function navigateToTermsOfService() {
    // navigate("/termsofservice");
    window.open("/termsofservice", "_blank");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function handleInputChanges(e) {
    const { name, value, checked, type } = e.target;

    if (name === "first_name") {
      setFirstname(value);
    }
    if (name === "last_name") {
      setLastname(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "password_confirmation") {
      setPasswordConfirmation(value);
    }
    if (name === "dob") {
      setDob(value);
    }
    if (name === "AnniversaryDate") {
      setAnniversaryDate(value);
    }
    if (name === "phone") {
      
      if (/^[0-9]*$/.test(value)) {
        setPhone(value);
      }
      // setPhone(value.slice(0, 10));
    }
    if (name === "street") {
      setStreet(value);
    }
    if (name === "city") {
      setCity(value);
    }
    if (name === "state") {
      setState(value);
    }
    if (name === "zip_province_code") {
      setZipProvinceCode(value);
    }
    if (name === "country") {
      setCountry(value);
    }

    if (name === "preferred_lang") {
      setPreferredLang(value);
    }
    if (name === "newsletter_sub") {
      setNewsletterSub(newsletter_sub ? "" : "newsletter_sub");
    }

    if (name === "terms_condition") {
      setTermsCondition(terms_condition ? "" : "terms_condition");
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoader(true);
    try {
      let response = await axios.post(
        // `https://backoffice.innerpece.com/api/signup`,
        "https://backoffice.innerpece.com/api/v1/signup",
        {
          image_1: imageFile,
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          password: password,
          password_confirmation: password_confirmation,
          dob: dob,
          anniversary_date: anniversaryDate,
          preferred_lang: preferred_lang,
          street: street,
          city: city,
          state: state,
          country: country,
          zip_province_code: zip_province_code,
          newsletter_sub: newsletter_sub,
          terms_condition: terms_condition,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserDetailsError({
        ...userDetailsError,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        dob: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip_province_code: "",
        country: "",
        preferred_lang: "",
        newsletter_sub: false,
        terms_condition: false,
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setDob("");
      setPhone("");
      setStreet("");
      setCity("");
      setState("");
      setZipProvinceCode("");
      setCountry("");
      setPreferredLang("");
      setNewsletterSub("");
      setTermsCondition("");
      setSelectedImage("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/login");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
      setSignupLoader(false);
    } catch (err) {
      console.log(err);
      let errors = err.response.data.errors;
      setUserDetailsError({ ...errors });
      setSignupLoader(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const [imageFile, setImageFile] = useState(null); // For API upload
  const [openImageModal, setOpenImageModal] = useState(false);

  // Function to handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for the image
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file); // Store the file for upload
    }
  };

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="flex items-center justify-center mt-8 md:px-1 md:mt-14">
      <div className="w-[95vw] md:w-[80vw] lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
        <div className="flex bg-gray-50/30 justify-start gap-1 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
          <div className=' bg-[url("././assets/signup.svg")] w-1/5 max-md:hidden  rounded-md  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

          <div className="w-2/5 flex-grow flex-shrink">
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Create An Account To Get Started
              </p>

              {/* <div className="flex flex-wrap gap-2 items-center">
                <p
                  style={{ backgroundColor: "#EB9009" }}
                  className="text-white px-2 rounded"
                >
                  20% off
                </p>
                <p className="text-gray-500">get 20% off for web signup</p>
              </div> */}

              {/* Display Selected Image */}
              {selectedImage && (
                <div className="mt-8 flex ">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    onClick={() => setOpenImageModal(true)} // Open modal on click
                    className="w-28 h-28 object-cover object-center cursor-pointer  rounded-full"
                  />
                </div>
              )}

              <div className="mt-5">
                <label htmlFor="file" className="font-semibold cursor-pointer">
                  {`${selectedImage ? "Change Photo" : "Upload Photo"}`}
                </label>
                {userDetailsError.image_1 && (
                  <p className="text-red-500 text-xs sm:text-sm ">
                    {userDetailsError.image_1}
                  </p>
                )}

                {/* Hidden File Input */}
                <input
                  id="file"
                  type="file"
                  accept="image/*" // Allow only image files
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* Modal for Larger Image */}
              {openImageModal && (
                <div
                  className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center"
                  onClick={() => setOpenImageModal(false)} // Close modal on overlay click
                >
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Full Size"
                      className="max-w-full h-[70vh] object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full px-3 py-1"
                      onClick={() => setOpenImageModal(false)} // Close modal on button click
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-3">
                <div className="flex flex-col flex-grow gap-1">
                  <label htmlFor="first_name" className="font-semibold">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="off"
                    onChange={handleInputChanges}
                    value={first_name}
                    className="border-2 border-gray-300  outline-none p-2 rounded-md"
                    placeholder="Enter your first name"
                  />
                  {userDetailsError.first_name && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.first_name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col flex-grow gap-1">
                  <label htmlFor="last_name" className="font-semibold">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="off"
                    value={last_name}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none  p-2 rounded-md"
                    placeholder="Enter your last name"
                  />
                  {userDetailsError.last_name && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="email" className="font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Enter your email"
                  />
                  {userDetailsError.email && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="phone" className="font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Enter your phone number"
                    min={0}
                  />
                  {userDetailsError.phone && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="password" className="font-semibold">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    onFocus={(e) => (e.target.type = "text")}
                    onBlur={(e) => (e.target.type = "password")}
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Create Password"
                  />
                  {userDetailsError.password && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.password[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label
                    htmlFor="password_confirmation"
                    className="font-semibold"
                  >
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    onFocus={(e) => (e.target.type = "text")}
                    onBlur={(e) => (e.target.type = "password")}
                    name="password_confirmation"
                    id="password_confirmation"
                    autoComplete="off"
                    value={password_confirmation}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Confirm Password"
                  />
                  {userDetailsError.password && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.password[1]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="dob" className="font-semibold">
                    Birthday Date *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Create Passoword"
                  />
                  {userDetailsError.dob && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.dob}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="AnniversaryDate" className="font-semibold">
                    Anniversary Date
                  </label>
                  <input
                    type="date"
                    name="AnniversaryDate"
                    id="AnniversaryDate"
                    value={anniversaryDate}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md placeholder-gray-300"
                    placeholder="Anniversary Date"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="city" className="font-semibold">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="off"
                    value={city}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="City"
                  />
                  {userDetailsError.city && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.city}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="state" className="font-semibold">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={state}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="State"
                  />
                  {userDetailsError.state && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.state}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="zip_province_code" className="font-semibold">
                    Zip/Postal Code *
                  </label>
                  <input
                    type="number"
                    name="zip_province_code"
                    id="zip_province_code"
                    value={zip_province_code}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Zip/postal code"
                  />
                  {userDetailsError.zip_province_code && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.zip_province_code}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="country" className="font-semibold">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Country"
                  />
                  {userDetailsError.country && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.country}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="preferred_lang" className="font-semibold">
                    Preferred Language *
                  </label>
                  <input
                    type="text"
                    name="preferred_lang"
                    id="preferred_lang"
                    autoComplete="off"
                    value={preferred_lang}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Preferred Language"
                  />
                  {userDetailsError.preferred_lang && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.preferred_lang}
                    </p>
                  )}
                </div>
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="street" className="font-semibold">
                    Street *
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    value={street}
                    autoComplete="off"
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Street"
                  />
                  {userDetailsError.street && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.street}
                    </p>
                  )}
                </div>
              </div>

              {/* <div className="flex flex-col gap-1">
                <div className="flex justify-start gap-2 mt-5">
                  <input
                    type="checkbox"
                    name="newsletter_sub"
                    id="newsletter_sub"
                    className="scale-125"
                    autoComplete="off"
                    value="newsletter_sub"
                    checked={newsletter_sub ? true : false}
                    onChange={handleInputChanges}
                  />
                  <label
                    htmlFor="newsletter_sub"
                    className="text-xs sm:text-sm md:text-base"
                  >
                    Subscribe to Newsletter
                  </label>
                </div>

                <div>
                  {userDetailsError.newsletter_sub && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.newsletter_sub}
                    </p>
                  )}
                </div>
              </div> */}

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-start gap-2">
                  <input
                    type="checkbox"
                    name="terms_condition"
                    autoComplete="off"
                    id="terms_condition"
                    className="scale-125"
                    checked={terms_condition ? true : false}
                    value="terms_condition"
                    onChange={handleInputChanges}
                  />
                  <label
                    htmlFor="terms_condition"
                    className="text-xs sm:text-sm md:text-base"
                  >
                    I accept the{" "}
                  </label>
                  <span
                    onClick={navigateToTermsOfService}
                    className=" md:-ms-1 text-blue-600 underline cursor-pointer text-xs sm:text-sm md:text-base"
                  >
                    Terms Of Service
                  </span>
                </div>

                {/* <div>
                  {userDetailsError.terms_condition && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.terms_condition}
                    </p>
                  )}
                </div> */}
              </div>

              {/* <button
                onClick={handleSignup}
                className="bg-sky-800 p-3 mt-5 text-white rounded"
              >
                Sign Up
              </button> */}

              <div className="recaptacha-login  mt-5">
                <ReCAPTCHA
                  sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                  onChange={handleCaptchaChange}
                />
              </div>

              <button
                onClick={handleSignup}
                className={` ${
                  !captchaValue ? "bg-gray-400" : "bg-sky-800"
                } p-3 mt-5 text-white rounded flex items-center justify-center`}
                disabled={signupLoader || !captchaValue}
              >
                {signupLoader ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className="flex flex-wrap justify-start items-center gap-8 mt-5">
                <p>Already have an Account?</p>

                <button
                  onClick={onClickBtn}
                  className="bg-sky-800 px-5 py-1 rounded text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
