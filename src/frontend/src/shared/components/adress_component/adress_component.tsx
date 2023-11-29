import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../SharedStyles.css';
import '../adress_component/adress_component.css';
import { AiOutlineHome } from 'react-icons/ai';
import Address from './address_interface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';

function AddressComponent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [informaçõesFinais, setInformaçõesFinais] = useState<Address[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    cep: '',
    numero: 0,
    rua: '',
    bairro: '',
    cidade: '',
    complemento: '',
    nome: '',
    estado: '',
  });
  const [showFrete, setShowFrete] = useState(false);
  const frete = 150;

  const navigate = useNavigate();
  const navigateToBuy = () => {
    navigate('/produtos?type=kits');
  };
  const navigateToFinaly = () => {
    if (showFrete) {
      const totalPrice = calculateTotalPrice();
      const updatedInformacoesFinais = informaçõesFinais.map((address) => ({
        ...address,
        totalPrice: totalPrice + frete,
      }));
      localStorage.setItem('informaçõesFinais', JSON.stringify(updatedInformacoesFinais));
      navigate('/finalizar-compra');
    } else {
      toast.error('Selecione um endereço para entrega!', { position: toast.POSITION.TOP_RIGHT });
    }
  };
  

  useEffect(() => {
    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const addAddress = () => {
    if (validateFields()) {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
      setShowModal(false);
      toast.success('Endereço adicionado', { position: toast.POSITION.TOP_RIGHT });
    } else {
      toast.error('Preencha todos os campos obrigatórios', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const validateFields = () => {
    const requiredFields = ['cep', 'numero', 'rua', 'bairro', 'cidade', 'nome', 'estado'];
    for (const field of requiredFields) {
      if (!newAddress[field]) {
        return false;
      }
    }
    return true;
  };

  const removeAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    toast.success('Endereço removido', { position: toast.POSITION.TOP_RIGHT });
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewAddress({
      cep: '',
      numero: 0,
      rua: '',
      bairro: '',
      cidade: '',
      complemento: '',
      nome: '',
      estado: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSearchClick = () => {
    if (newAddress.cep.length === 8) {
      fetchAddressByCEP(newAddress.cep);
      setSearchClicked(true);
    }
  };

  const showFreteFunc = (address: Address) => {
    if (addresses.length > 0) {
      const selectedAddress = address; 
      setInformaçõesFinais([selectedAddress]); 
      localStorage.setItem('informaçõesFinais', JSON.stringify([selectedAddress])); 
    }
    setShowFrete(true);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    setNewAddress((prevAddress) => ({ ...prevAddress, cep }));

    if (cep.length < 8) {
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      }));
    }
  };

  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        rua: logradouro || '',
        bairro: bairro || '',
        cidade: localidade || '',
        estado: uf || '',
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const calculateTotalPrice = () => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      const items = JSON.parse(storedItems);
      const totalPrice = items.reduce((sum: number, item: any) => sum + item.finalPrice, 0);
      return totalPrice;
    }
    return 0;
  };

  return (
    <div className="allAdressItemCont">
      <ToastContainer />
      <div className="progressCont">
        <div className="itemProgress">
          <img src={require('../../../assets/images/carrinho.png')} alt="Carrinho" />
          <p>Carrinho</p>
        </div>
        <div className="noCloseImg"></div>
        <div className="itemProgress" id="itemOne">
          <img src={require('../../../assets/images/home.png')} alt="Endereço" />
          <p>Endereço</p>
        </div>
      </div>
      <div className="selectEndAndFreteAllCont">
        <div className="selectEndAllCont">
          <div className="adressTitleCont">
          <AiOutlineHome  style={{ color: '#E98F00', width: '29px', height:'28px', marginRight: '3px'  }} />
            <p>SELECIONE O ENDEREÇO</p>
          </div>
          <div className="selectEndCont">
            <div className="selectEnd">
              {addresses.length === 0 ? (
                <p>NENHUM ENDEREÇO CADASTRADO</p>
              ) : (
                addresses.map((address, index) => (
                  <div className="itemEnd" key={index}>
                    <p>
                      <strong>{address.nome}</strong>
                    </p>
                    <p>
                      {address.rua}, {address.bairro}
                    </p>
                    <p>
                      {address.cep}, {address.cidade} - {address.estado}
                    </p>
                    <p>{address.complemento}</p>
                    <div className="buttonSelectEndCont">
                      <button onClick={() => removeAddress(index)}>Excluir</button>
                      <button onClick={() => showFreteFunc(address)}>Selecionar</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="newEndCont">
            <button className="newEnd" onClick={handleModalOpen}>
              NOVO ENDEREÇO
            </button>
          </div>
        </div>
        <div className="totalyCont">
          <div className="resumeCont">
            <FaSearch />
            <p>RESUMO</p>
          </div>
          <div className="productsValue">
            <p className='titleValue'>Valor dos produtos:</p>
            <p className='valueValue'>R$: {calculateTotalPrice()}</p>
          </div>         
          {showFrete && (
            <div className="freteTotalyValue">
              <p className='titleValue'>Frete:</p>
              <p className='valueValue'>R$: {frete}</p>
            </div>
          )}
          {showFrete && (
          <div className="totalyCreditCont">
            <div className="totalCreditInitialValueCont">
              <p className='titleValue'>Total à prazo:</p>
              <p className='valueValue'>R$: {calculateTotalPrice() + frete}</p>
            </div>
            <div className="valueParcel">
              <p>(Ou em até 8x de {(calculateTotalPrice() + frete)/8} sem juros)</p>
            </div>
          </div>
          )}
          {showFrete && (
          <div className="inCheckTotalyCont">
          <div className="totalCreditInitialValueCont">
              <p className='titleValue'>Valor à vista no pix:</p>
              <p className='valueValue'>R$: {calculateTotalPrice() + frete - (0.07 * calculateTotalPrice())}</p>
            </div>
            <div className="valueParcel">
              <p>(Economize <strong>R${((calculateTotalPrice() + frete) - (calculateTotalPrice() + frete - (0.07 * calculateTotalPrice()))).toFixed(2)}</strong>)</p>
            </div>
          </div>
          )}
          <div className="buttonsToPayCont">
            <button className='goToPay' onClick={navigateToFinaly}>IR PARA PAGAMENTO</button>
            <button onClick={navigateToBuy} className='goToBuy'>CONTINUAR COMPRANDO</button>
          </div>
        </div>
      </div>
      {showFrete && (
        <div className="freteCont">
          <div className="freteIconTitle">
            <FaTruck  style={{ color: '#E98F00', width: '29px', height:'28px'  }} />
            <p>Frete:</p>
          </div>
          <div className="freteInfoCont">
            <div className="spaceNameAndValueFrete">
              <input type="RADIO" checked/><p className='inputText'>Sedex:</p>
              <p className='freteInfoContText'> Até 1 dia útil.</p>
            </div>
            <p className='inputText'>R${frete}</p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Novo Endereço</h3>
            <form>
              <div className="form-group">
                <label>Nome</label>
                <input type="text" name="nome" value={newAddress.nome} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>CEP</label>
                <div className="cep-input-container">
                  <input className="cepInput" type="number" name="cep" value={newAddress.cep} onChange={handleCEPChange} />
                  <div className="search-icon" onClick={handleSearchClick}>
                    <FaSearch />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Número</label>
                <input type="number" name="numero" value={newAddress.numero} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Rua</label>
                <input type="text" name="rua" value={newAddress.rua} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <input type="text" name="bairro" value={newAddress.bairro} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input type="text" name="cidade" value={newAddress.cidade} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input type="text" name="estado" value={newAddress.estado} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input type="text" name="complemento" value={newAddress.complemento} onChange={handleInputChange} />
              </div>
              <div className="modal-buttons">
                <button type="button" className="btn btn-primary" onClick={addAddress}>
                  Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressComponent;
