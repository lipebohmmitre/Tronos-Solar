import './RecommendedKits.css';
import { useEffect, useState } from 'react';
import KitDTO from '../../../models/KitDTO';
import ImageDTO from '../../../models/ImageDTO';
import { GetRecommendedKits, GetKitById } from '../../../services/KitService';
import { GetImage } from '../../../services/ImageService';
import { useNavigate } from 'react-router-dom';

function RecommendedKits(){
    const navigate = useNavigate();

    const [kits, setKits] = useState([] as KitDTO[]);
    const [kitImages, setKitImages] = useState([] as ImageDTO[]);

    async function getKits(){
        const kits = await GetRecommendedKits();

        setKits(kits);
    }

    async function getImagesKits(){
        let kitImages = [] as ImageDTO[];
        
        await kits.forEach(async item => {
            let imageUrl = await GetImage(item.id, 1);
            kitImages.push({entityId: item.id, entityType: 1, imageUrl: imageUrl});
            setKitImages(kitImages);
        })
    }

    function getCachedImageKit(entityId: number){
        return kitImages.find(image => image.entityId === entityId)?.imageUrl ?? null;
    }

    function addItemCart(product: any) {
        const storedItems = localStorage.getItem('items');
        const items: any[] = storedItems ? JSON.parse(storedItems) : [];
      
        const newItem = {
          product: product,
          quantity: 1,
          finalPrice: product.price,
        };
      
        const updatedItems = [...items, newItem];
        localStorage.setItem('items', JSON.stringify(updatedItems));     
    }

    function addMultipleItemCart(products: any[]) {
        products.forEach((product) => addItemCart(product));
    }

    async function buyKit(kitId: number) {
        let kit = await GetKitById(kitId);

        if(!kit) return;

        localStorage.setItem('items', '');
        addMultipleItemCart(kit.products);
        navigate('/carrinho');
    }

    useEffect(() => {
        getKits();
    }, []);

    useEffect(() => {
        getImagesKits();
    }, [kits]);
    
    return(
        <>
        {kits && kits.length > 0 && 
            <div className='RecommendedKitsContainer'>
                <div className='RecommendedKitsTitleContainer'>
                    <p className='Title'>Kits Recomendados</p>
                </div>
                <div className='RecommendedKitsMainContainer'>
                    {kits.map(item => (
                        <div className='IndividualKitContainer'>
                            <div className='KitImgContainer' key={item.id}>
                                {getCachedImageKit(item.id) && (<img src={getCachedImageKit(item.id)!} alt={item.name} />)}
                                {!getCachedImageKit(item.id) && (<img src={require('../../../assets/images/semImagem.jpg')} alt={item.name} />)}
                            </div>
                            <div className='KitInfoContainer'>
                                <p>{item.description}</p>
                                {kits.some(p => p.potencialSavePercentage > 80) && (
                                    <p>Economize até <label className='KitPotencialSavePercentage'>{item.potencialSavePercentage.toFixed(2)}%</label> da sua conta de luz!</p>
                                )}
                                <button className='AddButtonGreen Big' onClick={() => buyKit(item.id)}>Comprar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    )
}

export default RecommendedKits;