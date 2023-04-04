import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { motion as m, AnimatePresence } from "framer-motion";

import { pageAnimationLeft, buttonHoverTap } from "../animations/animations";

import { toggleNav } from "../features/utils/utilsSlice";

export default function SmallNav() {
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((store) => store.cart);
  const { openNav } = useSelector((store) => store.utils);

  return (
    <AnimatePresence>
      <m.div
        key={openNav}
        variants={pageAnimationLeft}
        initial="hidden"
        animate="show"
        exit={{
          opacity: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            damping: 20,
          },
        }}
        className={` ${
          !openNav ? "hidden" : ""
        } absolute top-0 underline-offset-4  h-screen w-screen  flex flex-col justify-between w-full  dark:border-secondary  md:hidden px-2 pr-4 absolute bg-secondary dark:bg- z-30 overflow-hidden`}
      >
        <div className="flex flex-col ">
          <div className="py-4 flex justify-between  w-full  dark:border-secondary  md:hidden px-2">
            <h1 className="dark:border-secondary text-center	 tracking-wide font-head  font-black dark:font-extrabold md:text-xl  sm:text-lg cursor-pointer ">
              MENU*
            </h1>
            <AiOutlineClose
              className=" text-2xl"
              onClick={() => {
                dispatch(toggleNav());
              }}
            ></AiOutlineClose>
          </div>
          <div className="flex flex-col space-y-5 dark:border-secondary text-center 	underline decoration-4	 tracking-wide font-head  font-black dark:font-extrabold">
            <h1
              onClick={() => {
                dispatch(toggleNav());
                navigate("/about");
              }}
              className=" md:text-xl  sm:text-lg cursor-pointer "
            >
              ABOUT
            </h1>
            <h1
              onClick={() => {
                dispatch(toggleNav());
                navigate("/contact");
              }}
              className=" md:text-xl  sm:text-lg cursor-pointer "
            >
              CONTACT
            </h1>

            {!isAuthenticated ? (
              <m.button
                variants={buttonHoverTap}
                whileHover="hover"
                whileTap="tap"
                onClick={loginWithRedirect}
                className="	 md:text-xl  sm:text-lg cursor-pointer "
              >
                SIGNIN
              </m.button>
            ) : (
              <m.button
                variants={buttonHoverTap}
                whileHover="hover"
                whileTap="tap"
                className="	 md:text-xl  sm:text-lg cursor-pointer "
                onClick={() => {
                  logout({ return: window.location.origin });
                }}
              >
                SIGNOUT
              </m.button>
            )}

            <h1
              onClick={() => {
                dispatch(toggleNav());
                navigate("/browse");
              }}
              className=" md:text-xl  sm:text-lg cursor-pointer "
            >
              COLLECTION
            </h1>
            <h1
              onClick={() => {
                dispatch(toggleNav());
                navigate("/cart");
              }}
              className="  leading-4 dark:border-secondary text-center 	underline decoration-4	 tracking-wide font-head  font-black dark:font-extrabold md:text-xl  sm:text-lg cursor-pointer "
            >
              {`CART(${totalQuantity})`}
            </h1>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  );
}
