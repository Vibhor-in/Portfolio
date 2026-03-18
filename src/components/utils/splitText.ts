import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

// Custom word splitter — only use on elements with PLAIN TEXT (no nested HTML)
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

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  // .para elements are plain text — safe to word-split
  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
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

  // .title elements have nested HTML (span, div) — animate as whole to preserve structure
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }

    title.anim = gsap.fromTo(
      title,
      { autoAlpha: 0, y: 60 },
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
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
