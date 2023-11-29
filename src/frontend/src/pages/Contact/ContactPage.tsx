import Breadcumb from '../../shared/components/breadcrumb_component/Breadcumb';
import Footer from '../../shared/components/footer_component/Footer';
import Header from '../../shared/components/header_component/Header';
import BreadcumbModel from '../../shared/models/BreadcumbModel';
import '../../shared/SharedStyles.css'
import '../Contact/ContactPage.css'
import InputMask from 'react-input-mask';
import { useState } from 'react';

function ContactPage(){
    let breadcumbModelList: BreadcumbModel[] = [
        new BreadcumbModel('Início','/'),
        new BreadcumbModel('Contato','/contato'),
    ];

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function redirectToEmail() {
        const emailSubject = 'Entrando em contato pela Tronos';
        const emailBody = `Nome: ${name}\nTelefone: ${phone}\nE-mail: ${email}\nMensagem: ${message}`;

        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        window.open(mailtoLink, '_blank');
    }

    return(
        <div>
            <Header />
            <div className='PageContentContainer'>
                <Breadcumb breadcumbModelList={breadcumbModelList} />
                <div className='MapsIframeContainer'>
                    <iframe src={"https://www.google.com/maps/embed/v1/place?q=Av.+Ivaí,+425+-+Dom+Bosco,+Belo+Horizonte+-+MG,+30850-000&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"} className='MapsIframe'/>         
                </div>
                <div className='MapsText'>
                    <p>Avenida Ivaí, 425, Dom Bosco, Belo Horizonte - MG</p>
                    <p>31 99999 9999</p>
                    <p>contato@tronossolar.com.br</p>
                </div>
                <div className='FormContainer'>
                    <p className='TitleWithBorderBottom'>Entre em contato</p>
                    <form>
                        <input type='text' placeholder='Nome' className='FormInput Half' value={name} onChange={(e) => setName(e.target.value)} />
                        <InputMask mask="(99) 99999 9999" type='phone' placeholder='Telefone' className='FormInput Half' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input type='email' placeholder='E-mail' className='FormInput Full' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <textarea placeholder='Mensagem' className='FormInput Full' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <input type="submit" value="Enviar" className='ButtonGradient' onClick={redirectToEmail} />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactPage