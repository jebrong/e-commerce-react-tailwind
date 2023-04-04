import HomeArtwork from "./HomeArtwork";
import HomeNav from "./HomeNav";
import HomeFeaturedHeader from "./HomeFeaturedHeader";
import { BiArrowBack, BiRightArrowAlt } from "react-icons/bi";
import DarkButton from "../../components/ui/DarkButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { motion as m } from "framer-motion";
import {
  homePageContainer,
  homePageChildren,
  homePageChildrenOpac,
  cardAnimate,
  homeArtistsLeft,
  homeArtistsRight,
  pageAnimationLeft,
} from "../../animations/animations";

import {
  seeDarkMode,
  nextSlide,
  prevSlide,
  insideHome,
} from "../../features/utils/utilsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { darkMode, openNav, slides, currentSlideIndex, home } = useSelector(
    (store) => store.utils
  );
  const { featuredProducts } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(seeDarkMode());
  }, [darkMode]);

  useEffect(() => {
    dispatch(insideHome());
  }, []);

  return (
    <>
      <m.div
        variants={pageAnimationLeft}
        initial="hidden"
        animate="show"
        className={`${darkMode ? "dark" : ""} absolute left-0 bg-lime-700   ${
          openNav ? "h-screen overflow-y-hidden" : ""
        } `}
      >
        <div className="absolute bottom-0 text-center w-full pb-4 xl:pb-6 lg:tracking-[0.595em] md:tracking-[0.4em] text-sm text-secondary">
          designed and coded by janille sy | syjanille@gmail.com
        </div>
        <m.div variants={homePageContainer} initial="hidden" animate="show">
          <m.div
            variants={homePageContainer}
            initial="hidden"
            animate="show"
            className=" flex flex-col  items-center overflow-x-hidden xl:px-[20%] lg:px-[10%] md:px-[5%] sm:px-[2%]  w-screen text-primary bg-secondary    dark:text-secondary dark:bg-primary text-sm  dark:font-light"
          >
            <HomeNav></HomeNav>
            <m.h1
              variants={homePageChildren}
              className="overflow-hidden py-6 text-9xl  border-b-2   border-primary  dark:border-secondary w-full text-center	 tracking-wide font-head  font-black dark:font-extrabold md:text-8xl  sm:text-5xl  "
            >
              FURNITUR
            </m.h1>

            <m.div
              variants={homePageChildrenOpac}
              className="flex  w-full justify-between text-3xl md:text-2xl  sm:text-sm py-6 tracking-wide overflow-hidden "
            >
              <m.div className="flex flex-col w-full ">
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </m.div>
              <m.div className="flex flex-col  items-end">
                <p>1.12</p>
                <p>.2012</p>
              </m.div>
            </m.div>
            {/* slideshow */}
            <m.div
              variants={homePageChildren}
              className={`${
                openNav ? "z-[-1]" : ""
              } group w-full h-[780px]  bg-red-400 relative  shadow`}
            >
              <div
                style={{ backgroundImage: `url(${slides[currentSlideIndex]})` }}
                className="w-full h-full duration-500 bg-center bg-cover"
              ></div>
              <div className="invisible group-hover:visible select-none h-[200px]">
                <div
                  className="absolute h-20 w-10 bg-primary/[0.7] md:top-[390px] sm:top-[120px]  flex flex-col justify-center items-center cursor-pointer rounded-r-lg"
                  onClick={() => {
                    dispatch(prevSlide());
                  }}
                >
                  <BiArrowBack className=" text-2xl text-secondary"></BiArrowBack>
                </div>
                <div
                  className="absolute  h-20 w-10 bg-primary/[0.70] md:top-[390px] sm:top-[120px]  right-0 flex flex-col justify-center items-center cursor-pointer rounded-l-lg"
                  onClick={() => {
                    dispatch(nextSlide());
                  }}
                >
                  <BiRightArrowAlt className=" text-2xl text-secondary "></BiRightArrowAlt>
                </div>
              </div>
            </m.div>

            <HomeFeaturedHeader feature={"ART"} />

            <m.div
              variants={cardAnimate}
              // viewport={{ once: true, amount: 0.1 }}
              className="flex lg:flex-row  lg:w-full sm:flex-col  sm:w-auto py-20 justify-around "
            >
              {featuredProducts.map((item, index) => {
                return <HomeArtwork key={index} {...item}></HomeArtwork>;
              })}
            </m.div>

            <HomeFeaturedHeader feature={"ARTISTS"} />

            <m.div
              variants={homeArtistsLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex w-full items-center justify-between border-b-2 border-primary pb-6 dark:border-secondary font-inter sm:flex-col md:flex-row"
            >
              <m.div className="flex flex-col w-2/3">
                <h2 className="text-7xl">fred mana*</h2>
                <h2 className="text-lg italic	">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repudiandae, culpa. Earum voluptas tempore id sapiente
                  suscipit quo, cumque officiis beatae sit, exercitationem
                  aspernatur.
                </h2>
              </m.div>
              <m.div className="flex flex-col   sm:text-center md:text-right">
                <div className=" w-[330px] h-[430px] bg-center mt-14 ">
                  <img
                    className=" object-cover h-full w-full shadow"
                    src="https://images.unsplash.com/photo-1611459293885-f8e692ab0356?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                    alt=""
                  />
                </div>
              </m.div>
            </m.div>

            <m.div
              variants={homeArtistsRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex w-full items-center justify-between pb-6 dark:border-secondary font-inter sm:flex-col md:flex-row"
            >
              <div className="flex flex-col  text-center">
                <div className=" w-[330px] h-[430px] bg-center mt-14">
                  <img
                    className=" object-cover h-full w-full shadow"
                    src="https://images.unsplash.com/photo-1611403119860-57c4937ef987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col w-2/3  sm:text-center md:text-right">
                <h2 className="text-7xl ">zedgie*</h2>
                <h2 className="text-lg italic	">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repudiandae, culpa. Earum voluptas tempore id sapiente
                  suscipit quo, cumque officiis beatae sit, exercitationem
                  aspernatur.
                </h2>
              </div>
            </m.div>
          </m.div>
          {/* <footer className="flex flex-col items-center w-full p-1 tracking-wide  dark:text-primary dark:bg-secondary    text-secondary bg-primary">
            <div className="lg:tracking-[0.595em] md:tracking-[0.4em] text-center">
              designed and coded by janille sy | syjanille@gmail.com
            </div>
          </footer> */}
        </m.div>
        <DarkButton></DarkButton>
      </m.div>
    </>
  );
}
