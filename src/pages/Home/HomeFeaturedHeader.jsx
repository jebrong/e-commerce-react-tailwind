import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import {
  homePageChildrenOpac,
  buttonHoverTap,
} from "../../animations/animations";

export default function HomeFeaturedHeader({ feature }) {
  const navigate = useNavigate();
  return (
    <m.div
      variants={homePageChildrenOpac}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="flex justify-between  sm:items-start  md:items-end w-full pb-6  border-b-2  border-primary  dark:border-secondary  sm:flex-col md:flex-row "
    >
      <div className="font-head font-semibold dark:font-medium tracking-wide  sm:text-4xl  md:text-5xl  lg:text-7xl text-7xl py-4 tracking-wide ">
        FEATURED {feature}*
      </div>
      <m.div
        variants={buttonHoverTap}
        whileHover="hover"
        whileTap="tap"
        className="flex flex-row items-center cursor-pointer "
        onClick={() => {
          navigate("/browse");
        }}
      >
        <p className="text-lg pr-2">BROWSE COLLECTION</p>
        <BsArrowRight className="text-2xl" />
      </m.div>
    </m.div>
  );
}
