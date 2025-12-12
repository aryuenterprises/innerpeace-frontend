import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Featuredhero = lazy(() => import("../components/FeaturedHero"));
let Featured = lazy(() => import("../components/Featured"));
let TourDetailsTwoComponents = lazy(() =>
  import("../components/TourDetailsTwoComponents")
);
let Footer = lazy(() => import("../components/Footer"));
import { useRef, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GoToTop from "../components/GoToTop";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function TourDetails() {
  let navigate = useNavigate();
  useEffect(() => {
    document.title = "Tour Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount

  let highlightsRef = useRef(null);
  let informationRef = useRef(null);
  let TourPlanningRef = useRef(null);
  let LocationShareRef = useRef(null);
  let reviewRef = useRef(null);
  let dummyRef = useRef(null);

  const handlehighlightsScroll = () => {
    highlightsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleInformationScroll = () => {
    informationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleTourPlanningScroll = () => {
    TourPlanningRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocationShareScroll = () => {
    LocationShareRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const reviewRefScroll = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const location = useLocation();
  const { id, cameFrom } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const pathName = window.location.pathname;
  const slicedPathName = window.location.pathname.split("/")[1];
  const [priceSelected, setPriceSelected] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [show, setShow] = useState(false);
  const [homeImage, setHomeImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [homeImage.length]);

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

        setApiData(response.data.data);
        setHomeImage(response.data.data.gallery_img);
        setSelectedPackage(response.data.data.price_title[0]);
        setPriceSelected(response.data.data.price_amount[0]);
      } catch (err) {
        console.log(err.response.data.message);
        if ((err.status = 404)) {
          setApiError(err.response.data.message);
        }
      }
    };
    fetchProgramData();
  }, []);

  return (
    <div className="bg-[#FEFEFE]">
      <GoToTop />

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        {!apiError ? (
          <>
            <Header />
            
            {/* breadcrumbs */}
            {cameFrom === "tripcategories" ? (
              <div className="flex gap-1 sm:gap-2  py-0.5 items-center  mx-3 md:mx-10 xl:mx-20">
                <Link to="/">
                  <p className="text-xs sm:text-sm">Home</p>
                </Link>
                <MdOutlineKeyboardArrowRight className="text-xl" />

                {/* Go back when Trip Categories is clicked */}
                <p
                  className="text-xs sm:text-sm cursor-pointer "
                  onClick={() => navigate(-1)}
                >
                  Trip Categories
                </p>

                <MdOutlineKeyboardArrowRight className="text-xl" />
                <p className="text-blue-500 font-medium sm:font-semibold">
                  Trip Details
                </p>
              </div>
            ) : (
              <div className="flex gap-1 sm:gap-2 py-0.5 items-center">
                <Link to="/">
                  <p className="text-xs sm:text-sm">Home</p>
                </Link>
                <MdOutlineKeyboardArrowRight className="text-xl" />

                {/* Go back when Trip Categories is clicked */}
                <p
                  className="text-xs sm:text-sm cursor-pointer "
                  onClick={() => navigate(-1)}
                >
                  Popular Programs
                </p>

                <MdOutlineKeyboardArrowRight className="text-xl" />
                <p className="text-blue-500 font-medium sm:font-semibold">
                  Program Details
                </p>
              </div>
            )}

            <Featuredhero
              handlehighlightsScroll={handlehighlightsScroll}
              handleInformationScroll={handleInformationScroll}
              handleTourPlanningScroll={handleTourPlanningScroll}
              handleLocationShareScroll={handleLocationShareScroll}
              reviewRefScroll={reviewRefScroll}
            />
            <Featured />
            <TourDetailsTwoComponents
              highlightsRef={highlightsRef}
              LocationShareRef={LocationShareRef}
              informationRef={informationRef}
              TourPlanningRef={TourPlanningRef}
              reviewRef={reviewRef}
              dummyRef={dummyRef}
            />
            <Footer className="pb-36 md:pb-0" />
          </>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <p className="text-xl md:text-2xl lg:text-3xl">Package not found</p>

            <NavLink
              to="/"
              className="bg-blue-600 text-white px-5  py-2 rounded-lg font-semibold"
            >
              Go back
            </NavLink>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default TourDetails;
