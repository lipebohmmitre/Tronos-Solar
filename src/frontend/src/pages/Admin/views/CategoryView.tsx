import '../AdminPage.css';
import { useEffect, useState } from "react";
import CategoryDTO from './../../../models/CategoryDTO';
import { normalizeText } from '../../../helpers/stringHelper';
import { GetCategories, GetCategoryById, DeleteCategory, UpdateCategory, CreateCategory } from '../../../services/CategoryService';

function CategoryView() {

  const [showConfirmationDialogDelete, setShowConfirmationDialogDelete] = useState(false);
  const [showModalCrud, setShowModalCrud] = useState(false);
  const [textFilter, setTextFilter] = useState('');

  const [categoryIdToDelete, setCategoryIdToDelete] = useState(0);

  const [categoryModel, setCategoryModel] = useState({} as CategoryDTO);
  const [categoryModelName, setCategoryModelName] = useState('');
  const [categoryModelDescription, setCategoryModelDescription] = useState('');

  const [categories, setCategories] = useState([] as CategoryDTO[]);
  const [filteredCategories, setFilteredCategories] = useState([] as CategoryDTO[]);

  async function getCategories(){
      const categories = await GetCategories();

      setCategories(categories);
  }

  async function getFilteredCategories(){
      let filteredCategories = categories;
      
      //filtrar pro texto
      if(textFilter && textFilter.length > 0){
          filteredCategories = filteredCategories.filter((category) =>
              normalizeText(category.id.toString()).includes(normalizeText(textFilter)) ||
              normalizeText(category.name).includes(normalizeText(textFilter)) ||
              normalizeText(category.description).includes(normalizeText(textFilter))
          );
      }
      
      setFilteredCategories(filteredCategories);
  }

  async function getCategoryById(categoryId:number){
    if(!categoryId || categoryId === 0){
      setCategoryModel({} as CategoryDTO);
      setCategoryModelName('');
      setCategoryModelDescription('');
      return;
    }

    const category = await GetCategoryById(categoryId);

    setCategoryModelName(category.name);
    setCategoryModelDescription(category.description);

    setCategoryModel(category);
  }

  async function handleCategoryEditModalForm(categoryId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await getCategoryById(categoryId);
    setShowModalCrud(true);
  }

  async function handleCategoryEdit() {
    updateCategoryModel();

    if(categoryModel.id && categoryModel.id != 0){
      await UpdateCategory(categoryModel);
    }
    else{
      await CreateCategory(categoryModel);
    }

    getCategories();
    setShowModalCrud(false);
  }

  async function handleCategoryDelete(categoryId:number) {
    await DeleteCategory(categoryId);
    setShowConfirmationDialogDelete(false);
    getCategories();
  }

  async function handleCategoryDeleteConfirmationDialog(categoryId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowConfirmationDialogDelete(true);
    setCategoryIdToDelete(categoryId);
  }

  function updateCategoryModel(){
    let updatedCategoryModel = categoryModel ?? {} as CategoryDTO;

    updatedCategoryModel.name = categoryModelName ?? categoryModel.name;
    updatedCategoryModel.description = categoryModelDescription ?? categoryModel.description;

    setCategoryModel(categoryModel);
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getFilteredCategories();
  }, [textFilter, categories]);

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
                <a className="AdminConfirmButton Confirm" onClick={() => handleCategoryDelete(categoryIdToDelete)}>Sim</a>
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
                <input type="text" value={categoryModelName} onChange={(e) => setCategoryModelName(e.target.value)}/>
              </div>
              <div>
                <label>Descrição</label>
                <input type="text" value={categoryModelDescription} onChange={(e) => setCategoryModelDescription(e.target.value)}/>
              </div>
            </div>
            <div className='ModalCrudButtons'>
              <div>
                <a className="AdminConfirmButton Big Gray" onClick={() => setShowModalCrud(false)}>Cancelar</a>
              </div>
              <div>
                <a className="AdminConfirmButton Big Confirm" onClick={() => handleCategoryEdit()}>Salvar</a>
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
        <label>Categorias de Produto</label>
      </div>
      <div className="CrudTopSection">
        <div className='CrudSearchBarContainer'>
          <input className='CrudSearchBarInput' id='CrudSearchBarInput' placeholder='Pesquisar...' value={textFilter} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextFilter(event.target.value)}></input>
        </div>
        <div className='CrudTopButtonsContainer'>
          <a onClick={() => handleCategoryEditModalForm(0)}>Adicionar</a>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <div className='AdminPagerButtonContainer'>
                      <a className='AdminPagerButton' onClick={() => handleCategoryEditModalForm(category.id)}>
                        <img src={require('../../../assets/images/iconAdminEdit.png')}></img>
                      </a>
                      <a className='AdminPagerButton' onClick={() => handleCategoryDeleteConfirmationDialog(category.id)}>
                        <img src={require('../../../assets/images/iconAdminDelete.png')}></img>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            {filteredCategories.length === 0 && 
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

export default CategoryView;