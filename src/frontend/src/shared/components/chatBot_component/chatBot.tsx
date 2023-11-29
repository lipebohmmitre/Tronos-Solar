import './chatBot.css'
import '../../SharedStyles.css'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatBot(){
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            bringChatBot();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    function bringChatBot(){
        let botCont = document.getElementById('chatBotAllCont')
        let close = localStorage.getItem('closeChat');
        if(botCont === null){
            console.log("No Chat")
        }else if(close){
            console.log("No Chat")
        }
        else{
            botCont.style.right = '15px'
            botCont.style.transition = '.7s'
        }
    }
    function backChatBot(){
        let botCont = document.getElementById('chatBotAllCont')
        if(botCont === null){
            console.log("No Chat")
        }else{
            botCont.style.right = '-400px'
            botCont.style.transition = '.7s'
        }
        localStorage.setItem('closeChat', JSON.stringify('close'));
    }
    function iniciarConversa() {
        var numeroTelefone = "553196002286";
        var mensagem = "Olá! Vim pelo Tronos Solar.";
        var mensagemCodificada = encodeURIComponent(mensagem);
        var linkWhatsApp = "https://api.whatsapp.com/send?phone=" + numeroTelefone + "&text=" + mensagemCodificada;
        window.open(linkWhatsApp);
      }
    return(
        <div className="chatBotAllCont" id='chatBotAllCont'>
            <div className="chatBotCont">
                <div className="chatBotHeader">
                    <p>Chat</p>
                    <img onClick={backChatBot} className='closeChatBot' src={require('../../../assets/images/whiteX.png')}></img>
                </div>
                <div className="chatBotBody">
                    <div className="botSide">
                        <img src={require('../../../assets/images/chatBotIcon.png')} className="chatBotIcon"></img>
                    </div>
                    <div className="sidesTalk">
                        <div className="messageSide">
                            <div className="botMessage">
                                <div className="botMessageBox">
                                    <p>Olá! Sou o bot da Tronos Solar, estou aqui para te ajudar.</p>
                                </div>
                                <div className="botMessageBox">
                                    <p>Escolha um dos atalhos para conhecer mais o nosso site!</p>
                                </div>
                            </div>
                        </div>
                        <div className="meSide">
                            <div className="buttonCont">
                                <button>
                                    <a onClick={() => navigate('/calculadora')}><p>Calcule seu gasto!</p></a>
                                </button>
                                <button>
                                    <a onClick={() => navigate('/sobre')}><p>Conheça sobre nós!</p></a>
                                </button>
                                <button onClick={iniciarConversa}>
                                    <p>Fale com um especialista!</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChatBot;