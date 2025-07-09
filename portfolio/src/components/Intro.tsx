import BlurText from "./BlurText";
import TypewriterText from "./TypeWriter";
import CircularText from "./CircularText";
import GooeyNav from "./GooeyNav";

const Intro = () => (
 
    <div className="min-h-screen w-screen bg-black flex items-center">
    
      <div className="pl-2 sm:pl-12">
        <BlurText
          text="DANIEL BALDEO-THORNE"
          delay={60}
          animateBy="words"
          direction="bottom"
          className="text-white text-3xl sm:text-5xl font-bold"
        />
         <TypewriterText
          text="I build software and hardware that pushes the boundaries of Agri-Tech"
          className="text-lime-300 text-lg sm:text-xl mt-4"
        />
        
      </div>
        <div className="ml-auto mr-8 sm:mr-24 flex-shrink-0">
  <img
    src="/me.png"
    alt="Portrait"
    className="
      w-40 sm:w-64 md:w-80 lg:w-[28rem]
      object-cover rounded-lg shadow-lg
      grayscale hover:grayscale-0 transition duration-300 ease-in-out
    "
  />
</div>
    </div>
     
  
);

export default Intro;