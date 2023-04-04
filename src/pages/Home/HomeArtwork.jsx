import { findSingleProduct } from "../../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion as m } from "framer-motion";

import { cardAnimateTexts } from "../../animations/animations";

export default function HomeArtwork(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <m.div
      variants={cardAnimateTexts}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col border-b-2 sm:mb-16 lg:mb-0 border-primary  dark:border-secondary cursor-pointer	"
      onClick={() => {
        dispatch(findSingleProduct(props.id));
        navigate("/browse/" + props.id);
      }}
    >
      <img
        src={props.img[0]}
        alt=""
        className="w-[330px] h-[430px] object-cover shadow"
      />
      <div className="flex justify-between py-2 ">
        <div className="flex flex-col">
          <h3 className="text-xl font-medium font-inter">{props.title}</h3>
          <p className="text-xs font-light font-inter">{props.artist}</p>
        </div>
        <h3 className="text-4xl font-medium   font-inter">₱{props.price}</h3>
      </div>
    </m.div>
  );
}
