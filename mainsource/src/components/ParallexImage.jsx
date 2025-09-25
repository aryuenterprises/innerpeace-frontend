// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const ParallaxImage = ({ src, alt ,className}) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"], // starts moving when card enters viewport
//   });

//   // Moves image -30px to +30px depending on scroll
//   const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

//   return (
//     <div ref={ref} className={`absolute w-full h-full overflow-hidden ${className}`}>
//       <motion.img
//         src={src}
//         alt={alt}
//         className="w-full h-full object-cover"
//         style={{ y, scale: 1.3 }} // scale slightly for smooth parallax
//       />
//     </div>
//   );
// };

// export default ParallaxImage;




import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ParallaxImage = ({ src, alt, className }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // triggers parallax within viewport
  });

  // Map scroll progress to y transform
  const yRange = useTransform(scrollYProgress, [0, 1], [-40, 40]); // slightly larger range

  // Add spring for smooth motion
  const y = useSpring(yRange, {
    stiffness: 50,   // lower = smoother
    damping: 20,     // controls bounciness
    mass: 0.5,       // affects inertia
  });

  return (
    <div ref={ref} className={`absolute w-full h-full overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale: 1.2 }} // keep slight scale for depth effect
      />
    </div>
  );
};

export default ParallaxImage;
