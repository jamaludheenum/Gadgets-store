import React, { useContext, useState,useMemo } from 'react'
import { DataPipe } from '../Components/Context/StoreContainer'
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import ProductCard from '../Components/ProductCard';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
const [searchParams] = useSearchParams();
const categoryQuery = searchParams.get("category");

const {allProducts,loading,handleAddToCart}=useContext(DataPipe)
const [searchQuery, setSearchQuery] = useState("");
const [visibleCount, setVisibleCount] = useState(8);
// --- . GADGET-ONLY FILTER LOGIC +category---
const filteredProducts = useMemo(() => {
  return allProducts.filter(product => {

    // Normalize once
    const productCategory = product.category.toLowerCase();
    const productTitle = product.title.toLowerCase();

    // 1. Must be a Gadget / Electronic
    const isGadget =
      productCategory.includes("electronics") ||
      productCategory.includes("laptops") ||
      productCategory.includes("smartphones") ||
      productCategory.includes("tablets") ||
      productCategory.includes("mobile-accessories") ||
      productCategory.includes("wearables");

    // 2. Must match Category from URL (if exists)
    const matchesCategory = categoryQuery
      ? productCategory === categoryQuery.toLowerCase()
      : true;

    // 3. Must match Search Bar
    const matchesSearch = productTitle.includes(
      searchQuery.toLowerCase()
    );

    return isGadget && matchesCategory && matchesSearch;
  });
}, [allProducts, categoryQuery, searchQuery]);



// ---  THE CYBERPUNK LOADER ---
if (loading) return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
    </div>
);


// Performance: We only 'slice' out the number of items we want to see (starting at 8)
  const displayList = filteredProducts.slice(0, visibleCount);
  return (
<section className="py-24 px-4 md:px-10 bg-[#0B0B0F]">
<motion.div
initial={{opacity:0}}
whileInView={{opacity:1}}
viewport={{once:true}}
transition={{duration:1}}
className="max-w-7xl mx-auto flex flex-col items-center text-center">
  {/* THE BLUE SPARKLING STAR BADGE */}
  <motion.div
 initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
         className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
  >

 <Sparkles size={16} className="text-blue-400 animate-pulse" />
 <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-400">
            Premium Collection
          </span>
  </motion.div>
 {/* HEADINGS */}
<motion.div
initial={{y:20,opacity:0}}
animate={{y: 0, opacity: 1}}
transition={{ delay: 0.4 }}
>
  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Products</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light mb-12">
            Explore cutting-edge technology designed for the future
          </p>
</motion.div>

{/* THE SEARCH TERMINAL */}
<motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative w-full max-w-2xl mb-24 group"
        >
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-600 group-focus-within:text-blue-400 transition-colors" />
          </div>
            <input 
            type="text" 
            placeholder="Search our gadgets inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111116] border border-white/5 py-5 pl-16 pr-8 rounded-2xl text-white outline-none focus:border-blue-500/30 transition-all shadow-inner"
          />
        </motion.div>

{/* 5. PRODUCT GRID (THE STAGGERED WAVE) */}
<motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 w-full text-left"
        >
<AnimatePresence mode='popLayout'>
  {displayList.map((product,index)=>(
    <motion.div
key={product.id}
                layout // Smoothly slides cards when others are searched/filtered
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05, // This creates the 'wave' effect where they pop up 1 by 1
                  ease: "easeOut"
                }}>
                  <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
                </motion.div>
  ))}
</AnimatePresence>

        </motion.div>
{/* 6. THE BLACK LOAD MORE BUTTON */}
{visibleCount<filteredProducts.length &&(
  <motion.button
  initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02, backgroundColor: "#000000" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="mt-24 px-16 py-5 bg-black border border-white/10 text-white font-bold uppercase tracking-widest rounded-2xl transition-colors hover:border-cyan-500/50"
          >
            Load More
          </motion.button>

)}

</motion.div>
</section>
  )
}

export default Products
