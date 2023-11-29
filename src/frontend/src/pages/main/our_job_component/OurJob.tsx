import imgPredio from './imgPredio.png';
import './OurJob.css'
import { useNavigate } from 'react-router-dom';

function OurJob(){
    const navigate = useNavigate();

    return(
        <div>
           <div className='OurJob'>
                <div className='txtTitleJob'> 
                    <h2>Conheça Nosso Trabalho</h2>
                    <h3>Sobre a empresa</h3>
                    <p>Nossa história de sucesso é impulsionada pela paixão de nossa equipe e pelo constante investimento em pesquisa e desenvolvimento. Estamos sempre em busca de inovações tecnológicas que possam aprimorar a eficiência dos sistemas fotovoltaicos e oferecer uma experiência excepcional aos nossos clientes.</p>
                        <div className='ButtonJobContainer'>
                            <a onClick={() => navigate('/sobre')} className='ButtonJob'>TUDO SOBRE NÓS</a>
                        </div>
                </div> 
                <div className='imgJob'>  
                    <div>
                        <img className='img' src={imgPredio} alt="Imagem da Filial"/>
                    </div>
                </div> 
            </div> 
            <div className='imgLogos'>
                <img className='Sustentar' src={require('../../../assets/images/Design_sem_nome_2.png')}></img>
                <img className='Sustentar' src={require('../../../assets/images/logoSustentar.png')}></img>
                <img className='Sustentar' src={require('../../../assets/images/Design_sem_nome_2.png')}></img>
                <img className='Sustentar' src={require('../../../assets/images/logoSustentar.png')}></img>
            </div>   
        </div>

    )
}

export default OurJob