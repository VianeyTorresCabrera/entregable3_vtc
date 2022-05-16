import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ResidentInfo from './ResidentInfo';
import Pagination from './Pagination';

const Location = () => {
    
    const [location, setLocation] = useState({})
    const [population, setPopulation] = useState ([])
    const [id, setId] = useState("")

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)



    useEffect(() =>{
        const fetchLocation = async () =>{
            setLoading (true)
            const random = Math.floor(Math.random()*126 + 1)
            axios.get(`https://rickandmortyapi.com/api/location/${random}`)
                .then(res => 
                    {setLocation(res.data)
                    setPopulation(res.data.residents)}
                   )
            setLoading(false )                
        }
       fetchLocation()
                
       
    },[])

    if(loading){
        return <h2>Loading...</h2>
    }

    //get Current posts

    const indexOfLastPost = currentPage *postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = population.slice(indexOfFirstPost,indexOfLastPost);

  //change page

  const paginate = pageNumber => setCurrentPage(pageNumber);

   const searchLocation = () =>{
       console.log(id)
       axios.get(`https://rickandmortyapi.com/api/location/${id}`)
            .then(res => 
                {setLocation(res.data)
                setPopulation(res.data.residents)}
                )
   }

   
    
    
    return (
        <div className='container'>   
              
            <h1>Rick and Morty Wikki</h1>
            <div className='search'>
                <input type="text" onChange={e => setId(e.target.value)}
                    value={id}
                />
                <button onClick={searchLocation} className="search_button">Search</button>
            </div>
            <div className='location_tittle'><h2>{location.name}</h2></div>     

            <div className='location'>                       
                <div className='location_desc'><b>Type:</b> {location.type}</div>
                <div className='location_desc'><b>Dimension:</b> {location.dimension}</div>
                <div className='location_desc'><b>Population:</b> {population.length}</div>
            </div>

            <div className='resident_tittle'><h2>Residents</h2></div> 
           
            <div className='container_card'>  
            {loading}    
                <ul className="card1">
                    {currentPost.map(resident => (
                    <ResidentInfo url={resident} key={resident}/>
                    ))}   
                </ul>                
            </div> 
            <Pagination 
                postsPerPage={postsPerPage } 
                totalPosts={population.length} 
                paginate={paginate} />           
              
        </div>
    );
};

export default Location;