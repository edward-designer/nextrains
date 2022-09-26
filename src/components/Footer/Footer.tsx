import React from "react";

import NRELogo from "../../assets/NRE_Powered_logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-row-reverse pt-2">
      <img
        src={NRELogo}
        alt="Powered by NRE"
        className="max-w-[160px]"
        width="160"
        height="33"
      />
    </footer>
  );
};

export default Footer;
