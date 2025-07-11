import { useState, useRef, useEffect } from "react";
import { scroller } from "react-scroll";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  LogIn,
  UserPlus,
  Notebook,
  CircleDollarSign,
  TableOfContents,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const pagesRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const handleNavClick = (section) => {
    setMenuOpen(false);
    setPagesOpen(false);
    if (location.pathname === "/") {
      scrollTo(section);
    } else {
      navigate("/");
      setTimeout(() => scrollTo(section), 100);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setPagesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "service", "contact"];
      let currentSection = "";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          if (
            window.pageYOffset >= sectionTop - 100 &&
            window.pageYOffset < sectionTop + sectionHeight - 100
          ) {
            currentSection = section;
          }
        }
      });

      document.querySelectorAll(".nav-button").forEach((btn) => {
        btn.classList.remove("active-link");
      });

      if (currentSection) {
        const activeBtn = document.querySelector(
          `.nav-button[data-section="${currentSection}"]`
        );
        if (activeBtn) {
          activeBtn.classList.add("active-link");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-black px-2 py-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 shadow-md">
      <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-7xl xl:max-w-screen-xl mx-auto py-2 sm:py-2.5 md:py-3 flex justify-between items-center">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-green-600">
          <Link to="/" className="hover:text-green-700">
            Crypto_Demo
          </Link>
        </div>

        {/* Desktop & Tablet Menu */}
        <div className="hidden lg:flex flex-wrap space-x-2 sm:space-x-4 md:space-x-5 lg:space-x-6 text-base sm:text-lg">
          <button
            onClick={() => handleNavClick("hero")}
            data-section="hero"
            className="nav-button text-gray-700 hover:text-green-600 hover:underline hover:text-xl 
            transition-all duration-200"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("about")}
            data-section="about"
            className="nav-button text-gray-700 hover:text-green-600 hover:underline hover:text-xl 
            transition-all duration-200"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("service")}
            data-section="service"
            className="nav-button text-gray-700 hover:text-green-600 hover:underline hover:text-xl 
            transition-all duration-200"
          >
            Service
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            data-section="contact"
            className="nav-button text-gray-700 hover:text-green-600 hover:underline hover:text-xl 
            transition-all duration-200"
          >
            Contact
          </button>

          <div className="relative" ref={pagesRef}>
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="flex items-center text-gray-700 hover:text-green-600 hover:underline hover:text-xl transition-all duration-200 pt-0.5"
            >
              Pages{" "}
              {pagesOpen ? (
                <ChevronUp size={18} className="ml-1" />
              ) : (
                <ChevronDown size={18} className="ml-1" />
              )}
            </button>

            {pagesOpen && (
              <div
                className="absolute top-full right-0 bg-white text-gray-800 border border-gray-200 
              py-2 w-32 sm:w-36 rounded-md shadow-lg z-20"
              >
                <Link
                  to="/blog"
                  onClick={() => setPagesOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-green-600 transition-colors duration-150"
                >
                  <Notebook size={16} />
                  Blog
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setPagesOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-green-600 transition-colors duration-150"
                >
                  <CircleDollarSign size={16} />
                  Pricing
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setPagesOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-green-600 transition-colors duration-150"
                >
                  <TableOfContents size={16} /> FAQ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop & Tablet Login/Register */}
        <div className="hidden lg:flex space-x-2 sm:space-x-3">
          <Link
            to="/login"
            className="flex items-center gap-2 px-3 sm:px-4 py-1 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold"
          >
            <LogIn size={16} /> Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 px-3 sm:px-4 py-1 bg-green-600 text-white rounded-md 
            hover:bg-white hover:text-green-600 border-2 border-green-600 transition-all duration-300 
            font-semibold"
          >
            <UserPlus size={16} /> Register
          </Link>
        </div>

        {/* Mobile & Tablet Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-white text-gray-800 border-t border-gray-200 
        flex flex-col items-center py-6 space-y-4 lg:hidden z-50 overflow-y-auto"
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-gray-700"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <button
            onClick={() => handleNavClick("hero")}
            data-section="hero"
            className="nav-button w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("about")}
            data-section="about"
            className="nav-button w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("service")}
            data-section="service"
            className="nav-button w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            Service
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            data-section="contact"
            className="nav-button w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            Contact
          </button>

          {/* Pages Links */}
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            Blog
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            Pricing
          </Link>
          <Link
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center text-gray-700 hover:text-green-600 hover:underline hover:text-lg transition-all duration-200 py-2"
          >
            FAQ
          </Link>

          <div className="w-24 sm:w-32 h-px bg-gray-300 my-2"></div>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold w-40"
          >
            <LogIn size={16} /> Login
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-white hover:text-green-600 border-2 border-green-600 transition-all duration-300 
            font-semibold w-40"
          >
            <UserPlus size={16} /> Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
