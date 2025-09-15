import guests from "../assets/guests.png";
import locationimg from "../assets/location.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { FaImage } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import DOMPurify from "dompurify";

function Featured() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, title } = location.state || {};

  const [apiData, setApiData] = useState([]);
  const [
    combinedGalleryImagesAndStayImages,
    setCombinedGalleryImagesAndStayImages,
  ] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentUrl = window.location.href;
  const metaDescription = apiData?.program_desc || "";
  const [userName, setUserName] = useState("");

  const handleWishlistClick = async () => {
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    const token = localStorage.getItem("loginid");

    if (!loginDetails || !loginDetails.id) {
      console.error("User is not logged in");
      navigate("/login");
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      return;
    }

    const { id: user_id } = loginDetails;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("program_id", id);
    formData.append("action", isWishlisted ? "remove" : "add");

    try {
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/add-remove-wishlist",
        formData,
        { headers }
      );

      console.log(response);
      setIsWishlisted((prev) => !prev);

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
          setUserName(response.data.data.name);

          setApiData(response.data.data);
          setIsWishlisted(response.data.data.wishlists);
        } catch (err) {
          console.log(err);
        }
      };

      fetchProgramData();
    } catch (error) {
      console.error("An error occurred while updating wishlist:", error);
    }
  };

  const slicedPathName = window.location.pathname.split("/")[1];
  const slicedUserId = window.location.href.split("#")[1];

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

        const response = slicedUserId
          ? await axios.post(
              "https://backoffice.innerpece.com/api/v1/specific-program-details",
              payload2
            )
          : await axios.post(
              "https://backoffice.innerpece.com/api/v1/get-program-details",
              payload1
            );

        setUserName(response.data.data.name);
        setApiData(response.data.data);
        setIsWishlisted(response.data.data.wishlists);
        setCombinedGalleryImagesAndStayImages([
          ...(response.data.data.gallery_img || []),
          ...(response.data.data.stay_images || []),
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, []);

  const [seeAllImageModalOpen, setSeeAllImageModalOpen] = useState(false);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  const openModal = (index = 0) => {
    setCurrentIndex1(index);
    setSeeAllImageModalOpen(true);
  };

  const closeModal = () => {
    setSeeAllImageModalOpen(false);
  };

  const [isFading, setIsFading] = useState(false);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "ArrowLeft") {
  //       goPrev();
  //     } else if (e.key === "ArrowRight") {
  //       goNext();
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  const goNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex1((prev) =>
        prev === combinedGalleryImagesAndStayImages.length - 1 ? 0 : prev + 1
      );
      setIsFading(false);
    }, 200); // 300ms matches the fade duration
  };

  const goPrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex1((prev) =>
        prev === 0 ? combinedGalleryImagesAndStayImages.length - 1 : prev - 1
      );
      setIsFading(false);
    }, 200);
  };

  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (seeAllImageModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [seeAllImageModalOpen]);

  // const sanitizedHTML = DOMPurify.sanitize(apiData.current_location);
  // console.log(sanitizedHTML);

  // const cleanHTML = (htmlString) => {
  //   const sanitizedHTML = DOMPurify.sanitize(htmlString);

  //   const cleaned = sanitizedHTML
  //     .replace(/<span[^>]*>|<\/span>/gi, "")
  //     .replace(/<o:p>|<\/o:p>/gi, "")
  //     .replace(/style="[^"]*"/gi, "")
  //     .replace(/&nbsp;/gi, " ")
  //     .replace(/<p[^>]*>/gi, "")
  //     .replace(/<\/p>/gi, "")
  //     .replace(/·\s*/g, "<li>") // convert bullets to list items
  //     .trim();

  //   return cleaned;
  // };

  // console.log(cleanHTML(apiData.current_location))

  function cleanApiHtml(str = "") {
    if (!str) return "";

    try {
      // Step 1: remove excessive backslashes
      let unescaped = str.replace(/\\+/g, "");

      // Step 2: decode HTML entities (&lt; &gt; &quot;)
      const parser = new DOMParser();
      const doc = parser.parseFromString(unescaped, "text/html");
      return doc.documentElement.textContent || "";
    } catch (err) {
      console.error("Failed to clean API HTML:", err);
      return str;
    }
  }

  const rawData = apiData?.current_location || "";
  const cleaned = cleanApiHtml(rawData);

  return (
    <div className="mt-20 md:mt-28  mx-3 md:mx-10   xl:mx-20 ">
      <div className="flex flex-wrap flex-col items-start justify-between gap-2">
        {userName && (
          <p className="font-medium text-lg font-jakarta bg-gradient-to-r from-[#0E598F] to-[#041A29] text-transparent bg-clip-text ">{`Welcome, ${userName}`}</p>
        )}

        <p className="font-semibold text-2xl md:text-4xl">{apiData.title}</p>

        <div className="flex flex-wrap gap-5">
          {apiData.member_capacity && (
            <div className="flex items-center flex-wrap gap-1">
              <img src={guests} alt="" className="object-contain" />
              <p className="text-gray-600">
                {apiData.member_capacity}{" "}
                {apiData.member_capacity === "1" ? "member" : "members"}
              </p>
            </div>
          )}

          {apiData.current_location && (
            <div className="flex items-center  gap-1">
              <img src={locationimg} alt="" className="object-contain" />
              {/* <p className="text-gray-600">{apiData.current_location}</p> */}
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: cleaned,
                }}
              />
            </div>
          )}

          {/* {apiData.start_date && apiData.end_date && (
            <div className="flex items-center flex-wrap gap-1">
              <MdDateRange className="inline-block  text-red-600 text-lg md:text-xl" />
              {apiData.start_date} - {apiData.end_date}
            </div>
          )} */}

          <div className="flex w-full sm:w-fit flex-row  flex-wrap md:flex-col gap-5 ">
            <div className="flex flex-wrap justify-between sm:justify-start w-full sm:w-fit items-center gap-2 md:gap-5">
              <FacebookShareButton
                url={currentUrl}
                quote={metaDescription}
                hashtag="#innerpece"
              >
                <div className="flex items-center cursor-pointer border-2 hover:bg-[#0965FE]  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full p-2 gap-2 px-3">
                  <FacebookIcon size={22} round={true} />
                  <p className="text-xs md:text-base">Share</p>
                </div>
              </FacebookShareButton>

              <LinkedinShareButton
                url={currentUrl}
                quote={metaDescription}
                hashtag="#innerpece"
              >
                <div className="flex items-center cursor-pointer border-2 hover:bg-[#0077B5]  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full p-2 gap-2 px-3">
                  <LinkedinIcon size={22} round={true} />
                  <p className="text-xs md:text-base">Share</p>
                </div>
              </LinkedinShareButton>

              <WhatsappShareButton
                url={currentUrl}
                quote={metaDescription}
                hashtag="#innerpece"
              >
                <div className="flex items-center cursor-pointer border-2 hover:bg-[#25D366]  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full p-2 gap-2 px-3">
                  <WhatsappIcon size={22} round={true} />
                  <p className="text-xs md:text-base">Share</p>
                </div>
              </WhatsappShareButton>

              {/* wishlist */}
              <div
                className="flex items-center cursor-pointer border-2 hover:bg-red-500  hover:border-white border-gray-700 text-gray-700 text-2xl sm:text-base hover:text-white transition-all ease-in duration-200  rounded-full p-2 gap-2 "
                onClick={() => handleWishlistClick(id)}
              >
                {isWishlisted ? (
                  <IoHeartSharp className="text-red-300 " />
                ) : (
                  <IoHeartOutline />
                )}
                <p className="hidden md:block">WishList</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {apiData && apiData.gallery_img && (
        <>
          <div className="flex gap-5 mt-5 h-[60vh] max-md:hidden">
            {/* Left Large Image */}
            <img
              src={`https://backoffice.innerpece.com/${apiData.gallery_img[0]}`}
              alt=""
              className="rounded-xl w-[60%] h-full object-cover"
            />

            {/* Right Grid of 4 Small Images */}
            <div className="w-[40%] grid grid-cols-2 grid-rows-2 gap-5">
              {apiData.gallery_img.slice(1, 5).map((img, index) => (
                <div
                  onClick={() => openModal(index + 1)}
                  key={index}
                  className="w-full h-full relative cursor-pointer "
                >
                  {/* <div className="bg-black/40 hover:bg-transparent transition-all duration-500 rounded-xl  absolute w-full h-full z-10"></div> */}
                  <img
                    src={`https://backoffice.innerpece.com/${img}`}
                    alt=""
                    className="rounded-xl w-full   h-full object-cover absolute"
                  />
                  {index === 3 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // This stops the outer div's onClick from firing
                        openModal(0);
                      }}
                      className="flex items-center gap-3 absolute bottom-2 right-2  bg-white rounded-full px-4 py-1"
                    >
                      <FaImage />
                      <p className="font-medium text-sm text-black text">
                        See All
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <></>
        </>
      )}

      {seeAllImageModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-xl">
          <div className="absolute w-full top-4 right-4 flex items-center justify-between">
            <p></p>
            <p className="text-white font-dmSans font-semibold">
              {currentIndex1 + 1} / {combinedGalleryImagesAndStayImages.length}
            </p>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="  text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Arrows and Image */}
          <div className="relative flex items-center justify-center w-full">
            {/* Left arrow */}
            <button
              onClick={goPrev}
              className="absolute left-5 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* Current image */}
            <img
              src={`https://backoffice.innerpece.com/${combinedGalleryImagesAndStayImages[currentIndex1]}`}
              alt="modal-img"
              className={`w-[80vw] h-[80vh] object-cover rounded-xl  transition-opacity duration-200 ease-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Right arrow */}
            <button
              onClick={goNext}
              className="absolute right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Featured;
