import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { cpfMask, telefoneMask, dataMask } from '../../Components/Mask/index'


import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

import './travelDetails.css';

import Header from '../../Components/Header/index';
import Footer from '../../Components/Footer/index';

import { Steps, message } from 'antd';

const TravelDetails = () => {
    
    const { Step } = Steps;

    const [results, setResults] = useState([]);
    const [cpf, setCpf] = useState('')
    const [nome, setNome] = useState('')
    const [data_nasc, setData_Nasc] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cidade, setCidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [rua, setRua] = useState('')
    const [email, setEmail] = useState('')

    
    const params = useParams();
    let _id = params.id;
    
    useEffect(() => {
        const handleResultId = async (_id) => {
            api.get(`travel/${_id}`)
            .then(response => {
                setResults([response.data.travel])
            })
        }
        if( _id !== undefined){
 
            handleResultId(_id)
       } 
       
     },[_id]);

   
    const handleRegisterTravel = async (e) => {
        e.preventDefault()

        const data = {
            cpf,
            nome,
            data_nasc,
            telefone,
            cidade,
            bairro,
            rua,
            email,
            travel_id: _id
        }
        const key = 'updatable'
        console.log('oi',data)
         try {
        if(data !== '')
            
            await api.post('/travel_register_user', data)
               
                message.loading({ content: 'Loading...', key });
                setTimeout(() => {
                    message.success({ content: 'Usuário cadastrado com sucesso.', key, duration: 3 });
                }, 1000);
                enviarMensagem()
                setCpf('')
                setNome('')
                setData_Nasc('')
                setTelefone('')
                setCidade('')
                setBairro('')
                setRua('')
                setEmail('')
                

        }catch{

            message.info({ content:'Usuario ja cadastrado no nosso Banco de dados...', duration: 3 });
            }    
    }

    const MaskCpf = (e) => {
        setCpf(
            cpfMask(e.target.value)
        )
    }
    const MaskData_Nasc = (e) => {
        setData_Nasc(
            dataMask(e.target.value)
        )
    }
    const MaskTelefone_Celular = (e) => {
        setTelefone(
            telefoneMask(e.target.value)
        )
    }
    let cpfMsg = cpf;
    let nomeMsg = nome;
    let dataNascMsg = data_nasc;
    let telefoneMsg= "558694209350";
    let cidadeMsg = cidade;
    let bairroMsg = bairro;
    let ruaMsg = rua;
    let emailMsg = email;
 
    
    const enviarMensagem = () =>{
       
      const msg = `
      /-------------------------------------\n/;
      \n \n cpf: ${cpfMsg} \n \n
      /-------------------------------------\n/;
      \n \n nome: ${nomeMsg} \n \n
      /-------------------------------------\n/;
      \n \n data_nasc: ${dataNascMsg} \n \n
      /-------------------------------------\n/;
      \n \n telefone: ${telefoneMsg} \n \n
      /-------------------------------------\n/;
      \n \n cidade: ${cidadeMsg} \n \n
      /-------------------------------------\n/;
      \n \n Bairro: ${bairroMsg} \n \n
      /-------------------------------------\n/;
      \n \n rua: ${ruaMsg} \n \n
      /-------------------------------------\n/;
      \n \n email: ${emailMsg} \n \n
      /-------------------------------------\n/;

      `

      window.open("https://api.whatsapp.com/send?phone=" + telefoneMsg + "&text=" + msg, "_blank");
        
    }

    return (
        <>
            <div className="travel_details">
                <Header />
                <div className="container_details">
                    
                    <div className="section_details_left">
                       
                        {results.map(result => (
                        <>
                            <Link className="icon_back" to={"/travel"}>
                                <FaArrowLeft />
                            </Link>
                    
                            <h1>{result.name}</h1>
                            <h2>{result.price}/pessoa</h2>
                            <img src={result.image_url} alt={result.name}/>
                            <h3>{result.description}</h3>
                            <hr className="hr" style={{border:"2px solid #635995", marginTop:50, marginBottom: 50}}/>
                            <h6>Prepare-se para sua próxima viagem. Encontre aqui tudo o que você precisa saber para viajar sem contratempos.</h6>
                            <div className="travel_itinerary">
                                <h1>Itinerário</h1>
                                {results.map(result=> result.itinerary.map(res => (
                                
                                <>
                                   
                                <Steps progressDot direction="vertical" current={res.length}>
                                    
                                    <Step title={res.title} description={res.description} subTitle={res.departure_time} />
                               
                                </Steps>

                                </>
                                )))}
                                
                            </div>  
                        </> 
                        ))} 
                      
                    </div> 
                    <form onSubmit={handleRegisterTravel}>
                    <div className="section_details_rigth">
                        <h1>Suas informações para viagem</h1>
                        <p>Faça sua reserva pelo nosso site com apenas algumas informações e escolha umas das nossas opções de pagamento em <b>Dinheiro</b> ou via <b>Pix</b> e <b>Parcelamento</b> e Click no botão logo abaixo. Nossa central de atendimento irá retornar o seu pedido e finalizar o seu atendimento</p>
                        <div className="form_client">
                            <input 
                            type="text" 
                            placeholder="Digite seu Cpf"
                            name="cpf"
                            value={cpf}
                            onChange={MaskCpf}
                            required
                            />
                            <input 
                            type="text" 
                            placeholder="Digite seu Nome"
                            name="nome"
                            value={nome}
                            onChange={ e => setNome(e.target.value)}
                            required
                            />
                            <input 
                            type="text" 
                            placeholder="Digite sua Data de Nascimento"
                            name="data_nasc"
                            value={data_nasc}
                            onChange={  MaskData_Nasc }
                            maxLength="10"
                            required
                            />
                            <input 
                            type="text" 
                            placeholder="Digite seu Telefone"
                            name="telefone"
                            value={telefone}
                            onChange={ MaskTelefone_Celular}
                            required
                            />
                            <input 
                            type="text" 
                            placeholder="Digite sua Cidade"
                            name="cidade"
                            value={cidade}
                            onChange={ e => setCidade(e.target.value)}
                            required
                            />
                            <input 
                            type="text" 
                            placeholder="Digite seu Bairro"
                            name="bairro"
                            value={bairro}
                            onChange={ e => setBairro(e.target.value)}
                            required
                            />
                            <input 
                            type="text" 
                            placeholder="Digite sua Rua"
                            name="rua"
                            value={rua}
                            onChange={ e => setRua(e.target.value)}
                            required
                            />
                            <input 
                            type="email" 
                            placeholder="Digite seu Email"
                            name="email"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                            required
                            />
                            
                            <div className="form_button">
                                < FaWhatsapp className="icon_button"/>
                                <button type="submit" >Solicitar Viagem</button>
                            </div>
                           
                        </div>


                    </div>
                    </form> 
                </div>
                <Footer />
            </div>
            
        </>
    );
}

export default TravelDetails;
