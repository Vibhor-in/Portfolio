import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  _splitCleanup?: () => void;
}

// Custom word splitter — wraps each word in a <span>
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.innerText || "";
  el.innerHTML = "";
  return text.split(/(\s+)/).map((part) => {
    const span = document.createElement("span");
    if (/^\s+$/.test(part)) {
      span.innerHTML = "&nbsp;";
      span.style.display = "inline-block";
    } else {
      span.textContent = part;
      span.style.display = "inline-block";
    }
    el.appendChild(span);
    return span;
  });
}

// Custom char splitter — wraps each character in a <span>
function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.innerText || "";
  el.innerHTML = "";
  return text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    el.appendChild(span);
    return span;
  });
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para._splitCleanup?.();
    }

    const words = splitWords(para);

    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title._splitCleanup?.();
    }

    const chars = splitChars(title);

    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
