import '../AdminPage.css';
import { GetKits } from '../../../services/KitService';
import { useEffect, useState, ChangeEvent } from "react";
import KitDTO from './../../../models/KitDTO';
import { normalizeText } from '../../../helpers/stringHelper';
import { GetKitById, DeleteKit, UpdateKit, CreateKit } from '../../../services/KitService';
import { GetImage, UploadImage } from '../../../services/ImageService';
import CurrencyInput from '../../../helpers/currencyInputHelper';
import { convertNumberToCurrencyString, convertCurrencyStringToNumber } from '../../../helpers/numberHelper';
import ReactSearchBox from "react-search-box";
import ProductDTO from '../../../models/ProductDTO';
import { GetProducts } from '../../../services/ProductService';

function KitView() {
  const [showConfirmationDialogDelete, setShowConfirmationDialogDelete] = useState(false);
  const [showModalCrud, setShowModalCrud] = useState(false);
  const [textFilter, setTextFilter] = useState('');

  const [kitIdToDelete, setKitIdToDelete] = useState(0);

  const [kitModel, setKitModel] = useState({} as KitDTO);
  const [kitModelName, setKitModelName] = useState('');
  const [kitModelDescription, setKitModelDescription] = useState('');
  const [kitModelPrice, setKitModelPrice] = useState('');
  const [kitModelKwhProductionPerMonthBase, setKitModelKwhProductionPerMonthBase] = useState(0);

  const [kitImageUrl, setKitImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [kits, setKits] = useState([] as KitDTO[]);
  const [filteredKits, setFilteredKits] = useState([] as KitDTO[]);

  const [avaiableProducts, setAvaiableProducts] = useState([] as any[]);
  const [selectedProducts, setSelectedProducts] = useState([] as any[]);

  async function getAvaiableProducts() {
    let actualAvaiableProductList = avaiableProducts;
    
    let products = await GetProducts();

    products.forEach((product) => {
      let newAvaiableProduct = {} as any;

      newAvaiableProduct.key = product.id;
      newAvaiableProduct.value = product.name;

      if (!avaiableProducts.find((x) => x.key === product.id)) {
        actualAvaiableProductList.push(newAvaiableProduct);
      }
    });

    setAvaiableProducts(actualAvaiableProductList);
  };

  function handleSelectProduct(item){
    let actualSelectedProducts = [...selectedProducts];

    if(!actualSelectedProducts.find((x) => x.key === item.key)){
      actualSelectedProducts.push(item);
    }

    setSelectedProducts(actualSelectedProducts);
  }

  function handleSelectProductRemove(key: number){
    let actualSelectedProducts = [...selectedProducts];
    
    actualSelectedProducts = actualSelectedProducts.filter((x) => x.key!== key);
    
    setSelectedProducts(actualSelectedProducts);
  }

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement>){
    if (event.target === event.currentTarget) {
      setShowModalCrud(false);
      setShowConfirmationDialogDelete(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  async function getKits(){
      const kits = await GetKits();

      setKits(kits);
  }

  async function getFilteredKits(){
      let filteredKits = kits;
      
      //filtrar pro texto
      if(textFilter && textFilter.length > 0){
          filteredKits = filteredKits.filter((kit) =>
              normalizeText(kit.id.toString()).includes(normalizeText(textFilter)) ||
              normalizeText(kit.name).includes(normalizeText(textFilter)) ||
              normalizeText(kit.price.toString()).includes(normalizeText(textFilter)) ||
              normalizeText(kit.description).includes(normalizeText(textFilter)) ||
              normalizeText(kit.kwhProductionPerMonthBase.toString()).includes(normalizeText(textFilter))
          );
      }
      
      setFilteredKits(filteredKits);
  }

  async function getKitById(kitId:number){
    setSelectedProducts([]);

    if(!kitId || kitId === 0){
      setKitModel({} as KitDTO);
      setKitModelName('');
      setKitModelDescription('');
      setKitModelKwhProductionPerMonthBase(0);
      setKitModelPrice('');
      return;
    }

    const kit = await GetKitById(kitId);
    const kitImageUrl = await GetImage(kit.id, 1);

    setKitModelName(kit.name);
    setKitModelDescription(kit.description);
    setKitModelKwhProductionPerMonthBase(kit.kwhProductionPerMonthBase);
    setKitModelPrice(convertNumberToCurrencyString(kit.price));

    setKitModel(kit);
    setKitImageUrl(kitImageUrl);

    setSelectedFile(null);
  }

  async function handleKitEditModalForm(kitId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await getKitById(kitId);
    setShowModalCrud(true);
  }

  async function handleKitEdit() {
    updateKitModel();

    selectedProducts.forEach((product) => {
      kitModel.products.push({
        id: product.key,
        name: product.value
      } as ProductDTO);
    })

    if(kitModel.id && kitModel.id != 0){
      await UpdateKit(kitModel);

    if(selectedFile)
      await UploadImage(selectedFile, 1, kitModel.id);
    }
    else{
      let kitDb = await CreateKit(kitModel);

      if(selectedFile)
        await UploadImage(selectedFile, 1, kitDb.id);
    }

    getKits();
    setShowModalCrud(false);
  }

  async function handleKitDelete(kitId:number) {
    await DeleteKit(kitId);
    setShowConfirmationDialogDelete(false);
    getKits();
  }

  async function handleKitDeleteConfirmationDialog(kitId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowConfirmationDialogDelete(true);
    setKitIdToDelete(kitId);
  }

  function updateKitModel(){
    let updatedKitModel = kitModel ?? {} as KitDTO;

    updatedKitModel.name = kitModelName ?? kitModel.name;
    updatedKitModel.description = kitModelDescription ?? kitModel.description;
    updatedKitModel.kwhProductionPerMonthBase = kitModelKwhProductionPerMonthBase ?? kitModel.kwhProductionPerMonthBase;
    updatedKitModel.price = convertCurrencyStringToNumber(kitModelPrice) ?? kitModel.price;
    updatedKitModel.products = [];

    setKitModel(kitModel);
  }

  useEffect(() => {
    getKits();
    getAvaiableProducts();
  }, []);

  useEffect(() => {
    getFilteredKits();
  }, [textFilter, kits]);

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
                <a className="AdminConfirmButton Confirm" onClick={() => handleKitDelete(kitIdToDelete)}>Sim</a>
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
                <input type="text" value={kitModelName} onChange={(e) => setKitModelName(e.target.value)}/>
              </div>
                <div>
                <label>Descrição</label>
                <input type="text" value={kitModelDescription} onChange={(e) => setKitModelDescription(e.target.value)}/>
              </div>
              <div>
                <label>Produção de KWH média mensal</label>
                <input type="number" value={kitModelKwhProductionPerMonthBase} onChange={(e) => setKitModelKwhProductionPerMonthBase(parseFloat(e.target.value))}/>
              </div>
              {/* Todo: Colocar search box para produtos */}
              <div>
                <label>Preço</label>
                <CurrencyInput maskOptions={{}} type="text" value={kitModelPrice || null} placeholder="R$ 0,00" onChange={(e) => setKitModelPrice(e.target.value)}/>
              </div>
              {kitModel.id && kitModel.id!= 0 && 
                <div className='ModalCrudImage'>
                  <label>Imagem Atual</label>
                  <div className='ModalCrudFormImageContainer'>
                    {kitImageUrl && <img src={kitImageUrl!} alt={kitModelName} />}
                    {!kitImageUrl && <img src={require('../../../assets/images/semImagem.jpg')} alt={kitModelName}/>}
                  </div>
                </div>
              }
              <div>
                {kitModel.id && kitModel.id!= 0 && (<label>Nova Imagem</label>)}
                {(!kitModel.id || kitModel.id == 0) && (<label>Imagem</label>)}
                <input type="file" accept="image/*" onChange={handleFileChange}/>
              </div>
              <div>
                <label>Produtos</label>
                <div className='ProductsSearchBox'>
                  <ReactSearchBox
                    placeholder="Selecione um produto"
                    data={avaiableProducts}
                    onSelect={selection => handleSelectProduct(selection.item)}
                    onChange={value => console.log(value)}
                  />
                </div>
              </div>
              <div>
                {selectedProducts && selectedProducts.length > 0 && selectedProducts.map((item, index) => (
                  <label className='SelectedProductLabel' onClick={() => handleSelectProductRemove(item.key)}>{item.value}; </label>
                ))}
              </div>
            </div>
            <div className='ModalCrudButtons'>
              <div>
                <a className="AdminConfirmButton Big Gray" onClick={() => setShowModalCrud(false)}>Cancelar</a>
              </div>
              <div>
                <a className="AdminConfirmButton Big Confirm" onClick={() => handleKitEdit()}>Salvar</a>
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
        <label>Kits</label>
      </div>
      <div className="CrudTopSection">
        <div className='CrudSearchBarContainer'>
          <input className='CrudSearchBarInput' id='CrudSearchBarInput' placeholder='Pesquisar...' value={textFilter} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextFilter(event.target.value)}></input>
        </div>
        <div className='CrudTopButtonsContainer'>
          <a onClick={() => handleKitEditModalForm(0)}>Adicionar</a>
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
                  <th>Descrição</th>
                  <th>KWH Mensal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {filteredKits.map((kit) => (
                <tr key={kit.id}>
                  <td>{kit.id}</td>
                  <td>{kit.name}</td>
                  <td>{kit.description}</td>
                  <td>{kit.kwhProductionPerMonthBase}</td>
                  <td>
                    <div className='AdminPagerButtonContainer'>
                      <a className='AdminPagerButton' onClick={() => handleKitEditModalForm(kit.id)}>
                        <img src={require('../../../assets/images/iconAdminEdit.png')}></img>
                      </a>
                      <a className='AdminPagerButton' onClick={() => handleKitDeleteConfirmationDialog(kit.id)}>
                        <img src={require('../../../assets/images/iconAdminDelete.png')}></img>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            {filteredKits.length === 0 && 
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

export default KitView;