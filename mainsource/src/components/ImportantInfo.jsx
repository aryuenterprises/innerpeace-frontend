import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ImportantInfo({ informationRef }) {
  const location = useLocation();

  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload = {
          program_id: id,
          user_id: userDetails?.id || null,
        };

        const response = await axios.post(
          "https://backoffice.innerpece.com/api/get-program",
          payload
        );

        setApiData(response.data.data);

        // setIsWishlisted(response.data.data.wishlists);

        document.title = response.data.data.title;

        const metaOgTitle = document.querySelector("meta[property='og:title']");
        if (metaOgTitle) {
          metaOgTitle.setAttribute("content", response.data.data.title);
        }

        const metaOgDescription = document.querySelector(
          "meta[property='og:description']"
        );
        if (metaOgDescription) {
          metaOgDescription.setAttribute(
            "content",
            response.data.data.program_desc
          );
        }

        const metaOgImage = document.querySelector("meta[property='og:image']");
        if (metaOgImage) {
          metaOgImage.setAttribute(
            "content",
            `https://backoffice.innerpece.com/${apiData.cover_img}` || ""
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    // <div
    //   ref={informationRef}
    //   className="ms-5  me-5 mt-8 md:ms-20 md:mt-10 md:me-20  md:w-[55%] "
    // >
    //   <p className="font-semibold text-2xl ">Important Info</p>

    //   <div>
    //     {apiData.important_info && (
    //       <div
    //         className="mt-5"
    //         dangerouslySetInnerHTML={{ __html: apiData.important_info }}
    //       />
    //     )}
    //   </div>
    // </div>

    <div>

    </div>
  );
}

export default ImportantInfo;
