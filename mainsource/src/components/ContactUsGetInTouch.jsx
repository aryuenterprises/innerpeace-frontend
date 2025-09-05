import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

function GetInTouch() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    setLoading(false);
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = "First name is required.";
    if (!lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!message.trim()) newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" }); // Clear errors for the current field

    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value.slice(0, 10));
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  const onClickSendMessage = async () => {
    const isValid = validateForm();
    if (!isValid) return; // don't proceed if invalid
  
    setLoading(true); // move setLoading after validation passes
  
    try {
      await axios.post(`https://backoffice.innerpece.com/api/v1/contact`, {
        first_name: firstname,
        last_name: lastname,
        email,
        phone,
        message,
      });
  
      // Clear form
      setFirstname("");
      setLastname("");
      setPhone("");
      setEmail("");
      setMessage("");
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Message sent successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Failed to send message. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false); // always reset loading at the end
    }
  };
  

  return (
    <div>
      <div className="flex flex-col md:flex-row px-2 md:px-20 lg:px-30 xl:px-40 gap-8 md:gap-16 mt-8 md:mt-20">
        <div className="basis-[40%]">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl  font-dmSans">
            Get in Touch with Our Team
          </p>
          <p className="text-gray-400 mt-5 md:mt-8 font-mulish">
            Connect with our team at Innerpece for all your travel needs and
            inquiries. We're here to help!
          </p>
          {/* Contact details */}
        </div>

        <div className="basis-[50%] mt-5 md:mt-10">
          <div className="flex flex-col gap-5 font-dmSans">
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-grow flex-col gap-3">
                <label htmlFor="firstname">Your First Name</label>
                <input
                  placeholder="Enter your first name"
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={onChangeInput}
                  autoComplete="off"
                  className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5 text-sm"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname}</p>
                )}
              </div>

              <div className="flex flex-grow flex-col gap-3">
                <label htmlFor="lastname">Your Last Name</label>
                <input
                  placeholder="Enter your last name"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={onChangeInput}
                  value={lastname}
                  autoComplete="off"
                  className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5 text-sm"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex flex-grow flex-col gap-3">
                <label htmlFor="email">Your Email</label>
                <input
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChangeInput}
                  value={email}
                  autoComplete="off"
                  className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5 text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-grow flex-col gap-3">
                <label htmlFor="phone">Your Phone No</label>
                <input
                  placeholder="Enter your phone No"
                  type="number"
                  id="phone"
                  name="phone"
                  onChange={onChangeInput}
                  value={phone}
                  autoComplete="off"
                  className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5 text-sm"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                rows={7}
                onChange={onChangeInput}
                value={message}
                autoComplete="off"
                placeholder="Enter your message"
                className="border-2 resize-none bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5 text-sm"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <div className="recaptacha-login">
              <ReCAPTCHA
                sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                onChange={handleCaptchaChange}
              />
            </div>

            <button
              disabled={!captchaValue || loading}
              onClick={onClickSendMessage}
              className={`${
                !captchaValue || loading ? "bg-gray-400" : "bg-sky-800"
              } transition-all duration-300 px-5 w-36 py-2 md:px-7 outline-none md:py-3 lg:px-8 lg:py-4 xl:px-10  rounded-full text-white`}
            >
              {loading ? (
                <>
                  <div className="flex justify-center items-center">
                    <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </div>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
