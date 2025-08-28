import React from "react";
import { Link } from "react-router-dom";
import classes from "../Footer.module.scss";
import { Youtube, Instagram } from "lucide-react";

const NavigationMenu = () => {
  const navMenu = [
    { id: 1, to: "/guaranteewarranty", label: "Guarantee Warranty" },
    { id: 2, to: "/aboutus", label: "About Us" },
    { id: 3, to: "/Contactus", label: "Contact Us" },
    // { id: 4, to: "/termsconditions", label: "Terms & Conditions" },
    // { id: 5, to: "/privacypolicy", label: "Privacy Policy" },
    // { id: 3, to: "/", label: "Policy Update" },
  ];

  const navQuick = [
    { id: 1, to: "/", label: "Quick links 1" },
    { id: 2, to: "/", label: "Quick links 2" },
    { id: 3, to: "/", label: "Quick links 3" },
  ];

  // Split the menu into two columns
  const firstColumn = navMenu.slice(0, 7); // ids 1 to 7
  const secondColumn = navQuick.slice(0, 7); // ids 7 and beyond


  return (
    <div className={`${classes.navmenuDivide}`}>
      {/* <div className={`${classes.footerDivide}`}>
        {firstColumn.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`${classes.navigateMenu}`}
          >
            {link.label}
          </Link>
        ))}
      </div> */}

      <div className={`${classes.footerDivide}`}>
      <h4 className={`${classes.footerHeading} !mb-2`}>Quick links</h4>
        {firstColumn.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`${classes.navigateMenu}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
         <div className="space-y-2">
        <h4 className={`${classes.footerHeading} !mb-2`}>Follow Us</h4>
        <div className="flex gap-4">
          <a
            href="https://www.youtube.com/@SumanTyres"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/suman_tyres?igsh=bGl3amx4M2ViNXM5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
</div>

      {/* <div>
        <h4 className={`${classes.footerHeading} !mb-2`}>Quick links</h4>
        <div className={`${classes.footerDivide}`}>
          {secondColumn.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={`${classes.navigateMenu}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div> */}

    </div>
  );
};

export default NavigationMenu;
