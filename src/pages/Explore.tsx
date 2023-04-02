import Header from "../components/Header";
import NftGrid from "../components/NftGrid";
import Sidebar from "../components/Sidebar";
import '../styles/_explore.scss';

const Explore = () => {
  return (
    <div className="explore">
      <Header />
      <Sidebar />
      <NftGrid />
    </div>
  )
}

export default Explore;