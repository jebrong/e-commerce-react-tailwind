import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { motion as m } from "framer-motion";
import { parentNav, buttonHoverTap } from "../../animations/animations";

export default function BrowseSingleNav() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { totalQuantity } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  return (
    <m.div
      variants={parentNav}
      initial="hidden"
      animate="show"
      className="flex w-full px-2 py-6 md:px-0   md:py-8 sm:justify-between  w-full border-b-2  border-primary   dark:border-secondary  "
    >
      <div className="flex items-center w-full justify-between w-full">
        <div className="w-full flex h-[37.33px] items-center cursor-pointer dark:border-secondary 	pr-5 tracking-wide font-head  font-black dark:font-extrabold md:text-xl   ">
          <m.h1
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            className=""
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            FURNITUR
          </m.h1>
        </div>
        <div
          className="flex sm:flex-row  w-full items-center justify-end

      
      
      
      
       md:justify-end md:gap-x-5   sm:gap-x-2  md:pt-0 "
        >
          {!isAuthenticated ? (
            <m.button
              variants={buttonHoverTap}
              whileHover="hover"
              whileTap="tap"
              onClick={loginWithRedirect}
            >
              Sign In
            </m.button>
          ) : (
            <m.button
              variants={buttonHoverTap}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                logout({ return: window.location.origin });
              }}
            >
              Sign Out
            </m.button>
          )}

          <m.button
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            className="relative"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
            <div className="absolute flex items-center justify-center   bg-primary text-secondary dark:bg-secondary dark:text-primary text-center h-5 w-5 text-md rounded-full  top-[-12px] right-[-10px]  md:right-[-12px]">
              <div className="text-[10px]"> {totalQuantity}</div>
            </div>
          </m.button>
        </div>
      </div>
    </m.div>
  );
}
