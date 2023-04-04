import { useNavigate, Navigate } from "react-router-dom";
import { BiArrowBack, BiRightArrowAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { motion as m } from "framer-motion";
import { pageAnimationLeft, buttonHoverTap } from "../../animations/animations";

import {
  addToCart,
  calculate,
  customQuantity,
} from "../../features/cart/cartSlice";
import {
  prevSingleImage,
  nextSingleImage,
  selectSingleImage,
} from "../../features/products/productsSlice";
import BrowseSingleNav from "./BrowseSingleNav";

import DarkButton from "../../components/ui/DarkButton";
import { seeDarkMode, outsideHome } from "../../features/utils/utilsSlice";

export default function BrowseSingle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProduct, productImages, selectedPhoto } = useSelector(
    (store) => store.products
  );
  const { singleProductQuantity } = useSelector((store) => store.cart);
  const { darkMode } = useSelector((store) => store.utils);

  useEffect(() => {
    dispatch(seeDarkMode());
  }, [darkMode]);
  useEffect(() => {
    dispatch(outsideHome());
  }, []);

  return !singleProduct ? (
    <Navigate to="/browse" />
  ) : (
    <m.div
      variants={pageAnimationLeft}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute left-01"
    >
      <div className={darkMode ? "dark" : ""}>
        <div className="flex flex-col  items-center overflow-x-hidden xl:px-[20%] lg:px-[10%] md:px-[5%] sm:px-[2%]  w-screen text-primary bg-secondary  h-screen  dark:text-secondary dark:bg-primary text-sm  dark:font-light">
          <BrowseSingleNav></BrowseSingleNav>
          <m.div
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            className="self-start  mt-5 flex justify-center align-center text-xl h-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/browse");
            }}
          >
            <BiArrowBack className=" text-3xl"></BiArrowBack>
            <p className="text-center">Back</p>
          </m.div>

          <div className="flex sm:flex-col md:flex-row items-center">
            {/* images */}
            <div className=" group flex flex-col mt-10  ">
              <div className="sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px]  relative ">
                <img
                  className="md:w-full h-full object-cover"
                  src={selectedPhoto}
                  alt=""
                />
                {/* BiRightArrowAlt */}
                <div className="group-hover:visible invisible select-none">
                  <m.div
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                    className="cursor-pointer absolute h-20 w-10 bg-primary/[0.05] md:top-[200px] sm:top-[120px]  flex flex-col justify-center items-center rounded-r-lg"
                    onClick={() => {
                      dispatch(prevSingleImage());
                    }}
                  >
                    <BiArrowBack className=" text-2xl"></BiArrowBack>
                  </m.div>
                  <m.div
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                    className="cursor-pointer absolute  h-20 w-10 bg-primary/[0.10] md:top-[200px] sm:top-[120px]  right-0 flex flex-col justify-center items-center rounded-l-lg"
                    onClick={() => {
                      dispatch(nextSingleImage());
                    }}
                  >
                    <BiRightArrowAlt className=" text-2xl"></BiRightArrowAlt>
                  </m.div>
                </div>
              </div>

              <div className="flex mt-10 space-x- pb-4">
                {productImages.map((img, index) => {
                  return (
                    <m.div
                      variants={buttonHoverTap}
                      whileTap="tap"
                      className="sm:w-10 sm:h-10  md:w-20 md:h-20 cursor-pointer"
                      onClick={() => {
                        dispatch(selectSingleImage(index));
                      }}
                      key={index}
                    >
                      <img
                        className={`md:w-full h-full object-cover ${
                          selectedPhoto === img ? "border-2 border-red-500" : ""
                        }`}
                        src={img}
                        alt=""
                      />
                    </m.div>
                  );
                })}
              </div>
            </div>

            {/* infos */}
            <div className="flex flex-col w-3/4 md:pl-10">
              <h1 className="font-head font-semibold dark:font-medium tracking-wide  sm:text-4xl  md:text-5xl  lg:text-7xl text-7xl py-4 tracking-wide ">
                {singleProduct.title}*
              </h1>
              {/* PRICE */}
              <div className="flex items-center py-2 bg-accent/[0.5] ">
                <button className="pl-4 text-center text-2xl tracking-[.35em]">
                  ₱{singleProduct.price}
                </button>
              </div>
              <p className="text-lg  leading-[220%] font-light">
                Lorem ipsum dolor sit amet consectetur. Quam ornare consequat et
                amet nisi fringilla morbi lacinia risus.Lorem ipsum dolor sit
                amet consectetur. Quam ornare consequat et amet nisi fringilla
                morbi lacinia risus.Lorem ipsum dolor sit amet consectetur. Quam
                ornare consequat et amet nisi fringilla morbi lacinia risus.
              </p>

              <div className=" flex md:justify-end  sm:justify-center w-full py-10">
                {/* QUANTITY */}
                <div className="flex sm:flex-col md:flex-row  justify-center items-center">
                  <h3 className="text-md leading-[220%] font-inter tracking-[.3em]  dark:font-light font-bold  sm:m-0 md:mr-6">
                    Quantity
                  </h3>

                  <div className="border-2 border-primary dark:border-secondary font-inter p-4  font-medium">
                    <m.button
                      variants={buttonHoverTap}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-10 bg-transparent "
                      onClick={(e) => {
                        dispatch(customQuantity(singleProductQuantity - 1));
                      }}
                    >
                      -
                    </m.button>
                    <button className="w-10 text-center py-auto  cursor-auto dark:bg-primary  ">
                      {singleProductQuantity}
                    </button>
                    <m.button
                      variants={buttonHoverTap}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-10  bg-transparent text-primary dark:text-secondary"
                      onClick={() => {
                        dispatch(customQuantity(singleProductQuantity + 1));
                      }}
                    >
                      +
                    </m.button>
                  </div>
                </div>
              </div>

              <m.button
                variants={buttonHoverTap}
                whileTap="tap"
                className="  border-2 border-primary  hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:hover:text-primary  dark:border-secondary md:p-4 sm:p-2 sm:mb-10 md:font-bold font-inter text-sm sm:font-medium tracking-[.85em] "
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToCart(singleProduct.id));
                  dispatch(calculate());
                }}
              >
                ADD TO CART
              </m.button>
            </div>
          </div>
        </div>
        <DarkButton></DarkButton>
      </div>
    </m.div>
  );
}
