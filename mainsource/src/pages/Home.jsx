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
import HomeBlogs from "../components/home components/HomeBlogs";
import HomePopularStaysHimachal from "../components/home components/HomePopularStaysHimachal";
import Footer from "../components/layouts/Footer";
import HomeHeader from "../components/HomeHeader";
import GoToTop from "../components/GoToTop";
import Reviews from "../components/Reviews";
import TopHeader from "../components/TopHeader";

function Home() {
  useEffect(() => {
    document.title = "Home - Innerpece";
  }, []);

  return (
    <div>
      <GoToTop />

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        {/* <TopHeader/> */}
        {/* <HomeHeader /> */}
        <HomeHero />
        <HomeTripCategory />
        <HomeChoosePerfectTravelType />
        <HomePopularPrograms />
        <HomeLetsGetStarted />
        <HomePopularStays />
        <HomePopularStaysHimachal />
        <HomeBlogs />
        <Reviews />
        <Footer />
      </Suspense>
    </div>
  );
}
export default Home;
