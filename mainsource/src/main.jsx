// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import GoogleOAuthProvider
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="762532356515-eronaurmlc0r1odc90dfm9mubk9e476l.apps.googleusercontent.com">
    {/* GOOGLE_CLIENT_ID=762532356515-eronaurmlc0r1odc90dfm9mubk9e476l.apps.googleusercontent.com */}
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
