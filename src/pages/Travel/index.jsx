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
        <div>
            <Header />
            <div className="container_travel">
                {results.map(result => (
                <>  
                    <div className="travel_card">
                        <p key={result._id}></p>
                        <img src={result.image_url} alt={result.name} />
                        <p>{result.price}</p>
                        <h2>{result.name}</h2>
                        <p>Saida</p>
                        <p>Chegada</p>
                        <p>{result.quant_day}</p>
                    </div>
					
                </>
            ))}
            </div>
            
            <Footer />
        </div>
    );
}

export default Travel;
