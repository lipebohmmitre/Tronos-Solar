import './ProductsPageStyle.css';
import '../../shared/SharedStyles.css';
import Header from '../../shared/components/header_component/Header';
import Footer from '../../shared/components/footer_component/Footer';
import BannerRecommendationData from '../../shared/components/banner_recommendation_data_component/BannerRecommendationData';
import Breadcumb from '../../shared/components/breadcrumb_component/Breadcumb';
import BreadcumbModel from '../../shared/models/BreadcumbModel';
import { useEffect, useState } from "react";
import { GetProducts } from '../../services/ProductService'; 
import { GetKitById, GetKits } from '../../services/KitService';
import ProductDTO from './../../models/ProductDTO';
import KitDTO from './../../models/KitDTO';
import CategoryDTO from './../../models/CategoryDTO';
import ImageDTO from './../../models/ImageDTO';
import { useSearchParams } from 'react-router-dom';
import { normalizeText } from '../../helpers/stringHelper';
import RecommendedKits from '../../shared/components/recommended_kits_component/RecommendedKits';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { GetImage } from '../../services/ImageService';

function ProductsPage(){
    const navigate = useNavigate();

    //#region constants/states
    const [searchParams, setSearchParams] = useSearchParams();
    const [typeView, setTypeView] = useState(searchParams.get("type")?.toLowerCase());
    
    const [products, setProducts] = useState([] as ProductDTO[]);
    const [kits, setKits] = useState([] as KitDTO[]);
    const [filteredProducts, setFilteredProducts] = useState([] as ProductDTO[]);
    const [filteredKits, setFilteredKits] = useState([] as KitDTO[]);
    const [productsRecentlyAdded, setProductsRecentlyAdded] = useState([] as ProductDTO[]);
    const [categories, setCategories] = useState([] as CategoryDTO[]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([0,1]);
    const [textFilter, setTextFilter] = useState<string>('');

    const [productImages, setProductImages] = useState([] as ImageDTO[]);
    const [kitImages, setKitImages] = useState([] as ImageDTO[]);
    //#endregion

    function getCachedImageProduct(entityId: number){
        return productImages.find(image => image.entityId === entityId)?.imageUrl ?? null;
    }

    function getCachedImageKit(entityId: number){
        return kitImages.find(image => image.entityId === entityId)?.imageUrl ?? null;
    }

    //#region gets iniciais (chamados uma vez)
    async function getProducts(){
        const products = await GetProducts();

        setProducts(products);
    }

    async function getKits(){
        const kits = await GetKits();

        setKits(kits);
    }

    async function getImagesProducts(){
        let productImages = [] as ImageDTO[];

        await products.forEach(async item => {
            let imageUrl = await GetImage(item.id, 0);

            if(imageUrl){
                productImages.push({entityId: item.id, entityType: 0, imageUrl: imageUrl});
                setProductImages(productImages);
            }

        })     
    }

    async function getImagesKits(){
        let kitImages = [] as ImageDTO[];
        
        await kits.forEach(async item => {
            let imageUrl = await GetImage(item.id, 1);
            kitImages.push({entityId: item.id, entityType: 1, imageUrl: imageUrl});
            setKitImages(kitImages);
        })
    }

    async function getCategories(){
        const categories = products.flatMap(product => product.categories)
                                   .filter((category, index, arr) => {
                                        return arr.findIndex(p => p.id === category.id) === index;
                                   })
                                   .sort((a, b) => a.name.localeCompare(b.name));

        categories.unshift({id: 0, name: 'Todos'} as CategoryDTO);

        setCategories(categories);
    }

    async function getProductsRecentlyAdded(){
        const productsRecentlyAdded = await GetProducts(undefined, undefined,'recent', 5);

        await productsRecentlyAdded.forEach(async item => {
            item.image = await GetImage(item.id, 0);
        })

        setProductsRecentlyAdded(productsRecentlyAdded);
    }
    //#endregion

    //#region filtros
    async function getFilteredProducts(){
        let filteredProducts = products;

        //filtrar por categoria
        if (!(selectedCategories.length === 0 || selectedCategories.includes(0))) {
            filteredProducts = products.filter((product) =>
                product.categories.some((category) => selectedCategories.includes(category.id))
            );
        }
        
        //filtrar pro texto
        if(textFilter && textFilter.length > 0){
            filteredProducts = filteredProducts.filter((product) =>
                normalizeText(product.name).includes(normalizeText(textFilter)) ||
                normalizeText(product.description).includes(normalizeText(textFilter))
            );
        }
        
        setFilteredProducts(filteredProducts);
    };

    async function getFilteredKits(){
        let filteredKits = kits;

        //filtrar pro texto
        if(textFilter && textFilter.length > 0){
            filteredKits = filteredKits.filter((kit) =>
                normalizeText(kit.name).includes(normalizeText(textFilter)) ||
                normalizeText(kit.description).includes(normalizeText(textFilter))
            );
        }
        
        setFilteredKits(filteredKits);
    };

    function handleCategoryClick(event: React.MouseEvent<HTMLLIElement>) {
        //atualizar lista de categorias selecionadas
        const checkbox = event.currentTarget.querySelector<HTMLInputElement>('input[type="checkbox"]');
        const categoryId = parseInt(checkbox!.id);
        if (checkbox?.checked) {
          setSelectedCategories([...selectedCategories, categoryId]);
        } else {
          setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        }

        //marcar os checkbox web e mobile como selecionado visualmente
        document.querySelectorAll<HTMLLIElement>(`li input[id="${categoryId}"]`).forEach((el) => el.closest('input')?.click());
    }

    function handleProductTypeClick(event: React.MouseEvent<HTMLLabelElement>) {
        const radio = event.currentTarget.querySelector<HTMLInputElement>('input[type="radio"]');
        const typeViewSelected = radio!.value;
        setTypeView(typeViewSelected);

        if(typeViewSelected == 'kits') {
            //limpar filtros de categorias ao selecionar tipo kit
            setSelectedCategories([0]);
        }
    }

    function markVisuallyRadioProductType(productType: string) {
        document.querySelectorAll<HTMLInputElement>(`input[type="radio"][value="${productType}"]`).forEach((el) => el.click());
    }

    function handleTextFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextFilter(event.currentTarget.value);
    }

    function productsInfoId(products: any){
        localStorage.setItem('selectedProductId', JSON.stringify(products));
    }

    function addItemCart(product: any) {
        const storedItems = localStorage.getItem('items');
        const items: any[] = storedItems ? JSON.parse(storedItems) : [];
        const isItemRepeated = items.some((item: any) => item.product.id === product.id);
      
        if (isItemRepeated) {
          toast.error('Produto já adicionado', { position: toast.POSITION.TOP_RIGHT });
          return; // 
        }
      
        const newItem = {
          product: product,
          quantity: 1,
          finalPrice: product.price,
        };
      
        const updatedItems = [...items, newItem];
        localStorage.setItem('items', JSON.stringify(updatedItems));
      
        toast.success('Produto adicionado ao carrinho', { position: toast.POSITION.TOP_RIGHT });
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
   
    //#endregion

    //#region use effects
    useEffect(() => {
        getProducts();
        getKits();
    }, []);

    useEffect(() => {
        getCategories();
        getProductsRecentlyAdded();
        getFilteredProducts();
        getImagesProducts();
    }, [products]);

    useEffect(() => {
        getFilteredKits();
        getImagesKits();
    }, [kits]);

    useEffect(() => {
        getFilteredProducts();

      }, [selectedCategories]);

    useEffect(() => {
        getFilteredProducts();
        getFilteredKits();

    }, [textFilter]);

    useEffect(() => {
        markVisuallyRadioProductType(typeView!);
    }, [typeView])
    //#endregion

    //#region breadcumb
    let breadcumbModelList: BreadcumbModel[] = [
        new BreadcumbModel('Início','/'),
        new BreadcumbModel('Produtos','/produtosFake?type=products'),       
    ];

    if(typeView == 'kits') breadcumbModelList.push(new BreadcumbModel('Kits','/produtos?type=kits'));
    //#endregion

    function handleMobileFilterVisibility() {
    let div = document.getElementsByClassName('MobileSelectFiltersContainer')[0];

        if (div?.classList.contains('Cover')) {
            div?.classList.remove('Cover');
        } else {
            div?.classList.add('Cover');
        }
    };

    return(
        <div>
            <ToastContainer />
            <Header />
            <BannerRecommendationData />
            <div className='PageContentContainer'>
                <Breadcumb breadcumbModelList={breadcumbModelList} />
                <div className='ProductsPageContainer'>
                <div className='LeftSide'>
                    <div className="ProductSearchContainer">
                        <input type="text" placeholder='Pesquise...' value={textFilter} onChange={handleTextFilterChange}/>
                    </div>
                    <div className='ProductTypeContainer'>
                        <div className='TitleContainer'>
                            <h3 className='SubtitleSmall'>Tipo</h3>
                        </div>
                        <label onClick={handleProductTypeClick}>
                            <input type='radio' name='productType' value='kits'/> Kits
                        </label>
                        <label onClick={handleProductTypeClick}>
                            <input type='radio' name='productType' value='products'/> Produtos
                        </label>
                    </div>
                    {typeView == 'products' && (
                    <div className='CategoriesContainer'>
                        <div className='TitleContainer'>
                            <h3 className='SubtitleSmall'>Categorias</h3>
                        </div>           
                        <div className='CategoriesListContainer'>
                            <ul className='CategoriesList'>
                            {categories.map((category) => (
                                <li onClick={handleCategoryClick}>
                                    <input type='checkbox' className='CategoryCheckbox' id={category.id.toString()} checked={selectedCategories.includes(category.id)} onClick={(event) => event.currentTarget.closest('li')?.click()} />
                                    {category.name}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    )}
                    <div className='RecentlyAddedContainer'>
                        <div className='TitleContainer'>
                            <h3 className='SubtitleSmall'>Recentemente Adicionados</h3>
                        </div>
                        <div className='RecentlyAddedListContainer'>
                            <ul className='RecentlyAddedList'>
                            {productsRecentlyAdded.map((product) => (
                                <li>
                                    <div className='RecentlyAddedImgContainer'>
                                        {getCachedImageProduct(product.id) && (<img src={getCachedImageProduct(product.id)!} alt={product.name} />)}
                                        {!getCachedImageProduct(product.id) && (<img src={require('../../assets/images/semImagem.jpg')} alt={product.name} />)}
                                    </div>
                                    <div className='RecentlyAddedInfoContainer'>
                                        <p className='Text Small'>{product.name}</p>
                                        <button onClick={() => addItemCart(product)} className='AddButtonGreen'>Adicionar</button>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='RightSide'> 
                    <div className='MobileFilterContainer'>
                        <div className="ProductSearchContainer Mobile">
                            <input type="text" placeholder='Pesquise...' value={textFilter} onChange={handleTextFilterChange}/>
                            <a onClick={handleMobileFilterVisibility}>
                                <img src={require('../../assets/images/iconFilter.png')} />
                            </a>
                        </div>
                        <div className='MobileSelectFiltersContainer Cover'>
                            <div className='MobileProductTypeContainer'>
                                <div className='ProductTypeContainer Mobile'>
                                    <div className='TitleContainer'>
                                        <h3 className='SubtitleSmall'>Tipo</h3>
                                    </div>
                                    <label onClick={handleProductTypeClick}>
                                        <input type='radio' name='productTypeMobile' value='kits'/> Kits
                                    </label>
                                    <label onClick={handleProductTypeClick}>
                                        <input type='radio' name='productTypeMobile' value='products'/> Produtos
                                    </label>
                                </div>
                            </div>
                            {typeView == 'products' && (
                            <div className='MobileCategoriesContainer'>
                                <div className='TitleContainer Mobile'>
                                    <h3 className='SubtitleSmall'>Categorias</h3>
                                </div>
                                <ul className='CategoriesList'>
                                {categories.map((category) => (
                                    <li onClick={handleCategoryClick}>
                                        <input type='checkbox' className='CategoryCheckbox' id={category.id.toString()} onClick={(event) => event.currentTarget.closest('li')?.click()} />
                                        {category.name}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            )}
                        </div>
                    </div>
                    {typeView == 'products' && (
                    <div className='ProductsMainContainer'>
                    {filteredProducts.map((product) => (                        
                        <div className='aCont'>
                            <a onClick={() => navigate('/detalhes')} className='IndividualProductContainer'>
                                <div onClick={() => productsInfoId(product.id)} className='ProductImgContainer' key={product.id}>
                                    {getCachedImageProduct(product.id) && (<img src={getCachedImageProduct(product.id)!} alt={product.name} />)}
                                    {!getCachedImageProduct(product.id) && (<img src={require('../../assets/images/semImagem.jpg')} alt={product.name} />)}
                                </div>
                                <div className='ProductsInfoContainer'>
                                    <p>{product.name}</p>
                                </div>
                            </a>
                            <button onClick={() => addItemCart(product)} className='AddButtonGreen Big'>Adicionar</button>
                        </div>
                    ))}                   
                  </div>
                    )}
                    {typeView == 'kits' && (
                    <div className='ProductsMainContainer'>
                        <div className='Products_RecommendedKitsContainer'>
                            <RecommendedKits></RecommendedKits>
                        </div>
                        {filteredKits.map((kit) => (
                            <div className='IndividualProductContainer'>
                                <div className='ProductImgContainer' key={kit.id}>
                                    {getCachedImageKit(kit.id) && (<img src={getCachedImageKit(kit.id)!} alt={kit.name} />)}
                                    {!getCachedImageKit(kit.id) && (<img src={require('../../assets/images/semImagem.jpg')} alt={kit.name} />)}
                                </div>
                                <div className='ProductsInfoContainer'>
                                    <p>{kit.name}</p>
                                    <button className='AddButtonGreen Big' onClick={() => buyKit(kit.id)}>Comprar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductsPage;