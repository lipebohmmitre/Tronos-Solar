import React, { useState } from 'react';
import '../Cart/cartPage.css';
import Header from '../../shared/components/header_component/Header';
import Footer from '../../shared/components/footer_component/Footer';
import CartComponent from '../../shared/components/cart_component/cartComponent';
import AdressComponent from '../../shared/components/adress_component/adress_component';

function CartPage() {
  const [displayStyle, setDisplayStyle] = useState('flex');
  const [displayStyleNone, setDisplayStyleNone] = useState('none');
  const handleNext = () => {
    setDisplayStyle('none');
    setDisplayStyleNone('flex');
  };
     
  return (
    <div>
      <Header />
      <div style={{ display: displayStyle }}>
        <CartComponent onNext={handleNext} />
      </div>
      <div className='adressPageCont' style={{ display: displayStyleNone }}>
        <AdressComponent />
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;