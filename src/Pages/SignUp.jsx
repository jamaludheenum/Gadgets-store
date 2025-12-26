import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldPlus } from 'lucide-react';
import Toast from '../Components/Toast';


const SignUp = () => {
        const location = useLocation();
    /* One object to hold all user registration data */
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })
    const [toast, setToast] = useState({ show: false, msg: '' });
const navigate = useNavigate();

const triggerToast=(msg)=>{
    setToast({show:true,msg});
    setTimeout(()=>setToast({show: false, msg: ''}),3000)

};
const handleSignUp=(e)=>{
    e.preventDefault();
    localStorage.setItem('techNovaUser',JSON.stringify(formData));


    triggerToast("Identity Created Successfully")
    setTimeout(() => navigate('/login'), 2000);
};




  return (
  <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-[42px] blur opacity-20"></div>
        
        <div className="relative bg-[#0B0B0F] border border-white/10 p-10 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Tech Nova</span>
            </h2>
            <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-2 font-semibold">New Identity Registration</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Using the Spread Operator (...) to update only the specific field in formData */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-all" size={18} />
              <input required type="text" placeholder="Full Name" 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#111116] border border-white/5 py-5 pl-12 pr-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-black transition-all text-sm" />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-all" size={18} />
              <input required type="email" placeholder="Email Address"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#111116] border border-white/5 py-5 pl-12 pr-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-black transition-all text-sm" />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-all" size={18} />
              <input required type="password" placeholder="Create Password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#111116] border border-white/5 py-5 pl-12 pr-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-black transition-all text-sm" />
            </div>

            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)" }} whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 mt-4">
              Confirm Identity <ArrowRight size={16} />
            </motion.button>
          </form>

<div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs uppercase  font-medium mb-4">
              Already Have An Identity ?
            </p>
            <Link to="/login" state={location.state}>
              <motion.button
                whileHover={{ x: -5 }}
                className="text-purple-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mx-auto group"
              >
                <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                Return to Login
              </motion.button>
            </Link>
          </div>


        </div>
      </motion.div>
      <Toast isVisible={toast.show} message={toast.msg} />
    </div>
  );
};

export default SignUp
