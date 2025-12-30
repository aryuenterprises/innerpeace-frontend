import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiListHeartFill } from "react-icons/pi";
import { BsFillSendFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import default_user_image from "../assets/default_user_image_2.jpg";

const MyProfile_Sidebar = () => {
  const navigate = useNavigate();
  const [userLogedIn, setUserLogedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGoogleImage, setSelectedGoogleImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // New uploading state

  const onClickSidebarMenu = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const loggedUserDetails = localStorage.getItem("loginDetails")
      ? JSON.parse(localStorage.getItem("loginDetails"))
      : null;

    if (loggedUserDetails) {
      setUserLogedIn(true);
    }

    if (loggedUserDetails) {
      const {
        profile_image: loggedUser_image,
        id: loggedUser_id,
        googlePicture: google_profile_image,
      } = loggedUserDetails;
      setSelectedImage(loggedUser_image);
      setUserId(loggedUser_id);
      setSelectedGoogleImage(google_profile_image);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onClickLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loginDetails");
        localStorage.removeItem("loginid");
        navigate("/login");
      }
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploading(true); // Start uploading
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);

      try {
        const payload = new FormData();
        payload.append("image_1", file);

        const response = await axios.post(
          `https://backoffice.innerpece.com/api/v1/update-profile/${userId}`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        localStorage.setItem(
          "loginDetails",
          JSON.stringify(response.data.user)
        );

        const loggedUserDetails = localStorage.getItem("loginDetails")
          ? JSON.parse(localStorage.getItem("loginDetails"))
          : null;

        if (loggedUserDetails) {
          setUserLogedIn(true);
        }

        if (loggedUserDetails) {
          const { profile_image: loggedUser_image, id: loggedUser_id } =
            loggedUserDetails;
          setSelectedImage(loggedUser_image);
          setUserId(loggedUser_id);
          setSelectedGoogleImage("");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setUploading(false); // End uploading
      }
    }
  };

  return (
    <div className="flex flex-col md:sticky h-fit top-0 p-3 bg-white rounded-lg shadow-md">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white opacity-75 z-10">
          <div className="spinner-border animate-spin border-4 border-t-4 border-blue-600 rounded-full w-12 h-12"></div>
        </div>
      )}

      <div className="h-56 flex flex-col items-center w-full rounded-lg relative">
        <img
          src={
            selectedGoogleImage
              ? `https://lh3.googleusercontent.com/a/ACg8ocIhVNzZboB6D8GmE2nCJd5aOAuk6Q5x3pluBLxq45TnCZUoPA=s96-c`
              : selectedImage
              ? `https://backoffice.innerpece.com/${selectedImage}`
              : default_user_image
          }
          alt="userImage"
          className="w-full h-full object-contain object-center rounded-lg"
        />
        <label
          htmlFor="changeimage"
          className={`font-medium mt-1 cursor-pointer text-gray-500 hover:text-gray-600 ${
            !userLogedIn && "opacity-0 hidden"
          }`}
        >
          Change Image
        </label>
        <input
          disabled={!userLogedIn}
          type="file"
          id="changeimage"
          accept="image/*"
          onChange={handleImageChange}
          className="opacity-0"
        />
        {uploading && (
          <p className="text-sm text-blue-600 font-medium mt-2">Uploading...</p>
        )}
      </div>

      <div className="flex flex-col mt-12 ">
        <div
          onClick={() => onClickSidebarMenu("/profile")}
          className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-100 cursor-pointer gap-3"
        >
          <FaUser className="text-xl text-blue-600" />
          <p className="text-gray-700 font-medium">Profile</p>
        </div>

        <div
          onClick={() => onClickSidebarMenu("/wishlist")}
          className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-100 cursor-pointer gap-3"
        >
          <PiListHeartFill className="text-2xl text-red-500" />
          <p className="text-gray-700 font-medium">Wishlist</p>
        </div>

        <div
          onClick={() => onClickSidebarMenu("/enquiries")}
          className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-100 cursor-pointer gap-3"
        >
          <BsFillSendFill className="text-xl text-green-500" />
          <p className="text-gray-700 font-medium">Enquiries</p>
        </div>

        {userLogedIn && (
          <div
            onClick={onClickLogout}
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-100 cursor-pointer gap-3"
          >
            <IoLogOut className="text-2xl text-gray-700" />
            <p className="text-gray-700 font-medium">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile_Sidebar;
