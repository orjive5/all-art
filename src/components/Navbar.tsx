import { useNavigate } from 'react-router-dom';
import { ReactComponent as SolSeaBanner } from '../assets/solSeaBanner.svg';
import '../styles/_navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
    const handleNavigate = () => navigate('/');
  return (
    <div className='navbar'>
      <SolSeaBanner onClick={handleNavigate} className='solSeaBanner' />
    </div>
  )
}

export default Navbar;