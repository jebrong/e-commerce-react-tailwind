import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion as m } from "framer-motion";
import { pageAnimationLeft, buttonHoverTap } from "../../animations/animations";

import BrowseSingleNav from "../BrowseSingle/BrowseSingleNav";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import {
  resetFilter,
  sortProducts,
  filterProducts,
  findSingleProduct,
  pagination,
  nextPage,
  prevPage,
  jumpPage,
  changePostsPerPage,
  changeSortBy,
  toggleFilters,
  searchProducts,
} from "../../features/products/productsSlice";
import { customQuantity } from "../../features/cart/cartSlice";

import DarkButton from "../../components/ui/DarkButton";
import { seeDarkMode, outsideHome } from "../../features/utils/utilsSlice";

export default function Browse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((store) => store.utils);
  const {
    searchInput,
    filteredArtists,
    showProducts,
    allPages,
    currentPage,
    postsPerPage,
    sortBy,
    showFilters,
  } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(seeDarkMode());
    dispatch(resetFilter());
    dispatch(customQuantity(1));
    dispatch(outsideHome());
  }, []);

  useEffect(() => {
    dispatch(pagination());
  }, [currentPage, postsPerPage]);

  return (
    <m.div
      variants={pageAnimationLeft}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute left-0"
    >
      <div className={darkMode ? "dark" : ""}>
        <div className=" flex flex-col  items-center overflow-x-hidden xl:px-[20%] lg:px-[10%] md:px-[5%] sm:px-[2%]   sm:pb-[22%] w-screen text-primary bg-secondary  h-screen  dark:text-secondary dark:bg-primary text-sm  dark:font-light ">
          <BrowseSingleNav></BrowseSingleNav>
          {/* mobile search */}

          {/* filter bar and items containers*/}
          <div className="flex md:flex-row sm:flex-col sm:items-center md:items-start md:pt-[50px] sm:pt-1 w-full">
            {/* filter bar */}
            <div
              className={` relative overflow-y-hidden sm:w-full sm:my-2 md:mr-[20px] md:my-0   lg:w-[250px] md:w-[200px] flex flex-col bg-accent border border-primary p-5 dark:bg-secondary/[0.1] dark:border-secondary ${
                showFilters ? "sm:h-[570px]" : "sm:h-[150px]"
              }`}
            >
              <form
                className="mt-2 flex flex-row relative bg-accent w-full border border-primary dark:border-secondary p-2 dark:text-primary "
                action="submit"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(filterProducts({ search: true }));
                  dispatch(pagination());
                }}
              >
                <input
                  className="bg-transparent outline-0 w-full  "
                  type="text"
                  name=""
                  id=""
                  placeholder="Search..."
                  onChange={(e) => {
                    e.preventDefault();
                    dispatch(searchProducts(e.target.value.toLowerCase()));
                  }}
                  value={searchInput}
                />

                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                >
                  <RiSearch2Line></RiSearch2Line>
                </m.button>
                {searchInput && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(resetFilter());
                      dispatch(pagination());
                    }}
                    className="pr-2 absolute right-5 top-[10px]"
                  >
                    <RiCloseLine></RiCloseLine>
                  </button>
                )}
              </form>

              <div>
                <select
                  className="p-2 border border-primary w-full mb-6 bg-transparent cursor-pointer dark:text-secondary  dark:border-secondary"
                  onChange={(e) => {
                    dispatch(changeSortBy(e.target.value));
                    dispatch(sortProducts(e.target.value));
                    dispatch(pagination());
                  }}
                  value={sortBy}
                >
                  <option value="default">Sort by...</option>
                  <option value="name-">Name (A-Z)</option>
                  <option value="name+">Name (Z-A)</option>
                  <option value="price+">Price (Lowest)</option>
                  <option value="price-">Price (Highest)</option>
                  <option value="artist-">Artist (A-Z)</option>
                  <option value="artist+">Artist (Z-A)</option>
                </select>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-bold tracking-[0.3em]">Artist</h3>

                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-1 m-1  tracking-[0.3em]  ${
                    filteredArtists.includes("Fred Mana") &&
                    "bg-neutral-400/[0.8]  rounded-sm "
                  }`}
                  onClick={() => {
                    dispatch(filterProducts({ artist: "Fred Mana" }));
                    dispatch(pagination());
                  }}
                >
                  Fred Mana
                </m.button>
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={` p-1 m-1 tracking-[0.3em] ${
                    filteredArtists.includes("Jo Bass") &&
                    "bg-neutral-400/[0.8]  rounded-sm "
                  }`}
                  onClick={() => {
                    dispatch(filterProducts({ artist: "Jo Bass" }));
                    dispatch(pagination());
                  }}
                >
                  Jo Bass
                </m.button>
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-1 m-1 tracking-[0.3em] ${
                    filteredArtists.includes("Andywal") &&
                    "bg-neutral-400/[0.8]  rounded-sm "
                  }`}
                  onClick={() => {
                    dispatch(filterProducts({ artist: "Andywal" }));
                    dispatch(pagination());
                  }}
                >
                  Andywal
                </m.button>
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-1 m-1 tracking-[0.3em] ${
                    filteredArtists.includes("Zedgie") &&
                    "bg-neutral-400/[0.8]  rounded-sm "
                  }`}
                  onClick={() => {
                    dispatch(filterProducts({ artist: "Zedgie" }));
                    dispatch(pagination());
                  }}
                >
                  Zedgie
                </m.button>
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className=" w-full p-1 bg-accent border border-primary dark:bg-secondary/[0.1] dark:border-secondary mt-2 mb-6"
                  onClick={() => {
                    dispatch(filterProducts());
                    dispatch(pagination());
                  }}
                >
                  Clear Artists
                </m.button>
              </div>

              <div className="flex flex-col items-start">
                <h3 className="text-lg font-bold tracking-[0.3em]">
                  Items per page
                </h3>

                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-1 m-1 tracking-[0.3em] ${
                    postsPerPage === 8
                      ? "bg-neutral-400/[0.8]  rounded-sm "
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(changePostsPerPage(8));
                  }}
                >
                  8
                </m.button>
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-1 m-1 tracking-[0.3em] ${
                    postsPerPage === 12
                      ? "bg-neutral-400/[0.8]  rounded-sm "
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(changePostsPerPage(12));
                  }}
                >
                  12
                </m.button>
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-1 m-1 tracking-[0.3em] ${
                    postsPerPage === 16
                      ? "bg-neutral-400/[0.8]  rounded-sm "
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(changePostsPerPage(16));
                  }}
                >
                  16
                </m.button>
              </div>

              <div
                onClick={() => dispatch(toggleFilters())}
                className="flex justify-center items-center  absolute mx-auto left-0 bottom-0 w-full h-8 cursor-pointer border-t border-primary  bg-neutral-700   text-secondary hover:bg-secondary hover:text-primary dark:border-secondary dark:text-primary dark:bg-secondary  dark:hover:bg-primary dark:hover:text-secondary "
              >
                <m.p
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className="text-md font-light font-inter tracking-[.3em] "
                >
                  {showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
                </m.p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {/* items section */}
              <div className="w-full grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 2xl:grid-cols-6 cursor-pointer  ">
                {showProducts.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(findSingleProduct(item.id));
                        navigate("/browse/" + item.id);
                      }}
                      className="group  hover:bg-primary/[.1]  dark:bg-secondary/[0.1] dark:border-secondary sm:w-full  sm:my-4 md:m-0 flex flex-col items-center justify-center  h-[270px]  bg-accent hover:bg- mr-5 mb-5 p-5 border border-primary grow"
                      key={item.id}
                    >
                      <img
                        className="w-[200px] h-[200px] object-contain group-hover:grayscale-[20%]"
                        src={item.img[0]}
                        alt=""
                      />

                      <div className="w-full flex flex-col group-hover:text-primary/[0.6] dark:group-hover:text-secondary/[0.6] ">
                        <h3 className="text-[15px] font-medium font-inter tracking-[-0.09em]">
                          {item.title}
                        </h3>
                        <div className="flex justify-between tracking-[-0.09em]">
                          <p className="text-xs font-light font-inter">
                            {item.artist}
                          </p>
                          <p className="text-xs font-light font-inter">
                            ₱{item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-row py-10 z-50">
                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  className={`text-lg font-bold tracking-[0.3em] ${
                    currentPage === 1
                      ? "dark:text-accent/[0.1] text-primary/[0.4]"
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(prevPage());
                    dispatch(pagination());
                  }}
                  disabled={currentPage === 1}
                >
                  prev
                </m.button>

                {allPages.map((pageButton, index) => {
                  return (
                    <m.button
                      variants={buttonHoverTap}
                      whileHover="hover"
                      whileTap="tap"
                      key={index}
                      className={`p-1 m-1 tracking-[0.3em] ${
                        currentPage === pageButton
                          ? "bg-neutral-400/[0.8]  rounded-sm "
                          : ""
                      }`}
                      onClick={() => {
                        dispatch(jumpPage(pageButton));
                      }}
                    >
                      {pageButton}
                    </m.button>
                  );
                })}

                <m.button
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    dispatch(nextPage());
                    dispatch(pagination());
                  }}
                  disabled={currentPage === allPages.length}
                  className={`text-lg font-bold tracking-[0.3em] ${
                    currentPage === allPages.length
                      ? "dark:text-accent/[0.1] text-primary/[0.4]"
                      : ""
                  }`}
                >
                  next
                </m.button>
              </div>
            </div>
          </div>
        </div>
        <DarkButton></DarkButton>
      </div>
    </m.div>
  );
}
