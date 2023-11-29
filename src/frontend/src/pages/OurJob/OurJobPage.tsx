import Breadcumb from '../../shared/components/breadcrumb_component/Breadcumb';
import Footer from '../../shared/components/footer_component/Footer';
import Header from '../../shared/components/header_component/Header';
import BreadcumbModel from '../../shared/models/BreadcumbModel';
import '../../shared/SharedStyles.css'
import '../OurJob/OurJobPage.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import RecommendedKits from '../../shared/components/recommended_kits_component/RecommendedKits';

function OurJobPage(){
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
      }
      
      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const [value, setValue] = React.useState(0);  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {setValue(newValue);};


    let breadcumbModelList: BreadcumbModel[] = [
        new BreadcumbModel('Início','/'),
        new BreadcumbModel('Nosso trabalho','/nosso-trabalho')
    ];

    return(
        <div>
            <Header />
            <div className='PageContentContainer'>
                <Breadcumb breadcumbModelList={breadcumbModelList} />
                <p className='TitleWithBorderBottom'>Nossos serviços</p>
                <div className='OurJobImageContainer'>
                    <img src={require('../../assets/images/our_job_1.png')}></img>
                </div>
                <div className='OurJobTextContainer'>
                    <p className='Subtitle'>Uma nova forma de produzir energia</p>
                    <p className='Text'>Nossa parceria estratégica com a Sustentar Energia nos permite atender aos clientes em todo o país. Através dessa colaboração, oferecemos um serviço abrangente de atendimento ao cliente final e empresas. A equipe altamente capacitada da Sustentar Energia está pronta para fornecer suporte técnico especializado, orientação personalizada e soluções sob medida para atender às necessidades específicas de cada cliente.</p>
                    <br />
                    <p className='Text'>Mais algumas informações sobre nosso serviços!</p>
                </div>
                <div className='OurJobHorizontalTabs'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="Our Jobs" variant="scrollable" scrollButtons={true} allowScrollButtonsMobile>
                            <Tab label="Sistemas de Integração & Fabricação" {...a11yProps(0)} />
                            <Tab label="Design & Engenharia" {...a11yProps(1)} />
                            <Tab label="Suporte na Instalação  & Manutenção" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className='TabImageSection'>
                            <div className='TabImageContainer'>
                                <img src={require('../../assets/images/our_job_2.png')}></img>
                            </div>
                            <div className='TabImageContainer'>
                                <img src={require('../../assets/images/our_job_3.png')}></img>
                            </div>
                        </div>
                        <div className='TabTextSection'>
                            <div className='TabTextContainer'>
                                <p className='Text'>Na Tronos Solar, nosso compromisso vai além da importação e distribuição de equipamentos fotovoltaicos. Nosso objetivo é ajudar a promover a adoção da energia solar em larga escala, contribuindo para um futuro mais sustentável e resiliente.</p>
                                <br />
                                <p className='Text'>Veja um pouco mais sobre nossos produtos!</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='TabImageSection'>
                            <div className='TabImageContainer'>
                                <img src='https://s2.glbimg.com/ERxWUa6mutByaTwZz9c3kLq9Gh8=/0x0:1000x667/1080x608/smart/http://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/h/T/KDhSIaQgq73N94ocfWGw/entenda-a-diferenca-entre-aquecimento-solar-e-a-energia-fotovoltaica.jpg'></img>
                            </div>
                            <div className='TabImageContainer'>
                                <img src='https://toksolar.com.br/wp-content/uploads/2021/10/onde-contrato-energia-solar-residencial-trifasica.jpg'></img>
                            </div>
                        </div>
                        <div className='TabTextSection'>
                            <div className='TabTextContainer'>
                                <p className='Text'>Acreditamos que a energia solar é uma solução poderosa para reduzir a dependência de fontes de energia convencionais, mitigar as emissões de carbono e gerar economia a longo prazo.</p>
                                <br />
                                <p className='Text'>Para mais informações entre em contato conosco, será um grande prazer lhe atender.</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className='TabImageSection'>
                            <div className='TabImageContainer'>
                                <img src='https://crescacomaliberty.com.br/wp-content/uploads/2019/09/paineis_fotovoltaicos.png'></img>
                            </div>
                            <div className='TabImageContainer'>
                                <img src='https://luzsolar.com.br/wp-content/uploads/2018/05/199593-sabia-quais-sao-os-equipamento-que-compoem-o-sistema-de-energia-solar.jpg'></img>
                            </div>
                        </div>
                        <div className='TabTextSection'>
                            <div className='TabTextContainer'>
                                <p className='Text'>um suporte técnico excepcional para sistemas de energia fotovoltaica. Sua abordagem única e eficiente garante que os clientes recebam o suporte necessário para manutenção e correção de problemas eletrotécnicos, promovendo um funcionamento confiável e eficiente de seus sistemas fotovoltaicos.</p>
                                <br />
                                <p className='Text'>Para mais informações entre em contato conosco, será um grande prazer lhe atender.</p>
                            </div>
                        </div>
                    </TabPanel>
                </div>
                <p className='TitleWithBorderBottom'>Nossos produtos</p>
                <div className='OurJobTextContainer'>
                    <div className='TabImageSection'>
                        <div className='TabImageContainer'>
                            <img src='https://solissolar.com.br/wp-content/uploads/2022/06/aquecedores-solares-min.jpg'></img>
                        </div>
                        <div className='TabImageContainer'>
                            <img src='https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/eb31cfab5b6be13be6e0537964b056ee.jpg'></img>
                        </div>
                    </div>
                    <p className='Text'>Painéis solares são dispositivos semicondutores que convertem a luz solar em eletricidade. Eles são a principal tecnologia utilizada em sistemas de energia fotovoltaica para aproveitar a energia do sol e gerar eletricidade limpa e renovável.</p>
                    <br />
                    <p className='Text'>Para mais informações entre em contato conosco, será um grande prazer lhe atender.</p>
                </div>
                <RecommendedKits />
            </div>
            <Footer />
        </div>
    )
}

export default OurJobPage