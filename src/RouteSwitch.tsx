import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import NftView from "./pages/NftView";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/:Mint" element={<NftView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;