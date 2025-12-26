import React, { useContext, useEffect, useState } from 'react'; // Imports core React hooks
import { motion, AnimatePresence } from 'framer-motion'; // Imports animation components for smooth transitions
import { Formik, Form, Field } from 'formik'; // Imports form management components
import * as Yup from 'yup'; // Imports the validation library for input checking
import { ArrowRight, ChevronLeft, Check, Truck, MapPin, CreditCard, AlertCircle, Smartphone, Banknote } from 'lucide-react'; // Imports UI icons
import { redirect, useNavigate } from 'react-router-dom'; // Imports hook for page navigation
import { DataPipe } from '../Components/Context/StoreContainer'; // Imports the global data context (cart, total, etc.)
import { useLocation } from 'react-router-dom';
// --- VALIDATION SCHEMAS ---
const validationSchemas = [
  Yup.object({ // Rules for Step 1: Shipping
    email: Yup.string().email('Please enter a valid email').required('Email address is required'), // Validates email format
    firstName: Yup.string().required('First Name is required'), // Ensures first name is not empty
    lastName: Yup.string().required('Last Name is required'), // Ensures last name is not empty
  }),
  Yup.object({ // Rules for Step 2: Address
    address: Yup.string().required('Street address is required'), // Ensures street is filled
    city: Yup.string().required('City is required'), // Ensures city is filled
    state: Yup.string().required('State is required'), // Ensures state is filled
    zip: Yup.string().required('ZIP Code is required'), // Ensures zip is filled
    country: Yup.string().required('Country is required'), // Ensures country is filled
  }),
  Yup.object({ // Rules for Step 3: Payment
    paymentMethod: Yup.string().required('Please select a payment method') // Ensures a choice is made
  })
];





