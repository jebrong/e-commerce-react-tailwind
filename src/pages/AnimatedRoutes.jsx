import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";

// Public Routes
import Home from "./Home/Home";
import About from "./About/About";
import Browse from "./Browse/Browse";
import BrowseSingle from "./BrowseSingle/BrowseSingle";
import Cart from "./Cart/Cart";
import Error from "./Error/Error";
import Contact from "./Contact/Contact";

// Private Routes
import ProtectedRoutes from "./ProtectedRoutes";
import Checkout from "./Checkout/Checkout";

function AnimatedRoutes(props) {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/browse" element={<Browse></Browse>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route
          path="/browse/:id"
          element={<BrowseSingle></BrowseSingle>}
        ></Route>

        <Route element={<ProtectedRoutes></ProtectedRoutes>}>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
