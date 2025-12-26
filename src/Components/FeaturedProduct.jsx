import React from 'react'
import {motion} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const FeaturedProduct = () => {
  return (
<section className='py-24 bg-[#0B0B0F] overflow-hidden'>
    <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        {/* DESKTOP PHOTO*/}

    <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative hidden lg:flex justify-center items-center"
        >
        {/* Neon Glow Aura */}
    <div className='absolute bsolute w-[100%] h-[100%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse'   />
    <motion.img 
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src="/mac.PNG" 
            alt="MacBook Pro"
            className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
          />

    </motion.div>
    {/* CONTENT SIDE  */}
    <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
            {/* Subtitle */}
          <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm">
            Tech Spotlight
          </span>

            {/* MOBILE ONLY PHOTO (Appears between Subtitle and Heading) */}

        <motion.div 
            className="lg:hidden relative py-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute w-[80%] h-[80%] bg-cyan-500/10 blur-[60px] rounded-full animate-pulse" />
            <img 
              src="/mac.PNG" 
              alt="MacBook Pro" 
              className="relative z-10 w-full max-w-[400px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />

          </motion.div>
          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 leading-tight">
            MacBook Pro <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">M3 Ultra.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            The most powerful laptop ever created. Featuring the M3 Ultra chip, 
            built to push the limits of what’s possible.
          </p>
          {/* Tech Spec Badges */}
        <div className="flex justify-center lg:justify-start gap-4 mb-10 w-full">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md min-w-[100px]">
              <p className="text-cyan-400 font-bold text-xl">24-Core</p>
              <p className="text-gray-500 text-[10px] uppercase">CPU</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md min-w-[100px]">
              <p className="text-purple-500 font-bold text-xl">128GB</p>
              <p className="text-gray-500 text-[10px] uppercase">Memory</p>
            </div>
          </div>
        {/* Action Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white font-bold bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/20"
          >
            Buy Now <ArrowUpRight size={20}/>
            
          </motion.button>

        </motion.div>


    </div>

</section>
  )
}

export default FeaturedProduct