const Checkout = () => {
  const { cart, totalPrice, setCart,user } = useContext(DataPipe); // Extracts cart data and functions from global context
  const location = useLocation();
const navigate=useNavigate();
  const [step, setStep] = useState(0); // State to track which part of the form the user is on
  const [isOrdered, setIsOrdered] = useState(false); // State to trigger the success screen


  
 useEffect(()=>{
  if(!user){
    navigate("/login",{state:{
      redirectTo:"/checkout",
      item:location.state?.directBuyItem
    }})
  }
 },[user, navigate])
 
 
 
 
 
 
 
 
 
 // 1. GRAB DIRECT ITEM
  const directItem = location.state?.directBuyItem;

  // 2. SELECT WHICH ITEMS TO SHOW
  const displayItems = directItem ? [directItem] : cart;
  
 



// This calculates the price for whatever is actually on the screen right now
const subtotal = displayItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

// Update your tax and final total to use 'subtotal'
const tax = subtotal * 0.08; 
const finalTotal = subtotal + tax;



  const handleNextStep = (values, actions) => { // Function that runs on form submission
    if (step < 2) { // Checks if there are more steps left
      setStep(step + 1); // Increments the step to move forward
      actions.setTouched({}); // Resets the "touched" status of inputs for the new step
    } else if (values.paymentMethod === 'cod') { // If it's the last step and COD is selected
      
      
      
      // CHANGE HERE
      
      if (!directItem) { // Checks if the cart clearing function exists
        setCart([]); // Empties the cart after order
      }
      setIsOrdered(true); // Switches the view to the success screen
    }
  };

  if (isOrdered) { // Conditional rendering check
    return <SuccessScreen navigate={navigate} />; // Displays only the success UI if ordered
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white pt-24 pb-10 px-4"> {/* Main page container with dark theme */}
      <div className="max-w-6xl mx-auto"> {/* Centered content wrapper */}
        
        {/* STEP PROGRESS INDICATOR BAR */}
        <div className="flex items-center justify-center mb-10 gap-4"> 
          <StepIndicator active={step >= 0} current={step === 0} done={step > 0} icon={<Truck size={22}/>} label="Shipping" /> {/* Shipping Step status */}
          <div className={`h-[1px] w-12 ${step > 0 ? 'bg-[#00A3FF]' : 'bg-white/10'}`} /> {/* Connecting line to next step */}
          <StepIndicator active={step >= 1} current={step === 1} done={step > 1} icon={<MapPin size={22}/>} label="Address" /> {/* Address Step status */}
          <div className={`h-[1px] w-12 ${step > 1 ? 'bg-[#00A3FF]' : 'bg-white/10'}`} /> {/* Connecting line to next step */}
          <StepIndicator active={step === 2} current={step === 2} done={false} icon={<CreditCard size={22}/>} label="Payment" /> {/* Payment Step status */}
        </div>

        <Formik // Form management wrapper
          initialValues={{ // Default values for all form fields
            email: '', firstName: '', lastName: '',
            address: '', city: '', state: '', zip: '', country: 'United States',
            paymentMethod: 'cod'
          }}
          validationSchema={validationSchemas[step]} // Loads the specific validation rules for the current step
          onSubmit={handleNextStep} // Triggers when the "Continue/Place Order" button is clicked
        >
          {({ values, setFieldValue, touched, errors }) => ( // Props provided by Formik to handle logic
            <Form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"> {/* Main form layout grid */}
              
              <div className="lg:col-span-7 bg-[#121217] border border-white/5 rounded-[1.5rem] p-8 min-h-[480px] flex flex-col justify-between"> {/* Left side form container */}
                <AnimatePresence mode="wait"> {/* Logic to handle smooth entrance/exit of form steps */}
                  {step === 0 && ( // Renders Shipping Fields
                    <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}> 
                      <h2 className="text-2xl font-bold mb-8 font-display">Shipping Information</h2> 
                      <FormInput label="Email Address" name="email" placeholder="your@email.com" error={touched.email && errors.email} /> 
                      <div className="grid grid-cols-2 gap-5 mt-6"> 
                        <FormInput label="First Name" name="firstName" placeholder="John" error={touched.firstName && errors.firstName} /> 
                        <FormInput label="Last Name" name="lastName" placeholder="Doe" error={touched.lastName && errors.lastName} /> 
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && ( // Renders Address Fields
                    <motion.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}> 
                      <h2 className="text-2xl font-bold mb-8 font-display">Shipping Address</h2> 
                      <FormInput label="Street Address" name="address" placeholder="123 Main St" error={touched.address && errors.address} /> 
                      <div className="grid grid-cols-2 gap-5 mt-6"> 
                        <FormInput label="City" name="city" placeholder="San Francisco" error={touched.city && errors.city} /> 
                        <FormInput label="State" name="state" placeholder="CA" error={touched.state && errors.state} /> 
                      </div>
                      <div className="grid grid-cols-2 gap-5 mt-6"> 
                        <FormInput label="ZIP Code" name="zip" placeholder="94102" error={touched.zip && errors.zip} /> 
                        <FormInput label="Country" name="country" placeholder="Country" error={touched.country && errors.country} /> 
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && ( // Renders Payment Selection
                    <motion.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}> 
                      <h2 className="text-2xl font-bold mb-8 font-display">Payment</h2> 
                      <div className="space-y-4"> 
                        <PaymentOption 
                          title="Cash on Delivery" icon={<Banknote size={20}/>} desc="Pay upon arrival" 
                          selected={values.paymentMethod === 'cod'} 
                          onClick={() => setFieldValue('paymentMethod', 'cod')} // Sets the form value for payment
                        />
                        <PaymentOption 
                          title="Google Pay" icon={<Smartphone size={20}/>} desc="Digital Wallet" 
                          selected={values.paymentMethod === 'gpay'} 
                          onClick={() => setFieldValue('paymentMethod', 'gpay')} // Sets the form value for payment
                        />
                      </div>

                      <AnimatePresence mode="wait"> {/* Logic for swapping the payment description notes */}
                        {values.paymentMethod === 'gpay' ? ( // Shows warning for Google Pay
                          <motion.div key="g" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl flex items-center gap-3">
                            <span className="text-xl">🛠️</span>
                            <p className="text-xs text-gray-400 font-medium italic">"Google Pay is currently taking a nap. Please use <span className="text-[#00A3FF] font-bold">COD</span> to finish your order!"</p>
                          </motion.div>
                        ) : ( // Shows info for Cash on Delivery
                          <motion.div key="c" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                            <span className="text-xl">💰</span>
                            <p className="text-xs text-gray-400">Classic choice! Your gear will be delivered, and you pay at the door.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-8"> {/* Footer buttons area */}
                  <button type="button" onClick={() => step > 0 ? setStep(step - 1) : navigate(-1) } className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                    <ChevronLeft size={18} /> Back {/* Back button logic */}
                  </button>
                  
                  <motion.button 
                    type="submit" // Triggers handleNextStep
                    animate={(step === 2 && values.paymentMethod === 'cod') ? { // Special animation for the final order button
                      scale: [1, 1.02, 1], 
                      boxShadow: [
                        "0 0 20px rgba(0,163,255,0.4)", 
                        "0 0 40px rgba(0,163,255,0.7)", 
                        "0 0 20px rgba(0,163,255,0.4)"
                      ] 
                    } : {}}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} // Pulsing effect
                    disabled={step === 2 && values.paymentMethod === 'gpay'} // Disables order if GPay is selected
                    className={`px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 text-sm transition-all ${
                      (step === 2 && values.paymentMethod === 'gpay') 
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5' // Style when disabled
                      : 'bg-[#00A3FF] text-black hover:brightness-110 active:scale-95' // Style when enabled
                    }`}
                  >
                    {step < 2 ? 'Continue' : 'Place Order'} {/* Text changes based on step */}
                    {step === 2 ? <Check size={20} strokeWidth={3} /> : <ArrowRight size={20} />} {/* Icon changes based on step */}
                  </motion.button>
                </div>
              </div>


              {/* ORDER SUMMARY SIDEBAR ...............................*/}



              <div className="lg:col-span-5 bg-[#121217] border border-white/5 rounded-[1.5rem] p-8 lg:p-10">
                <h2 className="text-2xl font-bold mb-8 font-display border-b border-white/5 pb-4">Order Summary</h2>
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"> {/* Scrollable list of items */}
                  {displayItems.map(item => ( // Loops through products in the cart
                    <div key={item.id} className="flex gap-5 items-center">
                      <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5 overflow-hidden flex-shrink-0">
                        <img src={item.thumbnail} className="w-full h-full object-cover" alt="" /> {/* Product Image */}
                      </div>
                      <div className="grow">
                        <h4 className="text-sm font-bold line-clamp-1">{item.title}</h4> {/* Product Name */}
                        <p className="text-xs text-gray-500 font-semibold mt-1">Qty: {item.quantity || 1}</p> {/* Product Quantity */}
                      </div>
                      <p className="font-bold text-base text-white">${(item.price * (item.quantity || 1)).toFixed(2)}</p> {/* Line price calculation */}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 pt-6 border-t border-white/5 text-sm"> {/* Pricing breakdown */}
                  <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Free</span></div>
                  <div className="flex justify-between text-gray-400"><span>Estimated Tax</span><span className="text-white">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between items-center pt-5 border-t border-white/10 mt-2">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-3xl font-bold text-[#00A3FF] font-display">${finalTotal.toFixed(2)}</span> {/* Grand Total */}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

// --- SUCCESS SCREEN COMPONENT ---
const SuccessScreen = ({ navigate }) => {
  const colors = ['#00A3FF', '#A855F7', '#60A5FA', '#D8B4FE']; // Array of colors for confetti
  
  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
      {/* CONFETTI ANIMATION LOOP */}
      {[...Array(50)].map((_, i) => ( // Creates 50 individual animated div particles
        <motion.div
          key={i}
          initial={{ top: "100%", left: `${Math.random() * 100}%`, opacity: 1, scale: Math.random() * 0.5 + 0.5 }} // Starts at the bottom
          animate={{ top: "-10%", left: `${Math.random() * 100}%`, rotate: 720, opacity: [1, 1, 0] }} // Flies to the top and fades
          transition={{ duration: Math.random() * 3 + 2, ease: "easeOut", repeat: Infinity, delay: Math.random() * 0.5 }} // Random speed/delay
          style={{ backgroundColor: colors[i % colors.length] }} // Cycles through colors array
          className="absolute w-2 h-4 rounded-sm z-0 shadow-[0_0_10px_rgba(0,163,255,0.2)]"
        />
      ))}

      <motion.div // Pulsing Success Checkmark
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="w-24 h-24 bg-[#00A3FF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(0,163,255,0.5)] relative z-10"
      >
        <Check size={48} strokeWidth={4} className="text-black" />
      </motion.div>
      
      <h1 className="text-4xl lg:text-5xl font-black font-display mb-4 relative z-10 text-center uppercase tracking-tight">ORDER SUCCESSFUL!</h1>
      <p className="text-gray-500 mb-12 text-lg relative z-10 text-center">Get ready, your gear is being packed right now.</p>
      
      <motion.button // Back to Shop button
        onClick={() => navigate('/')} // Redirects to home page
        whileHover={{ scale: 1.05, filter: "brightness(1.2)" }} // Hover animation
        whileTap={{ scale: 0.95 }} // Click animation
        animate={{ 
          boxShadow: ["0 0 15px rgba(0,163,255,0.3)", "0 0 35px rgba(0,163,255,0.6)", "0 0 15px rgba(0,163,255,0.3)"] 
        }}
        transition={{ boxShadow: { repeat: Infinity, duration: 2 }, scale: { duration: 0.2 } }}
        className="bg-[#00A3FF] text-black px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm relative z-10 shadow-lg"
      >
        Continue Shopping
      </motion.button>
    </div>
  );
};

// --- REUSABLE COMPONENTS ---
const StepIndicator = ({ active, current, done, icon, label }) => ( // Component for the progress bubbles
  <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-500 ${current ? 'bg-[#00A3FF]/10 border-[#00A3FF]' : 'border-white/5'}`}>
    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-500 ${done ? 'bg-[#00A3FF] text-black' : active ? 'text-[#00A3FF]' : 'text-gray-600'}`}>
      {done ? <Check size={20} strokeWidth={4} /> : icon} {/* Shows checkmark if done, icon if active */}
    </div>
    <span className={`text-sm font-bold ${active ? 'text-white' : 'text-gray-600'}`}>{label}</span>
  </div>
);

const FormInput = ({ label, name, placeholder, error }) => ( // Component for text input fields
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{label}</label>
    <Field // Formik's internal input element
      name={name}
      placeholder={placeholder}
      className={`bg-white/5 border rounded-xl px-5 py-4 text-base focus:outline-none transition-all duration-300 ${error ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-[#00A3FF]'}`}
    />
    <AnimatePresence> {/* Error message animation logic */}
      {error && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-1 text-red-500 text-xs font-bold mt-1 ml-1 overflow-hidden">
          <AlertCircle size={14}/>{error} {/* Displays the validation error message */}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const PaymentOption = ({ title, icon, desc, selected, onClick }) => ( // Component for payment method cards
  <div onClick={onClick} className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${selected ? 'border-[#00A3FF] bg-[#00A3FF]/5' : 'border-white/5 bg-white/5 hover:border-white/10'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected ? 'bg-[#00A3FF] text-black' : 'bg-white/10'}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-base uppercase tracking-tight">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selected ? 'border-[#00A3FF] bg-[#00A3FF]' : 'border-white/20'}`}>
      {selected && <Check size={14} strokeWidth={4} className="text-black" />} {/* Radio-button style checkmark */}
    </div>
  </div>
);

export default Checkout; // Exports the complete checkout page