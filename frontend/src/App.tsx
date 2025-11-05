import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import CertifiedProducts from "./pages/CertifiedProducts";
import UnCertifiedProducts from "./pages/UnCertifiedProducts";
import MyProducts from "./pages/MyProducts";




export default function App() {
  return (
    <>

      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route index path="/certified" element={<CertifiedProducts />} />
            <Route index path="/uncertified" element={<UnCertifiedProducts />} />
            <Route index path="/my-products" element={<MyProducts />} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/blank" element={<Blank />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>

      </Router>
    </>
  );
}
