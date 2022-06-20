import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { FaMapMarkerAlt, FaCity, FaMapMarkedAlt} from 'react-icons/fa';


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
    ruaReferencia:'',
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

  const SelectPonto = (ponto, opcao) =>{
    setPontoSelected(ponto);
    joinExitModalDetail();
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
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
  }

  const pedidoPost=async()=>{
    delete pontoSelect.id;
    await axios.post(baseUrl, pontoSelect)
      .then(response => {
        setData(data.concat(response.data));
        joinExitModalPost();
      }).catch(error=>{
        console.log(error);
      })
  }

  const pedidoDelete=async()=>{
    await axios.delete(baseUrl+"/"+pontoSelect.id)
    .then (response=>{
      setData(data.filter(ponto=>ponto.id !== response.data));
      joinExitModalDelete();
    }).catch(error=>{
      console.log(error);
    })

  }

  const pedidoPut=async()=>{
    await axios.put(baseUrl+"/"+pontoSelect.id, pontoSelect)
    .then(response =>{
      var resposta = response.data;
      var dadosEdit = data;
      dadosEdit.map(ponto=>{
        if(ponto.id === pontoSelect.id){
        ponto.nome=resposta.nome;
        ponto.cidade=resposta.cidade;
        ponto.estado=resposta.estado;
        ponto.ruaReferencia=resposta.ruaReferencia;
        ponto.descricao=resposta.descricao;       
      }
    });
    joinExitModalEdit();
  }).catch(error=>{
    console.log(error);
  })
}



  return (
    <div className="App">
        <body>
          <h1 className='titulo'>PONTOS TURISTICOS DO BRASIL</h1>

            <div className="pesquisa">
              <input type="search" placeholder='Pesquise por Nome, Cidade, Estado ou Descrição...' onChange={e => setQuery(e.target.value)}/>
                <div className='sub-titulo'>
                  <button className='btn btn-success' onClick={()=>joinExitModalPost()}> Incluir Novo </button>
                </div>
              
              
                <div className='row m-2'>
                  {data.filter(ponto=>{

                    if(query === ''){

                      return ponto;

                    } else if (ponto.nome.toLowerCase().includes(query.toLowerCase())){

                      return ponto;
                    }

                    if(query === ''){

                      return ponto;

                    } else if (ponto.estado.toLowerCase().includes(query.toLowerCase())){

                      return ponto;
                    }

                    if(query === ''){

                      return ponto;

                    } else if (ponto.cidade.toLowerCase().includes(query.toLowerCase())){

                      return ponto;
                    }

                    if(query === ''){

                      return ponto;

                    } else if (ponto.descricao.toLowerCase().includes(query.toLowerCase())){

                      return ponto;
                    }

                    }).map((ponto, index)=>(
                <div className="col-sm-6 col-md-4 v my-2" key={index}>                
                  <div className="card-body">
                    <h3 className="card-title text-uppercase">{ponto.nome}</h3>  
                      <p>{ponto.descricao}</p>
                        <p className='botoes'>
                      <button className="btn btn-primary" onClick={()=>selectPonto(ponto, "Edit")}>Editar</button> {" "}
                      <button className="btn btn-danger"  onClick={()=>selectPonto(ponto, "Excluir")}>Excluir</button>{" "}
                      <button className="btn btn-success" onClick={()=>SelectPonto(ponto)}>Detalhes</button>
                        </p>
                  </div>
                </div>                                               
                        ))}

                </div>
              </div>  
           
        </body>



        <Modal className='customizar' isOpen={modalPost} size="lg">
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
                   <label>Rua ou Referência:</label>
                    <br/>
                    <input type="text" className="form-control" name="ruaReferencia" placeholder="Ex. Rua Euclides 234" onChange={handleChange}/>
                    <br/>   
                  <label>Descrição:</label>
                    <br/>
                    <textarea type="text" className="form-control" name="descricao" maxlength="100" onChange={handleChange}/>
                    <br/>                     
              </div>
                
                </ModalBody>    
              <ModalFooter>
              <button className="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button> {" "}
              <button className="btn btn-danger" onClick={()=>joinExitModalPost()}>Sair</button>
          </ModalFooter>
        </Modal>

        <Modal className='customizar' isOpen={modalEdit} size="lg">
          <ModalHeader >EDITAR PONTO TURISTICO</ModalHeader>

            <ModalBody>
            <div className="form-group">
              <label>ID:</label>
                <input type="text" className="form-control"  readOnly 
                  value={pontoSelect && pontoSelect.id}/>
                    <br/>            
                    
              <label>Nome:</label>                 
                <input type="text" className="form-control" name="nome" onChange={handleChange}
                   value={pontoSelect && pontoSelect.nome}/>
                     <br/>
                                                       
              <label>Cidade:</label>                 
                <input type="text" className="form-control" name="cidade" onChange={handleChange}
                    value={pontoSelect && pontoSelect.cidade}/>
                      <br/>
                                
              <label>Estado:</label>                  
                <input type="text" className="form-control" name="estado" onChange={handleChange}
                    value={pontoSelect && pontoSelect.estado}/>
                      <br/>

              <label>Rua ou Referência:</label>                  
                 <input type="text" className="form-control" name="ruaReferencia" onChange={handleChange}
                    value={pontoSelect && pontoSelect.ruaReferencia}/>
                      <br/>

              <label>Descrição:</label>
                  <textarea maxlength="100" type="text" className="form-control" name="descricao" onChange={handleChange}
                    value={pontoSelect && pontoSelect.descricao}/>
                      <br/>
            </div>              
                </ModalBody>    
              <ModalFooter>
              <button className="btn btn-primary" onClick={()=>pedidoPut()}>CONFIRMAR</button> {" "}
              <button className="btn btn-danger" onClick={()=>joinExitModalEdit()}>CANCELAR</button>
          </ModalFooter>
        </Modal>


        <Modal className='detalhes' isOpen={modalDetail }
        aria-labelledby="contained-modal-title-vcenter" centered>
          <ModalHeader>Detalhes</ModalHeader>
            <ModalBody>
            <div className="form-group">
              <h4>ID: {pontoSelect && pontoSelect.id}</h4>
                <h1>{pontoSelect && pontoSelect.nome}</h1>
                  <h1><FaCity/> {pontoSelect && pontoSelect.cidade}</h1>
                    <h1 class="text-uppercase"><FaMapMarkedAlt/> {pontoSelect && pontoSelect.estado}</h1>
                    <a className="linkado" href={`https://www.google.com/maps/search/?api=1&query=${pontoSelect && pontoSelect.ruaReferencia}+${pontoSelect && pontoSelect.cidade}`} target="_blank">
              <FaMapMarkerAlt/> {pontoSelect && pontoSelect.ruaReferencia}</a>   
              <h6>{pontoSelect && pontoSelect.descricao}</h6>                         
            </div>                
              </ModalBody>    
              <ModalFooter>
                <button className="btn btn-danger" onClick={()=>joinExitModalDetail()}>SAIR</button>
          </ModalFooter>
        </Modal>

        <Modal className='customizar' isOpen={modalDelete}
        aria-labelledby="contained-modal-title-vcenter" centered>
          <ModalHeader className='large'>EXCLUIR PERMANENTEMENTE {pontoSelect && pontoSelect.nome} ?</ModalHeader>  
              <ModalFooter>
              <button className="btn btn-primary" onClick={()=>pedidoDelete()}>EXCLUIR</button> {" "}
              <button className="btn btn-danger" onClick={()=>joinExitModalDelete()}>CANCELAR</button>
              </ModalFooter>
        </Modal>

       

    </div>
  );
}

export default App;
