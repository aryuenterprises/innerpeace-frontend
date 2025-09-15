import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ProgramsDetails = lazy(() => import("./pages/ProgramsDetails"));
const StaysList=lazy(()=>import('./pages/StaysList'))
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const TourDetails = lazy(() => import("./pages/TourDetails"));
const DestinationsDetails = lazy(() => import("./pages/DestinationsDetails"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const HomeFilter = lazy(() => import("./pages/HomeFilter"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const SendEnquiry = lazy(() => import("./pages/SendEnquiry"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const User_Profile = lazy(() => import("./pages/User_Profile"));
const User_Wishlist = lazy(() => import("./pages/User_Wishlist"));
const User_Enquiries = lazy(() => import("./pages/User_Enquiries"));
const Faq = lazy(() => import("./pages/Faq"));
import { HelmetProvider } from "react-helmet-async";
import Destinations from "./pages/Destinations";
import StaysDetails from "./pages/StaysDetails";
import FilteredList from "./pages/FilteredList";
import CreateEvent from "./pages/CreateEvent";



function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/createEvent" element={< CreateEvent/>} /> */}
          <Route path="/sendenquiry" element={<SendEnquiry />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:id/:title" element={<TourDetails />} />
          <Route path="/home-filter/:city_name" element={<HomeFilter />} />
          <Route
            path="/tripcategories/:theme_id/:theme_name"
            element={<ProgramsDetails />}
          />
          <Route
            path="/populardestinations/:city_id/:city_name"
            element={<DestinationsDetails />}
          />
            <Route
            path="/stayslist/:id/:cityname"
            element={<StaysList />}
          />
          <Route path="/destinations" element={<Destinations/>} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/profile" element={<User_Profile />} />
          <Route path="/wishlist" element={<User_Wishlist />} />
          <Route path="/enquiries" element={<User_Enquiries />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/staysdetails/:id" element={<StaysDetails />} />
          <Route path="/filteredList/:id" element={<FilteredList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
