import React from "react";
import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let LoginHero = lazy(() => import("../components/LoginHero"));
let LoginForm = lazy(() => import("../components/LoginForm"));
let Footer = lazy(() => import("../components/Footer"));
import { useEffect, useState } from "react";
import whatsapp from "../assets/whatsapp.svg";
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Login() {
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Login - Innerpece";
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 200); // Adjust time as needed

    // return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
  //       <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }
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

        <Header />

        <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>

          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">Login</p>
        </div>

        <LoginHero />
        <LoginForm />
        <Footer className="pb-10" />
      </Suspense>
    </div>
  );
}

export default Login;
