import Banner from './Banner'
import Navbar from './Navbar'
import '../styles/_header.scss'

const Header = () => {
  return (
    <div className='header'>
        <Banner />
        <Navbar />
    </div>
  )
}

export default Header