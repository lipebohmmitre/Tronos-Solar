import './Footer.css';
import '../../SharedStyles.css';

function Footer() {
    let actualYear = new Date().getFullYear();
    return (
    <div className="Footer">
      <div className='FooterMainContainer'>
        <div className='ColumnsContainer'>
          <div className='Column'>
            <p className='ColumnTitle'>Entre em Contato</p>
            <p className='ColumnText'><a href="https://web.whatsapp.com/send?phone=5531982291886" target='_blank'>31 9 8229-1886</a></p>
            <p className='ColumnText'><a href="https://web.whatsapp.com/send?phone=5531995377423" target='_blank'>31 9 9537-7423</a></p>   
            <p className='ColumnTitle'>Mais Formas de Contatos</p>
            <p className='ColumnText'><a href="mailto:solar@tronossolar.com.br">solar@tronossolar.com.br</a></p>
          </div>
          <div className='Column'>
            <p className='ColumnTitle'>Mundo Verde e Laranja</p>
            <p className='ColumnText'>Economize e preserve o planeta com energia solar: a escolha inteligente para um futuro sustentável.</p>
            <br/>
            <p className='ColumnText'>Qualidade incomparável: equipamentos de última geração e mão de obra especializada, garantindo a excelência em cada projeto!</p>
          </div>
          <div className='Column'>
            <p className='ColumnTitle'>Redes Sociais</p>
            <p className='ColumnSubtitle'><a href="https://www.instagram.com/sustentarenergia/" target='_blank'><img src={require('../../../assets/images/instaLogoIcon.png')} alt="Instagram" className='logoIconFooter'/></a></p>
            <p className='ColumnSubtitle'><a href="https://www.facebook.com/gpjinformatica/?locale=pt_BR" target='_blank'><img src={require('../../../assets/images/faceLogoIcon.png')} alt="Facebook" className='logoIconFooter'/></a></p>
            <p className='ColumnSubtitle'><a href="https://www.linkedin.com/company/gpjinform%C3%A1tica/?originalSubdomain=br" target='_blank'><img src={require('../../../assets/images/linkedinLogoIcon.png')}  alt="Linkedin" className='logoIconFooter'/></a></p>
            <p className='ColumnSubtitle'><a href="https://www.youtube.com/channel/UCY0L3-H7NjM7hFYvLyqmXMw" target='_blank'><img src={require('../../../assets/images/ytbLogoIcon.png')} alt="Youtube" className='logoIconFooter'/></a></p>
          </div>
        </div>
      </div>
      <div className='BottomContainer'>
        <div className='TronosSolar'>
          <h1>Tronos Solar</h1>
        </div>
        <div className='Copyright'>
          <h6>Copyright © {actualYear} - Todos os Direitos Reservados - Tronos Solar</h6>
        </div>
      </div>
    </div>
    );
  }
  
export default Footer;