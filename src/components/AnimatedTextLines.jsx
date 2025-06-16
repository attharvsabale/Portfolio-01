import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, Children, isValidElement, cloneElement } from "react";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, className=`font-light uppercase value-text-responsive text-sm ${textColor}` }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  const isString = typeof text === "string";

  const lines = isString
    ? text.split("\n").filter((line) => line.trim() !== "")
    : [text]; // keep JSX as one block

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty break-words"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
