import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import "./App.css";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import Products from "./Components/Products";
import Shop from "./Components/Shop";
import Contact from "./Components/Contact";
import About from "./Components/About";
import ProductDetails from "./Components/ProductDetails";
import AllProducts from "./Components/AllProducts";
import Wishlist from "./Components/Wishlist";
import ViewCartComponent from "./Components/ViewCartComponent";
import { AuthProvider } from "./Components/AuthService/AuthContext";
import { GetRequest } from "./ApiRequests";
import { setProducts } from "./store/productsSlice";

const AppContent = () => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [searchResults, setSearchResults] = useState([]); // ✅ Search functionality

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetRequest('products');
        dispatch(setProducts(data));
        setSearchResults(data); // ✅ Initialize searchResults with full product list
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar setSearchResults={setSearchResults} wishlistCount={wishlist.length} /> {/* ✅ Fixed */}
          <Routes>
            <Route path="/" element={<Home wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/products" element={<Products products={searchResults} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/shop" element={<Shop wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/all-products" element={<AllProducts wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/cart" element={<ViewCartComponent />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
