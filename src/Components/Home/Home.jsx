import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Companylist from './Companylist'
import Hero1 from './Hero1'
import Hero2 from './Hero2'

const Home = () => {
  return (
    <div>
      {/* header */}
      <Header/>
      {/* satic component 1 */}
      <Hero1/>
      {/* static component 2 */}
      <Companylist/>
      
      <Hero2/>
      {/* footer */}
      <Footer/>
    </div>
  )
}

export default Home
