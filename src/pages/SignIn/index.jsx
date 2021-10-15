import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import { Input, Space, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined } from '@ant-design/icons'

import './signin.css'

import Logo from '../../assets/logo.svg'


const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useHistory();

  const key = 'updatable';

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    if (email === '' || password === '') {

      message.loading({ content: 'Processando...', key });
      setTimeout(() => {
        message.warning({ content: 'Digite Email e Senha', key, duration: 2 });
      }, 1000);
    }
    else {

        try {
            message.loading({ content: 'Processando...', key });
            const response = await api.post('/login', data);
            const { token } = response.data;
            console.log(token)
            
            localStorage.setItem('token', token);
              setTimeout(() => {
                message.success({ content: 'Acesso Liberado', key, duration: 2 });

                 history.push('/dashboard');
              }, 1000);

        } catch (error) {
            
          message.loading({ content: 'processando...', key });
          setTimeout(() => {
            message.error({ content: 'Email ou Senha Inválido', key, duration: 2 });
          }, 1000);
        };
                                      
    }
    
}

    return (
        <>
          <div className="container_login">
            <div className="box">
                <img src={Logo} className="logo_signin" alt="logo"/>    
                <h1 style={{marginTop: 20}}>Faça seu Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form_signin">
                        <Space direction="vertical" style={{marginTop: 50, width:'80%'}}>

                            <Input
                              style={{padding: 10, borderRadius: 5}}
                              placeholder="Seu Email"
                              prefix={<MailOutlined style={{padding: 10,color:"#198bd8", fontSize: 20}} />}
                              type="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              name="email"
                            />
                            <Input.Password
                              style={{padding: 10, borderRadius: 5}}
                              placeholder="Seu Password"
                              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                              prefix={<LockOutlined style={{padding: 10,color:"#198bd8", fontSize: 20}}/>}
                              type="password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              name="password"
                            />

                        </Space>
                    </div>
                  <button type="submit" className="button_success">Entrar</button>
                </form> 
            </div>
          </div>
        </>
    )
}

export default Signin
