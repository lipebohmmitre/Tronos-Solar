import './ModalMonteKit.css';
import '../../SharedStyles.css';
import { useState, useEffect } from "react";
import { GetLocationByCep } from '../../../external-services/ViaCep-api';
import { GetStates, State } from '../../../external-services/IBGELocalidades-api';
import { GetBestKit } from '../../../services/KitService';
import { GetEnergyCompaniesByStateCode } from '../../../services/EnergyCompanyService';
import EnergyCompanyDTO from '../../../models/EnergyCompanyDTO';
import InputMask from 'react-input-mask';
import CurrencyInput from '../../../helpers/currencyInputHelper';
import { convertNumberToCurrencyString, convertCurrencyStringToNumber } from '../../../helpers/numberHelper';
import { useNavigate } from 'react-router-dom';
import { GetKitById } from '../../../services/KitService';

const Modal = (props: any) => {
    const navigate = useNavigate();

    const [cep, setCep] = useState('');
    const [billValuePerMonth, setBillValuePerMonth] = useState('');
    const [kwhValuePerMonth, setKwhValuePerMonth] = useState('');
    const [kwhPrice, setKwhPrice] = useState('');
    const [roofType, setRoofType] = useState(-1);
    const [listStates, setListStates] = useState([] as State[]);
    const [selectedState, setSelectedState] = useState({} as State);
    const [city, setCity] = useState('');
    const [listEnergyCompanies, setListEnergyCompanies] = useState([] as EnergyCompanyDTO[]);
    const [selectedEnergyCompany, setSelectedEnergyCompany] = useState({} as EnergyCompanyDTO);
    
    //#region UseEffects
    
    useEffect(() => {
        getLocalStorageInformation();
        updateSelectBoxListStates();
    }, []);

    useEffect(() => {
        updateSelectBoxListEnergyCompanies();

        if(selectedState.uf && selectedState.uf.length == 2)
            localStorage.setItem('state', selectedState.uf);
    }, [selectedState]);

    useEffect(() => {
        if(selectedEnergyCompany && selectedEnergyCompany.code && selectedEnergyCompany.code.length > 0)
            localStorage.setItem('energyCompanyCode', selectedEnergyCompany!.code);

        if(selectedEnergyCompany && selectedEnergyCompany.kwhPrice && selectedEnergyCompany.kwhPrice > 0){
            localStorage.setItem('energyCompanykWhPrice', selectedEnergyCompany.kwhPrice.toString());
            setKwhPrice(selectedEnergyCompany.kwhPrice.toString());
        }
        
    }, [selectedEnergyCompany]);

    useEffect(() => {
        let realCep = cep?.replaceAll('-', '').replaceAll('_', '');

        if(realCep && realCep.length == 8){
            setLocationByCep(realCep);
            localStorage.setItem('cep', realCep)
        }
    }, [cep]);

    useEffect(() => {
        if(billValuePerMonth && billValuePerMonth.length > 0)
            localStorage.setItem('billValuePerMonth', billValuePerMonth)

    }, [billValuePerMonth]);

    useEffect(() => {
        if(kwhValuePerMonth && kwhValuePerMonth.length > 0)
            localStorage.setItem('kwhValuePerMonth', kwhValuePerMonth)
        
    }, [kwhValuePerMonth]);

    useEffect(() => {
        if(kwhPrice && kwhPrice.length > 0)
            localStorage.setItem('kwhPrice', kwhPrice)
        
    }, [kwhPrice]);

    useEffect(() => {
        if(city && city.length > 0)
            localStorage.setItem('city', city)
        
    }, [city]);

    useEffect(() => {
        if(roofType != null && roofType >= 0)
            localStorage.setItem('roofType', roofType.toString())
        
    }, [roofType]);

    //#endregion

    function setSelectedEnergyCompanyHandler(energyCompanyCode: string){
        let energyCompany = listEnergyCompanies.find(x => x.code == energyCompanyCode);

        if(energyCompany)
            setSelectedEnergyCompany(energyCompany);
    }

    function getLocalStorageInformation(){
        let billValuePerMonth = localStorage.getItem('billValuePerMonth');
        let kwhValuePerMonth = localStorage.getItem('kwhValuePerMonth');
        let kwhPrice = localStorage.getItem('kwhPrice');
        let cepValue = localStorage.getItem('cep');
        let energyCompanyCode = localStorage.getItem('energyCompanyCode');
        let city = localStorage.getItem('city');
        let roofType = localStorage.getItem('roofType');
  
        setCep(cepValue ?? '');
        setBillValuePerMonth(billValuePerMonth ?? '');
        setKwhValuePerMonth(kwhValuePerMonth ?? '');
        setSelectedEnergyCompany({code: energyCompanyCode} as EnergyCompanyDTO)
        setKwhPrice(kwhPrice ?? '');
        setCity(city ?? '');
        setRoofType(parseInt(roofType || '-1'));
    };

    async function updateSelectBoxListEnergyCompanies(){
        let companies = await GetEnergyCompaniesByStateCode(selectedState.uf);

        setListEnergyCompanies(companies!);

        //Se houver somente 1 empresa, seleciona ela automaticamente
        if(companies && companies.length == 1)
            setSelectedEnergyCompany(companies[0]);
    }

    async function updateSelectBoxListStates(){
        let states =  await GetStates();

        if(states && states.length > 0)
            setListStates(states);

        let localStorageCep = localStorage.getItem('cep');
        if(localStorageCep) setLocationByCep(localStorageCep);
    };

    async function setLocationByCep(cep: string){
        let location = await GetLocationByCep(cep);

        let uf = location?.uf;
        let city = location?.localidade;

        if(uf && uf.length == 2){
            (document.getElementById('stateSelect') as HTMLInputElement).value = uf ?? '';
            setSelectedState({description: location.localidade, uf: uf });
        }

        if(city && city.length > 0)
            setCity(city);        
    };

    const CloseOutModal = (e:any) => {
        if(e.target.id === "modal")
            props.onClose();
    }

    const [isLoading, setIsLoading] = useState(false);

        function addItemCart(product: any) {
        const storedItems = localStorage.getItem('items');
        const items: any[] = storedItems ? JSON.parse(storedItems) : [];
      
        const newItem = {
          product: product,
          quantity: 1,
          finalPrice: product.price,
        };
      
        const updatedItems = [...items, newItem];
        localStorage.setItem('items', JSON.stringify(updatedItems));     
    }

    function addMultipleItemCart(products: any[]) {
        products.forEach((product) => addItemCart(product));
    }

    async function buyKit(kitId: number) {
        let kit = await GetKitById(kitId);

        if(!kit) return;

        localStorage.setItem('items', '');
        addMultipleItemCart(kit.products);
        navigate('/carrinho');
    }

    async function finishMonteKit(){
        setIsLoading(true);
        
        let bestKit = await GetBestKit();

        console.log(bestKit);

        buyKit(bestKit.id);
    }

    const questionList: any[] = [
        //Pergunta 1
        <div className="containerQuestion">
            <p>Onde pretende realizar a instalação?</p> 

            <label>CEP:</label>
            <InputMask mask='99999-999' id='monteKitCepInput' name='monteKitCepInput' value={cep} type="text" placeholder='00000-000' 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCep(event.target.value)}/>

            <label>Estado:</label>
            <select id="stateSelect" name="stateSelect" value={selectedState.uf} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedState({uf: event.target.value, description: ""})}>
                <option value="">Selecione o Estado...</option>
                {listStates && listStates.length > 0 ? listStates!.map((state) => (                               
                    <option value={state.uf}>{state.description}</option>
                )): <option value="">Nenhum estado encontrado</option>}
            </select>
            <label>Cidade:</label>
            <input type="text" value={city} id="cityInput" name="cityInput" placeholder="Cidade" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}/>
        </div>,

        //Pergunta 2
        //todo: pergunta sobre as telhas
        <div className="containerQuestion">
            <p>Qual o tipo de telhado do local de instalação?</p>

            <div className='roofTopQuestionsContainer'>

                <div className="roofOptionContainer" onClick={() => setRoofType(0)}>
                    <div className={`roofOptionImage ${roofType == 0 ? 'selected' : ''}`}>
                        <img src='https://telhascandelaria.com.br/wp-content/uploads/2019/11/Producao-de-Telhas-de-Ceramica.jpg'></img>
                    </div>
                    <div className="roofOptionDescription">
                        <label>Cerâmica</label>
                    </div>
                </div>

                <div className="roofOptionContainer" onClick={() => setRoofType(1)}>
                    <div className={`roofOptionImage ${roofType == 1 ? 'selected' : ''}`}>
                        <img src='https://imagens-revista-pro.vivadecora.com.br/uploads/2022/04/O-que-%C3%A9-telha-de-fibrocimento-foto-Coberturas-Leves.jpg'></img>
                    </div>
                    <div className="roofOptionDescription">
                        <label>Amianto / Fibrocimento</label>
                    </div>
                </div>

                <div className="roofOptionContainer" onClick={() => setRoofType(2)}>
                    <div className={`roofOptionImage ${roofType == 2 ? 'selected' : ''}`}>
                        <img src='https://metalica.com.br/wp-content/uploads/2019/09/Telhado-de-metal-galvanizado-2.jpg'></img>
                    </div>
                    <div className="roofOptionDescription">
                        <label>Metal</label>
                    </div>
                </div>

            </div>

        </div>,

        //Pergunta 3
        <div className="containerQuestion">
            <p>Qual a média mensal do gasto com energia?</p>

            <label>Valor:</label>
            <CurrencyInput maskOptions={{}} type="text" value={convertNumberToCurrencyString(parseFloat(billValuePerMonth), true)} id="billValuePerMonthInput" name="billValuePerMonthInput" placeholder="R$0,00" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBillValuePerMonth(convertCurrencyStringToNumber(event.target.value).toString())}/>
        </div>,

        //Pergunta 4
        <div className="containerQuestion">
            <p>As próximas perguntas são opcionais, mas nos ajudam e fornecer resultados mais precisos.</p>

            <label>Companhia de Energia:</label>
            <select id="energyCompanySelect" name="energyCompanySelect" value={selectedEnergyCompany.code} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedEnergyCompanyHandler(event.target.value)}>
                <option value="">Selecione a Companhia de Energia...</option>
                {listEnergyCompanies && listEnergyCompanies.length > 0 ? listEnergyCompanies.map((company) => (                               
                    <option value={company.code}>{company.name}</option>
                )) : <option value="">Nenhuma companhia encontrada</option>}
            </select>
            
            <label>Preço do kW/h:</label>
            <CurrencyInput maskOptions={{}} id='monteKitKwhPriceInput' name='monteKitKwhPriceInput' value={convertNumberToCurrencyString(parseFloat(kwhPrice), true)} type="text" placeholder='R$0,00' 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKwhPrice(convertCurrencyStringToNumber(event.target.value).toString())}/>

            <label>Consumo médio mensal em kW/h:</label>
            <input id='monteKitKwhValuePerMonthInput' name='monteKitKwhValuePerMonthInput' value={kwhValuePerMonth} type="number" placeholder='0000' 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKwhValuePerMonth(event.target.value)}/>

        </div>,
    ];

    const [questionOrder, setQuestionOrder] = useState(0);

    const nextQuestion = () => {
        let tamanhoVetor = questionList.length - 1;

        if(questionOrder < tamanhoVetor)
            setQuestionOrder(questionOrder + 1);
    }
    const previousQuestion = () => {
        if(questionOrder > 0)
            setQuestionOrder(questionOrder - 1);
    }

    return (    
        <div className="monteKitModalOutside" onClick={ CloseOutModal }>
            <div className="monteKitModalInside">
                <button className="closeButtonMonteKitModal" onClick={ props.onClose } />
                <div>
                    {questionList[questionOrder]}
                </div>
                <div>
                    {isLoading && <h1>Carregando...</h1> }
                </div>
                <div className="monteKitModalButtonsContainer">    
                    <div className='leftButtonContainer'>
                        {questionOrder > 0 && 
                            <button className="ButtonDark Small" onClick={previousQuestion}>Anterior</button>
                        }
                    </div>                
                    <div className='rightButtonContainer'>
                        {questionOrder < (questionList.length - 1) &&
                            <button className="ButtonLight Small" onClick={nextQuestion}>Proxímo</button>
                        }

                        {questionOrder == (questionList.length - 1) &&
                            <button className="ButtonGradient Small" onClick={finishMonteKit}>Finalizar</button>
                        }                 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;