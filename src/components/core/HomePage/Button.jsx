import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[14px] sm:text-[16px] px-8 py-3 rounded-full font-bold shadow-lg ${
          active 
            ? "bg-yellow-50 text-black hover:shadow-[0_6px_20px_rgba(255,214,10,0.3)] border border-transparent" 
            : "bg-richblack-800 text-richblack-5 border border-richblack-700/50 backdrop-blur-sm hover:shadow-[0_6px_20px_rgba(255,255,255,0.05)] hover:bg-richblack-900/80"
        } hover:-translate-y-1 transition-all duration-300 active:scale-95`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;