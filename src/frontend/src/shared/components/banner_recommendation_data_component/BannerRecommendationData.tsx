import '../../SharedStyles.css'
import './BannerRecommendationData.css';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import CurrencyInput from '../../../helpers/currencyInputHelper';
import { convertNumberToCurrencyString, convertCurrencyStringToNumber } from '../../../helpers/numberHelper';

function BannerRecommendationData(){

    const [hasBothData, setHasBothData] = useState(false);
    const [cep, setCep] = useState('');

    function getLocalStorageInformation(){
        let cep = localStorage.getItem('cep');
        let billValuePerMonthLocalStorage = localStorage.getItem('billValuePerMonth');
        let billValuePerMonth = convertNumberToCurrencyString(parseFloat(billValuePerMonthLocalStorage || '0')).toString();

        if(cep && billValuePerMonthLocalStorage && !isNaN(parseFloat(billValuePerMonthLocalStorage))){
            (document.getElementsByClassName('BannerContainer')  as HTMLCollectionOf<HTMLElement>)[0]!.style.display = 'none';
            setHasBothData(true);
        }
        else{
            (document.getElementsByClassName('BannerContainer')  as HTMLCollectionOf<HTMLElement>)[0]!.style.display = 'block';
            setHasBothData(false);
        }
        
        let formatedCep = cep?.substring(0, 5) + '-' + cep?.substring(5, 8);

        setCep(cep || '');

        (document.getElementById('bannerCepInput') as HTMLInputElement).value = formatedCep;
        (document.getElementById('bannerBillValuePerMonthInput') as HTMLInputElement).value = billValuePerMonth;
    };

    function setInformation(){
        let cep = (document.getElementById('bannerCepInput') as HTMLInputElement).value?.replaceAll('-', '').replaceAll('_', '');
        setCep(cep);
        
        let billValuePerMonth = convertCurrencyStringToNumber((document.getElementById('bannerBillValuePerMonthInput') as HTMLInputElement).value).toString();

        if(cep.length == 8) localStorage.setItem('cep', cep);
        if(billValuePerMonth.length > 1) localStorage.setItem('billValuePerMonth', billValuePerMonth);
    }

    useEffect(() => {
        getLocalStorageInformation();
    }, []);

    return(
        <div>
        {!hasBothData && (
            <div className='BannerContainer'>
                <div className='BannerTextContainer'>
                    <p className='Text Small'>Podemos oferecer recomendações personalizadas sabendo seu CEP e gasto mensal em energia! Não se preocupe, não armazenamos dados pessoais e você não sairá desta página!</p>
                </div>
                <div className='BannerInputContainer'>
                    <InputMask mask='99999-999' type='text' value={cep} id='bannerCepInput' placeholder='00000-000' onChange={setInformation}/>
                    <CurrencyInput maskOptions={{}} type='text' id='bannerBillValuePerMonthInput' placeholder='R$ 100,00' onChange={setInformation}/>
                    <button className='ButtonGradient Small BannerButton' onClick={() => setHasBothData(true)}>Enviar</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default BannerRecommendationData