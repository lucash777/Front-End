import React from 'react';
import './App.css';
import 'bootstrap/dist/css/booststrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {
  
  const basUrl="https://localhost:44328/api/pontos";

  const [data, setData]=useState([]);

  const [pontoSelect, setPontoSelected]=useState({
    id:'',
    nome:'',
    cidade:'',
    estado:'',
    ruareferencia:'',
    descricao:''
  });

  const [query, setQuery]= useState ("");

  const [modalPost, setModalPost]= useState (false);

  const [modalEdit, setModalEdit]= useState (false);

  const [modalDelete, setModalDelete]= useState (false);

  const [modalDetail, setModalDetail]= useState (false);

  



  const selectPonto = (ponto, chose) =>{
    setPontoSelected(ponto);
        (chose === "Edit") ?
        joinExitModalEdit() : joinExitModalDelete();
  }













  return (
    <div className="App">
      
    </div>
  );
}

export default App;
