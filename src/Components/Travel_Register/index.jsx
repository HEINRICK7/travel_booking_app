import React,{useState} from 'react';
import { message } from 'antd';

import api from '../../services/api';

import { Drawer, Form, Button, Col, Row, Input, DatePicker, Space, Divider, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, MinusCircleOutlined, InboxOutlined } from '@ant-design/icons';

import './travel_register.css';

const TravelRegister = () => {

    const [visible, setVisible] = useState(false);

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
    const [itinerary, setItinerary] = useState([
      {
        title: '',
        description_itinerary: '',
        departure_time_itinerary: ''
      }
    ])
    
    const [fileList, setFileList] = useState([{
      name : '',
      size: '',
      key: '',
      url: '',
    }])

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
  
            
        const handleRegisterTravel = async (e) => {
            e.preventDefault();

            const data ={ 
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
              itinerary: {
                title,
                description_itinerary,
                departure_time_itinerary
              }, 
              file: {
                name,
                size,
                key,
                url
              }

            }

            const key = 'updatable'
            
            if(!data === ''){
    
                message.info({ content: 'Preencha todos os campos.', key, duration: 3.5 });
            }else {
                
                try {
    
                await api.post('/travel_register', data, {
                  /*  headers: {
                        Authorization: `Bearer ${token}`,
            
                       }
                  */     
                })
                    console.log('Aki',data)
                    message.loading({ content: 'Loading...', key });
                    setTimeout(() => {
                        message.success({ content: 'Usuário cadastrado com sucesso.', key, duration: 3 });
                    }, 1000);

                setName_package('')
                setCity('')
                setState('')
                setDate_initial('')
                setDate_end('')
                setPrice('')
                setQuant_min('')
                setQuant_max('')
                setQuant_day('')
                setDescription('')
                setItinerary('')
                setFile('')
               
            }catch{

                message.warning({ content:'Erro, por favor tente novamente...', duration: 3 });
            }
        }    
    }

    return (

        <>
                <div className="container_travel_register">
              
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
                    <Form  onSubmit={handleRegisterTravel} className="container_form" layout="vertical" hideRequiredMark>
                        <Row className="container_input" gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                name="nome"
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
                                name="cidade"
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
                                name="estado"
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
                                name="preco"
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
                                name="saida"
                                label="Saida"
                                rules={[{ required: true, message: 'Selecione a data de Partida' }]}
                                
                        
                                >
                                <DatePicker 
                                className="col_input" 
                                placeholder="Selecione a data de saida" 
                                value={date_initial}
                                onChange={ e => setDate_initial(e.target.value)}
                                />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name="chegado"
                                label="Chegada"
                                rules={[{ required: true, message: 'Selecione a data de chegada' }]}
                                
                                >
                                    <DatePicker 
                                    className="col_input"  
                                    placeholder="Selecione a data de chegada" 
                                    value={date_end}
                                    onChange={ e => setDate_end(e.target.value)}
                      
                                    />
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
                          <Input 
                          className="col_input"
                          placeholder="Quantidade de dias" 
                          value={quant_day}
                          onChange={ e => setQuant_day(e.target.value)}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            name="type"
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
                            name="type"
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
                            className="col_input" rows={4} 
                            placeholder="please enter url description"
                            value={description}
                            onChange={ e => setDescription(e.target.value)}  
                            />
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
                      <Input 
                      placeholder="Digite um Titulo" 
                      value={title}
                      onChange={ e => setTitle(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      fieldKey={[fieldKey, 'description']}
                      rules={[{ required: true, message: 'Missing last description' }]}
                    >
                      <Input 
                      placeholder="Digite uma Descricao" 
                      value={description_itinerary}
                      onChange={ e => setDescription_itinerary(e.target.value)}  
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
                      value={departure_time_itinerary}
                      onChange={ e => setDeparture_time_itinerary(e.target.value)}  
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
                        <Form.Item>
                        </Form.Item>
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
                            <Button  
                            htmlType="submit" 
                            icon={<PlusOutlined />}>
                                New Travel
                            </Button>
                        </Space>
                    </Form>
                    </Drawer>

                </div>
        </>
    )
}

export default TravelRegister;