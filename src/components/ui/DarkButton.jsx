import { useSelector, useDispatch } from "react-redux";
import { BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import { motion as m } from "framer-motion";
import { buttonHoverTap } from "../../animations/animations";
import { toggleDarkMode } from "../../features/utils/utilsSlice";

export default function DarkButton() {
  const dispatch = useDispatch();

  const { darkMode, home } = useSelector((store) => store.utils);
  return (
    <div
      className={`${
        home ? "sticky" : "fixed w-full "
      }     flex justify-end   bottom-6 lg:bottom-10`}
    >
      <m.button
        variants={buttonHoverTap}
        whileHover="hover"
        whileTap="tap"
        className="flex justify-center items-center  xl:h-20 xl:w-20  md:h-[60px] md:w-[60px]  sm:h-[50px] sm:w-[50px]  rounded-full    bg-primary/[0.8] dark:bg-secondary/[0.8] shadow mr-6 lg:mr-10 "
        onClick={() => {
          dispatch(toggleDarkMode());
        }}
      >
        {darkMode ? (
          <BsMoonFill className="md:text-4xl sm:text-2xl  text-primary"></BsMoonFill>
        ) : (
          <BsBrightnessHighFill className="md:text-4xl sm:text-2xl   text-secondary"></BsBrightnessHighFill>
        )}
      </m.button>
    </div>
  );
}
