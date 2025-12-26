
import Hero from '../Components/Hero'
import NewArrivals from '../Components/NewArrival'
import FeaturedProduct from '../Components/FeaturedProduct'
import BestSeller from '../Components/BestSeller'

const Home = ({  }) => {




  return (
    <div className='bg-jet-black'>
      
      <Hero/>
      <FeaturedProduct/>
      <NewArrivals  />
      <BestSeller/>
    </div>
  )
}

export default Home
