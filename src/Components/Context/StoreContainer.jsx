import {  createContext, useEffect, useState } from "react";


export const DataPipe=createContext()
{/*making globalcontext the pipeline*/}


const StoreContainer =({children})=>{
    const [allProducts,setAllProducts]=useState([])
    const [loading, setLoading] = useState(true);

// --- NEW STATE: USER ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("techNova_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

// --- 2. DYNAMIC CART STATE

const [cart,setCart]=useState(()=>{
  // If user exists, use their unique ID, otherwise use "guest"
 const userPrefix = user ? `_user_${user.id}` : "_guest";
 const savedCart = localStorage.getItem(`techNova_cart${userPrefix}`);
  return savedCart? JSON.parse(savedCart):[];
})
// Save user session when it changes

useEffect(()=>{
if(user){
  localStorage.setItem("techNova_user",JSON.stringify(user));

}else {
  localStorage.removeItem("techNova_user");

}
},[user])

// -LOGIN / LOGOUT COMMANDS ---
const login =(userData)=>{
  // setCart([]);
  setUser(userData);


const savedCart=localStorage.getItem(`techNova_cart_user_${userData.id}`);
if(savedCart){
  setCart(JSON.parse(savedCart));
}else{
  setCart([])
}




};

const logout=()=>{
  setUser(null);
  setCart([]);
  localStorage.removeItem("techNova_user");
};





// 1. INITIALIZE: Check local storage first. 
  // If it's there, use it. If not, start with an empty array [].


// const [cart,setCart]=useState(()=>{
//   const saveCart=localStorage.getItem("techNova_cart")
//   return saveCart? JSON.parse(saveCart):[];
// })


// 2.Save the cart to the CORRECT slot whenever cart OR user changes

useEffect(()=>{
  const userPrefix=user ?`_user_${user.id}` : "_guest";
  localStorage.setItem(`techNova_cart${userPrefix}`, JSON.stringify(cart));
}, [cart, user])

    useEffect(()=>{
        fetch('https://dummyjson.com/products?limit=10000')
        .then(res=>res.json())
        .then(data=>{
            setAllProducts(data.products);
            setLoading(false)

        })
    },[])




//cart add or update..................................
    const handleAddToCart = (product)=>{
      setCart((prevCart)=>{
        // check product is already in the array
        const isItemInCart=prevCart.find((item)=>item.id===product.id);

        if(isItemInCart){
          // If it exists: Loop through the cart and +1 to the quantity of THAT item
          return prevCart.map((item)=>
            item.id===product.id
          ?{...item,quantity: item.quantity+1}
          :item
        )
        }
          // If it's new
        return [...prevCart, { ...product, quantity: 1 }];

      });
      
    };

//minus item quantity from cart..........................

const decreaseQuantity = (productId) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Keeps it at minimum 1
        : item
    )
  );
};
//remove.................
const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
};



    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
   const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);















  
  return(
<DataPipe.Provider value={{
  allProducts,
  cart,
  cartCount,
  totalPrice,
  handleAddToCart,
  decreaseQuantity,
  removeFromCart,
  setCart,
  loading,
  user,
  login,
  logout
}}>
  {children}
</DataPipe.Provider>

  )
}
export default StoreContainer;