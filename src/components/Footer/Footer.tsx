import React from "react";

import NRELogo from "../../assets/NRE_Powered_logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-row-reverse">
      <img src={NRELogo} alt="Powered by NRE" className="max-w-[160px]" />
    </footer>
  );
};

export default Footer;
