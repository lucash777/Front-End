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



  const joinExitModalDetail =()=>{
    setModalDetail(!modalDetail);
  }

  const joinExitModalDelete =()=>{
    setModalDelete(!modalDelete);
  }

  const joinExitModalPost=()=>{
    setModalPost(!modalPost);
  }

  const joinExitModalEdit=()=>{
    setModalEdit(!modalEdit);
  }

  const HandleChange = e=>{
    const {name,value} = e.target;
    setPontoSelected({
      ...pontoSelect,[name]:value
    });
    console.log(setPontoSelected);
  }


 













  return (
    <div className="App">
        <body>
            <h1 className='titulo'>PONTOS TURISTICOS DO BRASIL</h1>

              <div className="pesquisa">
                <input type="search" placeholder='Pesquisa por Nome, Cidade ou Estado...' onChange={e => setQuery(e.target.value)}/>
                  <div className='sub-titulo'>
                    <button className='btn btn-success' onClick={()=>joinExitModalPost()}> Incluir Novo </button>
                  </div>
              
              
              
              
              
              
              
              
              
              </div>

        </body>


    </div>
  );
}

export default App;
