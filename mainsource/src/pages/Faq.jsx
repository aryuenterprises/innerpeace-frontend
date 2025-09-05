import React, { useEffect, useState } from "react";
import uparrow from "../assets/uparrow.png";
import downarrow from "../assets/downarrow.png";
import axios from "axios";
import { lazy, Suspense } from "react";
let Footer = lazy(() => import("../components/Footer"));
let Header = lazy(() => import("../components/Header"));
import whatsapp from "../assets/whatsapp.svg";

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqs, setFeqs] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "FAQ - Innerpece";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    async function getDataFromApi() {
      let response = await axios.get(
        `https://backoffice.innerpece.com/api/v1/faq`
      );
      setFeqs(response.data.faqs);
    }

    getDataFromApi();
  }, []);

  // Toggle the open index based on clicked item
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => window.open("https://wa.me/6384131642")}
        className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
      >
        <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
          <p>Whatsapp Enquiry</p>
        </div>
        <img src={whatsapp} className="h-10 w-10 transition-all duration-500" />
      </div>

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />

        <div className="p-5 md:px-20 lg:px-30 xl:px-40 gap-16  mt-8 md:mt-14">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">FAQ</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Booking and Reservations
          </p>
          <hr className="mt-5 w-20 border-sky-800" />

          <div className="flex flex-col md:w-[70vw] xl:w-[50vw] mt-5 md:mt-12 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className=" md:pb-4">
                <div
                  className="flex items-center cursor-pointer justify-between"
                  onClick={() => toggleFaq(index)}
                >
                  <p className="text-sky-800 text-lg md:text-xl">
                    {faq.question}
                  </p>
                  <img
                    src={openIndex === index ? uparrow : downarrow}
                    alt=""
                    className="object-contain w-5 h-5"
                  />
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openIndex === index ? " opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="mt-4  text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </Suspense>
    </div>
  );
}

export default Faq;
