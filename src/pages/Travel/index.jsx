import React,{ useState, useEffect} from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import './travel.css';


import api from '../../services/api'

const Travel = () => {

    const [results, setResults] = useState([])
	
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjA0ZDZlMGFjMjNkNzYxNWU2MDUyMyIsImlhdCI6MTYzMzk1MzU5MiwiZXhwIjoxNjM0MDM5OTkyfQ.1KfkY2oFvoJRrOLt67WsG_Y2B9QUMq1rJS_9a-y5OgM";
    console.log(token, results)
  
	useEffect(()=> {

		api.get('travel_all', {
			headers: {
				Authorization: `Bearer ${token}`,
	
			   }
		})
		.then(response => {
			setResults(response.data.travelers)
            console.log(response.data)
			
		})
		.catch(error => console.log(error))

	},[token]);
        

    return (
        <div>
            <Header />
            <div className="container_travel">
                {results.map(result => (
                <>  
                    <div className="travel_card">
                        <p key={result._id}></p>
                        <img src={result.image_url} alt={result.name} />
                        <h2>{result.name}</h2>
                    </div>
					
                </>
            ))}
            </div>
            
            <Footer />
        </div>
    );
}

export default Travel;
