import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

import { motion as m } from "framer-motion";

import {
  parentNav,
  showNavItems,
  buttonHoverTap,
} from "../../animations/animations";

import { toggleNav } from "../../features/utils/utilsSlice";
import SmallNav from "../../components/SmallNav";

export default function HomeNav() {
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((store) => store.cart);
  const { openNav } = useSelector((store) => store.utils);

  return (
    <m.div
      variants={parentNav}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <m.div className=" py-6 items-space-between justify-between w-full border-b-2  border-primary  dark:border-secondary md:flex sm:hidden    ">
        <div variants={showNavItems} className="flex  md:gap-x-10   sm:gap-x-2">
          <m.button
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </m.button>
          <m.button
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              navigate("/contact");
            }}
          >
            Contact
          </m.button>
        </div>
        <div>
          <m.h1
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              navigate("/");
            }}
            className="dark:border-secondary w-full text-center	 tracking-wide font-head  font-black dark:font-extrabold md:text-xl  sm:text-lg cursor-pointer "
          >
            FURNITUR
          </m.h1>
        </div>
        <div className="flex  md:gap-x-10   sm:gap-x-2">
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
            onClick={() => {
              navigate("/browse");
            }}
          >
            Collection
          </m.button>

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
            <div className="absolute flex items-center justify-center   bg-primary text-secondary dark:bg-secondary dark:text-primary text-center h-5 w-5 text-md rounded-full md:top-[-8px] md:right-[-12px]">
              <div className="text-[10px]"> {totalQuantity}</div>
            </div>
          </m.button>
        </div>
      </m.div>

      <div className="py-4 flex justify-between  w-full  dark:border-secondary  md:hidden px-2">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="dark:border-secondary text-center	 tracking-wide font-head  font-black dark:font-extrabold md:text-xl  sm:text-lg cursor-pointer "
        >
          Carding ang bato
        </h1>
        <div className=" text-2xl">
          {openNav ? (
            <AiOutlineClose
              onClick={() => {
                dispatch(toggleNav());
              }}
            ></AiOutlineClose>
          ) : (
            <AiOutlineMenu
              onClick={() => {
                dispatch(toggleNav());
              }}
            ></AiOutlineMenu>
          )}
        </div>
      </div>

      <SmallNav></SmallNav>
    </m.div>
  );
}
