import React, { useEffect, useState } from 'react';
import Item from '../cart_component/itemCartInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetImage } from '../../../services/ImageService';
import ImageDTO from './../../../models/ImageDTO';
import '../../SharedStyles.css';
import '../cart_component/cartComponent.css';

type CartComponentProps = {
  onNext: () => void;
};

function CartComponent({ onNext }: CartComponentProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [number, setNumber] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [images, setImages] = useState([] as ImageDTO[]);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(parsedItems);
    }
  }, []);

  const updateLocalStorageItems = (updatedItems: Item[]) => {
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  useEffect(() => {
    getImages();
  }, [items]);

  function getCachedImage(entityId: number) {
    return images.find((image) => image.entityId === entityId)?.imageUrl ?? null;
  }

  async function getImages() {
    let images = [] as ImageDTO[];

    for (const item of items) {
      let imageUrl = await GetImage(item.product.id, 0);

      if (imageUrl) {
        images.push({ entityId: item.product.id, entityType: 0, imageUrl: imageUrl });
      }
    }

    setImages(images);
  }

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowDescription(true);
  };

  const deleteItemClick = (item: Item) => {
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    if (updatedItems.length === 0) {
      setShowDescription(false);
      setSelectedItem(null);
    }
    toast.success('Produto removido do carrinho', { position: toast.POSITION.TOP_RIGHT });
    if (updatedItems.length === 0) {
      window.location.reload();
    }
  };

  const handlePlusClick = (item: Item) => {
    const updatedItems = items.map((i) => {
      if (i === item) {
        const newQuantity = i.quantity + 1;
        const newFinalPrice = i.finalPrice + i.product.price;
        return { ...i, quantity: newQuantity, finalPrice: newFinalPrice };
      }
      return i;
    });
    setItems(updatedItems);
  };

  const handleLessClick = (item: Item) => {
    if (item.quantity === 0) {
      return; // Não executa a função quando o valor for 0
    }

    const updatedItems = items.map((i) => {
      if (i === item) {
        const newQuantity = i.quantity - 1;
        const newFinalPrice = i.finalPrice - i.product.price;
        return { ...i, quantity: newQuantity, finalPrice: newFinalPrice };
      }
      return i;
    });

    updateLocalStorageItems(updatedItems);
  };

  const handleNextClick = () => {
    const updatedItems = items.map((item) => {
      const newFinalPrice = item.product.price * item.quantity;
      return { ...item, finalPrice: newFinalPrice };
    });

    updateLocalStorageItems(updatedItems);
    onNext();
  };

  return (
    <div className="allCartComponentCont">
      <ToastContainer />
      <div className="allCartCont PageContentContainer">
        <div className="progressCont">
          <div className="itemProgress" id="itemOne">
            <img src={require('../../../assets/images/carrinho.png')} alt="Carrinho" />
            <p>Carrinho</p>
          </div>
          <div className="noCloseImg"></div>
          <div className="itemProgress">
            <img src={require('../../../assets/images/home.png')} alt="Endereço" />
            <p>Endereço</p>
          </div>
        </div>
        <div className="productsCartCont">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="cartItensCont" key={index}>
                <div className="ProductImgContainerCart" onClick={() => handleItemClick(item)}>
                  {getCachedImage(item.product.id) && (
                    <img src={getCachedImage(item.product.id)!} alt={item.product.name} />
                  )}
                  {!getCachedImage(item.product.id) && (
                    <img src={require('../../../assets/images/semImagem.jpg')} alt={item.product.name} />
                  )}
                </div>
                <div className="infoContProduct">
                  <div className="deleteIconCont">
                    <h3 className="qntCont" onClick={() => handleItemClick(item)}>
                      {item.product.name}
                    </h3>
                    <img
                      onClick={() => deleteItemClick(item)}
                      className="deleteIcon"
                      src={require('./delete.png')}
                      alt="Delete"
                    />
                  </div>
                  <div className="deireitaDetailsCont">
                    <p>
                      <strong>Qty:</strong>
                    </p>
                    <div id="bntDireita" className="btnLess" onClick={() => handleLessClick(item)}>
                      {' '}
                      -{' '}
                    </div>
                    <p id="bntDireita" className="qtdTxt">
                      {item.quantity}
                    </p>
                    <div id="bntDireita" className="btnPlus" onClick={() => handlePlusClick(item)}>
                      {' '}
                      +{' '}
                    </div>
                    <p className="priceTxt" id="subDescTxt">
                      <strong>Preço: R${item.finalPrice}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="noItemCart">Nenhum item no carrinho</p>
          )}
        </div>
        <div className="productsCartDescCont">
          {showDescription && selectedItem && (
            <div className="productDescription">
              <div className="descTitleCont">
                <p className="descTitle">Descrição do Produto:</p>
              </div>
              <p className="descCont">{selectedItem.product.description}</p>
            </div>
          )}
        </div>
        <div className="buttonsNextCont">
        {items.length > 0 && (
          <button className="btnCart" onClick={handleNextClick}>
            Avançar
          </button>
        )}
      </div>
      </div>
    </div>
  );
}

export default CartComponent;
