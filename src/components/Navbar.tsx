import { useNavigate } from 'react-router-dom';
import { ReactComponent as SolSeaBanner } from '../assets/solSeaBanner.svg';
import '../styles/_navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <SolSeaBanner className='solSeaBanner' />
    </div>
  )
}

export default Navbar;