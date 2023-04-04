import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BiArrowBack, BiX, BiRightArrowAlt } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import { motion as m } from "framer-motion";
import { pageAnimationLeft, buttonHoverTap } from "../../animations/animations";

import {
  addCartItem,
  minusCartItem,
  removeCartItem,
  calculate,
  clearCart,
  customQuantity,
} from "../../features/cart/cartSlice";
import DarkButton from "../../components/ui/DarkButton";
import { seeDarkMode, outsideHome } from "../../features/utils/utilsSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (store) => store.cart
  );
  const { productImages } = useSelector((store) => store.products);
  const { darkMode } = useSelector((store) => store.utils);

  useEffect(() => {
    dispatch(seeDarkMode());
    dispatch(customQuantity(1));
    dispatch(outsideHome());
  }, []);

  return (
    <m.div
      variants={pageAnimationLeft}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute left-01"
    >
      <div className={darkMode ? "dark" : ""}>
        <div className="flex flex-col  items-center overflow-x-hidden xl:px-[20%] lg:px-[10%] md:px-[5%] sm:px-[2%]  w-screen text-primary bg-secondary  h-screen  dark:text-secondary dark:bg-primary text-sm  dark:font-light">
          <m.div
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            className="self-start   mt-5 flex justify-center align-center text-xl h-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/browse");
            }}
          >
            <BiArrowBack className=" text-3xl"></BiArrowBack>
            <p className="text-center">Back</p>
          </m.div>
          <div className="flex justify-between  sm:items-start  md:items-end w-full pb-6  border-b-2  border-primary  dark:border-secondary  sm:flex-col md:flex-row ">
            <div className="font-head font-semibold dark:font-medium tracking-wide  sm:text-4xl  md:text-5xl  lg:text-7xl text-7xl py-4 tracking-wide ">
              Cart*
            </div>
            <div className="flex flex-col md:items-end ">
              <p className="text-[15px] font-medium font-inter tracking-[0.1em]">
                ₱{totalAmount}
              </p>
              <p className=" text-xs font-light font-inter ">
                Total: {totalQuantity}
              </p>

              <m.button
                variants={buttonHoverTap}
                whileHover="hover"
                whileTap="tap"
                className=" flex bg-primary font-light dark:font-medium text-secondary dark:bg-secondary dark:text-primary hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary  py-1 px-4 border border-primary dark:border-secondary tracking-[0.1em] mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  if (isAuthenticated) {
                    if (cartItems.length) {
                      navigate("/checkout");
                    }
                  } else {
                    dispatch(loginWithRedirect);
                  }
                }}
              >
                <p>{`${
                  isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"
                }`}</p>
                <BiRightArrowAlt className="text-xl"></BiRightArrowAlt>
              </m.button>
            </div>
          </div>

          {cartItems.map((item) => {
            return (
              <div
                className="border-b w-full border-primary dark:border-secondary flex justify-between"
                key={item.id}
              >
                <div className="flex sm:flex-col md:flex-row w-full ">
                  {/* image */}
                  <m.div
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      navigate("/browse/" + item.id);
                    }}
                    className="sm:w-40 sm:h-40 py-2 sm:pl-4 md:pl-0 cursor-pointer "
                  >
                    <img
                      className="md:w-full h-full object-cover"
                      src={item.img[0]}
                      alt=""
                    />
                  </m.div>
                  <div className="flex flex-row grow ">
                    {/* info */}
                    <div className="flex  flex-col grow py-2 pl-4">
                      <h3 className="text-[15px] font-medium font-inter tracking-[0.1em]">
                        {item.title}
                      </h3>
                      <div className="flex flex-col text-xs font-light font-inter border-b dark:border-secondary border-primary">
                        <p className="py-2">Price:{item.price}</p>
                      </div>
                      <p className="pt-2">
                        Amount:{item.quantity * item.price}
                      </p>
                    </div>
                    {/* quantity */}
                    <div className="flex  justify-center items-center pl-8">
                      <h3 className="text-md leading-[220%] font-inter tracking-[.3em]  dark:font-light font-bold  sm:m-0 md:mr-6"></h3>

                      <div className="border border-primary dark:border-secondary font-inter p-2  font-medium  ">
                        <m.button
                          variants={buttonHoverTap}
                          whileHover="hover"
                          whileTap="tap"
                          className="w-6 bg-transparent "
                          onClick={(e) => {
                            dispatch(minusCartItem(item.id));
                            dispatch(calculate());
                          }}
                        >
                          -
                        </m.button>
                        <button className="w-8 text-center py-auto  cursor-auto dark:bg-primary  ">
                          {item.quantity}
                        </button>
                        <m.button
                          variants={buttonHoverTap}
                          whileHover="hover"
                          whileTap="tap"
                          className="w-6  bg-transparent text-primary dark:text-secondary"
                          onClick={() => {
                            dispatch(addCartItem({ id: item.id }));
                            dispatch(calculate());
                          }}
                        >
                          +
                        </m.button>
                      </div>
                      <button
                        className="pl-4"
                        onClick={() => {
                          dispatch(removeCartItem(item.id));
                          dispatch(calculate());
                        }}
                      >
                        <BiX className="text-xl text-primary/[.5] dark:text-secondary/[.5] " />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <m.button
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            className=" flex bg-primary font-light dark:font-medium text-secondary dark:bg-secondary dark:text-primary hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary  py-1 px-4 border border-primary dark:border-secondary tracking-[0.1em] mt-8"
            onClick={() => {
              dispatch(clearCart());
              dispatch(calculate());
            }}
          >
            <p>Clear Cart</p>
          </m.button>
        </div>
        <DarkButton></DarkButton>
      </div>
    </m.div>
  );
}
