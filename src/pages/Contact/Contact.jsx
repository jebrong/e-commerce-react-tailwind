import { useSelector, useDispatch } from "react-redux";
import DarkButton from "../../components/ui/DarkButton";
import HomeNav from "../Home/HomeNav";
import { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import { pageAnimationLeft, buttonHoverTap } from "../../animations/animations";
import { seeDarkMode, outsideHome } from "../../features/utils/utilsSlice";

import emailjs from "@emailjs/browser";
export default function Contact() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((store) => store.utils);
  useEffect(() => {
    dispatch(seeDarkMode());
    setStatus(null);
  }, [darkMode]);
  useEffect(() => {
    dispatch(outsideHome());
  }, []);
  const [status, setStatus] = useState(null);
  const form = useRef();
  const username = useRef();
  const email = useRef();
  const message = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ogej0im",
        "template_omk9y5z",
        form.current,
        "o-MBJTHzLxmFleur9"
      )
      .then(
        (result) => {
          username.current.value = "";
          email.current.value = "";
          message.current.value = "";
          setStatus(true);
        },
        (error) => {
          console.log(error.text);
          setStatus(false);
        }
      );
  };

  return (
    <m.div
      variants={pageAnimationLeft}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute left-0"
    >
      <div className={darkMode ? "dark" : ""}>
        <div className="flex flex-col  items-center overflow-x-hidden xl:px-[20%] lg:px-[10%] md:px-[5%] sm:px-[2%]  w-screen text-primary bg-secondary  h-screen  dark:text-secondary dark:bg-primary text-sm  dark:font-light">
          <HomeNav></HomeNav>
          <div className="font-head font-semibold dark:font-medium tracking-wide  sm:text-4xl  md:text-5xl  lg:text-7xl text-7xl py-4 tracking-wide ">
            Contact Us*
          </div>
          <div className="font-head font-semibold dark:font-medium tracking-wide  sm:text-md  tracking-wide ">
            {status ? "Message Sent!" : ""}
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col mt-10 sm:w-[95%] md:w-[80%]"
          >
            <label className="text-[15px] font-medium font-inter tracking-[0.4em] pb-2">
              Name
            </label>
            <input
              ref={username}
              type="text"
              name="user_name"
              className="p-2 mb-4 bg-transparent border text-2xl  tracking-[0.1em] dark:border-secondary border-primary"
            />
            <label className="text-[15px] font-medium font-inter  tracking-[0.4em] pb-2">
              Email
            </label>
            <input
              ref={email}
              type="email"
              name="user_email"
              className="p-2 mb-4 bg-transparent border  text-2xl tracking-[0.1em] dark:border-secondary border-primary"
            />
            <label className="text-[15px] font-medium font-inter  tracking-[0.4em] pb-2">
              Message
            </label>
            <textarea
              ref={message}
              name="message"
              className="p-2 mb-4 bg-transparent border text-2xl tracking-[0.1em] dark:border-secondary border-primary resize-none	h-[330px]"
            />
            <m.input
              variants={buttonHoverTap}
              whileHover="hover"
              whileTap="tap"
              className=" cursor-pointer text-xl  flex bg-primary font-light dark:font-medium text-secondary dark:bg-secondary dark:text-primary hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary  py-1 px-4 border border-primary dark:border-secondary tracking-[0.1em] mt-4"
              type="submit"
              value="Send"
            />
          </form>
        </div>
        <DarkButton></DarkButton>
      </div>
    </m.div>
  );
}
