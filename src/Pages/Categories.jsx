import React, { useContext } from 'react';
import { DataPipe } from '../Components/Context/StoreContainer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Tablet, Watch, Cpu, Headphones, ArrowRight } from 'lucide-react';


const Categories = () => {
const { loading } = useContext(DataPipe);

const categoryTiles=[
  {
    name:'Smartphones',
    icon:<Smartphone size={24}/>,
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
    color: 'from-purple-600/40', // Used for the glow effect on hover
      count: 'Explore Collection'
  },{ 
      name: 'Laptops', 
      icon: <Laptop size={24} />, 
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      color: 'from-cyan-600/40',
      count: 'Explore Collection' 
    },
    { 
      name: 'Tablets', 
      icon: <Tablet size={24} />, 
      img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
      color: 'from-orange-600/40',
      count: 'Explore Collection' 
    },
    { 
      name: 'mobile-accessories', 
      icon: <Headphones size={24} />, 
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      color: 'from-indigo-600/40',
      count: 'Explore Collection' 
    },
    { 
      name: 'Wearables', 
      icon: <Watch size={24} />, 
      img: 'https://images.unsplash.com/photo-1508685096489-7aac296839e8?auto=format&fit=crop&q=80&w=800',
      color: 'from-green-600/40',
      count: 'Explore Collection' 
    },
    { 
      name: 'Hardware', 
      icon: <Cpu size={24} />, 
      img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800',
      color: 'from-red-600/40',
      count: 'Explore Collection' 
    },

];

if (loading) return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center text-cyan-500">
      <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.4)]"></div>
    </div>
  );



  return (
    <div className='min-h-screen bg-[#0B0B0F] pt-32 pb-20 px-4 md:px-10'>
      <div className="max-w-7xl mx-auto">
      {/* 4. DYNAMIC HEADERS */}
     <header className="mb-16">
      <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
           Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Category</span>    
          </motion.h1>
      <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-xl font-light"
          >
            Explore our curated collection of premium tech products
          </motion.p>
      </header> 
      {/* 5. THE CATEGORY GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryTiles.map((cat,index)=>(
        <motion.div
        key={cat.name}
        initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              >
                {/* URL LINKING*/}
            <Link to={`/products?category=${cat.name.toLowerCase()}`}>
            <motion.div
            whileHover={{y:-8}}
            className="group relative h-80 rounded-[32px] bg-[#16161D] border border-white/5 overflow-hidden flex flex-col justify-end p-8 transition-all hover:border-cyan-500/30"
            >
             {/* BACKGROUND LAYER: Image + Multiple Gradient Overlays */}
              <div className="absolute inset-0 z-0">
                <img 
                      src={cat.img} 
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    />
                    {/* The "Vignette": Bottom-to-top black gradient to make white text pop */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent`} />
                    {/* The "Glow": Becomes visible only when hovering over the card */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              </div>
              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  {/* Glassmorphism Icon Box */}
                 <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:border-white/30 transition-all">
                        {cat.icon}
                      </div> 
                      {/* : Arrow appears and slides into view on hover */}
                      <ArrowRight size={20} className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <div className="mt-4">
                {/* Small badge */}
                  <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        {cat.count}
                      </p>
                      <h3 className="text-3xl font-bold text-white tracking-tight">
                        {cat.name}
                      </h3>
                </div>
              </div>
            </motion.div>
            </Link>
              </motion.div>
      ))}
    </div>


      </div>
    </div>
  )
}

export default Categories
