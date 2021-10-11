import React,{ useState, useEffect} from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import './travel.css';


import api from '../../services/api'

const Travel = () => {

    const [results, setResults] = useState([])
	console.log(results)
  
	useEffect(()=> {

		api.get('travel_all', {
			
		})
		.then(response => {
			setResults(response.data.travelers)
            console.log(response.data)
			
		})
		.catch(error => console.log(error))

	},[]);
        

    return (
        <div className="travel">
            <Header className="header" />
            <div className="container_travel">
                {results.map(result => (
                <div className="travel">  
                    <div className="travel_card">
                        <p key={result._id}></p>
                        <img className="image"src={result.image_url} alt={result.name} />
                        <h5 className="price">R${result.price}</h5>
                        <div>
                            <h2 className="name">{result.name}</h2>
                            <p className="city">{result.city}-{((result.state).substr(-20, 2)).toUpperCase()}</p>
                        </div>
                        <div className="saida_chegada">
                            <p className="saida">Saida</p>
                            <p className="chegada">Chegada</p> 
                           
                        </div> 
                        
                        <div className="dias">
                            <h2>0{result.quant_day}<br/>dia(s)</h2>
                           
                        </div>
                        
                    </div>
					
                </div>
            ))}
            </div>
            
            <Footer className="footer"/>
        </div>
    );
}

export default Travel;
