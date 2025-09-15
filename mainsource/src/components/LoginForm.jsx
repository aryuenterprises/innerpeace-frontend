import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxChecked, setCheckBoxChecked] = useState("");
  const [loginError, setLoginError] = useState({});
  const [signInLoader, setSignInLoader] = useState(false);
  const location = useLocation();
  const from = location.state?.from || "/";

  let navigate = useNavigate();

  function onClickBtn() {
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "checkbox") {
      setCheckBoxChecked(checkboxChecked ? "" : "checkbox checked");
    }
  }

  async function onClickSignIn() {
    setSignInLoader(true);
    try {
      let response = await axios.post(
        // `https://backoffice.innerpece.com/api/login`,
        `https://backoffice.innerpece.com/api/v1/login`,
        {
          email: email,
          password: password,
        }
      );

      const loginid = response.data.token;
      const loginDetails = response.data.user_details;

      localStorage.setItem("loginid", loginid);
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setEmail("");
      setPassword("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate(from);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
      setSignInLoader(false);
    } catch (err) {
      console.log(err);
      setSignInLoader(false);

      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
    }
  }

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {
    const token = response.credential;
    const userDetails = jwtDecode(token);
    setUser(userDetails); // Store user details in state
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google API
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );


        postGoogleUserData({ ...res.data });

        // res.data will have: name, email, picture, etc.
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  const postGoogleUserData = async (res) => {
 

    try {
      let response = await axios.post(
        `https://backoffice.innerpece.com/api/v1/auth/google/callback`,
        { ...res }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 2000,
      });

      let loginid = response.data.token;
      let loginDetails = response.data.user_details;

      loginDetails = { ...loginDetails, googlePicture: res.picture };

      localStorage.setItem("loginid", loginid);
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);

      console.log(err?.response?.data?.error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        // text:err.response.data.error,
        text: err.response?.data?.error || "Something went wrong!",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 md:mt-14">
      <div className="w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
        <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
          <div className=' bg-[url("././assets/login_image.png")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

          <div className="w-2/5 flex-grow flex-shrink">
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Log In To Get Started
              </p>

              {/* <div className="flex flex-wrap gap-2 items-center">
                <p
                  style={{ backgroundColor: "#EB9009" }}
                  className="text-white px-2 rounded"
                >
                  20% off
                </p>
                <p className="text-gray-500">get 20% off for web signup</p>
              </div> */}

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col flex-grow gap-2">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    autoComplete="off"
                    onChange={onChangeInput}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Enter your Email"
                  />
                  {loginError.email && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {loginError.email}
                    </p>
                  )}

                  {loginError.error === "Unauthorized User " && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {loginError.error}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col mt-5 gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="font-semibold">
                    Your Password
                  </label>
                  {/* <p className="text-red-400 cursor-pointer text-xs md:text-sm font-semibold">
                    Forgot Password?
                  </p> */}
                </div>
                <input
                  onFocus={(e) => (e.target.type = "text")}
                  onBlur={(e) => (e.target.type = "password")}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangeInput}
                  autoComplete="off"
                  placeholder="Enter your Password"
                  className="border-2  border-gray-300 outline-none p-2 rounded-md"
                />
                {loginError.password && (
                  <p className="text-red-500 text-xs sm:text-sm ">
                    {loginError.password}
                  </p>
                )}

                {loginError.error === "Incorrect password" && (
                  <p className="text-red-500 text-xs sm:text-sm ">
                    {loginError.error}
                  </p>
                )}
              </div>

              <div className="recaptacha-login  mt-5">
                <ReCAPTCHA
                  sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                  onChange={handleCaptchaChange}
                />
              </div>

              <button
                disabled={!captchaValue || signInLoader}
                onClick={onClickSignIn}
                className={`${
                  !captchaValue ? "bg-gray-400" : "bg-sky-800"
                } transition-all duration-300 w-full p-3 mt-2 rounded-md text-white`}
              >
                {signInLoader ? (
                  <div className="flex justify-center items-center">
                    <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </div>
                ) : (
                  "Log In"
                )}
              </button>

              <button
                onClick={() => login()}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-white shadow-md rounded-lg border hover:bg-gray-50 transition"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">
                  Continue with Google
                </span>
              </button>

              <div className="flex items-center flex-wrap mt-5 mb-5 gap-2 ">
                <p>Don't you have an account?</p>
                <button
                  onClick={onClickBtn}
                  className="bg-sky-800 px-3 py-1 cursor-pointer  text-white rounded"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <GoogleOAuthProvider clientId="921328741345-3pthhre9l7vskb4i0046u4gh87jk7ktj.apps.googleusercontent.com">
        <div className="flex flex-col items-center justify-center h-screen">
          {user ? (
            <div className="text-center">
              <img
                src={user.picture}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-gray-300"
              />
              <h2 className="mt-2 text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ) : (
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          )}
        </div>
      </GoogleOAuthProvider> */}
    </div>
  );
}

export default Login;
