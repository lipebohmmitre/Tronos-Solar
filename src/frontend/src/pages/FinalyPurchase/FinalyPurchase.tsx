import Header from "../../shared/components/header_component/Header";
import Footer from "../../shared/components/footer_component/Footer";
import FinalyPurchaseComponent from "./finaly_purchase_component/FinalyPurchaseComponent";

function FinalyPurchase() {
  return(
        <div>
            <Header/>
            <FinalyPurchaseComponent />
            <Footer/>
        </div>
    ) 
}

export default FinalyPurchase;