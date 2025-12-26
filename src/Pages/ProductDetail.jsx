import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataPipe } from '../Components/Context/StoreContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ChevronDown, ArrowRight } from 'lucide-react';
import Badge from '../Components/Badge';
import ProductCard from '../Components/ProductCard';

const ProductDetail = () => {
  // --- 1. THE TOOLS (HOOKS) ---
  const { id } = useParams(); // Grabs the ID from the URL (e.g., if you're at /product/5, id is 5)
  const navigate = useNavigate(); // This is our "steering wheel" to change pages
  const { allProducts, handleAddToCart, loading } = useContext(DataPipe); // Connecting to our Global Data Pipe
  
  // --- 2. LOCAL STATE ---
  const [activeImg, setActiveImg] = useState(0); // Tracks which image thumbnail is currently selected
  const [isSpecsOpen, setIsSpecsOpen] = useState(false); // Controls the opening/closing of the Specifications box
  const [zoomStyle, setZoomStyle] = useState({ opacity: 1, scale: 1, x: 0, y: 0 }); // Stores the math for the "Magnifying Glass" effect

  // This ensures that every time you click a new product, the page starts at the very top
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // Logic to find the specific product data from our massive list of 10,000 products
  const product = allProducts.find(p => p.id === parseInt(id));
  const images = product?.images || [product?.thumbnail];

  // Logic to find "Similar Products" (items in the same category, but not the current one)
  const similarProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // --- 3. THE MOUSE ZOOM LOGIC ---
  const handleMouseMove = (e) => {
    // We find exactly where the image box is sitting on the screen
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // We calculate how far the mouse is from the center. 
    // -0.5 is the center. Multiplying by -100 makes the image "push" away from the mouse
    const x = ((e.pageX - left) / width - 0.5) * -100; 
    const y = ((e.pageY - top) / height - 0.5) * -100;
    
    setZoomStyle({ opacity: 1, scale: 1.8, x, y }); // scale: 1.8 makes it nearly 2x bigger
  };

  const handleMouseLeave = () => {
    // When the mouse leaves, we reset the image to its original size (scale: 1)
    setZoomStyle({ opacity: 1, scale: 1, x: 0, y: 0 });
  };

  // --- 4. THE "BUY NOW" LOGIC (THE SUITCASE) ---
  const handleBuyNow = () => {
    // This is how we bypass the Cart.
    // We navigate to /checkout and pack the product data inside a "state suitcase".
    // This allows the checkout page to see this product WITHOUT it being in the global cart.
    navigate('/checkout', { state: { directBuyItem: product } });
  };

  // --- 5. THE BEAUTIFUL LOADING SCREEN ---
  // This is your Cyberpunk-style loader. It shows while 'loading' is true OR if the product isn't found yet.
  if (loading || !product) return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center">
      {/* This div creates the neon spinning ring using Tailwind's animation and shadow */}
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white pt-28 pb-20 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- LEFT SIDE: IMAGE VIEWER --- */}
          <div className="space-y-6">
            <div 
              className="relative z-10 bg-[#16161D] rounded-[32px] p-8 border border-white/5 aspect-square flex items-center justify-center overflow-hidden cursor-crosshair shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* AnimatePresence makes the image fade smoothly when you swap it */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImg}
                  src={images[activeImg]}
                  animate={zoomStyle} // This is where the zoom math we wrote is applied!
                  transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
                  className="w-full h-full object-contain pointer-events-none origin-center" 
                />
              </AnimatePresence>
            </div>

            {/* THUMBNAIL SELECTORS */}
            <div className="flex gap-4 justify-center">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImg(idx)}
                  className={`w-16 h-16 rounded-xl border-2 p-1 bg-[#16161D] transition-all ${activeImg === idx ? 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'border-transparent opacity-40'}`}
                >
                  <img src={img} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: PRODUCT DETAILS --- */}
          <div className="flex flex-col">
            <Badge variant="outline" className="w-fit mb-4 uppercase tracking-tighter">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">{product.title}</h1>
            
            {/* RATING SECTION */}
            <div className="flex items-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#06b6d4" : "none"} className="text-cyan-500" />
              ))}
              <span className="ml-2 text-cyan-400 font-bold text-sm">{product.rating}</span>
            </div>

            {/* PRICE SECTION (Includes Discount Logic) */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              <span className="text-xl text-gray-600 line-through">${(product.price * 1.2).toFixed(0)}</span>
              <Badge variant="purple" className="py-1 px-3 text-xs">Save ${(product.price * 0.2).toFixed(0)}</Badge>
            </div>

            <p className="text-gray-400 mb-10 leading-relaxed text-lg">{product.description}</p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4 mb-10">
              {/* ADD TO CART: This sends the item to the StoreContainer memory */}
              <motion.button 
                onClick={() => handleAddToCart(product)}
                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.96 }}
                animate={{ boxShadow: ["0 0 0px rgba(0,163,255,0)", "0 0 45px rgba(0,163,255,0.8)", "0 0 0px rgba(0,163,255,0)"] }}
                transition={{ boxShadow: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } }}
                className="w-full py-4 bg-[#00A3FF] text-black font-black text-base rounded-xl flex items-center justify-center gap-3 shadow-xl uppercase tracking-wider"
              >
                ADD TO CART <ShoppingCart size={20} />
              </motion.button>
              
              {/* BUY NOW: This triggers our "Suitcase" navigation logic */}
              <motion.button 
                onClick={handleBuyNow}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-lg"
              >
                BUY NOW <ArrowRight size={22} />
              </motion.button>
            </div>

            {/* SPECIFICATIONS DROPDOWN (ACCORDION) */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#16161D]">
              <button onClick={() => setIsSpecsOpen(!isSpecsOpen)} className="w-full p-5 flex items-center justify-between font-bold text-xs uppercase tracking-widest">
                Specifications 
                <motion.div animate={{ rotate: isSpecsOpen ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isSpecsOpen && (
                  <motion.div 
initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      // THE FIX: "type: tween" removes the spring/bounce entirely
      transition={{ 
        type: "tween", 
        duration: 0.3, 
        ease: "easeOut" 
      }}
      // Important: originY keeps the growth anchored to the top
      style={{ originY: 0 }}
                    
                    className="px-5 pb-5 text-sm text-gray-400 space-y-3 overflow-hidden"
                  
                  
                  >
                    <div className="flex justify-between border-b border-white/5 pb-2"><span>Brand</span><span className="text-white">{product.brand}</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-2"><span>Stock Status</span><span className="text-cyan-400">{product.stock} in stock</span></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- SIMILAR PRODUCTS SECTION --- */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold mb-10">You Might <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Also Like</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((item, i) => (
              <ProductCard key={item.id} product={item} index={i} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;