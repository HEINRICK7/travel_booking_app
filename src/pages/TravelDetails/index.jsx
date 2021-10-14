import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import './travelDetails.css';

import Header from '../../Components/Header/index';
import Footer from '../../Components/Footer/index';

import { Steps } from 'antd';

const TravelDetails = () => {
    
    const { Step } = Steps;

    const [result, setResult] = useState({
        name: '',
        image_url: '',
        description:'',
    })
    const params = useParams();
    let _id = params.id;
    useEffect(() => {

        if( _id !== undefined){
 
             handleResultId(_id)
        } 
       
     },[_id]);

    const handleResultId = async (_id) => {
        const response = await api.get(`travel/${_id}`)
        setResult(response.data.travel)
    }
  
    return (
        <>
            <div className="travel_details">
                <Header />
                <div className="container_details">
                    
                    <div className="section_details_left">
                        
                        <Link className="icon_back" to={"/travel"}>
                            <FaArrowLeft />
                        </Link>
                   
                        <h1>{result.name}</h1>
                        <h2>R${result.price}/pessoa</h2>
                        <img src={result.image_url} alt={result.name}/>
                        <h3>{result.description}</h3>
                        <hr className="hr" style={{border:"2px solid #635995", marginTop:50, marginBottom: 50}}/>
                        <h6>Prepare-se para sua próxima viagem. Encontre aqui tudo o que você precisa saber para viajar sem contratempos.</h6>
                        <div className="travel_itinerary">
                            <h1>Itinerário</h1>
                            <Steps direction="vertical" current={6}>
                                <Step title={"Saida de Piripiri"} description="proximo a Igreja Matriz | 03:00hrs" />
                                <Step title="Primeira Parada" description="Vila de Jijoca | 07:00hrs" />
                                <Step title="Segunda Parada" description="Pedra Furada | 09:00hrs" />
                                <Step title="Horario de Almoco" description="Por Conta do Passageiro | 12:00hrs" />
                                <Step title="Visita a Arvore Caida" description="Parada Fotos e Contemplar a Natureza : 16:00hrs" />
                                <Step title="Saida de Jericoacoara" description="Volta Para Casa | 18:00hrs" />
                            </Steps>
                        </div>  
                    </div>
                    <div className="section_details_rigth">
                        <h1>Suas informações para viagem</h1>
                        <p>Faça sua reserva pelo nosso site com apenas algumas informações e escolha umas das nossas opções de pagamento em <b>Dinheiro</b> ou via <b>Pix</b> e <b>Parcelamento</b> e Click no botão logo abaixo. Nossa central de atendimento irá retornar o seu pedido e finalizar o seu atendimento</p>
                        <div className="form_client">
                            <input 
                            type="text" 
                            placeholder="Digite seu Cpf"
                            />
                            <input 
                            type="text" 
                            placeholder="Digite seu Nome"
                            />
                            <input 
                            type="text" 
                            placeholder="Digite sua Data de Nascimento"
                            />
                            <input 
                            type="text" 
                            placeholder="Digite sua Cidade"
                            />
                            <input 
                            type="text" 
                            placeholder="Digite sua Rua"
                            />
                            <input 
                            type="text" 
                            placeholder="Digite seu Bairro"
                            />
                            <div className="form_button">
                                < FaWhatsapp className="icon_button"/>
                                <button >Solicitar Viagem</button>
                            </div>
                            
                        </div>


                    </div>
                   
                </div>
                <Footer />
            </div>
            
        </>
    );
}

export default TravelDetails;
