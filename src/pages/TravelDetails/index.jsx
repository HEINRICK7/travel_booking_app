import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import api from '../../services/api';
import './travelDetails.css';

import Header from '../../Components/Header/index';
import Footer from '../../Components/Footer/index';

const TravelDetails = () => {

    const [result, setResult] = useState({
        name: '',
        price: '',
        quant_max: '',
        description: '',
    })

    const { _id } = useParams();

    useEffect(() => {

        if( _id !== undefined){
 
             handleResultId(_id)
        } 
       
     },[_id]);

    const handleResultId = async (_id) => {
        const response = await api.get(`travel_details/${_id}`)
        setResult(response.data.travelers)
        
    }
    console.log(result)

    return (
        <>
            <h1>{result.name}</h1>
        </>
    );
}

export default TravelDetails;
