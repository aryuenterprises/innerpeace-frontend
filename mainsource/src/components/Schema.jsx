// components/Schema.js
import { Helmet } from "react-helmet-async";

const Schema = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Innerpece",
    "url": "https://www.innerpece.com/"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.innerpece.com/" },
      { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://www.innerpece.com/destinations" },
      { "@type": "ListItem", "position": 3, "name": "About Us", "item": "https://www.innerpece.com/aboutus" },
      { "@type": "ListItem", "position": 4, "name": "Contact Us", "item": "https://www.innerpece.com/contactus" },
      { "@type": "ListItem", "position": 5, "name": "Login", "item": "https://www.innerpece.com/login" }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default Schema;