import { Suspense, useEffect } from "react";
import { lazy } from "react";

let HomeHero = lazy(() => import("../components/home components/HomeHero"));
let HomeTripCategory = lazy(() =>
  import("../components/home components/HomeTripCategory")
);
let HomeChoosePerfectTravelType = lazy(() =>
  import("../components/home components/HomeChoosePerfectTravelType")
);
let HomePopularPrograms = lazy(() =>
  import("../components/home components/HomePopularPrograms")
);
let HomePopularStays = lazy(() =>
  import("../components/home components/HomePopularStays")
);
let HomeLetsGetStarted = lazy(() =>
  import("../components/home components/HomeLetsGetStarted")
);
import whatsapp from "../assets/whatsapp.svg";
import HomeBlogs from "../components/home components/HomeBlogs";
import HomePopularStaysHimachal from "../components/home components/HomePopularStaysHimachal";
import TopHeader from "../components/TopHeader";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import HomeHeader from "../components/HomeHeader";

function Home() {
  useEffect(() => {
    document.title = "Home - Innerpece";
  }, []);

  return (
    <div>
      <div
        onClick={() => window.open("https://wa.me/8807343642")}
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
        {/* <TopHeader /> */}
        {/* <Header /> */}

        <HomeHeader />
        <HomeHero />
        <HomeTripCategory />
        <HomeChoosePerfectTravelType />
        <HomePopularPrograms />
        <HomeLetsGetStarted />
        <HomePopularStays />
        <HomePopularStaysHimachal />
        <HomeBlogs />
        <Footer />
      </Suspense>
    </div>
  );
}
export default Home;
