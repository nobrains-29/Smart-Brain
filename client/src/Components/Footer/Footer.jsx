import React from "react";
import "./Footer.css";

const date = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; Archit Tripathi {date} </p>
    </footer>
  );
};

export default Footer;
