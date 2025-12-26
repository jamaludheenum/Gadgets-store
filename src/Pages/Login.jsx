import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Toast from '../Components/Toast'; 
import { DataPipe } from '../Components/Context/StoreContainer';



const Login = () => {
 const { login } = useContext(DataPipe);

 const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
 
  const [toast, setToast] = useState({ show: false, msg: '' });
  const navigate = useNavigate();


  const triggerToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

// Add this helper function to handle the navigation logic
  const handleRedirect = () => {
    const origin = location.state?.redirectTo || '/';
    const item = location.state?.item;
    
    setTimeout(() => {
      // Passes the 'item' back in case they were in a "Buy Now" flow
      navigate(origin, { state: { directBuyItem: item } });
    }, 1500);
  };





  const handleLogin = async (e) => {
    e.preventDefault(); 
    
try{

// 1. Check LocalStorage first
      const savedUser = JSON.parse(localStorage.getItem('techNovaUser'));
      if (savedUser && savedUser.email === email && savedUser.password === password) {
        triggerToast("Authentication Successful");
        const customUserData = {
id: savedUser.email.replace(/[^a-zA-Z0-9]/g, '_'), 
    firstName: savedUser.name.split(' ')[0],
    email: savedUser.email,
    image: 'https://robohash.org/technova',
        };
        login(customUserData);
        handleRedirect(); // Calls the helper function above
        return; 
      }




  const response=await fetch('https://dummyjson.com/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        // Since DummyJSON uses usernames for tests:
        username:email.split('@')[0],
        password:password,

    })

  });
const data = await response.json();


if(response.ok){
  triggerToast("Authentication Successful");

  login(data);

//redirect where they came from
const origin= location.state?.redirectTo || '/';
const item= location.state?.item;
setTimeout(()=>{
  navigate(origin,{state:{directBuyItem:item}});

},1500);
  
}else {
  triggerToast(data.message || "Access Denied");
} 

} catch (err){
  triggerToast("System Offline")
}


  };




  
  //   const savedUser = JSON.parse(localStorage.getItem('techNovaUser'));
    
  //   if (savedUser && savedUser.email === email && savedUser.password === password) {
  //     triggerToast("Authentication Successful"); 
  //     localStorage.setItem('isLoggedIn', 'true'); // Save login session
  //     setTimeout(() => navigate('/'), 2000); 
  //   } else {
  //     triggerToast("Access Denied"); 
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        {/* Glow Frame */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[42px] blur opacity-20"></div>
        
        <div className="relative bg-[#0B0B0F] border border-white/10 p-10 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Nova</span>
            </h2>
            <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-2 font-semibold">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-all" size={18} />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID"
                className="w-full bg-[#111116] border border-white/5 py-5 pl-12 pr-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-black transition-all text-sm" />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-all" size={18} />
              <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Access Key"
                className="w-full bg-[#111116] border border-white/5 py-5 pl-12 pr-12 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-black transition-all text-sm" />
              {/* Toggle visibility button */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-cyan-400 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Premium Button */}
            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)" }} whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3">
              <span className="relative z-10 flex items-center gap-3">Verify Identity <ArrowRight size={16} /></span>
            </motion.button>
          </form>



<div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs  uppercase font-medium mb-4">
              New To Tech Nova ?
            </p>
            <Link to="/signup" state={location.state}>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-cyan-400 text-xs font-bold uppercase tracking-[0.1em]  flex items-center justify-center gap-2 mx-auto group"
              >
                Create Access Identity 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>



        </div>
      </motion.div>
      <Toast isVisible={toast.show} message={toast.msg} />
    </div>
  );
};

export default Login;