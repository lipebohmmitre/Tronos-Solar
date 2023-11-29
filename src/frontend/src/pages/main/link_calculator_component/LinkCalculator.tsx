import './LinkCalculator.css';
import '../../../shared/SharedStyles.css'
import imgCalculator from './calculadoraGif.gif';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

ReactModal.setAppElement('#root');

function LinkCalculator(){
    const navigate = useNavigate();

    return(
        <div className='LinkCalculator'>
            <div>
                <img src={imgCalculator} alt="Imagem da Calculadora"/>
            </div>
            <div className='txt'>
                <h3>Quanto vou <br/> Economizar?</h3>
                <p>Convidamos você a explorar nosso site para conhecer mais sobre nossos produtos fotovoltaicos de última geração, depoimentos de clientes satisfeitos e cases de sucesso. Na Tronos Solar, estamos comprometidos em fornecer soluções em energia solar de qualidade, impulsionando a transformação rumo a um futuro mais limpo e sustentável. Junte-se a nós nessa jornada e descubra o poder do sol em suas mãos.</p>
                <div className='ButtonJobContainer'>
                    <a onClick={() => navigate('/calculadora')} className='ButtonJob'>SIMULE AQUI</a>
                </div>
                
            </div>
        </div>
    )
}

export default LinkCalculator;