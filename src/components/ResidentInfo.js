import axios from 'axios';
import React, { useEffect, useState } from 'react';



const ResidentInfo = ({url}) => {

    const [residentInfo, setResidentInfo] = useState({})
    const [episodeI, setEpisodeI] = useState ([])
    const[character, setCharacter] = useState()
    const[color, setColor] = useState("green")

    useEffect(() =>{
        axios.get(url)
             .then(res => {
                 setResidentInfo(res.data)
                 setEpisodeI(res.data.episode)
                })   
    },[url])

    useEffect(()=>{
        axios.get(url)
            .then(res=>setCharacter(res.data));
        
            if (character?.status === "Alive") {
                setColor("green")
            }else if (character?.status === "Dead") {
                setColor("red")
            }else{
                setColor("gray")
            }
        },[url,character?.status])
    
    console.log(residentInfo)
    return (
        <div className='card'>
            <div className='card_img'><img src={residentInfo?.image} alt=""/> 
           
            </div>
           
            <div className='list'>
                <li >                                
                    <p className='name'>{residentInfo?.name}</p> 

                    <p className='status'>
                        <h5 className='status_c'><span className={`status-circle ${color}`}></span></h5>   
                        <span className='status_r'>{residentInfo?.status} - {residentInfo?.species}</span>
                    </p>  
                    <p className='sub'>Origin</p><p>{residentInfo.origin?.name}</p>  
                    <p className='sub'>Episodes where appear</p><p>{episodeI.length}</p>   
                </li>
          </div>
        </div>
    );
};

export default ResidentInfo;