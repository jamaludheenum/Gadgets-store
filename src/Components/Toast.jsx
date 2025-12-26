import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
const Toast = ({ message, isVisible }) => {
  return (
<AnimatePresence>
    {isVisible&&(
        <motion.div
        initial={{y: 50, opacity: 0, scale: 0.9}}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.9 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[999]"
        >
        <div className="bg-[#111116]/90 backdrop-blur-2xl border border-cyan-500/40 px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.25)] flex items-center gap-4">

        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
        <p className="text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
            {message}
        </p>

        </div>    
        </motion.div>
    )}
</AnimatePresence>
  )
}

export default Toast
