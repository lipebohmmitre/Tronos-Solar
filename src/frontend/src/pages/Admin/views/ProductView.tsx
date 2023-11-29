import '../AdminPage.css';
import { useEffect, useState, ChangeEvent } from "react";
import ProductDTO from './../../../models/ProductDTO';
import { normalizeText } from '../../../helpers/stringHelper';
import { GetProducts, GetProductById, DeleteProduct, UpdateProduct, CreateProduct } from '../../../services/ProductService';
import { GetImage, UploadImage } from '../../../services/ImageService';
import CurrencyInput from '../../../helpers/currencyInputHelper';
import { convertNumberToCurrencyString, convertCurrencyStringToNumber } from '../../../helpers/numberHelper';

function ProductView() {

  const [showConfirmationDialogDelete, setShowConfirmationDialogDelete] = useState(false);
  const [showModalCrud, setShowModalCrud] = useState(false);
  const [textFilter, setTextFilter] = useState('');

  const [productIdToDelete, setProductIdToDelete] = useState(0);

  const [productModel, setProductModel] = useState({} as ProductDTO);
  const [productModelName, setProductModelName] = useState('');
  const [productModelDescription, setProductModelDescription] = useState('');
  const [productModelPrice, setProductModelPrice] = useState('');

  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [products, setProducts] = useState([] as ProductDTO[]);
  const [filteredProducts, setFilteredProducts] = useState([] as ProductDTO[]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  async function getProducts(){
      const products = await GetProducts();

      setProducts(products);
  }

  async function getFilteredProducts(){
      let filteredProducts = products;
      
      //filtrar pro texto
      if(textFilter && textFilter.length > 0){
          filteredProducts = filteredProducts.filter((product) =>
              normalizeText(product.id.toString()).includes(normalizeText(textFilter)) ||
              normalizeText(product.name).includes(normalizeText(textFilter)) ||
              normalizeText(product.price.toString()).includes(normalizeText(textFilter)) ||
              normalizeText(product.description).includes(normalizeText(textFilter)) ||
              //filtrar por categorias
              product.categories.some((category) => normalizeText(category.name).includes(normalizeText(textFilter)))
          );
      }
      
      setFilteredProducts(filteredProducts);
  }

  async function getProductById(productId:number){
    if(!productId || productId === 0){
      setProductModel({} as ProductDTO);
      setProductModelName('');
      setProductModelDescription('');
      setProductModelPrice('');
      return;
    }

    const product = await GetProductById(productId);
    const productImageUrl = await GetImage(product.id, 0);

    setProductModelName(product.name);
    setProductModelDescription(product.description);
    setProductModelPrice(convertNumberToCurrencyString(product.price));

    setProductModel(product);
    setProductImageUrl(productImageUrl);

    setSelectedFile(null);
  }

  async function handleProductEditModalForm(productId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await getProductById(productId);
    setShowModalCrud(true);
  }

  async function handleProductEdit() {
    updateProductModel();

    if(productModel.id && productModel.id != 0){
      await UpdateProduct(productModel);

      if(selectedFile)
        await UploadImage(selectedFile, 0, productModel.id);
    }
    else{
      let productDb = await CreateProduct(productModel);

      if(selectedFile)
        await UploadImage(selectedFile, 0, productDb.id);
    }

    getProducts();
    setShowModalCrud(false);
  }

  async function handleProductDelete(productId:number) {
    await DeleteProduct(productId);
    setShowConfirmationDialogDelete(false);
    getProducts();
  }

  async function handleProductDeleteConfirmationDialog(productId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowConfirmationDialogDelete(true);
    setProductIdToDelete(productId);
  }

  function updateProductModel(){
    let updatedProductModel = productModel ?? {} as ProductDTO;

    updatedProductModel.name = productModelName ?? productModel.name;
    updatedProductModel.description = productModelDescription ?? productModel.description;
    updatedProductModel.price = convertCurrencyStringToNumber(productModelPrice) ?? productModel.price;

    setProductModel(productModel);
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getFilteredProducts();
  }, [textFilter, products]);

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement>){
    if (event.target === event.currentTarget) {
      setShowModalCrud(false);
      setShowConfirmationDialogDelete(false);
    }
  };

  const confirmationDialogDelete = () => {
    return (
        <div className='ModalConfirmationDialogOutside' onClick={handleClickOutside}>
            <div className="ModalConfirmationDialogInside">
            <div className="ModalConfirmationDialogTextContainer">
                <label>Deseja realmente excluir esse registro?</label>
            </div>
            <div className="ModalConfirmationDialogButtonsContainer">
              <div>
                <a className="AdminConfirmButton Warning" onClick={() => setShowConfirmationDialogDelete(false)}>Não</a>
              </div>
              <div>
                <a className="AdminConfirmButton Confirm" onClick={() => handleProductDelete(productIdToDelete)}>Sim</a>
              </div>
            </div>
          </div>
        </div>
      );
  }

  const modalCrud = () => {
    return (
      <div className='ModalCrudOutside' onClick={handleClickOutside}>
        <div className="ModalCrudInside">
          <div className='ModalCrudFormContainer'>
            <div className='ModalCrudForm'>
              <div>
                <label>Nome</label>
                <input type="text" value={productModelName} onChange={(e) => setProductModelName(e.target.value)}/>
              </div>
              <div>
                <label>Descrição</label>
                <input type="text" value={productModelDescription} onChange={(e) => setProductModelDescription(e.target.value)}/>
              </div>
              <div>
                <label>Preço</label>
                <CurrencyInput maskOptions={{}} type="text" value={productModelPrice || null} placeholder="R$0,00" onChange={(e) => setProductModelPrice(e.target.value)}/>
              </div>
              {/* todo: categorias */}
              {productModel.id && productModel.id!= 0 && 
                <div className='ModalCrudImage'>
                  <label>Imagem Atual</label>
                  <div className='ModalCrudFormImageContainer'>
                    {productImageUrl && <img src={productImageUrl!} alt={productModelName} />}
                    {!productImageUrl && <img src={require('../../../assets/images/semImagem.jpg')} alt={productModelName}/>}
                  </div>
                </div>
              }
              <div>
                {productModel.id && productModel.id!= 0 && (<label>Nova Imagem</label>)}
                {(!productModel.id || productModel.id == 0) && (<label>Imagem</label>)}
                <input type="file" accept="image/*" onChange={handleFileChange}/>
              </div>
            </div>
            <div className='ModalCrudButtons'>
              <div>
                <a className="AdminConfirmButton Big Gray" onClick={() => setShowModalCrud(false)}>Cancelar</a>
              </div>
              <div>
                <a className="AdminConfirmButton Big Confirm" onClick={() => handleProductEdit()}>Salvar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {showConfirmationDialogDelete && confirmationDialogDelete()}
      {showModalCrud && modalCrud()}

      <div className="CrudTitleContainer">
        <label>Produtos</label>
      </div>
      <div className="CrudTopSection">
        <div className='CrudSearchBarContainer'>
          <input className='CrudSearchBarInput' id='CrudSearchBarInput' placeholder='Pesquisar...' value={textFilter} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextFilter(event.target.value)}></input>
        </div>
        <div className='CrudTopButtonsContainer'>
          <a onClick={() => handleProductEditModalForm(0)}>Adicionar</a>
        </div>
      </div>
      <div className="CrudPagerContainer">
        <div className="CrudPager">
          <div className='CrudPagerFilters'>
            
          </div>
          <div className="CrudPagerItemsContainer">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{convertNumberToCurrencyString(product.price, true)}</td>
                  <td>
                    <div className='AdminPagerButtonContainer'>
                      <a className='AdminPagerButton' onClick={() => handleProductEditModalForm(product.id)}>
                        <img src={require('../../../assets/images/iconAdminEdit.png')}></img>
                      </a>
                      <a className='AdminPagerButton' onClick={() => handleProductDeleteConfirmationDialog(product.id)}>
                        <img src={require('../../../assets/images/iconAdminDelete.png')}></img>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            {filteredProducts.length === 0 && 
              <div className='AdminPagerNotFoundMessageContainer'>
                <label>Nenhum registro encontrado</label>
              </div>
            }       
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;