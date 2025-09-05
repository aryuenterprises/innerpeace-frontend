import React from "react";
import { lazy,Suspense } from "react";
let Header=lazy(()=>import("../components/Header"))
let SignupHero=lazy(()=>import("../components/SignupHero"))
let SignupForm=lazy(()=>import("../components/SignupForm"))
let Footer=lazy(()=>import("../components/Footer"))
import { useEffect, useState } from "react";
import whatsapp from "../assets/whatsapp.svg";





function SignUp() {
    // const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        document.title = "Signup - Innerpece";
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
      <div
        onClick={() => window.open("https://wa.me/6384131642")}
        className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
      >
        <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
          <p>Whatsapp Enquiry</p>
        </div>
        <img src={whatsapp} className="h-10 w-10  transition-all duration-500" />
      </div>

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />
        <SignupHero />
        <SignupForm />
        <Footer />
      </Suspense>
    </div>
  );
}

export default SignUp;
