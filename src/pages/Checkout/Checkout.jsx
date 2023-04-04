import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { motion as m } from "framer-motion";
import { pageAnimationLeft, buttonHoverTap } from "../../animations/animations";
import { seeDarkMode, outsideHome } from "../../features/utils/utilsSlice";
import DarkButton from "../../components/ui/DarkButton";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalAmount } = useSelector((store) => store.cart);
  const { productImages } = useSelector((store) => store.products);
  const { darkMode } = useSelector((store) => store.utils);

  useEffect(() => {
    dispatch(seeDarkMode());
  }, [darkMode]);

  useEffect(() => {
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
              Checkout*
            </div>
          </div>

          {cartItems.map((item, index) => {
            return (
              <div
                className="border-b w-full border-primary dark:border-secondary flex justify-between"
                key={item.id}
              >
                <div className="flex sm:flex-col md:flex-row w-full ">
                  {/* image */}
                  <div className="sm:w-40 sm:h-40 py-2 sm:pl-4 md:pl-0 ">
                    <img
                      className="md:w-full h-full object-cover"
                      src={item.img[0]}
                      alt=""
                    />
                  </div>
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
                        <button className="w-8 text-center py-auto  cursor-auto dark:bg-primary  ">
                          {item.quantity}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className=" w-full flex md:justify-end justify-end">
            <div className="flex flex-col  items-end mt-4 border border p-2 dark:border-secondary border-primary ">
              <p className="text-[15px] font-medium font-inter tracking-[0.1em]">
                Item Subtotal: ₱{totalAmount}
              </p>
              <p className="text-[12px] font-regular font-inter tracking-[0.1em] py-2">
                Shipping Fee: Free
              </p>

              <p className="text-[15px] font-medium font-inter tracking-[0.1em] border-t-2 pt-2 dark:border-secondary border-primary">
                Merchandise Subtotal: ₱{totalAmount}
              </p>
              <m.button
                variants={buttonHoverTap}
                whileHover="hover"
                whileTap="tap"
                className=" flex bg-primary font-light dark:font-medium text-secondary dark:bg-secondary dark:text-primary hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary  py-1 px-4 border border-primary dark:border-secondary tracking-[0.1em] mt-8"
                onClick={() => {}}
              >
                <p>PLACE ORDER</p>
              </m.button>
            </div>
          </div>
          <DarkButton></DarkButton>
        </div>
      </div>
    </m.div>
  );
}
