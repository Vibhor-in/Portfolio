import gsap from "gsap";

// Custom char splitter — only use on elements with PLAIN TEXT (no nested HTML)
function splitChars(selector: string | string[]): Element[] {
  const selectors = Array.isArray(selector) ? selector : [selector];
  const chars: Element[] = [];

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      const text = el.textContent || "";
      el.textContent = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        el.appendChild(span);
        chars.push(span);
      });
    });
  });

  return chars;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // h3 and h2 are plain text — safe to char-split
  const landingSimpleChars = splitChars([
    ".landing-info h3",
    ".landing-intro h2",
  ]);
  gsap.fromTo(
    landingSimpleChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // h1 has nested <br> and <span> — animate as a whole to preserve HTML structure
  gsap.fromTo(
    ".landing-intro h1",
    { opacity: 0, y: 60, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      delay: 0.45,
    }
  );

  // landing-h2-info is plain text — safe to char-split
  const h2InfoChars = splitChars(".landing-h2-info");
  gsap.fromTo(
    h2InfoChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const h2Info1Chars = splitChars(".landing-h2-info-1");
  const h2_1Chars = splitChars(".landing-h2-1");
  const h2_2Chars = splitChars(".landing-h2-2");

  LoopText(h2InfoChars, h2Info1Chars);
  LoopText(h2_1Chars, h2_2Chars);
}

function LoopText(Text1: Element[], Text2: Element[]) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
