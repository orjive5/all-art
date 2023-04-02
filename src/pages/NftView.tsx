import Header from "../components/Header";
import NftDetails from "../components/NftDetails";
import Sidebar from "../components/Sidebar";
import '../styles/_nftView.scss';

const NftView = () => {
  return (
    <div className="nftView">
      <Header />
      <Sidebar />
      <NftDetails />
    </div>
  )
}

export default NftView;