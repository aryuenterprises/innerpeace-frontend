import React from "react";
import beach_video from "../assets/beach _video.mp4";
import { motion } from "framer-motion";

function Home_video() {
  return (
    <section className="relative rounded-3xl h-[30vh] md:h-[50vh] ms-5 me-5 mt-8 md:ms-16 md:me-16 md:mt-16">
      <div className="absolute rounded-3xl inset-0 -z-20 h-full w-full overflow-hidden">
        <motion.video
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="h-full w-full object-cover "
          src={beach_video}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        ></motion.video>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-35% to-white to-85% "></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent from-95% to-white  "></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-transparent from-95% to-white  "></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-transparent    to-white"></div>

      <div className="absolute z-20 flex h-full flex-col justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="w-full px-5 md:text-2xl font-bold font-Oswald text-black/50"
        >
          Traveling is the joy of exploring new places, meeting new people, and
          uncovering the beauty of the world through fresh perspectives
        </motion.p>
      </div>
    </section>
  );
}

export default Home_video;
