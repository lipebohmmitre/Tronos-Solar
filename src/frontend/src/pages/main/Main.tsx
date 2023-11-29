import './Main.css';
import Footer from '../../shared/components/footer_component/Footer';
import ChatBot from '../../shared/components/chatBot_component/chatBot';
import Header from '../../shared/components/header_component/Header';
import TitleCarousel from '../main/title_carousel_component/TitleCarousel';
import LinkCalculator from './link_calculator_component/LinkCalculator';
import OurJob from './our_job_component/OurJob';
import RecommendedKits from '../../shared/components/recommended_kits_component/RecommendedKits';
import vectorTitle from '../../assets/images/VectorTitle.svg';

function Main() {
  return (
    <div className="Main">
      <Header></Header>
      <ChatBot></ChatBot>
      <div className='BackgroundSvg' style={{ backgroundColor: '#e2e2e2' }}></div>
      <div className='PageContentContainer'>
        <TitleCarousel></TitleCarousel>
        <LinkCalculator></LinkCalculator>
        <div className='MainPageRecommendedKitsContainer'>
          <RecommendedKits></RecommendedKits>
        </div>
        <OurJob></OurJob>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Main;