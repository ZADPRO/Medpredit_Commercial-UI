import React, { useEffect, useState } from "react";
import "./AdsBanner.css";

const AdsBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show ad if not already closed in this session
    const isBannerClosed = sessionStorage.getItem("adsBannerClosed");
    if (!isBannerClosed) {
      setShowBanner(true);
    }
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("adsBannerClosed", "true");
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
