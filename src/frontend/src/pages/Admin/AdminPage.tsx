import './AdminPage.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import KitView from './views/KitView';
import CategoryView from './views/CategoryView';
import ProductView from './views/ProductView';
import EnergyCompanyView from './views/EnergyCompanyView';
import { theTrueOrFalseLogin } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';

function AdminPage() {

  const [selectedView, setSelectedView] = useState('kitView');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 


  async function ValidationLogin() {
  
    let isAuthenticated = await theTrueOrFalseLogin();
    setIsAuthenticated(isAuthenticated);

    if(!isAuthenticated){
      window.location.href = '/login';
    }
  }

  
  useLayoutEffect ( () => {
    ValidationLogin();
  })


  return (
    <div>
      {isAuthenticated && (
      <div>
        <div className="AdminHeader">
          <div className='LogoContainer'>
            <img src={require('../../assets/images/LOGO TRONOS SOLAR_VARIAÇÃO 3.png')} onClick={() => navigate('/')}></img>
          </div>
        </div>
        <div className="AdminMain">
          <div className="AdminSideMenu">
            <p className={selectedView === 'kitView' ? 'Selected' : ''} onClick={() => setSelectedView('kitView')}>Kits</p>
            <p className={selectedView === 'productView' ? 'Selected' : ''} onClick={() => setSelectedView('productView')}>Produtos</p>
            <p className={selectedView === 'categoryView' ? 'Selected' : ''} onClick={() => setSelectedView('categoryView')}>Categorias</p>
            <p className={selectedView === 'energyCompanyView' ? 'Selected' : ''} onClick={() => setSelectedView('energyCompanyView')}>Companhias de Energia</p>         
          </div>
          <div className="AdminContent">
            {selectedView === 'kitView' && <KitView />}
            {selectedView === 'productView' && <ProductView />}
            {selectedView === 'categoryView' && <CategoryView />}
            {selectedView === 'energyCompanyView' && <EnergyCompanyView />}
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default AdminPage;