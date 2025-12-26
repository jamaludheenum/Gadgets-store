
import React, { useContext } from 'react'
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { DataPipe } from './Context/StoreContainer';


const NewArrival = () => {
const { allProducts, handleAddToCart, loading }=useContext(DataPipe);
const filteredProduct=allProducts.filter(p=>['laptops', 'smartphones', 'mens-watches'].includes(p.category)
  ).slice(0, 4);

const MotionLink=motion.create(Link);

//loading.............
if(loading)return<div className="text-white text-center py-20">Loading...</div>;








  return (
<section className='py-24 bg-[#0B0B0F] px-4 md:px-6'>
<div className="max-w-7xl mx-auto">
{/* HEADER SECTION */}
<div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
<div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              New <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arrivals</span>
            </h2>
            <p className="text-gray-500">Experience our latest tech innovations</p>
          </div>
          <Link to="/products"  className="hidden md:flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-semibold group">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

</div>

{/* ProductCard Layer */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {filteredProduct.map((item,i)=>(
        <ProductCard 
              key={item.id} 
              product={item} 
              index={i} 
              onAddToCart={handleAddToCart} 
            />
    ))}
</div>
{/* MOBILE VIEW ALL BUTTON */}
<div className="mt-12 flex md:hidden">
          <MotionLink to="/products" className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold flex items-center justify-center gap-2"
         initial={{opacity:0,y:20}}
         whileInView={{opacity: 1, y: 0}}
         viewport={{ once: true }}
    transition={{ delay: 0.1 }}
      whileTap={{ scale: 0.95 }}
         
         >
         
         
         
            View All Collections <ArrowRight size={18} />
          </MotionLink>
          </div>
        </div>
</section>
  )
}

export default NewArrival
