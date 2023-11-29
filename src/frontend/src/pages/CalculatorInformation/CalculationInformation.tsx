import './CalculationInformation.css';
import '../../shared/SharedStyles.css';
import { useState } from 'react';
import ValidationInputs from './ValidationInputs';
import { CalculateCost } from '../../services/apiConsultaCEP/CalculatorService';
import { useEffect } from 'react';
import Header from './../../shared/components/header_component/Header';
import Footer from './../../shared/components/footer_component/Footer';
import Breadcumb from '../../shared/components/breadcrumb_component/Breadcumb';
import BreadcumbModel from '../../shared/models/BreadcumbModel';
import { GetLocationByCep } from '../../external-services/ViaCep-api';
import { GetStates, State } from '../../external-services/IBGELocalidades-api';
import { GetEnergyCompaniesByStateCode } from '../../services/EnergyCompanyService';
import EnergyCompanyDTO from '../../models/EnergyCompanyDTO';
import InputMask from 'react-input-mask';
import CurrencyInput from '../../helpers/currencyInputHelper';
import { convertNumberToCurrencyString, convertCurrencyStringToNumber } from '../../helpers/numberHelper';
import { GetBestKit } from '../../services/KitService';

function CalculationInformation(){
    const [cep, setCep] = useState('');
    const [billValuePerMonth, setBillValuePerMonth] = useState('');
    const [kwhValuePerMonth, setKwhValuePerMonth] = useState('');
    const [kwhPrice, setKwhPrice] = useState('');
    const [listStates, setListStates] = useState([] as State[]);
    const [selectedState, setSelectedState] = useState({} as State);
    const [listEnergyCompanies, setListEnergyCompanies] = useState([] as EnergyCompanyDTO[]);
    const [selectedEnergyCompany, setSelectedEnergyCompany] = useState({} as EnergyCompanyDTO);

    const[errorMessage, setErrorMessage] = useState('');
    const[resultMessage, setResultMessage] = useState('');

    async function calculate(){
        setErrorMessage('');
        setResultMessage('');

        let validation = validateInputsForCalculation();

        if(!validation || !validation.success){
            setErrorMessage(validation!.message)
            return;
        }

        let bestKit = await GetBestKit();
        let monthsToPay = Math.ceil(bestKit.price / parseFloat(billValuePerMonth)).toFixed(0);
        let moneySavedIn30Years = (parseFloat(billValuePerMonth) * 12 * 30) - bestKit.price;


        const savePercentage = bestKit.potencialSavePercentage > 100 ? 100 : bestKit.potencialSavePercentage.toFixed(2);

        setResultMessage(`Você pode economizar até ${savePercentage}% da sua conta de energia, com um investimento de ${convertNumberToCurrencyString(bestKit.price, true)}. O investimento se pagará em ${monthsToPay} meses, e em 30 anos você terá economizado ${convertNumberToCurrencyString(moneySavedIn30Years, true)}`);
    }

    function validateInputsForCalculation(){
        let billValuePerMonthExists = billValuePerMonth != null && billValuePerMonth != undefined && billValuePerMonth.length > 0 && parseFloat(billValuePerMonth) > 0;
        let kwhPriceExists = kwhPrice && parseFloat(kwhPrice) > 0;
        let selectedStateExists = selectedState && selectedState.uf && selectedState.uf.length == 2;
        let selectedEnergyCompanyExists = selectedEnergyCompany && selectedEnergyCompany.code && selectedEnergyCompany.code.length > 0;

        if(!billValuePerMonthExists)
            return {success: false, message: 'Digite o valor da conta de luz'};

        if(!kwhPriceExists && !selectedStateExists)
            return {success: false, message: 'Selecione um estado'};

        if(!kwhPriceExists &&!selectedEnergyCompanyExists)
            return {success: false, message: 'Selecione uma empresa'};
        
        if(!kwhPriceExists)
            return {success: false, message: 'Digite o preço do kW/h'};      

        return {success: true, message: ''};
    }
   

    async function updateSelectBoxListStates(){
        let states =  await GetStates();

        if(states && states.length > 0)
            setListStates(states);

        let localStorageCep = localStorage.getItem('cep');
        if(localStorageCep) setStateByCep(localStorageCep);
    }

    async function updateSelectBoxListEnergyCompanies(){
        let companies = await GetEnergyCompaniesByStateCode(selectedState.uf);

        setListEnergyCompanies(companies!);

        //Se houver somente 1 empresa, seleciona ela automaticamente
        if(companies && companies.length == 1)
            setSelectedEnergyCompany(companies[0]);
    }

    function setSelectedEnergyCompanyHandler(energyCompanyCode: string){
        let energyCompany = listEnergyCompanies.find(x => x.code == energyCompanyCode);

        if(energyCompany)
            setSelectedEnergyCompany(energyCompany);
    }

    function getLocalStorageInformation(){
        let cepValue = localStorage.getItem('cep');
        let billValuePerMonth = localStorage.getItem('billValuePerMonth');
        let kwhValuePerMonth = localStorage.getItem('kwhValuePerMonth');
        let kwhPrice = localStorage.getItem('kwhPrice');
        let energyCompanyCode = localStorage.getItem('energyCompanyCode');
  
        setCep(cepValue ?? '');
        setBillValuePerMonth(billValuePerMonth ?? '');
        setKwhValuePerMonth(kwhValuePerMonth?? '');
        setKwhPrice(kwhPrice?? '');
        setSelectedEnergyCompany({code: energyCompanyCode} as EnergyCompanyDTO)
    };

    async function setStateByCep(cep: string){
        let location = await GetLocationByCep(cep);

        let uf = location?.uf;

        if(uf && uf.length == 2){
            (document.getElementById('stateSelect') as HTMLInputElement).value = uf ?? '';
            setSelectedState({description: location.localidade, uf: uf });
        }
    }

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
            setStateByCep(realCep);
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

    let breadcumbModelList: BreadcumbModel[] = [
        new BreadcumbModel('Início','/'),
        new BreadcumbModel('Calculadora','/calculadora'), 
    ];

    return(      
        <div>
            <Header />
            <div className='PageContentContainer'>
                <Breadcumb breadcumbModelList={breadcumbModelList} />
                <div className='CalculatorContainer'>                
                    <p className='TitleWithBorderBottom'>Calculadora de Energia</p>
                    <div className='CalculatorForm'>
                        <div className='CalculatorInputs'>
                            <label>CEP:</label>
                            <InputMask mask='99999-999' id='calculatorCepInput' name='calculatorCepInput' value={cep} type="text" placeholder='00000-000' 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCep(event.target.value)}/>

                            <label>Estado:</label>
                            <select id="stateSelect" name="stateSelect" value={selectedState.uf} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedState({uf: event.target.value, description: ""})}>
                                <option value="">Selecione o Estado...</option>
                                {listStates && listStates.length > 0 ? listStates!.map((state) => (                               
                                    <option value={state.uf}>{state.description}</option>
                                )): <option value="">Nenhum estado encontrado</option>}
                            </select>
                            <label>Companhia de Energia:</label>
                            <select id="energyCompanySelect" name="energyCompanySelect" value={selectedEnergyCompany.code} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedEnergyCompanyHandler(event.target.value)}>
                                <option value="">Selecione a Companhia de Energia...</option>
                                {listEnergyCompanies && listEnergyCompanies.length > 0 ? listEnergyCompanies.map((company) => (                               
                                    <option value={company.code}>{company.name}</option>
                                )) : <option value="">Nenhuma companhia encontrada</option>}
                            </select>
                        </div>
                        <div className='CalculatorInputs'>
                            <label>Preço do kW/h:</label>
                            <CurrencyInput maskOptions={{}} id='calculatorKwhPriceInput' name='calculatorKwhPriceInput' value={convertNumberToCurrencyString(parseFloat(kwhPrice) , true)} type="text" placeholder='R$0,00' 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKwhPrice(convertCurrencyStringToNumber(event.target.value).toString())}/>

                            <label>Valor médio da sua conta de energia:</label>
                            <CurrencyInput maskOptions={{}} id='calculatorBillValuePerMonthInput' name='calculatorBillValuePerMonthInput' value={convertNumberToCurrencyString(parseFloat(billValuePerMonth), true)} type="text" placeholder='R$0,00' 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBillValuePerMonth(convertCurrencyStringToNumber(event.target.value).toString())}/>

                            <label>Consumo médio mensal em kW/h:</label>
                            <input id='calculatorKwhValuePerMonthInput' name='calculatorKwhValuePerMonthInput' value={kwhValuePerMonth} type="number" placeholder='0000' 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKwhValuePerMonth(event.target.value)}/>

                        </div>
                        <div className='CalculatorButtonCalculateContainer'>
                                <button className='ButtonGradient' onClick={calculate}>Calcular</button>
                        </div>
                        {errorMessage && errorMessage.length > 0 && 
                            <div className='CalculatorValidationMessagesContainer'>
                                <label>{errorMessage}</label>
                            </div>
                        }
                        {resultMessage && resultMessage.length > 0 &&
                            <div className='CalculatorResultsContainer'>
                                <label>{resultMessage}</label>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CalculationInformation;