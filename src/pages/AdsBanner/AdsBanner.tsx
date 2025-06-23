import React, { useEffect, useState } from "react";
import "./AdsBanner.css";

const AdsBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show ad if not already closed in this session
    const isBannerClosed = localStorage.getItem("adsBannerClosed");
    console.log("isBannerClosed", isBannerClosed);
    if (isBannerClosed === "present") {
      setShowBanner(true);
    }
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem("adsBannerClosed", "absent");
  };

  if (!showBanner) return null;

  return (
    <div className="ads-banner">
      <p style={{ textAlign: "center", margin: 0 }}>
        This is a global Ad Banner
      </p>
      <button className="ads-close-btn" onClick={handleCloseBanner}>
        ✕
      </button>
    </div>
  );
};

export default AdsBanner;
