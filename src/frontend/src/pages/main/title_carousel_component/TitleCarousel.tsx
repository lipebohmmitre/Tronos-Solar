import './TitleCarousel.css';
import '../../../shared/SharedStyles.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import Modal from '../../../shared/components/modal_monte_kit_component/ModalMonteKit';
import { useNavigate } from 'react-router-dom';

function TitleCarousel() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      swipeToSlide: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      pauseOnFocus: true,
      pauseOnDotsHover: true,
    };
  
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
      <div className='TitleCarousel'>
        <div className='LeftSideMessage'>
            <div className='TextContainer'>
                <h1 className='TitleCarouselText'>tronos solar</h1>
                <div className='LeiaMaisContainer'>
                    <a onClick={() => navigate('/sobre')} className='LeiaMais'>leia mais</a>
                </div>
                <p className='TextoDescritivo'>Bem-vindo à Tronos Solar: sua parceira confiável em soluções de energia solar. Nossa missão é oferecer soluções de energia solar de alta qualidade para clientes residenciais e corporativos em todo o país, por meio de nossa valiosa parceria com a Sustentar Energia.</p>
                <div className='ButtonKitContainer'>
                    <a onClick={ () => setModalOpen(true) } className='ButtonKit'>Monte seu Kit</a>
                    { modalOpen ? <Modal onClose={ () => setModalOpen(false)}/> : null }
                </div>
            </div>
          
        </div>
        <div className='RightSideCarousel'>
            <div className='CarouselContainer'>
                <Slider {...settings}>
                    <div>
                        <img src={require('../../../assets/images/banners (1).png')}></img>
                    </div>
                    <div>
                        <img src={require('../../../assets/images/banners (2).png')}></img>
                    </div>
                    <div>
                        <img src={require('../../../assets/images/banners (3).png')}></img>
                    </div>
                </Slider>
            </div>
        </div>
      </div>
    )
  }

export default TitleCarousel;