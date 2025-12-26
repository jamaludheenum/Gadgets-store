import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DataPipe } from '../Components/Context/StoreContainer';

const Cart = () => {
  const { cart, totalPrice, handleAddToCart, decreaseQuantity, removeFromCart,user } = useContext(DataPipe);
  const navigate = useNavigate();

 const tax = (totalPrice || 0) * 0.08;
const finalTotal = (totalPrice || 0) + tax;

  // 1. EMPTY STATE (SMOOTH SPRING POP)
  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
          className="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_50px_rgba(0,163,255,0.15)]"
        >
          <ShoppingBag size={40} className="text-gray-400" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-3xl font-bold text-white mb-3 font-display">Your cart is empty</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-gray-500 text-base mb-10 max-w-sm">Looks like you haven't added any items to your cart yet.</motion.p>
        <Link to="/products">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-gradient-to-r from-[#00A3FF] to-[#8B5CF6] text-white text-base font-bold rounded-2xl flex items-center gap-2">
            Browse Products <ArrowRight size={20} />
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-28 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center font-display tracking-tight">
          Shopping <span className="bg-gradient-to-r from-[#00A3FF] to-[#8B5CF6] bg-clip-text text-transparent">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence mode='popLayout'>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    filter: "blur(8px)", 
                    transition: { duration: 0.6, ease: "easeOut" } 
                  }}
                  transition={{ layout: { type: "spring", stiffness: 250, damping: 30 } }}
                  className="bg-[#121217] border border-white/5 p-5 rounded-[2rem] flex flex-col md:flex-row items-center gap-7 relative group"
                >
                  {/* CLICKABLE PHOTO */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-28 h-28 bg-[#1a1a21] rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 cursor-pointer"
                  >
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </motion.div>

                  <div className="grow text-center md:text-left">
                    {/* CLICKABLE NAME */}
                    <motion.h3 
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="text-xl font-bold text-white mb-1 group-hover:text-[#00A3FF] transition-colors cursor-pointer font-display"
                    >
                      {item.title}
                    </motion.h3>

                    <p className="text-lg font-medium text-white/80 mb-5">${item.price}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-5">
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => decreaseQuantity(item.id)} className="p-2 rounded-xl border border-white/10 bg-white/5 hover:border-[#00A3FF]/50 transition-all">
                        <Minus size={16} />
                      </motion.button>
                      <span className="font-bold text-xl w-6 text-center">{item.quantity}</span>
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => handleAddToCart(item)} className="p-2 rounded-xl border border-white/10 bg-white/5 hover:border-[#00A3FF]/50 transition-all">
                        <Plus size={16} />
                      </motion.button>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="md:absolute md:top-7 md:right-7 p-2 text-white/20 hover:text-red-500 transition-colors">
                    <Trash2 size={22} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-[#121217] border border-white/5 rounded-[2rem] p-7 md:p-8 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3.5 text-gray-400 mb-6 pb-6 border-b border-white/5 text-sm md:text-base">
                <div className="flex justify-between items-center"><span>Subtotal</span><span className="text-white">${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between items-center"><span>Shipping</span><span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Free</span></div>
                <div className="flex justify-between items-center"><span>Tax (8%)</span><span className="text-white">${tax.toFixed(2)}</span></div>
              </div>

              <div className="flex justify-between items-center text-2xl font-bold mb-8">
                <span>Total</span>
                <span className="bg-gradient-to-r from-[#00A3FF] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,163,255,0.4)]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* ULTRA-FAST PULSE BUTTON */}
              <motion.button 
              onClick={() => 
              {
                if(!user){
                  //  Kick to login if not a member
                  navigate("/login",{state:{redirectTo:"/checkout"}});
                }else {
      navigate('/checkout');
    }
              }
              }





                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.96 }}
                animate={{ boxShadow: ["0 0 0px rgba(0,163,255,0)", "0 0 45px rgba(0,163,255,0.8)", "0 0 0px rgba(0,163,255,0)"] }}
                transition={{ boxShadow: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } }}
                className="w-full py-4 bg-[#00A3FF] text-black font-black text-base rounded-xl flex items-center justify-center gap-3 shadow-xl"
              >
                PROCEED TO CHECKOUT <ArrowRight size={20} />
              </motion.button>
              
              <p className="text-center text-[9px] text-white/20 uppercase tracking-[0.2em] mt-5">
                Secure checkout powered by TechNova
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;