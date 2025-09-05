import React, { useEffect, useState } from "react";
import uparrow from "../assets/uparrow.png";
import downarrow from "../assets/downarrow.png";
import axios from "axios";

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqs, setFeqs] = useState([]);

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

  return (
    <div className="px-5 md:px-20 lg:px-30 xl:px-40 gap-16  mt-8 md:mt-14">
      <p className="text-3xl md:text-5xl">FAQ</p>
      <p className="text-2xl md:text-3xl mt-5 md:mt-10">Booking and Reservations</p>
      <hr className="mt-5 w-20 border-sky-800" />

      <div className="flex flex-col md:w-[70vw] xl:w-[50vw] mt-5 md:mt-12 gap-8">
        {faqs.map((faq, index) => (
          
          <div key={index} className=" md:pb-4">
            <div
              className="flex items-center cursor-pointer justify-between"
              onClick={() => toggleFaq(index)}
            >
              <p className="text-sky-800 text-xl">{faq.question}</p>
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
  );
}

export default Faq;
