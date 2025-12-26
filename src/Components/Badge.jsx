import React from 'react'

const Badge = ({ children, variant = "cyan", className = "" }) => {
const variants = {
    cyan: "bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] text-black",
    purple: "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg",
    outline: "border border-white/10 bg-white/5 text-gray-400"

}
  return (
<div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight flex items-center gap-1 z-20 ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export default Badge
