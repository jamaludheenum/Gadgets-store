import React from 'react'
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles, Star } from 'lucide-react';

const ProductCard = ({product,index,onAddToCart}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: index * 0.05 
      }}
      whileHover={{ y: -18 }} 
      whileTap={{ scale: 0.98 }}
      onClick={()=>window.location.href=`/product/${product.id}`}
      className="group relative bg-[#16161D] rounded-[32px] p-5 border border-white/5 cursor-pointer flex flex-col h-full hover:shadow-[0_0_50px_10px_rgba(6,182,212,0.2)] transition-shadow duration-200"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square mb-6 flex items-center justify-center overflow-hidden shrink-0">
        {product.discountPercentage > 0 && (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-cyan-400 to-purple-500 px-3 py-1 rounded-full text-[10px] font-bold text-white z-20 shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        <div className="absolute top-0 right-0 bg-cyan-500 px-3 py-1 rounded-full flex items-center gap-1 z-20 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
          <Sparkles size={10} className="text-black" />
          <span className="text-[10px] font-bold text-black uppercase tracking-tight">New</span>
        </div>

        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        
        {/* Desktop Add to Cart Container */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30 ">
          <motion.button 
          whileTap={{scale:0.9}}
          onPointerDown={(e) => e.stopPropagation()}
            onClick={(e)=>{
              e.stopPropagation(); 
              onAddToCart(product);
            }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-2xl"
          >
            <ShoppingCart size={18}/>  Add to Cart
          </motion.button> 
        </div>
      </div> 

      {/* INFO SECTION */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#06b6d4" : "transparent"} className={i < Math.floor(product.rating) ? "text-cyan-500" : "text-gray-700"} />
          ))}
        </div>
        <h3 className="text-white font-bold text-lg mb-1 truncate">{product.title}</h3>
        <div className="flex items-center gap-3 mt-auto">
          <span className="text-cyan-400 font-bold text-xl">${product.price}</span>
          <span className="text-gray-600 text-sm line-through">${(product.price * 1.15).toFixed(2)}</span>
        </div>
      </div>

      {/* Mobile Add to Cart */}
      <div className="block md:hidden mt-6 relative z-30">
        <motion.button 
        whileTap={{ scale: 0.9 }} 
          onPointerDown={(e) => e.stopPropagation()}


          onClick={(e)=>{
            
            e.stopPropagation(); 
            onAddToCart(product);
          }} 
          className="w-full py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard;