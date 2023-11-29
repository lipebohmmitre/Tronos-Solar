import React from "react";
import './FinalyPurchaseComponent.css'
import { AiOutlineHome, AiOutlineShopping } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function FinalyPurchaseComponent() {
  const items = localStorage.getItem("items");
  const parsedItems = items ? JSON.parse(items) : [];
  const informaçõesFinais = localStorage.getItem("informaçõesFinais");
  const parsedInformaçõesFinais = informaçõesFinais ? JSON.parse(informaçõesFinais) : [];
  const navigate = useNavigate();
  const navigateToIndex = () => {
    navigate('/');
  };
  function iniciarConversa() {
    var numeroTelefone = "553196002286";
    var mensagem = `Olá, finalizei um pedido na Tronos Solar.
    Informações do Pedido:
        
    - Produtos:
    ${parsedItems.map((item : any, index : any) => `
      Produto ${index + 1}:
      Nome: ${item.product.name}
      Descrição: ${item.product.description}
      Preço: R$ ${item.finalPrice}
      Quantidade: ${item.quantity}
    `).join('\n')}
    
    - Endereço:
    ${parsedInformaçõesFinais.map((item : any) => `
      Nome: ${item.nome}
      Rua: ${item.rua}, ${item.bairro} - ${item.numero}.
      Cidade: ${item.cidade}, ${item.estado}.
      CEP: ${item.cep}
    `).join('\n')}
    
    Valor Total: R$ ${parsedInformaçõesFinais[0].totalPrice}`;
    var mensagemCodificada = encodeURIComponent(mensagem);
    var linkWhatsApp = "https://api.whatsapp.com/send?phone=" + numeroTelefone + "&text=" + mensagemCodificada;
    toast.success('Compra Finalizada', { position: toast.POSITION.TOP_RIGHT });
    setTimeout(function() {
      window.open(linkWhatsApp);
      localStorage.removeItem('items');
      localStorage.removeItem('informaçõesFinais');
      navigateToIndex();
    }, 1000);
  }

  function redirectToGmail() {
    const emailSubject = 'Compra Tronos Solar';
    const emailBody = `Informações do Pedido:
        
    - Produtos:
    ${parsedItems.map((item : any, index : any) => `
      Produto ${index + 1}:
      Nome: ${item.product.name}
      Descrição: ${item.product.description}
      Preço: R$ ${item.finalPrice}
      Quantidade: ${item.quantity}
    `).join('\n')}

    - Endereço:
    ${parsedInformaçõesFinais.map((item : any) => `
      Nome: ${item.nome}
      Rua: ${item.rua}, ${item.bairro} - ${item.numero}.
      Cidade: ${item.cidade}, ${item.estado}.
      CEP: ${item.cep}
    `).join('\n')}

    Valor Total: R$ ${parsedInformaçõesFinais[0].totalPrice}`;
    const recipientEmail = 'solar@tronossolar.com.br';
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    toast.success('Compra Finalizada', { position: toast.POSITION.TOP_RIGHT });
    setTimeout(function() {
      window.location.href = mailtoLink;
      localStorage.removeItem('items');
      localStorage.removeItem('informaçõesFinais');
      navigateToIndex()
    }, 1000);
  }

  return (
    <div className="PageContentContainer">
      <ToastContainer />
      <h1 className="titleResume">Resumo do pedido</h1>
      <div className="finalyCont">
        <div className="productInfoCont">
          <div className="iconTitle">
            <AiOutlineShopping style={{ color: '#E98F00', width: '29px', height: '28px', marginRight: '3px' }} />
            <h2 className="subTitleResume">Produtos</h2>
          </div>
          {parsedItems.map((item : any, index : any) => (
            <div key={index} className="productItem">
              <h3>{index + 1} - {item.product.name}</h3>
              <p>{item.product.description}</p>
              <p><strong>R$</strong> {item.finalPrice}</p>
              <p><strong>Quantidade:</strong> {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="adressInfoCont">
          <div className="iconTitle">
            <AiOutlineHome style={{ color: '#E98F00', width: '29px', height: '28px', marginRight: '3px' }} />
            <h2 className="subTitleResume">Endereço</h2>
          </div>
          {parsedInformaçõesFinais.map((item : any, index : any) => (
            <div className="adressAndFinalyCont">
              <div key={index} className="productItem">
                <h3>{item.nome}</h3>
                <p>{item.rua}, {item.bairro} - {item.numero}.</p>
                <p>{item.cidade}, {item.estado}.</p>
                <p>{item.cep}</p>
              </div>
              <div className="paymentFinalyCont">
                <p><strong>Valor Total:</strong> R${item.totalPrice}</p>
                <div className="buttosSendCont">
                <button className="finalizarCompraButton" onClick={redirectToGmail}>Finalizar Compra E-mail</button>
                <button className="finalizarCompraButton" onClick={iniciarConversa}>Finalizar Compra Whatsapp</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FinalyPurchaseComponent;
