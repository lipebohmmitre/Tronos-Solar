import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Main from '../src/pages/main/Main';
import Login from './pages/Login/Login';
import OurJobScreen from './pages/OurJob/OurJobPage';
import ProductsPage from './pages/Products/ProductsPage';
import ContactPage from './pages/Contact/ContactPage';
import Details from './pages/Detais/details';
import cartPage from './pages/Cart/cartPage';
import AboutPage from './pages/About/AboutPage';
import CalculationInformation from './pages/CalculatorInformation/CalculationInformation';
import AdminPage from './pages/Admin/AdminPage';
import FinalyPurchase from './pages/FinalyPurchase/FinalyPurchase';

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Router>
          <ScrollToTop />
          <Routes>
            <Route path='/carrinho' Component={cartPage}/>
            <Route path="/" Component={Main} />
            <Route path="/Login" Component={Login} />
            <Route path='/nosso-trabalho' Component={OurJobScreen}/>
            <Route path='/sobre' Component={AboutPage}/>
            <Route path='/produtos' Component={ProductsPage}/>
            <Route path='/contato' Component={ContactPage}/>
            <Route path='/detalhes' Component={Details}/>
            <Route path='/administrador' Component={AdminPage}/>
            <Route path='/calculadora' Component={CalculationInformation}/>
            <Route path="/finalizar-compra" Component={FinalyPurchase} />
          </Routes>
      </Router>
    </div>
  );
}


export default App;
