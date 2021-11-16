import React,{ useState, useEffect } from 'react';

import { Drawer, Form, Button, Col, Row, Input,Space, Divider, message, Avatar,Layout, Menu, Image, Statistic, Modal } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import Logo from '../../assets/logo.svg';

import { MdCardTravel } from 'react-icons/md';

import api from '../../services/api'; 

import Upload from '../../Components/Upload/index';

import FileList from '../../Components/FileList/index'

import { uniqueId } from 'lodash';
import moment from 'moment';

import {
  UserOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  WhatsAppOutlined,
  ArrowUpOutlined
  
} from '@ant-design/icons';


import './dashboard.css';



const Dashboard = () => {

    moment.locale('pt-br');

    const [collapsed, setCollapsed] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [results, setResults] = useState([]);
    const [resultsApprove, setResultsApprove] = useState([]);

    const [name_package, setName_package] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [date_initial, setDate_initial] = useState('')
    const [date_end, setDate_end] = useState('')
    const [price, setPrice] = useState('')
    const [quant_min, setQuant_min] = useState('')
    const [quant_max, setQuant_max] = useState('')
    const [quant_day, setQuant_day] = useState('')
    const [description, setDescription] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [itinerary, setItinerary] = useState([])

    const token = localStorage.getItem('token');
    
    useEffect(() => {
     
          api.get('travel_user')
          .then(response => {
              setResults([response.data.travelersUsers])
              console.log('Aki',response.data.travelersUsers)
          });

          api.get('travel_user_approve_all')
          .then(response => {
              setResultsApprove([response.data.travelersUsers])
              console.log('Ali',response.data.travelersUsers)
          })
   },[]);
    const addInputButton = () => {
      setItinerary([...itinerary, {
        title: '',
        description_itinerary: '',
        departure_time_itinerary: ''
      }])
    }
    const removeInputButton = (position) => {
      setItinerary([...itinerary.filter((_, index) => index !== position)])
    }

    const handleChangeItinerary = (e, index) => {
      const {name, value} = e.target;
      const list = [...itinerary];
      list[index][name] = value;
      setItinerary(list)
    }
    const handleUpload = (files) => {
      const uploadedFile= files.map(file => ({
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: file.size,
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }))

      setUploadedFiles(
        uploadedFiles.concat(uploadedFile)
      );
      uploadedFiles.forEach(processUpload);
    };

      const updateFile = (id, data) => {
        setUploadedFiles(uploadedFiles.map(uploadedFile => {
          return id === uploadedFile.id ? { ...uploadedFile, ...data} : uploadedFile;
        })
      )
    };

    const processUpload = (uploadedFile) => {
      const data = new FormData();

      data.append('file', uploadedFile.file, uploadedFile.name);

      api.post('travel_register', data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100)/ e.total));
          updateFile(uploadedFile.id, {
            progress,
          });
        }
      })
      .then(response => {
          updateFile( uploadedFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url
          });
      })
      .catch(() => {
        updateFile( uploadedFile.id, {
          error: true
          
        });
      })
    }
    
    const handleRegisterTravel  = async (e) => {
      e.preventDefault();
       
    const data = {
      name_package,
      city,
      state,
      date_initial,
      date_end,
      price,
      quant_min,
      quant_max,
      quant_day,
      description,
      itinerary
    
    }

      const key = 'updatable'
         
            await api.post('travel_register', data)
               
                message.loading({ content: 'Loading...', key });
                setTimeout(() => {
                    message.success({ content: 'Usuário cadastrado com sucesso.', key, duration: 3 });
                }, 1000);
    }
    const [visible, setVisible] = useState(false);

    const { Header, Sider, Content } = Layout;
   
    const toggle = () => {
      setCollapsed(!collapsed);
    }

    const showDrawer = () => {
        setVisible(true);
    } 
    const onClose = () => {
        setVisible(false);
        
    };

    const handleDelete = async (_id) => {
            await api.delete(`travel_user/${_id}`,{
              headers: {
                Authorization: `Bearer ${token}`,
          
                }
            })
        
            setResults(results.filter(result => result._id !== _id)) 
      }
    const handleApprove = async (_id) => {
        let dataApprove;
         results.map(result => result.map(res => (
            dataApprove = {
            cpf: res.cpf,
            nome :res.nome,
            data_nasc: res.data_nasc,
            telefone: res.telefone,
            cidade: res.cidade,
            bairro: res.bairro,
            rua: res.rua,
            email:res.email,
            travel_id: res.travel_id
          
        })))
              await api.post(`travel_user_approve/${_id}`,dataApprove, {
                headers: {
                  Authorization: `Bearer ${token}`,
            
                  }
              });
              setResultsApprove(results.filter(result => result.map(res => res._id !== _id)))
         
        }
  

    const showModal = () => {
      setIsModalVisible(true);
      
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    return (
        <>
        <Layout>
        <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
          <img src={Logo} alt="logo" />
          </div>
          <Divider/>
          <Menu mode="inline" className="menubar" defaultSelectedKeys={['1']}>
            <Menu.Item className="menu_item" key="1" icon={<DashboardOutlined style={{fontSize:20}}/>}>
              Dashboard
            </Menu.Item>
            <Menu.Item className="menu_item" key="2" onClick={showDrawer} icon={<MdCardTravel style={{fontSize:20}} />}>
              Cadastrar novo pacote
            </Menu.Item>
            <Menu.Item className="menu_item" key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background-header">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}

              <Row className="header_card" gutter={[6, 16]}>
                  <Col className="dashboard_card_header" span={6}>
                  <Statistic
                    className="card_daily_sales"
                    title="Vendas Diárias"
                    value={111.28}
                    precision={2}
                    valueStyle={{ 
                      color: '#2593fa',
                      fontSize:42,
                      fontWeight: 900
                    }}
                    suffix={<ArrowUpOutlined />}
                    prefix="R$"
                  />
                  </Col>
                  <Col className="dashboard_card_header" span={6}>
                    <Statistic
                      className="card_daily_sales"
                      title="Vendas Mensais"
                      value={1500.00}
                      precision={2}
                      valueStyle={{ 
                        color: '#2593fa',
                        fontSize:42,
                        fontWeight: 900
                      }}
                      suffix={<ArrowUpOutlined />}
                      prefix="R$"
                    />
                  </Col>
                  <Col className="dashboard_card_header" span={6}>
                    <Statistic
                        className="card_daily_sales"
                        title="Vendas Anuais"
                        value={12000}
                        precision={2}
                        valueStyle={{ 
                          color: '#2593fa',
                          fontSize:42,
                          fontWeight: 900
                        }}
                        suffix={<ArrowUpOutlined />}
                        prefix="R$"
                    />
                  </Col>
                </Row>
          </Header>
          <Content
            className="site-layout-background"
          >
            <Row className="layout-main" gutter={[8, 8]}>
            
                <Col className="dashboard_card_main_rigth" span={11}>
                <Divider orientation="left" style={{fontSize:22,backgroundColor: 'white'}} plain>
                <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
                  Usuarios Recentes
                </Divider>
                  {results.map(result => result.map( res => (
                  <>  
                   <Divider key={res._id}/>
                    <div className="container_users">
                      <div className="table_users">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <p>{res.nome}</p>
                      </div>
                      <div>
                        <p><b>Pacote: </b>{res.travel_id.map(list => list.name_package)}</p>
                        <p><b>Data da Viagem: </b>{moment(res.travel_id.map(list => list.date_initial)).format('DD/MM/YYYY')}</p>
                        <p className="phoneTable" onClick ={ () => {
                           window.open(`https://api.whatsapp.com/send?phone=${res.telefone}`, "_blank")
                        }}>< WhatsAppOutlined className="iconTable"/>{res.telefone}</p>
                      </div>
                      <div className="table_button">
                       
                        <button className="reject" onClick={(() => {showModal(handleDelete(res._id))})}>rejeitar</button>
                        <button className="approve" onClick={(()=>{showModal(handleApprove(res._id))})}>aprovar</button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}/>
                              
                      </div>
                      
                    </div>
                  </>
                  )))}
                </Col>
                <Col className="dashboard_card_main_left" span={11} >
                <Divider orientation="left" style={{fontSize:22,backgroundColor: 'white'}} plain>
                <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
                  Usuarios Cadastrados
                </Divider>
                        
                {resultsApprove.map(result => result.map( res => (
                  <>  
                   <Divider key={res._id}/>
                    <div className="container_users">
                      <div className="table_users">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <p>{res.nome}</p>
                      </div>
                      <div>
                        <p><b>Pacote: </b>{res.travel_id.map(list => list.name_package)}</p>
                        <p><b>Data da Viagem: </b>{moment(res.travel_id.map(list => list.date_initial)).format('DD/MM/YYYY')}</p>
                        <p className="phoneTable" onClick ={ () => {
                           window.open(`https://api.whatsapp.com/send?phone=${res.telefone}`, "_blank")
                        }}>< WhatsAppOutlined className="iconTable"/>{res.telefone}</p>
                      </div>
                    </div>
                  </>
                  )))}
                </Col>
            </Row>
          </Content>
        </Layout>
      
        <Drawer
          title="Create a new account"
                width={'85%'}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>Submit</Button>
                    </Space>
          }
          >
      
          <Form className="container_form" onSubmit={handleRegisterTravel} layout="vertical" hideRequiredMark>
              <Row className="container_input" gutter={16}>
                        <Col span={8}>
                            <Form.Item
                            name="name_package"
                            label="Nome"
                            rules={[{ required: true, message: 'Digite o nome do pacote' }]}
                            >
                            <Input 
                            className="col_input" 
                            placeholder="Digite o nome do pacote"
                            value={name_package}
                            onChange={ e => setName_package(e.target.value)}
                             />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="city"
                            label="Cidade"
                            rules={[{ required: true, message: 'Digite o nome da cidade' }]}
                            >
                            <Input 
                            className="col_input" 
                            placeholder="Digite o nome da cidade" 
                            value={city}
                            onChange={ e => setCity(e.target.value)}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="state"
                            label="Estado"
                            rules={[{ required: true, message: 'Digite o nome do estado' }]}
                            >
                            <Input 
                            className="col_input" 
                            placeholder="Digite o nome do estado" 
                            value={state}
                            onChange={ e => setState(e.target.value)}
                            />
                            </Form.Item>
                        </Col>
              </Row>
              <Row className="container_input" gutter={16}>
                        <Col span={8}>
                            <Form.Item
                            name="price"
                            label="Preco"
                            rules={[{ required: true, message: 'Digite o valor do pacote' }]}
                            >
                            <Input 
                            className="col_input" 
                            placeholder="Digite o valor do pacote"
                            value={price}
                            onChange={ e => setPrice(e.target.value)}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="date_initial"
                            label="Saida"
                            rules={[{ required: true, message: 'Selecione a data de Partida' }]}
                            >
                            <Input 
                            className="col_input" 
                            placeholder="Digite a data de saida"
                            value={date_initial}
                            onChange={ e => setDate_initial(e.target.value)}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="date_end"
                            label="Chegada"
                            rules={[{ required: true, message: 'Selecione a data de chegada' }]}
                            >
                            <Input 
                            className="col_input" 
                            placeholder="Digite a data de chegada"
                            value={date_end}
                            onChange={ e => setDate_end(e.target.value)}
                            />
                            </Form.Item>
                        </Col>
              </Row>
              <Row className="container_input" gutter={16}>
                    <Col span={8}>
                        <Form.Item
                        name="quant_day"
                        label="Quantidade de dias"
                        rules={[{ required: true, message: 'Please select an owner' }]}
                        >
                       <Input 
                       className="col_input"  
                       placeholder="Quantidade de dias" 
                       value={quant_day}
                       onChange={ e => setQuant_day(e.target.value)}
                       />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name="quant_min"
                        label="Qnt Minima de pessoas"
                        rules={[{ required: true, message: 'Please choose the type' }]}
                        >
                         <Input 
                         className="col_input" 
                         placeholder="Qnt minima de pessoas" 
                         value={quant_min}
                         onChange={ e => setQuant_min(e.target.value)}
                         />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name="quant_max"
                        label="Qnt Maxima de pessoas"
                        rules={[{ required: true, message: 'Please choose the type' }]}
                        >
                         <Input 
                         className="col_input" 
                         placeholder="Qnt maxima de pessoas"
                         value={quant_max}
                         onChange={ e => setQuant_max(e.target.value)} 
                         />
                        </Form.Item>
                    </Col>
              </Row>
              <Row className="container_textarea" gutter={16}>
                    <Col  span={24}>
                        <Form.Item
                        name="description"
                        label="Descricao"
                        rules={[
                            {
                            required: true,
                            message: 'please enter url description',
                            },
                        ]}
                        >
                        <Input.TextArea 
                        className="col_input" 
                        rows={4} 
                        placeholder="please enter url description" 
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                        />
                        </Form.Item>
                    </Col>
              </Row>
              <Divider orientation="left">Itinerário</Divider>
                    {itinerary.map((item, index)=> (

                      <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                
                        <Input 
                        name="title"
                        value={item.title}
                        placeholder="Titulo"
                        onChange={ e => handleChangeItinerary(e, index)}
                        
                         />

                        <Input 
                        name="description_itinerary"
                        value={item.description_itinerary}
                        placeholder="Descricao" 
                        onChange={ e => handleChangeItinerary(e, index)}
                        
                        />
                        
                        <Input 
                        name="departure_time_itinerary"
                        value={item.departure_time_itinerary}
                        placeholder="horario"
                        onChange={ e => handleChangeItinerary(e, index)}
                        
                        />

                        <MinusCircleOutlined onClick={() => {removeInputButton(index)}} />
                      </Space>
                     ))} 
                      <Button type="secundary" onClick={addInputButton} icon={<PlusOutlined />} />
             
              <Divider orientation="left">Imagens</Divider>
                < Upload onUpload={handleUpload}/>
                { !!uploadedFiles.length && (
                  < FileList files={uploadedFiles}/>  
                )}
              <Divider />
              <Space>
                  <Button type="primary" onClick={handleRegisterTravel} >
                      New Travel
                  </Button>
              </Space>
          </Form>
         
        </Drawer>
        
      </Layout>
      </>
    );
}

export default Dashboard;
