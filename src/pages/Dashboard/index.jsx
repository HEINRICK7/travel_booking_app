import React,{useState} from 'react';

import { Drawer, Form, Button, Col, Row, Input, DatePicker, Space, Divider, Upload, message } from 'antd';

import { PlusOutlined, MinusCircleOutlined, InboxOutlined } from '@ant-design/icons';

import Logo from '../../assets/logo.svg';
import { MdCardTravel } from 'react-icons/md'
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
    
        const { Dragger } = Upload;

        const props = {
          name: 'file',
          multiple: true,
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
          onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
          },
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
                <Form className="container_form" layout="vertical" hideRequiredMark>
                    <Row className="container_input" gutter={16}>
                        <Col span={8}>
                            <Form.Item
                            name="nome"
                            label="Nome"
                            rules={[{ required: true, message: 'Digite o nome do pacote' }]}
                            >
                            <Input className="col_input" placeholder="Digite o nome do pacote" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="cidade"
                            label="Cidade"
                            rules={[{ required: true, message: 'Digite o nome da cidade' }]}
                            >
                            <Input className="col_input" placeholder="Digite o nome da cidade" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="estado"
                            label="Estado"
                            rules={[{ required: true, message: 'Digite o nome do estado' }]}
                            >
                            <Input className="col_input" placeholder="Digite o nome do estado" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="container_input" gutter={16}>
                        <Col span={8}>
                            <Form.Item
                            name="preco"
                            label="Preco"
                            rules={[{ required: true, message: 'Digite o valor do pacote' }]}
                            >
                            <Input className="col_input" placeholder="Digite o valor do pacote" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="saida"
                            label="Saida"
                            rules={[{ required: true, message: 'Selecione a data de Partida' }]}
                            >
                            <DatePicker className="col_input" placeholder="Selecione a data de saida" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="chegado"
                            label="Chegada"
                            rules={[{ required: true, message: 'Selecione a data de chegada' }]}
                            >
                                <DatePicker className="col_input"  placeholder="Selecione a data de chegada" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="container_input" gutter={16}>
                    <Col span={8}>
                        <Form.Item
                        name="owner"
                        label="Quantidade de dias"
                        rules={[{ required: true, message: 'Please select an owner' }]}
                        >
                       <Input className="col_input"  placeholder="Quantidade de dias" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name="type"
                        label="Qnt Minima de pessoas"
                        rules={[{ required: true, message: 'Please choose the type' }]}
                        >
                         <Input className="col_input" placeholder="Qnt minima de pessoas" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name="type"
                        label="Qnt Maxima de pessoas"
                        rules={[{ required: true, message: 'Please choose the type' }]}
                        >
                         <Input className="col_input" placeholder="Qnt maxima de pessoas" />
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
                        <Input.TextArea className="col_input" rows={4} placeholder="please enter url description" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Divider orientation="left">Itinerario</Divider>
                    <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'title']}
                  fieldKey={[fieldKey, 'title']}
                  rules={[{ required: true, message: 'Missing title' }]}
                >
                  <Input placeholder="Digite um Titulo" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  fieldKey={[fieldKey, 'description']}
                  rules={[{ required: true, message: 'Missing last description' }]}
                >
                  <Input placeholder="Digite uma Descricao" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'departure_time']}
                  fieldKey={[fieldKey, 'departure_time']}
                  rules={[{ required: true, message: 'Missing last departure_time' }]}
                >
                  <Input placeholder="Digite uma horario" />
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
                    <Form.Item>
                    </Form.Item>
                    <Divider orientation="left">Imagens</Divider>
                    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
                    </Dragger>
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
