import{r as Y,j as a}from"./index-Bu8AOAn8.js";const Z="/assets/dummy2-DnMgeUT4.png",Q="/assets/dummy3-B2ubo7tl.png",U="/assets/traveltype1-xO8v2xAQ.png",V="/assets/traveltype3-BVfhaZTl.jpg",G="/assets/traveltype4-BRdo07_S.png",J="/assets/traveltype5-DCvhH7b9.jpg";var z={};function K(r){if(typeof window>"u")return;const s=document.createElement("style");return s.setAttribute("type","text/css"),s.innerHTML=r,document.head.appendChild(s),r}Object.defineProperty(z,"__esModule",{value:!0});var e=Y;function F(r){return r&&typeof r=="object"&&"default"in r?r:{default:r}}var i=F(e);K(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const ee=e.forwardRef(function({style:s={},className:y="",autoFill:c=!1,play:u=!0,pauseOnHover:w=!1,pauseOnClick:b=!1,direction:t="left",speed:p=50,delay:M=0,loop:j=0,gradient:B=!1,gradientColor:T="white",gradientWidth:v=200,onFinish:W,onCycleComplete:$,onMount:_,children:h},D){const[E,O]=e.useState(0),[x,H]=e.useState(0),[g,k]=e.useState(1),[N,L]=e.useState(!1),P=e.useRef(null),l=D||P,f=e.useRef(null),d=e.useCallback(()=>{if(f.current&&l.current){const n=l.current.getBoundingClientRect(),R=f.current.getBoundingClientRect();let o=n.width,m=R.width;(t==="up"||t==="down")&&(o=n.height,m=R.height),k(c&&o&&m&&m<o?Math.ceil(o/m):1),O(o),H(m)}},[c,l,t]);e.useEffect(()=>{if(N&&(d(),f.current&&l.current)){const n=new ResizeObserver(()=>d());return n.observe(l.current),n.observe(f.current),()=>{n&&n.disconnect()}}},[d,l,N]),e.useEffect(()=>{d()},[d,h]),e.useEffect(()=>{L(!0)},[]),e.useEffect(()=>{typeof _=="function"&&_()},[]);const S=e.useMemo(()=>c?x*g/p:x<E?E/p:x/p,[c,E,x,g,p]),I=e.useMemo(()=>Object.assign(Object.assign({},s),{"--pause-on-hover":!u||w?"paused":"running","--pause-on-click":!u||w&&!b||b?"paused":"running","--width":t==="up"||t==="down"?"100vh":"100%","--transform":t==="up"?"rotate(-90deg)":t==="down"?"rotate(90deg)":"none"}),[s,u,w,b,t]),X=e.useMemo(()=>({"--gradient-color":T,"--gradient-width":typeof v=="number"?`${v}px`:v}),[T,v]),C=e.useMemo(()=>({"--play":u?"running":"paused","--direction":t==="left"?"normal":"reverse","--duration":`${S}s`,"--delay":`${M}s`,"--iteration-count":j?`${j}`:"infinite","--min-width":c?"auto":"100%"}),[u,t,S,M,j,c]),q=e.useMemo(()=>({"--transform":t==="up"?"rotate(90deg)":t==="down"?"rotate(-90deg)":"none"}),[t]),A=e.useCallback(n=>[...Array(Number.isFinite(n)&&n>=0?n:0)].map((R,o)=>i.default.createElement(e.Fragment,{key:o},e.Children.map(h,m=>i.default.createElement("div",{style:q,className:"rfm-child"},m)))),[q,h]);return N?i.default.createElement("div",{ref:l,style:I,className:"rfm-marquee-container "+y},B&&i.default.createElement("div",{style:X,className:"rfm-overlay"}),i.default.createElement("div",{className:"rfm-marquee",style:C,onAnimationIteration:$,onAnimationEnd:W},i.default.createElement("div",{className:"rfm-initial-child-container",ref:f},e.Children.map(h,n=>i.default.createElement("div",{style:q,className:"rfm-child"},n))),A(g-1)),i.default.createElement("div",{className:"rfm-marquee",style:C},A(g))):null});var te=z.default=ee;const ae=()=>{const r=[{image:J,name:"Trips for your peace"},{image:Z,name:"Trips for beaches & water activities"},{image:Q,name:"Trips for trekking & hiking"},{image:V,name:"Trips for snow experiences"},{image:U,name:"Trips for spiritual needs"},{image:G,name:"Trips for honeymoon"}];return a.jsxs("div",{className:"mx-5 mt-10 md:mx-16 md:mt-24 flex flex-col md:flex-row gap-5 md:gap-10",children:[a.jsxs("div",{className:"w-full md:w-[30%]",children:[a.jsx("p",{className:"text-[#000000] text-2xl md:text-3xl lg:text-4xl",children:"Choose Your"}),a.jsx("p",{className:"text-[#0E598F] font-bold md:font-semibold lg:font-extrabold text-2xl md:text-3xl lg:text-4xl",children:"Perfect Travel Type"}),a.jsx("p",{className:"text-[#000000] text-base lg:text-lg mt-3",children:"We Have Abundance Of Destinations And Activities List For You To Explore."})]}),a.jsx("div",{className:"w-full md:w-2/3 h-full rounded-xl overflow-hidden",children:a.jsx(te,{speed:60,gradient:!1,pauseOnHover:!1,loop:0,children:r.map((s,y)=>a.jsxs("div",{className:"relative h-44 sm:h-44 w-[300px] rounded-xl overflow-hidden mx-2 flex-shrink-0",children:[a.jsx("img",{src:s.image,alt:"travel type",className:"absolute w-full h-full object-cover"}),a.jsx("div",{className:"absolute w-full h-full z-10 bg-gradient-to-b from-black to-transparent"}),a.jsxs("div",{className:"absolute top-2 w-full z-10 font-jost tracking-[0.2em] uppercase text-sm text-white text-center p-2 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]",children:[a.jsxs("p",{children:[s.name.split(" ")[0]," ",s.name.split(" ")[1]]}),a.jsx("p",{children:s.name.split(" ").slice(2).join(" ")})]})]},y))})})]})};export{ae as default};
