import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ParallaxImage2 = ({ src, alt, className }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], 
  });

  // base transforms
  const rawY = useTransform(scrollYProgress, [0, 1], [-20, 20]); 
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]); 

  // add smooth spring effect
  const y = useSpring(rawY, { stiffness: 150, damping: 80, mass: 2 });
  const scale = useSpring(rawScale, { stiffness: 150, damping: 80, mass: 2 });

  return (
    <div ref={ref} className={`w-full h-full overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale }}
      />
    </div>
  );
};

export default ParallaxImage2;
