import React from "react";

function GroupImage() {
  return (
    <div className='relative mt-8 md:mt-20 bg-[url("././assets/groupimage.png")] h-[215px] md:h-[500px] w-full bg-no-repeat bg-cover bg-center'>
    {/* Top Gradient */}
    <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white to-transparent z-10"></div>
  
    {/* Bottom Gradient */}
    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
  </div>
  
  );
}

export default GroupImage;
