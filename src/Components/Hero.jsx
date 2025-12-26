import React from 'react'
import{motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate=useNavigate()
  return (

    <section className="relative min-h-screen flex flex-col items-center pt-3 px-6 pt-20 overflow-hidden bg-black">
        {/* Mist */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-neon-blue/48 to-electric-purple/48 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-electric-purple/10 rounded-full blur-[100px] pointer-events-none" />
    
    <div className='relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center'>
    
{/*  BADGE */}
<motion.div
    initial={{opacity:0, y:20}}
    animate={{opacity:1, y:0}}
    className="inline-flex items-center gap-2 px-4  rounded-full border border-white/10 bg-white/5 my-9 backdrop-blur-md">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
     </svg>
<span className="text-[15px] font-display font-bold  tracking-[0.1em] text-soft-white/80">
            Premium Tech Store
 </span>
</motion.div> 

{/*  THE MAIN HEADING */}
<motion.h1
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-display font-bold text-white leading-[1.05] mb-8 tracking-tight">
            The Future of <br />
            <span className="bg-gradient-to-r from-[#00A3FF] to-[#8B5CF6] bg-clip-text text-transparent">
            Technology
          </span> is Here

          </motion.h1>

          {/*  SUBHEADING */}
            <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-muted-gray text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Discover premium gadgets and cutting-edge devices designed to elevate your digital lifestyle.
          </motion.p>

        {/*  BUTTONS */}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-5 ms-10"
        >

        <motion.button
        animate={{
            boxShadow: [
                "0 0 0px 0px rgba(0, 163, 255, 0)", 
                "0 0 70px 30px rgba(0, 163, 255, 1)", 
               "0 0 0px 0px rgba(0, 163, 255, 0)"
            ],
            
        }}
        onClick={()=>navigate("/products")}
        transition={{ 
              duration: 0.5,
              repeat: Infinity, 
              ease: "circIn" 
            }}
            className=" px-10 py-4 rounded-xl bg-neon-blue text-black font-display font-bold flex items-center gap-2 active:scale-95 transition-all cursor-pointer border-white/40 ">
                Shop Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
            </motion.button>

     {/* Explore Categories  */}
            <motion.button 
            whileHover={{ 
              boxShadow: "0 0 25px 5px rgba(0, 163, 255, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(0, 163, 255, 0.5)"
            }}
            className="px-10 py-4 rounded-xl border border-white/10 bg-white/5 text-soft-white font-display font-bold active:scale-95 transition-scale cursor-pointer"
          >
            Explore Categories
          </motion.button>

        </motion.div>





 {/*  SCROLL INDICATOR */}

<motion.div
initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="my-18 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_8px_#00A3FF]"
          />
        </div>
      </motion.div>


    </div>

   


    </section>
  )
}

export default Hero
