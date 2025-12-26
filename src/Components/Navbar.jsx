import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataPipe } from './Context/StoreContainer';

const Navbar = () => {

const [isOpen,setIsOpen]=useState(false)
const Location=useLocation();
const { cartCount,user,logout } = useContext(DataPipe);




  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='fixed top-0 left-0 right-0 z-50 h-19 flex items-center justify-between px-8 md:px-19 bg-black/40 backdrop-blur-md border-b border-white/5'
    >
      {/* 1. LOGO */}
<Link to="/">
        <div className='flex items-center font-display cursor-pointer '>
          <span className='font-bold text-2xl bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,163,255,0.3)]'>
            Tech
          </span>      
          <span className='text-soft-white font-bold text-2xl ml-2'>Nova</span>
          <span className='w-1.5 h-1.5 bg-neon-blue rounded-full ml-1.5 self-center mt-1 shadow-[0_0_12px_var(--neon-blue)]' />
        </div>
</Link>

      {/* 2. LINKS*/}
      <div className='hidden md:flex items-center gap-10'>
        <Link to="/" className={`relative nav-item ${Location.pathname==='/'? 'nav-item-active':'nav-item-inactive'} `}>
          Home

            {Location.pathname === '/' && (
      <motion.div 
        layoutId="underline" 
        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_10px_#00A3FF]" 
      />
    )}

          
        </Link>
        <Link to="/products" className={`relative nav-item ${Location.pathname==='/products'? 'nav-item-active':'nav-item-inactive'} `}>
          Products

{Location.pathname === '/products' && (
      <motion.div 
        layoutId="underline" 
        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_10px_#00A3FF]" 
      />
    )}


        </Link>
        <Link to="/categories" className={`relative nav-item ${Location.pathname==='categories'? 'nav-item-active':'nav-item-inactive'} `}>
          Categories

{Location.pathname === '/categories' && (
      <motion.div 
        layoutId="underline" 
        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_10px_#00A3FF]" 
      />
    )}


        </Link>
      </div>

      {/* 3. RIGHT SECTION*/}
      <div className='flex items-center gap-3'>

        {/*logout button....................*/}
      { user?( 
        <button
      onClick={logout}
      className='hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer group'
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span className='text-[10px] font-bold uppercase tracking-widest'>Logout</span>
      </button>
      ): (
          // LOGIN BUTTON
          <Link to="/login">
      <button className='hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-soft-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group'>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-gray group-hover:text-soft-white transition-colors">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span className='text-[10px] font-bold uppercase tracking-widest'>Login</span>
      </button>
    </Link>

      )



}

     




        {/* <button className='hidden md:flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-soft-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group'>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-gray group-hover:text-soft-white transition-colors">

        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        
  </svg>
  <span className='text-[10px] font-bold uppercase tracking-widest'>Login</span>
</button> */}

{/*cart*/}


<Link to="/cart">
  <div className='relative p-2 rounded-full border border-white/10 bg-white/5 cursor-pointer group hover:border-neon-blue/50 hover:shadow-[0_0_15px_rgba(0,163,255,0.2)] transition-all duration-300'>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='text-soft-white group-hover:text-neon-blue transition-colors'>
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
{cartCount > 0 && (
      <span className='absolute -top-1 -right-1 w-4 h-4 bg-neon-blue text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_var(--color-neon-blue)]'>
        {cartCount}
      </span>
    )}
  </div>  
</Link> 
{/*hamberg*/}
<button
onClick={()=>setIsOpen(!isOpen)}
className='md:hidden p-2 rounded-full border border-white/10 bg-white/5 text-soft-white cursor-pointer hover:bg-white/10'>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
</button>
  </div>





<AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/5 flex flex-col py-10 md:hidden z-40 items-center"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className={` ${Location.pathname==='/'? 'nav-item-active':'nav-item-inactive'}  w-full text-center py-6  text-xs font-bold uppercase tracking-widest `}>
              Home
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className={` ${Location.pathname==='/products'? 'nav-item-active':'nav-item-inactive'}  w-full text-center py-6 text-xs font-bold uppercase tracking-widest `}>
              Products
            </Link>
            <Link to="/categories" onClick={() => setIsOpen(false)} className={` ${Location.pathname==='/categories'? 'nav-item-active':'nav-item-inactive'}  w-full text-center py-6 text-xs font-bold uppercase tracking-widest `}>
              Categories
            </Link>


<div className="px-8 mt-4 pt-6 border-t border-white/10">
<Link to={"/login"} onClick={() => setIsOpen(false)}>

        {user ? (
    <button 
      onClick={() => { logout(); setIsOpen(false); }}
      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-red-500/20 bg-red-500/5 text-red-400"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest">Logout</span>
    </button>
  ) : (
    <Link to="/login" onClick={() => setIsOpen(false)}>
      <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-soft-white">
        <span className="text-[10px] font-bold uppercase tracking-widest">Login</span>
      </button>
    </Link>
  )}
</Link>
      </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}

export default Navbar;