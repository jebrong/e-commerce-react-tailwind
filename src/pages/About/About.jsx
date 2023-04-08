import { useSelector, useDispatch } from "react-redux";
import DarkButton from "../../components/ui/DarkButton";
import HomeNav from "../Home/HomeNav";
import { useEffect } from "react";
import { motion as m } from "framer-motion";
import { pageAnimationLeft } from "../../animations/animations";
import { seeDarkMode, outsideHome } from "../../features/utils/utilsSlice";
export default function About() {
  const dispatch = useDispatch();
  const { darkMode, openNav } = useSelector((store) => store.utils);

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
      className="absolute left-0"
    >
      <div
        className={`${darkMode ? "dark" : ""} ${
          openNav ? "h-screen overflow-y-hidden" : "h-screen"
        }`}
      >
        <div className="flex flex-col   sm:pb-[22%] items-center overflow-x-hidden xl:px-[20%] lg:px-[10%] md:px-[5%] sm:px-[2%]  w-screen text-primary bg-secondary  h-screen  dark:text-secondary dark:bg-primary text-sm  dark:font-light">
          <HomeNav></HomeNav>

          <div className="flex flex-col lg:flex-row items-center mt-0">
            {/* infos */}
            <div className="flex flex-col lg:w-1/2 lg:pr-10">
              <h1 className="font-head font-semibold dark:font-medium tracking-wide  sm:text-4xl  md:text-5xl  lg:text-7xl text-7xl py-4 tracking-wide ">
                About Us
              </h1>

              <div className="flex items-center py-2 bg-accent/[0.5] ">
                <button className=" italic md:pr-4 text-center text-2xl tracking-[.35em]">
                  Lorem ipsum dolor
                </button>
              </div>
              <p className="text-lg  leading-[220%] font-light text-justify">
                Lorem ipsum dolor sit amet consectetur. Quam ornare consequat et
                amet nisi fringilla morbi lacinia risus.Lorem ipsum dolor sit
                amet consectetur. Quam ornare consequat et amet nisi fringilla
                morbi lacinia risus.Lorem ipsum dolor sit amet consectetur. Quam
                ornare consequat et amet nisi fringilla morbi lacinia risus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda eius, minus ducimus in ea labore suscipit natus
                molestias ratione facilis voluptate perspiciatis nihil ex minima
                quibusdam consequuntur dolore dolores delectus earum, sed modi.
                Beatae voluptates nemo dolor consectetur quod ratione
                consequuntur? Nemo? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Fuga tempora in minima ipsum labore ullam
                quaerat laboriosam consequatur aliquid possimus, saepe ab quasi
                sunt deserunt cum dignissimos? Necessitatibus cupiditate odit
                dolore ab recusandae ratione quia modi dolores nostrum corporis
                obcaecati tempore ad velit error ducimus rem eius laudantium
                nulla similique, aut eum iure quisquam! Soluta eius laudantium
                culpa vel voluptate, nihil illo ullam obcaecati expedita quia
              </p>

              <div className=" flex md:justify-end  sm:justify-center w-full py-10"></div>
            </div>
            {/* image container */}
            <div className={`${openNav && "z-[-1]"} lg:w-1/2 sm:h-[1000x] `}>
              <img
                className="md:w-full h-full object-cover grayscale"
                src="https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </div>
          </div>
        </div>
        <DarkButton></DarkButton>
      </div>
    </m.div>
  );
}
