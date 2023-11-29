import '../../SharedStyles.css'
import '../breadcrumb_component/Breadcumb.css';
import BreadcumbModel from '../../models/BreadcumbModel';
import { useNavigate } from 'react-router-dom';

function Breadcumb(props: {breadcumbModelList: BreadcumbModel[], limit?: number}){
    const navigate = useNavigate();

    const navigateHandler = async (link:string) => {
        await navigate(link);

        //gambiarra pro breadcrumb de produtos funcionar, pois ele rediciona para a mesma url só com outro query parameter, daí esse código abaixo joga para uma url fake e depois volta redireciona para a url real
        if(link.includes('Fake')){
            link = link.replaceAll('Fake', '');
        }

        await navigate(link);
    }

    let lastItems = props.breadcumbModelList;
    let limit = props.limit ?? 4;

    if(lastItems.length >= limit){
        lastItems = props.breadcumbModelList.slice(props.breadcumbModelList.length - limit, props.breadcumbModelList.length);
        lastItems.unshift(new BreadcumbModel('...', '/'));
    }

    return(      
        <div className='BreadcumbContainer'>
            {lastItems.map((item, index) => (
                <a onClick={() => navigateHandler(item.Link)} className='BreadcumbLink'>{index == 0 ? '' : ' / '}{item.Description}</a>
            ))}
        </div>
    )
}

export default Breadcumb