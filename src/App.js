import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/booststrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {
  
  const baseUrl="https://localhost:44328/api/pontos";

  useEffect(()=>{
    pedidoGet();
  })

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

  const handleChange = e=>{
    const {name,value} = e.target;
    setPontoSelected({
      ...pontoSelect,[name]:value
    });
    console.log(setPontoSelected);
  }

  const pedidoGet=async()=>{
    await axios.get(baseUrl)
      .then(response => {
        setData(reponse.data);
      }).catch(error=>{
        console.log(error);
      })
  }

  const pedidoPost=async()=>{
    delete setPontoSelected.id;
    await axios.post(baseUrl, setPontoSelected)
      .then(response => {
        setData(data.concat(reponse.data));
        joinExitModalPost();
      }).catch(error=>{
        console.log(error);
      })
  }

  const pedidoDelete=async()=>{
    await axios.delete(baseUrl+"/"+pontoSelected.id)
    .then (response=>{
      setData(data.filter(ponto=ponto.id));
      joinExitModalDelete();
    }).catch(error=>{
      console.log(error);
    })
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



        <Modal isOpen={modalPost}>
          <ModalHeader>CADASTRAR NOVO PONTO TURISTICO</ModalHeader>

            <ModalBody>
              <div className="form-group">
                  <label>Nome:</label>
                    <br/>
                    <input type="text" className="form-control" name="nome" onChange={handleChange}/>
                    <br/>
                  <label>Cidade:</label>                           
                    <input type="text" className="form-control" name="cidade" onChange={handleChange}/>
                    <br/>
                  <label>Estado:</label>
                    <br/>
                    <input size="20" type="text" className="form-control" name="estado" maxlength="2" onChange={handleChange}/>
                    <br/>
                   <label>Rua:</label>
                    <br/>
                    <input type="text" className="form-control" name="ruareferencia" placeholder="Ex. Rua Euclides 234" onChange={handleChange}/>
                    <br/>   
                  <label>Descrição:</label>
                    <br/>
                    <textarea type="text" className="form-control" name="descricao" maxlength="100" onChange={handleChange}/>
                    <br/>                     
              </div>
                
                </ModalBody>    

              <ModalFooter>
              <button className="btn btn-primary" onClick={()=>pedidoPost()}>incluir</button> {" "}
              <button className="btn btn-danger" onClick={()=>joinExitModalPost()}>Sair</button>
          </ModalFooter>

        </Modal>

        <Modal>
          <ModalHeader>

          </ModalHeader>
          
            <ModalBody>
              
            </ModalBody>
          
          <ModalFooter>

          </ModalFooter>
        </Modal>


        <Modal>
          <ModalHeader>

          </ModalHeader>
          
            <ModalBody>
              
            </ModalBody>
          
          <ModalFooter>

          </ModalFooter>
        </Modal>


        <Modal>
          <ModalHeader>

          </ModalHeader>
          
            <ModalBody>
              
            </ModalBody>
          
          <ModalFooter>

          </ModalFooter>
        </Modal>



    </div>
  );
}

export default App;
