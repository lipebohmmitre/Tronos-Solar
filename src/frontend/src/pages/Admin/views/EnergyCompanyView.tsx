import '../AdminPage.css';
import { useEffect, useState } from "react";
import EnergyCompanyDTO from './../../../models/EnergyCompanyDTO';
import { normalizeText } from '../../../helpers/stringHelper';
import { GetStates, State } from '../../../external-services/IBGELocalidades-api';
import { GetEnergyCompanies, GetEnergyCompanyById, DeleteEnergyCompany, UpdateEnergyCompany, CreateEnergyCompany } from '../../../services/EnergyCompanyService';
import CurrencyInput from '../../../helpers/currencyInputHelper';
import { convertNumberToCurrencyString, convertCurrencyStringToNumber } from '../../../helpers/numberHelper';

function EnergyCompanyView() {

  const [showConfirmationDialogDelete, setShowConfirmationDialogDelete] = useState(false);
  const [showModalCrud, setShowModalCrud] = useState(false);
  const [textFilter, setTextFilter] = useState('');

  const [energyCompanyIdToDelete, setEnergyCompanyIdToDelete] = useState(0);

  const [energyCompanyModel, setEnergyCompanyModel] = useState({} as EnergyCompanyDTO);
  const [energyCompanyModelName, setEnergyCompanyModelName] = useState('');
  const [energyCompanyModelCode, setEnergyCompanyModelCode] = useState('');
  const [energyCompanyModelStateCode, setEnergyCompanyModelStateCode] = useState('');
  const [energyCompanyModelDescription, setEnergyCompanyModelDescription] = useState('');
  const [energyCompanyModelKwhPrice, setEnergyCompanyModelKwhPrice] = useState('');

  const [listStates, setListStates] = useState([] as State[]);
  const [selectedState, setSelectedState] = useState({} as State);

  const [energyCompanies, setEnergyCompanies] = useState([] as EnergyCompanyDTO[]);
  const [filteredEnergyCompanies, setFilteredEnergyCompanies] = useState([] as EnergyCompanyDTO[]);

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement>){
    if (event.target === event.currentTarget) {
      setShowModalCrud(false);
      setShowConfirmationDialogDelete(false);
    }
  };

  async function updateSelectBoxListStates(){
      let states =  await GetStates();

      if(states && states.length > 0)
          setListStates(states);
  };

  async function setSelectedStateHandler(state:State){
    setSelectedState(state);
    setEnergyCompanyModelStateCode(state.uf);
  }

  async function getEnergyCompanies(){
      const energyCompanies = await GetEnergyCompanies();

      setEnergyCompanies(energyCompanies);
  }

  async function getFilteredEnergyCompanies(){
      let filteredEnergyCompanies = energyCompanies;
      
      //filtrar pro texto
      if(textFilter && textFilter.length > 0){
          filteredEnergyCompanies = filteredEnergyCompanies.filter((energyCompany) =>
              normalizeText(energyCompany.id.toString()).includes(normalizeText(textFilter)) ||
              normalizeText(energyCompany.name).includes(normalizeText(textFilter)) ||
              normalizeText(energyCompany.code).includes(normalizeText(textFilter)) ||
              normalizeText(energyCompany.description).includes(normalizeText(textFilter)) ||
              normalizeText(energyCompany.stateCode).includes(normalizeText(textFilter)) ||
              normalizeText(energyCompany.kwhPrice.toString()).includes(normalizeText(textFilter))
          );
      }
      
      setFilteredEnergyCompanies(filteredEnergyCompanies);
  }

  async function getEnergyCompanyById(energyCompanyId:number){
    if(!energyCompanyId || energyCompanyId === 0){
      setEnergyCompanyModel({} as EnergyCompanyDTO);
      setEnergyCompanyModelName('');
      setEnergyCompanyModelCode('');
      setSelectedState({} as State);
      setEnergyCompanyModelDescription('');
      setEnergyCompanyModelKwhPrice('');
      return;
    }

    const energyCompany = await GetEnergyCompanyById(energyCompanyId);

    setEnergyCompanyModelName(energyCompany.name);
    setEnergyCompanyModelCode(energyCompany.code);

    setEnergyCompanyModelStateCode(energyCompany.stateCode);
    setSelectedState({uf: energyCompany.stateCode} as State);

    setEnergyCompanyModelDescription(energyCompany.description);
    setEnergyCompanyModelKwhPrice(convertNumberToCurrencyString(energyCompany.kwhPrice));

    setEnergyCompanyModel(energyCompany);
  }

  async function handleEnergyCompanyEditModalForm(energyCompanyId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await getEnergyCompanyById(energyCompanyId);
    setShowModalCrud(true);
  }

  async function handleEnergyCompanyEdit() {
    updateEnergyCompanyModel();

    if(energyCompanyModel.id && energyCompanyModel.id != 0){
      await UpdateEnergyCompany(energyCompanyModel);
    }
    else{
      await CreateEnergyCompany(energyCompanyModel);
    }

    getEnergyCompanies();
    setShowModalCrud(false);
  }

  async function handleEnergyCompanyDelete(energyCompanyId:number) {
    await DeleteEnergyCompany(energyCompanyId);
    setShowConfirmationDialogDelete(false);
    getEnergyCompanies();
  }

  async function handleEnergyCompanyDeleteConfirmationDialog(energyCompanyId:number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowConfirmationDialogDelete(true);
    setEnergyCompanyIdToDelete(energyCompanyId);
  }

  function updateEnergyCompanyModel(){
    let updatedEnergyCompanyModel = energyCompanyModel ?? {} as EnergyCompanyDTO;

    updatedEnergyCompanyModel.name = energyCompanyModelName ?? energyCompanyModel.name;
    updatedEnergyCompanyModel.code = energyCompanyModelCode ?? energyCompanyModel.code;
    updatedEnergyCompanyModel.stateCode = energyCompanyModelStateCode ?? energyCompanyModel.stateCode;
    updatedEnergyCompanyModel.description = energyCompanyModelDescription ?? energyCompanyModel.description;
    updatedEnergyCompanyModel.kwhPrice = convertCurrencyStringToNumber(energyCompanyModelKwhPrice) ?? energyCompanyModel.kwhPrice;

    setEnergyCompanyModel(energyCompanyModel);
  }

  useEffect(() => {
    getEnergyCompanies();
    updateSelectBoxListStates();
  }, []);

  useEffect(() => {
    getFilteredEnergyCompanies();
  }, [textFilter, energyCompanies]);

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
                <a className="AdminConfirmButton Confirm" onClick={() => handleEnergyCompanyDelete(energyCompanyIdToDelete)}>Sim</a>
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
                <input type="text" value={energyCompanyModelName} onChange={(e) => setEnergyCompanyModelName(e.target.value)}/>
              </div>
              <div>
                <label>Código</label>
                <input type="text" value={energyCompanyModelCode} onChange={(e) => setEnergyCompanyModelCode(e.target.value)}/>
              </div>
              <div>
                <label>Estado (UF)</label>
                <select id="stateSelect" name="stateSelect" value={selectedState.uf} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedStateHandler({uf: event.target.value, description: ""})}>
                <option value="">Selecione o Estado...</option>
                {listStates && listStates.length > 0 ? listStates!.map((state) => (                               
                    <option value={state.uf}>{state.description}</option>
                )): <option value="">Nenhum estado encontrado</option>}
            </select>
              </div>
              <div>
                <label>Descrição</label>
                <input type="text" value={energyCompanyModelDescription} onChange={(e) => setEnergyCompanyModelDescription(e.target.value)}/>
              </div>
              <div>
                <label>Preço do kWh</label>
                <CurrencyInput maskOptions={{}} type="text" value={energyCompanyModelKwhPrice || null} placeholder="R$0,00" onChange={(e) => setEnergyCompanyModelKwhPrice(e.target.value)}/>
              </div>
            </div>
            <div className='ModalCrudButtons'>
              <div>
                <a className="AdminConfirmButton Big Gray" onClick={() => setShowModalCrud(false)}>Cancelar</a>
              </div>
              <div>
                <a className="AdminConfirmButton Big Confirm" onClick={() => handleEnergyCompanyEdit()}>Salvar</a>
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
        <label>Companhias de Energia</label>
      </div>
      <div className="CrudTopSection">
        <div className='CrudSearchBarContainer'>
          <input className='CrudSearchBarInput' id='CrudSearchBarInput' placeholder='Pesquisar...' value={textFilter} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextFilter(event.target.value)}></input>
        </div>
        <div className='CrudTopButtonsContainer'>
          <a onClick={() => handleEnergyCompanyEditModalForm(0)}>Adicionar</a>
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
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Estado (UF)</th>
                  <th>Preço do kWh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {filteredEnergyCompanies.map((energyCompany) => (
                <tr key={energyCompany.id}>
                  <td>{energyCompany.id}</td>
                  <td>{energyCompany.code}</td>
                  <td>{energyCompany.name}</td>
                  <td>{energyCompany.stateCode}</td>
                  <td>{convertNumberToCurrencyString(energyCompany.kwhPrice, true)}</td>
                  <td>
                    <div className='AdminPagerButtonContainer'>
                      <a className='AdminPagerButton' onClick={() => handleEnergyCompanyEditModalForm(energyCompany.id)}>
                        <img src={require('../../../assets/images/iconAdminEdit.png')}></img>
                      </a>
                      <a className='AdminPagerButton' onClick={() => handleEnergyCompanyDeleteConfirmationDialog(energyCompany.id)}>
                        <img src={require('../../../assets/images/iconAdminDelete.png')}></img>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            {filteredEnergyCompanies.length === 0 && 
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

export default EnergyCompanyView;