import React from "react";
import pattern1 from "../../assets/images/Splashscreen/background.png";
import logo from "../../assets/images/Splashscreen/logo.png";
import "./Splashscreen.css";
const Splashscreen: React.FC = () => {
  return (
    <>
      <div className="bg-container">
        <div className="logoImage ">
          <img src={logo} alt="Medpredit Logo" className="logo" />
        </div>
      </div>
    </>
  );
};

export default Splashscreen;
