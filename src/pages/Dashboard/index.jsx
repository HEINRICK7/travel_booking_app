import React,{useState} from 'react';

import { Drawer, Form, Button, Col, Row, Input, DatePicker, Space, Divider, Upload, message } from 'antd';

import { PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

import Logo from '../../assets/logo.svg';

import { MdCardTravel } from 'react-icons/md';

import api from '../../services/api';

import ImgCrop from 'antd-img-crop';

import { Layout, Menu} from 'antd';
import {
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';


import './dashboard.css';


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(true);

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
    const [fileList, setFileList] = useState([{
      name: '',
      size: '',
      key: '',
      url: ''
    }])
    const [itinerary, setItinerary] = useState([
      {
        title: '',
        description_itinerary: '',
        departure_time_itinerary: ''
      }
    ])

    const onFinish  = async (values) => {
    
  
      const key = 'updatable'
        console.log(values)
      
        if(!values === ''){

            message.info({ content: 'Preencha todos os campos.', key, duration: 3.5 });
        }else {
            
            try {

            await api.post('/register_travel', values)
               
                message.loading({ content: 'Loading...', key });
                setTimeout(() => {
                    message.success({ content: 'Usuário cadastrado com sucesso.', key, duration: 3 });
                }, 1000);
        
                setItinerary(...itinerary, '');
            }catch{

                message.warning({ content:'Erro, por favor tente novamente...', duration: 3 });
            }
        }    
    }
  
    const { Header, Sider, Content } = Layout;
   
    const toggle = () => {
      setCollapsed(!collapsed);
    }

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    } 
    const onClose = () => {
        setVisible(false);
        
    };
    

    const onChange = ({ fileList: newFileList }) => {
          setFileList(newFileList);
    };    
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
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
          <Header className="site-layout-background" 
           style={{
            height: '20vh',
            padding: 0,
            margin: '0px 16px',
            minHeight: 280,
          }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}

              <Row gutter={[6, 16]}>
                  <Col className="dashboard_card" span={6}/>
                  <Col className="dashboard_card" span={6}/>
                  <Col className="dashboard_card" span={6} />
                </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              height: '100vh',
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Row gutter={[8, 8]}>
                <Col className="dashboard_card_main" span={14} />
                <Col className="dashboard_card_main" span={6} />
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
                <Form className="container_form" onFinish={onFinish} layout="vertical" hideRequiredMark>
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
                    <Divider orientation="left">Itinerario</Divider>
                    <Form.List name="itinerary">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key , name, fieldKey, ...restField }) => (
                              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                  {...restField}
                                  name={[name, 'title']}
                                  fieldKey={[fieldKey, 'title']}
                                  rules={[{ required: true, message: 'Missing title' }]}
                                >
                                  <Input 
                                  placeholder="Digite um Titulo" 

                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'description_itinerary']}
                                  fieldKey={[fieldKey, 'description_itinerary']}
                                  rules={[{ required: true, message: 'Missing last description' }]}
                                >
                                  <Input 
                                  placeholder="Digite uma Descricao"

                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'departure_time']}
                                  fieldKey={[fieldKey, 'departure_time']}
                                  rules={[{ required: true, message: 'Missing last departure_time' }]}
                                >
                                  <Input 
                                  placeholder="Digite uma horario"

                                  />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            
                              </Space>
                            ))}
                            <Form.Item>

                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Adicionar Campo
                              </Button>
                            </Form.Item>
                          </>
                        )}
                    </Form.List>
                    <Divider orientation="left">Imagens</Divider>
                    <ImgCrop rotate>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        >
                        {fileList.length < 5 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                    <Divider />
                    <Space>
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
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
