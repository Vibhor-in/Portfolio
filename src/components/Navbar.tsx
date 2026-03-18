import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");

    const handlers: Array<{
      element: HTMLAnchorElement;
      handler: (e: Event) => void;
    }> = [];

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;

      const handler = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();

          const target = element.getAttribute("data-href");

          if (target) {
            gsap.to(window, {
              duration: 1,
              scrollTo: target,
              ease: "power2.inOut",
            });
          }
        }
      };

      element.addEventListener("click", handler);
      handlers.push({ element, handler });
    });

    // ✅ CLEANUP (VERY IMPORTANT)
    return () => {
      handlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          VS
        </a>

        <a
          href="mailto:vibhor1792003@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          vibhor1792003@gmail.com
        </a>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;