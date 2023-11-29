import React, { useEffect, useState } from 'react';
import { GetProducts } from '../../../services/ProductService';
import Item from '../cart_component/itemCartInterface';
import carrinho from './carrinho.png';
import '../../SharedStyles.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [productsGet, setProductsGet] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(parsedItems);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedItems = localStorage.getItem('items');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        if (parsedItems.length !== items.length) {
          setItems(parsedItems);
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const navigateToLogin = () => {
    navigate('/Login');
  };

  useEffect(() => {
    setCartItemCount(items.length);
  }, [items]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await GetProducts();
      const productsAll = products.map((product) => JSON.stringify(product.name));
      setProductsGet(productsAll);
    }
    fetchProducts();
  }, []);

  const paginasFilter = productsGet.filter((pag) =>
    pag.toLowerCase().includes(search.toLowerCase())
  );

  function iniciarConversa() {
    var numeroTelefone = '553196002286';
    var mensagem = 'Olá! Vim pelo Tronos Solar.';
    var mensagemCodificada = encodeURIComponent(mensagem);
    var linkWhatsApp =
      'https://api.whatsapp.com/send?phone=' +
      numeroTelefone +
      '&text=' +
      mensagemCodificada;
    window.open(linkWhatsApp);
  }

  return (
    <div className='headerContainer'>
      <div className='allCont'>
        <div className='logoCont'>
          <a onClick={() => navigate('/')}>
          <img src={require('../../../assets/images/LOGO TRONOS SOLAR_VARIAÇÃO 2.png')}></img>
          </a>
        </div>
        <div className='buttonsCont'>
          <button onClick={iniciarConversa} className='wppButon'>
            Whatsapp
          </button>
          <button onClick={() => navigate('/administrador')} className='loginButon'>Administrador</button>
        </div>
      </div>
      <div className='subHeaderAllCont'>
        <div className='buttonsContWithoutCart'>
          <div className='subHeaderButtonCont'>
            <a onClick={() => navigate('/')} className='subHeaderButton'>
              Início
            </a>
          </div>
          <div className='subHeaderButtonCont'>
            <a onClick={() => navigate('/produtos?type=kits')} className='subHeaderButton'>
              Produtos
            </a>
          </div>
          <div className='subHeaderButtonCont'>
            <a onClick={() => navigate('/sobre')} className='subHeaderButton'>
              Sobre nós
            </a>
          </div>
          <div className='subHeaderButtonCont'>
            <a onClick={() => navigate('/nosso-trabalho')} className='subHeaderButton'>
              Nosso trabalho
            </a>
          </div>
          <div className='subHeaderButtonCont'>
            <a onClick={() => navigate('/contato')} className='subHeaderButton'>
              Contato
            </a>
          </div>
        </div>
        <div className='subHeaderCarrinhoCont' id='carrinhoCont'>
          <a onClick={() => navigate('/carrinho')}>
            <img className='carrinho' src={carrinho} alt='Carrinho' />
          </a>
          <div className='iconIndicateNumberCart'>
            <p className='numberCart'>{cartItemCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;