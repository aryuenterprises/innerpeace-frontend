import React from "react";
import star from "../assets/star.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import defaultimage from "../assets/defaultimg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import default_user_image from "../assets/default_user_image.png";
import default_user_image2 from "../assets/default_user_image_2.jpg";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
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
import { FaChildReaching } from "react-icons/fa6";
import { FaChild } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Mainbar({
  highlightsRef,
  informationRef,
  TourPlanningRef,
  reviewRef,
}) {
  const location = useLocation();
  let navigate = useNavigate();
  const { id } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const sanitizedHTML = DOMPurify.sanitize(apiData.program_desc);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUrl = window.location.href;
  const metaDescription = apiData?.program_desc || "";
  const [rating, setRating] = useState(""); // Current rating
  const [hover, setHover] = useState(""); // Hovered rating
  const [userReview, setUserReview] = useState("");
  const [date, setDate] = useState(new Date());
  const [yearMonthDate, setYearMonthDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState();
  const [loginCliked, setLoginClicked] = useState(false);

  const slicedPathName = window.location.pathname.split("/")[1];
  const slicedUserId = window.location.href.split("#")[1];

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
        dob: loggedUser_dob,
      } = loggedUserDetails;

      setName(loggedUser_fistName + " " + loggedUser_lastName);
      setEmail(loggedUser_email);
      setPhone(loggedUser_phone);
      setYourResidenceLocation(loggedUser_city);
      setDob(loggedUser_dob);
    }
  }, []);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload1 = {
          program_id: id ? id : slicedPathName,
          user_id: userDetails?.id || null,
        };

        const payload2 = {
          program_id: slicedUserId,
        };

        // const response = await axios.post(
        //   "https://backoffice.innerpece.com/api/v1/get-program-details",
        //   payload
        // );

        const response = slicedUserId
          ? await axios.post(
              "https://backoffice.innerpece.com/api/v1/specific-program-details",
              payload2
            )
          : await axios.post(
              "https://backoffice.innerpece.com/api/v1/get-program-details",
              payload1
            );

        setApiData(response.data.data);
        setSelectedPackage(response.data.data.price_title[0]);
        setPriceSelected(response.data.data.price_amount[0]);
        setHomeImage(response.data.data.gallery_img);
        console.log(response.data.data);

        const cleanedText = response.data.data.important_info
          .split("·") // Split by bullet point
          .map((line) => line.replace(/\s+/g, " ").trim()) // Remove extra spaces and trim
          .filter(Boolean) // Remove empty lines
          .map((line) => `· ${line}`) // Re-add clean bullets
          .join("\n");

        // setIsWishlisted(response.data.data.wishlists);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, []);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    const storedUserId = localStorage.getItem("loginid");
    setUserId(storedUserId);

    let interval = setInterval(() => {
      setDate(new Date());
      // setYearMonthDate(new Date());
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setYearMonthDate(formattedDate);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickPostReview = async () => {
    try {
      const payload = {
        user_id: userDetails?.id,
        package_id: id ? id : slicedPathName,
        comment: userReview,
        rating: rating,
        created_at: date,
        review_dt: yearMonthDate,
      };

      const authToken = userId;
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/add_review",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

      const fetchProgramData = async () => {
        try {
          const storedUserDetails = localStorage.getItem("loginDetails");
          const userDetails = storedUserDetails
            ? JSON.parse(storedUserDetails)
            : null;

          const payload = {
            program_id: id ? id : slicedPathName,
            user_id: userDetails?.id || null,
          };

          const response = await axios.post(
            "https://backoffice.innerpece.com/api/v1/get-program-details",
            // "https://backoffice.innerpece.com/api/v1/get-program",
            payload
          );

          setApiData(response.data.data);
          setLoading(false);


          const metaOgTitle = document.querySelector(
            "meta[property='og:title']"
          );
          if (metaOgTitle) {
            metaOgTitle.setAttribute(
              "content",
              apiData.title || "Default Title"
            );
          }

          const metaOgDescription = document.querySelector(
            "meta[property='og:description']"
          );
          if (metaOgDescription) {
            metaOgDescription.setAttribute(
              "content",
              apiData.program_desc || "Default description"
            );
          }

          const metaOgImage = document.querySelector(
            "meta[property='og:image']"
          );
          if (metaOgImage) {
            metaOgImage.setAttribute(
              "content",
              `https://backoffice.innerpece.com/${apiData.cover_img}` || ""
            );
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
      if (response.data) {
        fetchProgramData();
      }

      setRating("");
      setHover("");
      setUserReview("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Posted",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "w-72 p-4 text-sm", // Tailwind classes
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Write a Review",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "w-72  p-4 text-sm", // Tailwind classes
        },
      });
    }
  };

  const handleLoginClick = () => {
    setLoginClicked(true);
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCheckboxChecked, setLoginCheckBoxChecked] = useState("");
  const [loginError, setLoginError] = useState({});

  function onClickBtn() {
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "loginEmail") {
      setLoginEmail(value);
    }

    if (name === "loginPassword") {
      setLoginPassword(value);
    }

    if (name === "checkbox") {
      setLoginCheckBoxChecked(loginCheckboxChecked ? "" : "checkbox checked");
    }
  }

  async function onClickSignIn() {
    try {
      let response = await axios.post(
        // `https://backoffice.innerpece.com/api/login`,
        `https://backoffice.innerpece.com/api/v1/login`,
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      const loginid = response.data.token;
      const loginDetails = response.data.user_details;

      localStorage.setItem("loginid", loginid);
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoginClicked(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);

      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
    }
  }

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalReviews = apiData?.reviews?.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = apiData?.reviews?.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const cleanHTML = (htmlString) => {
    const sanitizedHTML = DOMPurify.sanitize(htmlString);

    const cleaned = sanitizedHTML
      .replace(/<span[^>]*>|<\/span>/gi, "")
      .replace(/<o:p>|<\/o:p>/gi, "")
      .replace(/style="[^"]*"/gi, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/<p[^>]*>/gi, "")
      .replace(/<\/p>/gi, "")
      .replace(/·\s*/g, "<li>") // convert bullets to list items
      .trim();

    return cleaned;
  };

  // **************************************************************************//
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [homeImage, setHomeImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const [travelDate, setTravelDate] = useState("");
  const [howManyRoomsYouNeed, setHowManyRoomsYouNeed] = useState("");
  const [comments, setCommends] = useState("");
  const [map, setMap] = useState("");
  const [loadingform, setLoadingform] = useState("");
  const [reference_id, setReferenceId] = useState("");
  const [childCount, setChildCount] = useState("");
  const [childAge, setChildAge] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [priceSelected, setPriceSelected] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState({});
  const [bookNowClicked, setBookNowClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [homeImage.length]);

  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
    setLoading(false);
    setShow(false);
  };

  const onChangePrice = (item, index) => {
    setSelectedPackage(item);
    setPriceSelected(apiData.price_amount[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setErrors({}); // Reset errors on submit
    setFailure("");

    try {
      setFailure("");
      setLoadingform("Sending...");

      const authToken = userId; // Replace with the actual token

      const response = await axios.post(
        "https://backoffice.innerpece.com/api/enquiry-form",
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
          travel_destination: apiData.title,
          male_count: maleCount,
          female_count: femaleCount,
          reference_id: reference_id,
          program_title: apiData.title,
          child_count: childCount,
          child_age: childAge,
          engagement_date: engagementDate,
          birth_date: dob,
          pricing: priceSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

      // Successful submission
      setLoadingform("");
      setSuccess(response.data.message);
      setErrors({});

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
        setShow(false);
      }, 3000); // 5000 ms = 5 seconds

      setBookNowClicked(false);
    } catch (error) {
      // Handle validation errors if any
      setLoadingform("");
      setFailure("Please Fill all the fields");
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        console.log("error", error.response.data.errors);
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // this will stop scroll when modal is open
  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (loginCliked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loginCliked]);

  return (
    <div className="w-full md:basis-[45%] bg-[#FEFEFE] xl:basis-[55%] overflow-x-hidden font-mulish  flex-grow ">
      {apiData.gallery_img && (
        <Carousel
          swipeable={true}
          draggable={true}
          pauseOnHover={false}
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1441 },
              items: 1,
            },
            desktop: {
              breakpoint: { max: 1440, min: 1024 },
              items: 1,
            },
            tablet: {
              breakpoint: { max: 1024, min: 640 },
              items: 1,
            },
            mobile: {
              breakpoint: { max: 640, min: 0 },
              items: 1,
            },
          }}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          arrows={true}
          keyBoardControl={true}
          transitionDuration={1000}
          containerClass="carousel-container mx-auto z-0 w-full object-cover rounded-xl mt-5"
          itemClass="carousel-item-padding-40-px block shadow-lg   object-cover shadow-black/10 "
        >
          {apiData.gallery_img.map((item, index) => (
            <div
              key={item.id || index}
              className="overflow-hidden block md:hidden  "
            >
              <img
                src={
                  item
                    ? `https://backoffice.innerpece.com/${item}`
                    : defaultimage
                }
                alt={`Gallery Image ${index + 1}`}
                className="h-[30vh]  lg:h-[440px] w-full object-cover "
              />
            </div>
          ))}
        </Carousel>
      )}

      {apiData.program_desc && (
        <>
          <div
            ref={highlightsRef}
            className="flex gap-2 mt-8 md:mt-10 items-center"
          >
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Highlights
            </p>
          </div>

          <p
            className=" mt-3 md:mt-5  "
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          ></p>
        </>
      )}

      {apiData.tour_planning && (
        <div ref={TourPlanningRef} className="mt-8 md:mt-10">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Tour Planning
            </p>
          </div>

          <div className="mt-3 md:mt-5 flex flex-col gap-2">
            {apiData.tour_planning.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className=" pb-2">
                  <button
                    onClick={() => toggleIndex(index)}
                    className="w-full flex justify-between items-center text-left font-mulish text-[#0E598F] font-semibold focus:outline-none"
                  >
                    <div className="flex gap-2 items-center">
                      <span>{item.title}</span>
                      {/* <p className="border-black font-semibold border-2 h-4"></p> */}
                      <p className="text-black font-medium">{item.subtitle}</p>
                    </div>
                    <FaChevronDown
                      className={`transition-transform text-black duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden mt-2 transition-all duration-700 ease-out ${
                      isOpen ? " opacity-100 min-h-20" : "max-h-0 opacity-0"
                    }`}
                  >
                    {/* <p className="text-[#0D3756] font-normal">{item.description}</p> */}
                    <div
                    // className="list-disc pl-6 space-y-2"
                    // className="[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2"
                    className="itinerary-content"

                      dangerouslySetInnerHTML={{
                        __html: item.description ?? "",
                      }}
                    />

                    <p></p>
                  </div>
                </div>
              );
            })}

            {/* {Object.keys(apiData.tour_planning).map((key, index) => {
              const item = apiData.tour_planning[key];
              const isOpen = openIndex === index;

              return (
                <div key={key} className="pb-2">
                  <button
                    onClick={() => toggleIndex(index)}
                    className="w-full flex justify-between items-center text-left font-mulish text-[#0E598F] font-semibold focus:outline-none"
                  >
                    <div className="flex gap-2 items-center flex-wrap">
                      <span>{item.title}</span>
                      <p className="border-black font-semibold border-2 h-4"></p>
                      <p className="text-black font-medium">{item.subtitle}</p>
                    </div>
                    <FaChevronDown
                      className={`transition-transform text-black duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isOpen ? " opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#0D3756] font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      )}

      {apiData.amenity_details &&
        Object.keys(apiData.amenity_details).length > 0 && (
          <div className="mt-8 md:mt-10">
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Amenities
              </p>
            </div>

            <div className="flex flex-wrap flex-col  mt-3 md:mt-5">
              <div className="flex  flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.amenity_details).map((key, index) => {
                  const amenity = apiData.amenity_details[key];
                  return (
                    <div className="flex gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${amenity.amenity_pic}`}
                        // alt={amenity.amenity_name}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
                      />
                      <p className="">{amenity.amenity_name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {apiData.foodBeverages &&
        Object.keys(apiData.foodBeverages).length > 0 && (
          <div className="    mt-8 md:mt-10 ">
            {/* <p className="font-semibold text-2xl">
              <span className="border-l-8 border-[#0E598F] me-4"></span> Food
              and Beverages{" "}
            </p> */}
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Food and Beverages
              </p>
            </div>

            <div className="flex  flex-wrap flex-col gap-5 mt-3 md:mt-5">
              <div className="flex  flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.foodBeverages).map((key, index) => {
                  const foodBeverage = apiData.foodBeverages[key];

                  return (
                    <div className="flex items-center gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${foodBeverage.food_beverage_pic}`}
                        // alt={foodBeverage.food_beverage_pic}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
                      />
                      <p className=" ">{foodBeverage.food_beverage}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {apiData.safety_features &&
        Object.keys(apiData.safety_features).length > 0 && (
          <div className="w-50vw  mt-8 md:mt-10 ">
            {/* <p className="font-semibold text-2xl">
              <span className="border-l-8 border-[#0E598F] me-4"></span> Safety
              Features
            </p> */}
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Safety Features
              </p>
            </div>

            <div className="flex flex-wrap flex-col gap-5 mt-3 md:mt-5">
              <div className="flex flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.safety_features).map((key, index) => {
                  const safety_features = apiData.safety_features[key];

                  return (
                    <div className="flex gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${safety_features.safety_features_pic}`}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
                      />
                      <p className=" ">{safety_features.safety_features}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {apiData.activities && Object.keys(apiData.activities).length > 0 && (
        <div className="mt-8 md:mt-10">
          {/* <p className="font-semibold text-2xl ">
            <span className="border-l-8 border-[#0E598F] me-4"></span>{" "}
            Activities
          </p> */}
          <div className="flex gap-2 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Activities
            </p>
          </div>

          <div className="flex flex-wrap justify-start mt-3 md:mt-5 gap-4">
            {Object.keys(apiData.activities).map((key, index) => {
              const activities = apiData.activities[key];

              return (
                <div
                  className="flex flex-col justify-start  items-start border-[1px] gap-3 w-32 md:w-40  border-black/40 p-3 rounded-xl py-3  "
                  key={index}
                >
                  <img
                    src={`https://backoffice.innerpece.com/${activities.activities_pic}`}
                    className="w-6 h-6 bg-cover md:w-7 md:h-7"
                  />
                  <p className="">{activities.activities}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {apiData.payment_policy && (
        <div className="mt-8 md:mt-10  ">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Payment Policy
            </p>
          </div>

          {apiData.payment_policy.length > 0 && (
            <div className="flex flex-col mt-3 md:mt-5">
              {apiData.payment_policy.map((item, index) => (
                <p key={index} className=" ">
                  <p className="inline font-bold text-xl h-fit pe-3">&bull;</p>
                  <p className="inline   "> {item}</p>
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {apiData.important_info && apiData.important_info !== "<p><br></p>" && (
        <div ref={informationRef} className="mt-8 md:mt-10   ">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Notes
            </p>
          </div>

          <div>
            <div className="mt-3 md:mt-5 md:leading-7  ">
              {/* <p>{cleanBulletText(apiData.important_info)}</p> */}

              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(apiData.important_info),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {apiData.program_inclusion &&
        apiData.program_inclusion !== "<p><br></p>" && (
          <div className="mt-8 md:mt-10   ">
            <div className="flex gap-2 mt-8 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Package Inclusion
              </p>
            </div>

            <div className="mt-3 md:mt-5 md:leading-7  ">
              {/* <p>{cleanBulletText(apiData.program_inclusion)}</p> */}
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(apiData.program_inclusion),
                }}
              />
            </div>
          </div>
        )}
      {apiData.program_exclusion &&
        apiData.program_exclusion !== "<p><br></p>" && (
          <div className="mt-8 md:mt-10   ">
            <div className="flex gap-2 mt-8 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Package Exclusion
              </p>
            </div>

            <div className="mt-3 md:mt-5 md:leading-7  ">
              {/* <p>{cleanBulletText(apiData.program_exclusion)}</p> */}
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(apiData.program_exclusion),
                }}
              />
            </div>
          </div>
        )}

      {/* Price Options */}
      {apiData?.price_amount?.length > 0 && (
        <div className="block shadow-[0_0_20px_rgba(0,0,0,0.3)] border shadow-black/20  mt-8  mb-5 bg-white p-4  rounded-lg  md:hidden">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-sky-500 "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#040404]">
                Pricing
              </p>
            </div>

            <p className="text-[#8E8E8E] text-xs">Per person</p>
          </div>

          <div className="flex flex-col items-start gap-5 mt-5 md:leading-7">
            {(() => {
              // find last non-null index once
              const lastIndex = apiData.price_title
                .map((v, i) => (v !== null ? i : -1))
                .filter((i) => i !== -1)
                .pop();

              return apiData.price_title.map((item, index, array) => (
                <React.Fragment key={index}>
                  {item && (
                    <>
                      <label className="flex items-center cursor-pointer gap-2 w-full">
                        <input
                          type="radio"
                          id={`price-${index}`}
                          value={item}
                          checked={selectedPackage === item}
                          onChange={() => onChangePrice(item, index)}
                          className="hidden peer"
                        />
                        {/* custom radio icon */}
                        <span className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-gray-400 peer-checked:bg-blue-500 peer-checked:border-blue-500"></span>

                        <span className="text-black font-medium">{item}</span>
                        <span className="font-semibold text-sky-950 text-xl ml-auto">
                          ₹
                          {Number(
                            apiData.price_amount[index] || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </label>

                      {index !== lastIndex && (
                        <div className="border border-b border-blue-400/20 w-full"></div>
                      )}
                    </>
                  )}
                </React.Fragment>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div
        onClick={() => setBookNowClicked(!bookNowClicked)}
        className="fixed md:hidden flex items-center justify-center px-5 py-4 shadow-2xl shadow-black left-0 bottom-0 w-full bg-white z-20"
      >
        <button className="w-full font-semibold text-white rounded-lg text-base py-3 bg-gradient-to-r from-sky-600 to-sky-800 transition-transform hover:scale-105 duration-300">
          Book Now
        </button>
      </div>

      {/* Slide-Up Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out transform ${
          bookNowClicked
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="md:hidden px-4 py-5 bg-white border-t shadow-lg w-full">
          {/* Close Icon */}
          <div className="flex justify-end">
            <IoClose
              onClick={() => setBookNowClicked(false)}
              className="text-2xl cursor-pointer text-gray-700 hover:text-black"
            />
          </div>

          {/* Price Options */}
          {apiData?.price_amount?.length > 0 && (
            <div className="flex flex-col items-start sm:items-center gap-2 mb-4">
              {apiData.price_title.map(
                (item, index) =>
                  item && (
                    <label
                      htmlFor={item}
                      className="flex items-center gap-2 cursor-pointer"
                      key={index}
                    >
                      <input
                        type="radio"
                        id={item}
                        value={item}
                        checked={selectedPackage === item}
                        onChange={() => onChangePrice(item, index)}
                      />
                      <span className="text-sm">
                        {item} :{" "}
                        <span className="font-semibold text-green-800">
                          ₹
                          {Number(apiData.price_amount[index]).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </span>
                    </label>
                  )
              )}
            </div>
          )}

          {/* Book Button */}
          <div className="text-center">
            <button
              onClick={handleShow}
              disabled={!userDetails}
              className="w-full font-semibold text-white rounded-lg text-base py-3 bg-gradient-to-r from-sky-600 to-sky-800 transition-transform hover:scale-105 duration-300"
            >
              Book Now
            </button>

            {!userDetails && (
              <p className="text-sm text-red-500 mt-2">
                Please{" "}
                <span
                  onClick={handleLoginClick}
                  className="underline cursor-pointer"
                >
                  login
                </span>{" "}
                to book now
              </p>
            )}
          </div>
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-full w-[100%] sm:w-[80%] h-screen  sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="text-gray-500 w-full pe-5 pt-3 font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
            >
              ✕
            </button>
            {/* Modal Header */}
            <div className="flex  p-6 border-b">
              {/* Image Section */}
              <div className="flex flex-col-reverse md:flex-row w-full gap-8  ">
                {/* <img
                          className="md:w-1/2 h-40  object-cover rounded-lg"
                          src={
                            apiData.gallery_img && apiData.gallery_img[0]
                              ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
                              : defaultimg
                          }
                          alt=""
                        /> */}

                {homeImage.length > 0 && (
                  <div className="relative w-full h-52 md:w-1/2 overflow-hidden">
                    {homeImage.map((image, index) => (
                      <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img
                          className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                          src={`https://backoffice.innerpece.com/${image}`}
                          alt={image.slider_name}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="h-fit flex gap-3 flex-col">
                  <h1 className=" text-lg md:text-xl font-semibold">
                    {apiData.title}
                  </h1>
                  <div className="  flex items-center gap-3 flex-wrap">
                    {/* <span className="block  text-gray-500">Starting From</span>
                            
                            <span className="text-green-800 font-semibold text-xl ms-1">
                              ₹{`${apiData.price_amount && apiData.price_amount[0]}`}
                            </span> */}
                    <p>
                      {selectedPackage} :{" "}
                      <span className="font-semibold text-xl lg:text-2xl text-green-800">
                        ₹ {Number(priceSelected).toLocaleString("en-IN")}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-5">
                {/* Form Section */}
                <div className="w-full">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                      {/* name and email */}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* Name Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <IoIosContact />
                            </span>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs">
                              {errors.name[0]}
                            </p>
                          )}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <AiOutlineMail />
                            </span>
                            <input
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
                            <p className="text-red-500 text-xs ">
                              {errors.email[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* phone and residence location */}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* Phone Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <MdOutlinePhone />
                            </span>
                            <input
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
                            <p className="text-red-500 text-xs">
                              {errors.phone[0]}
                            </p>
                          )}
                        </div>

                        {/* your residence location */}
                        <div className="flex flex-col sm:w-1/2">
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

                      {/*influencer id*/}
                      {reference_id && (
                        <div className="flex flex-col">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <MdEmojiPeople />
                            </span>
                            <input
                              readOnly
                              className="w-full text-gray-800 p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              id="How Many Days"
                              name="How Many Days"
                              value={reference_id}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*travel destination*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <LiaPlaceOfWorshipSolid />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Travel Destination"
                              id="Travel Destination"
                              name="Travel Destination"
                              value={apiData.title}
                            />
                          </div>
                          {errors.travel_destination && (
                            <p className="text-red-500 text-xs">
                              {errors.travel_destination[0]}
                            </p>
                          )}
                        </div>

                        {/* DOB Input */}
                        <div className="flex flex-col sm:w-1/2 ">
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
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* engagement date */}
                        <div className="flex flex-col sm:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <GiLovers />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Select Engagement Date"
                              id="engagement date"
                              name="engagement date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              value={engagementDate}
                              onChange={(e) =>
                                setEngagementDate(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/*how many days*/}
                        <div className="flex flex-col sm:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaCalendarDays />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Number of days you would like to travel"
                              id="Number of days you would like to travel"
                              name="Number of days you would like to travel"
                              value={howManyDays}
                              onChange={(e) => setHowManyDays(e.target.value)}
                            />
                          </div>
                          {errors.days && (
                            <p className="text-red-500 text-xs">
                              {errors.days[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*Budget Per Head */}
                        {/* <div className="flex flex-col sm:w-1/2">
                                  <div className="flex items-center border rounded-md">
                                    <span className="p-2">
                                      <RiMoneyRupeeCircleFill />
                                    </span>
                                    <input
                                      type="number"
                                      className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                      placeholder="Budget Per Head"
                                      id="Budget Per Head"
                                      name="Budget Per Head"
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
                                </div> */}

                        {/*total count*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaPeopleLine />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Total Count"
                              id="Total Count"
                              name="Total Count"
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

                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaMale />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none me-2 placeholder:text-gray-600 placeholder:text-sm "
                              placeholder="Male Count"
                              id="Male Count"
                              name="Male Count"
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
                      </div>

                      <div className="flex gap-4 w-full flex-col  sm:flex-row">
                        {/*male &  count*/}

                        <div className="flex flex-col sm:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaFemale />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Female Count"
                              id="Female Count"
                              name="Female Count"
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
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaChildReaching />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Child Count"
                              id="Child Count"
                              name="Child Count"
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
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* child age based on child count */}
                      {childCount > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {Array(Number(childCount))
                            .fill(null)
                            .map((item, index) => (
                              <div className="grid grid-row-1 md:grid-row-3 ">
                                <div className="flex items-center w-full border rounded-xl">
                                  <span className="p-2">
                                    <FaChild />
                                  </span>
                                  <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    placeholder={` ${index + 1}st Child Age`}
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
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
                        <p className="text-red-500 text-xs">
                          {errors.child_age[0]}
                        </p>
                      )}

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*travel date*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <MdOutlineCalendarMonth />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l  focus:outline-none placeholder:text-gray-600 text-black placeholder:text-sm me-2"
                              id="Travel Date"
                              name="Travel Date"
                              value={travelDate}
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              placeholder="Select travel date"
                              onChange={(e) => setTravelDate(e.target.value)}
                            />
                          </div>
                          {errors.travel_date && (
                            <p className="text-red-500 text-xs">
                              {errors.travel_date[0]}
                            </p>
                          )}
                        </div>

                        {/*how many rooms you need*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaHouse />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="No of rooms required"
                              id="No of rooms required"
                              name="No of rooms required"
                              value={howManyRoomsYouNeed}
                              onChange={(e) =>
                                setHowManyRoomsYouNeed(e.target.value)
                              }
                            />
                          </div>
                          {errors.rooms_count && (
                            <p className="text-red-500 text-xs">
                              {errors.rooms_count[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*Cab Need*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2 border-r">
                              <FaCar />
                            </span>
                            <label className="ms-2 text-black">
                              Cab Needed
                            </label>

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
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <BiMessageRoundedDots />
                            </span>
                            <textarea
                              className="w-full p-2 me-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                              id="message"
                              name="message"
                              placeholder="Comments"
                              value={comments}
                              rows={1}
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

                      <div className="flex items-center border rounded-md">
                        <span className="p-2">
                          <FaPeopleLine />
                        </span>

                        <div className="flex flex-wrap gap-2 p-2 border-l">
                          <p>{selectedPackage} :</p>
                          <p>
                            ₹ {Number(priceSelected).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {success && (
                      <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                        {success}
                      </div>
                    )}
                    {loadingform && (
                      <div className="bg-orange-100  text-orange-700 p-2 rounded mb-4">
                        {loadingform}
                      </div>
                    )}
                    {failure && (
                      <div className="bg-red-100  text-red-700 p-2 rounded mb-4">
                        {failure}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Send me Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={reviewRef} className="mt-8 md:mt-10 max-lg:hidden">
        <div className="flex flex-wrap flex-col justify-start ">
          <div className="flex gap-2 ">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-2xl  text-[#11142D]">
              Client's Review
            </p>
          </div>

          <div className="border max-lg:hidden border-gray-500 flex  flex-col gap-2 rounded-xl ps-5 pe-3 py-3 mt-3 md:mt-5">
            <div className="flex ">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  disabled={!userDetails}
                  key={star}
                  type="button"
                  className={`w-8 text-2xl h-8 flex  rounded-full ${
                    star <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)} // Set rating on click
                  onMouseEnter={() => setHover(star)} // Highlight stars on hover
                  onMouseLeave={() => setHover(0)} // Reset hover effect
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              name="Review"
              disabled={!userDetails}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder="Write a Review"
              className="w-full resize-none bg-white h-fit mt-3 placeholder-black text-wrap border-none outline-none"
            />
            <button
              disabled={!userDetails}
              onClick={onClickPostReview}
              className="bg-sky-800 transition-all duration-500 hover:bg-sky-900 text-white rounded-full w-fit h-fit py-1 px-8 "
            >
              Post
            </button>
          </div>

          {!userDetails && (
            <p className="text-red-500 mt-1 max-lg:hidden">
              Please{" "}
              <button
                onClick={handleLoginClick}
                className="cursor-pointer underline"
              >
                Login{" "}
              </button>
              {"  "} to add review
            </p>
          )}

          {/* <div className="mt-5 border-4 h-36 w-36 flex flex-col justify-center items-center border-sky-800 rounded-full">
              <p className="text-sm">Overall Ratings</p>
              <p className="text-sm">
                {apiData.average_rating}
                <span className="ms-1">Out of 5</span>{" "}
              </p>
            </div> */}

          {/* {apiData.reviews.length > 0 && (
              <div className="mt-5  overflow-y-auto">
                <div className="flex  flex-col-reverse  gap-5 ">
                  {apiData.reviews.map((item, index) => (
                    <div
                      key={index}
                      className="mx-3 bg-gray-100 p-4 rounded-lg "
                    >
                      <div className="flex  flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          {Array(item.rating)
                            .fill(null)
                            .map((_, i) => (
                              <img
                                key={i}
                                src={star}
                                alt="Star"
                                className="w-4 md:w-5"
                              />
                            ))}
                        </div>

                        <p
                          className="text-gray-600 text-sm md:text-base"
                          dangerouslySetInnerHTML={{
                            __html: item.comment,
                          }}
                        />

                        <p className="text-gray-500 text-xs md:text-sm">
                          {item.date}
                        </p>

                        <hr className="border-black/20 w-full" />

                        <div className="flex items-center gap-3">
                          <img
                            src={`https://backoffice.innerpece.com/${item.profile_image}`}
                            alt="Profile"
                            className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                          />
                          <p className="font-medium text-lg md:text-xl text-gray-800">
                            {item.first_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            )} */}

          {apiData?.reviews?.length > 0 && (
            <div className="mt-5 overflow-y-auto">
              <div className="flex flex-col-reverse gap-5">
                {currentReviews.map((item, index) => (
                  <div key={index} className=" bg-gray-100 p-4 rounded-xl">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 items-center">
                        {Array(item.rating)
                          .fill(null)
                          .map((_, i) => (
                            <img
                              key={i}
                              src={star}
                              alt="Star"
                              className="w-4 md:w-5"
                            />
                          ))}
                      </div>

                      <p
                        className="text-gray-600 text-sm md:text-base"
                        dangerouslySetInnerHTML={{
                          __html: item.comment,
                        }}
                      />

                      <p className="text-gray-500 text-xs md:text-sm">
                        {item.date}
                      </p>

                      <hr className="border-black/20 w-full" />

                      <div className="flex items-center gap-3">
                        <img
                          src={`${
                            item.profile_image
                              ? `https://backoffice.innerpece.com/${item.profile_image}`
                              : default_user_image2
                          }`}
                          alt="Profile"
                          className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                        />
                        <p className="font-medium text-gray-800">
                          {item.first_name} {item.last_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-5 gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loginCliked && (
        <div className="fixed inset-0 z-10 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center  bg-white">
            <div className="w-screen   md:w-[70vw] py-3  lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
              <button
                onClick={() => setLoginClicked(false)}
                className="text-gray-500 w-full pe-5  font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
              >
                ✕
              </button>
              <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
                <div className=' bg-[url("././assets/login_image.png")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

                <div className="w-full md:w-2/5 flex-grow flex-shrink">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                      Log In To Get Started
                    </p>

                    <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                      <div className="flex flex-col flex-grow gap-2">
                        <label htmlFor="loginEmail" className="font-semibold">
                          Email
                        </label>
                        <input
                          type="text"
                          name="loginEmail"
                          id="loginEmail"
                          value={loginEmail}
                          autoComplete="off"
                          onChange={onChangeInput}
                          className="border-2 border-gray-300 outline-none p-2 rounded-md"
                          placeholder="Enter your Email"
                        />
                        {loginError.email && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.email}
                          </p>
                        )}

                        {loginError.error === "Unauthorized User " && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.error}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col mt-5 gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="font-semibold">
                          Your Password
                        </label>
                        {/* <p className="text-red-400 cursor-pointer text-xs md:text-sm font-semibold">
                    Forgot Password?
                  </p> */}
                      </div>
                      <input
                        onFocus={(e) => (e.target.type = "text")}
                        onBlur={(e) => (e.target.type = "password")}
                        type="loginPassword"
                        id="loginPassword"
                        name="loginPassword"
                        value={loginPassword}
                        onChange={onChangeInput}
                        autoComplete="off"
                        placeholder="Enter your Password"
                        className="border-2  border-gray-300 outline-none p-2 rounded-md"
                      />
                      {loginError.password && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.password}
                        </p>
                      )}

                      {loginError.error === "Incorrect password" && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.error}
                        </p>
                      )}
                    </div>

                    <div className="recaptacha-login  mt-5 ">
                      <ReCAPTCHA
                        sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                        onChange={handleCaptchaChange}
                      />
                    </div>

                    <button
                      disabled={!captchaValue}
                      onClick={onClickSignIn}
                      className={`${
                        !captchaValue ? "bg-gray-400" : "bg-sky-800"
                      } transition-all duration-300  p-3 mt-2 rounded-md text-white`}
                    >
                      Log In
                    </button>

                    <div className="flex items-center flex-wrap mt-5 mb-5 gap-2 ">
                      <p>Don't you have an account?</p>
                      <button
                        onClick={onClickBtn}
                        className="bg-sky-800 px-3 py-1 cursor-pointer  text-white rounded"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainbar;
