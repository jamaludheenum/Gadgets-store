import React, { useContext } from 'react'
import { DataPipe } from './Context/StoreContainer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import ProductCard from './ProductCard';

const BestSeller = () => {
    const { allProducts, handleAddToCart, loading } =useContext(DataPipe);
  // 1️⃣ Latest iPhone
  const iphone = allProducts.find(
    p =>
      p.brand === 'Apple' &&
      p.category === 'smartphones' &&
      p.title.toLowerCase().includes('iphone')
  )

  // 2️⃣ Smart Watch
  const smartwatch = allProducts.find(
    p => p.category === 'mens-watches' || p.category === 'smartwatches'
  )

  // 3️⃣ Laptop
  const laptop = allProducts.find(
    p => p.category === 'laptops'
  )
// 4️⃣ Power Bank

const powerBank = allProducts.find(
  p =>
    p.category === 'mobile-accessories' &&
    p.title.toLowerCase().includes('power')
)

  // ✅ EXACTLY 4 products
  const featuredProducts = [iphone, smartwatch, laptop, powerBank].filter(Boolean)





    const MotionLink = motion.create(Link);
  return (
    <section className="py-24 bg-[#0B0B0F] px-4 md:px-6 border-t border-white/5">
     <div className="max-w-7xl mx-auto">
                
                {/* HEADER SECTION - Centered on mobile, Space-between on Desktop */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-cyan-500 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                            Best Sellers
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Products</span>
                        </h2>
                    </div>
                    
                    {/* DESKTOP VIEW ALL (Hidden on mobile) */}
                    <Link 
                        to="/products" 
                        className="hidden md:flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-semibold group"
                    >
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
{/* THE GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((item, index) => (
                        <ProductCard 
                            key={item.id} 
                            product={item} 
                            index={index} 
                            onAddToCart={handleAddToCart} 
                        />
                    ))}
                </div>

{/* MOBILE VIEW ALL BUTTON (Visible only on small screens) */}
                <div className="mt-12 flex md:hidden">
                    <MotionLink 
                        to="/products" 
                        className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold flex items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Best Sellers <ArrowRight size={18} />
                    </MotionLink>
                </div>
                
            </div>



        
    </section>
  )
}

export default BestSeller
