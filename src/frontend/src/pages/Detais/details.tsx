import React, { useState, useEffect } from 'react';
import Header from './../../shared/components/header_component/Header';
import Footer from './../../shared/components/footer_component/Footer';
import './details.css';
import { GetProductsById } from '../../services/ProductService';
import ProductDTO from './../../models/ProductDTO';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetImage } from '../../services/ImageService';
import ImageDTO from './../../models/ImageDTO';
import Breadcumb from '../../shared/components/breadcrumb_component/Breadcumb';
import BreadcumbModel from '../../shared/models/BreadcumbModel';

function Details() {
  const [number, setNumber] = useState(1);
  const [priceFinal, setPriceFinal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<ProductDTO[]>([]);
  const [images, setImages] = useState([] as ImageDTO[]);

  useEffect(() => {
    const selectedProductIdJSON = localStorage.getItem('selectedProductId');
    if (selectedProductIdJSON) {
      const selectedProductId = JSON.parse(selectedProductIdJSON).toString();
      fetchProductById(selectedProductId);
    }
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      if (number === 0) {
        setPriceFinal(selectedProduct.price);
      } else {
        setPriceFinal(selectedProduct.price * number);
      }
    }

    getImages();
  }, [selectedProduct, number]);

function getCachedImage(product: ProductDTO | null){
      let id = 0;

      if(product! && product!.id){
        id = product!.id;
      }

      return images.find(image => image.entityId === id)?.imageUrl ?? null;
  }
  
  async function getImages(){
      let images = [] as ImageDTO[];

      if(selectedProduct && selectedProduct.id){
        let imageUrl = await GetImage(selectedProduct.id, 0);

        if(imageUrl){
            images.push({entityId: selectedProduct.id, entityType: 0, imageUrl: imageUrl});
            setImages(images);
        }
      }
  }

  function numberPlus() {
    setNumber(number + 1);
  }

  function numberLess() {
    setNumber(Math.max(number - 1, 0));
  }

  async function fetchProductById(id: string) {
    try {
      const fetchedProducts = await GetProductsById(parseInt(id));
      if (fetchedProducts) {
        setFetchedProducts(fetchedProducts);
        setSelectedProductFunc(fetchedProducts)
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch Product from API TronosSolar");
    }
  }
  function addItemCart(product: any) {
    const storedItems = localStorage.getItem('items');
    const items: any[] = storedItems ? JSON.parse(storedItems) : [];
    const isItemRepeated = items.some((item: any) => item.product.id === product.id);
  
    if (isItemRepeated) {
      toast.error('Produto já adicionado', { position: toast.POSITION.TOP_RIGHT });
      return;
    }
    const newItem = {
      product: product,
      quantity: number,
      finalPrice: priceFinal,
    };
    const updatedItems = [...items, newItem];
    localStorage.setItem('items', JSON.stringify(updatedItems));
    toast.success('Produto adicionado ao carrinho', { position: toast.POSITION.TOP_RIGHT });
  }

  function setSelectedProductFunc(teste: any) {
    setSelectedProduct(teste);
  }

  let breadcumbModelList: BreadcumbModel[] = [
      new BreadcumbModel('Início','/'),
      new BreadcumbModel('Produtos','/produtosFake?type=products'),
      new BreadcumbModel('Detalhes do produto','/detalhes'),    
  ];

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className='PageContentContainer'>
        <Breadcumb breadcumbModelList={breadcumbModelList} />
        <div id="centralDetails">
          <div id="esquerdaDetails" className='ProductImgContainerDetails'>
            {getCachedImage(selectedProduct) && (<img src={getCachedImage(selectedProduct)!} />)}
            {!getCachedImage(selectedProduct) && (<img src={require('../../assets/images/semImagem.jpg')} />)}
          </div>
          <div id='direitaDetails'>
            {selectedProduct && (
              <>
                <h3 className='qntCont'>{selectedProduct.name}</h3>
                <div className="deireitaDetailsCont">
                  <p><strong>Qty:</strong></p>
                  <div onClick={numberLess} id='bntDireita' className="btnLess"> - </div>
                  <p id='bntDireita' className="qtdTxt">{number}</p>
                  <div onClick={numberPlus} id='bntDireita' className="btnPlus"> + </div>
                  <p className='priceTxt' id='subDescTxt'><strong>Preço: R${priceFinal}</strong></p>
                </div>
                <div className='buttonsDetailsCont'>
                  <button onClick={() => addItemCart(selectedProduct)} className='btnCart'> Colocar item no carrinho</button>
                  <h4 className='btnMontaKit'> Monte seu kit </h4>
                </div>
              </>
            )}
          </div>
        </div>
        <div id='descriptionDetais'>
          {selectedProduct && (
            <>
              <h3 className='descriptionTxt'>Descrição</h3>
              <p id='subDescTxt'>{selectedProduct.description}</p>
              <br />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;