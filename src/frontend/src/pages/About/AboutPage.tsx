import Header from './../../shared/components/header_component/Header';
import Footer from './../../shared/components/footer_component/Footer';
import Breadcumb from '../../shared/components/breadcrumb_component/Breadcumb';
import BreadcumbModel from '../../shared/models/BreadcumbModel';
import '../../shared/SharedStyles.css'
import '../About/AboutPage.css'

function AboutPage(){
    let breadcumbModelList: BreadcumbModel[] = [
        new BreadcumbModel('Início','/'),
        new BreadcumbModel('Sobre','/sobre'),
    ];

    return(
        <div >
            <Header />
            <div className='PageContentContainer'>
                <Breadcumb breadcumbModelList={breadcumbModelList} />
                <p className='TitleWithBorderBottom'>O que nós fazemos?</p>
                <div className='AboutImagesContainer Work'>
                    <div className='ImageAndTextContainer'>
                        <div className='ImageContainer'>
                            <img src={require('../../assets/images/texto institucional (1).png')}></img>
                        </div>
                        <p>Design e Projetos de soluções fotovoltaicas</p>
                    </div>
                    <div className='ImageAndTextContainer'>
                        <div className='ImageContainer'>
                            <img src={require('../../assets/images/texto institucional (2).png')}></img>
                        </div>
                        <p>Manufatura e Distribuição de Componentes Solares</p>
                    </div>
                    <div className='ImageAndTextContainer'>
                        <div className='ImageContainer'>
                            <img src={require('../../assets/images/texto institucional (3).png')}></img>
                        </div>
                        <p>Backup de Bateria e Sistemas de Energias Residenciais</p>
                    </div>
                </div>
                <div className='AboutTextContainer'>
                    <p>Como líderes do setor, na Tronos Solar, compreendemos a importância de fornecer produtos de excelência e garantir um atendimento excepcional aos nossos clientes.</p>
                    <p>Por isso, estabelecemos uma rede global de parcerias com os principais fabricantes de painéis solares, inversores e outros componentes essenciais.</p>
                    <p>Através de nosso poder de importação, selecionamos cuidadosamente os melhores produtos disponíveis no mercado internacional, garantindo qualidade, desempenho e durabilidade superiores.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutPage