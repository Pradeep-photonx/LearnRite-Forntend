import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Home from "./pages/home/Home";
import Schools from "./pages/schools/Schools";
import SchoolClasses from "./pages/schools/SchoolClasses";
import BundleDetails from "./pages/schools/BundleDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import ProductListing from "./pages/categories/ProductListing";
import ProductDetails from "./pages/categories/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./layouts/Layout";



import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/home" replace />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/schools/:schoolSlug" element={<SchoolClasses />} />
              <Route path="/schools/:schoolSlug/:classSlug" element={<BundleDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<ProductListing />} />
              <Route path="/categories/:productSlug" element={<ProductDetails />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
