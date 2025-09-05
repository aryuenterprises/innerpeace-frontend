// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Sitemap = () => {
//   let navigate = useNavigate();
//   return (
//     <div className="w-full h-screen flex flex-col gap-2 justify-center items-center bg-gray-100">
//       <button
//         onClick={() => navigate("/")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Home
//       </button>

//       <button
//         onClick={() => navigate("/programsdetails/workations-in-the-himalayas")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Programs Details
//       </button>

//       <button
//         onClick={() => navigate("/destinationsdetails/tamilnadu")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Destination Details
//       </button>

//       <button
//         onClick={() => navigate("/sendenquiry")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Send Enquiry
//       </button>
//       <button
//         onClick={() => navigate("/aboutus")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         About{" "}
//       </button>
//       <button
//         onClick={() => navigate("/contactus")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Contact Us
//       </button>
//       <button
//         onClick={() => navigate("/login")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Login
//       </button>
//       <button
//         onClick={() => navigate("/signup")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Sign Up
//       </button>
//       <button
//         onClick={() => navigate("/privacypolicy")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Privacy Policy
//       </button>
//       <button
//         onClick={() => navigate("/termsofservice")}
//         className="bg-blue-500 text-white p-2 rounded-md"
//       >
//         Terms of Service
//       </button>
//     </div>
//   );
// };

// export default Sitemap;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaLock,
  FaUser,
  FaSignInAlt,
  FaClipboardList,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaFileContract,
  FaBlog,
} from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";


const links = [
  { path: "/", label: "Home", icon: <FaHome /> },
  // {
  //   path: "/programsdetails/workations-in-the-himalayas",
  //   label: "Programs Details",
  //   icon: <FaClipboardList />,
  // },
  // {
  //   path: "/destinationsdetails/tamilnadu",
  //   label: "Destination Details",
  //   icon: <FaMapMarkerAlt />,
  // },
  {
    path: "/sendenquiry",
    label: "Customization Enquiry",
    icon: <FaQuestionCircle />,
  },
  { path: "/aboutus", label: "About", icon: <FaInfoCircle /> },
  { path: "/contactus", label: "Contact Us", icon: <FaPhone /> },
  { path: "/login", label: "Login", icon: <FaSignInAlt /> },
  { path: "/signup", label: "Sign Up", icon: <FaUser /> },
  {
    path: "https://blogs.innerpece.com/",
    label: "Blog",
    icon: <FaBlog />,
    external: true,
  },
  { path: "/privacypolicy", label: "Privacy Policy", icon: <FaLock /> },
  {
    path: "/termsofservice",
    label: "Terms of Service",
    icon: <FaFileContract />,
  },
  {
    path: "/faq",
    label: "FAQ",
    icon: <TbUserQuestion />,
  },
];

const Sitemap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-blue-800">Sitemap</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {links.map(({ path, label, icon, external }, index) => (
  <button
    key={index}
    onClick={() => {
      if (external) {
        window.open(path, "_blank");
      } else {
        navigate(path);
      }
    }}
    className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 text-blue-700 hover:bg-blue-100 transition-all duration-300 text-lg font-medium"
  >
    <span className="text-2xl">{icon}</span>
    {label}
  </button>
))}

      </div>
    </div>
  );
};

export default Sitemap;
