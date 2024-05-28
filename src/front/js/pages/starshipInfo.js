import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { StarWarsBackground } from "../component/starWarsBackground";
import { useParams } from "react-router-dom";

export const StarshipInfo = () =>{
    const {actions, store} = useContext(Context)
    const {starshipId} = useParams()
    const [starship, setStarship] = useState(null)

    useEffect( ()=>{
        const getStarshipInfo = async () =>{
            const response = await fetch(`${store.baseURL}/starships/${starshipId}`)
            const data = await response.json()

            if(response){
                setStarship(data)
            }
        }
        getStarshipInfo()
    },[starshipId])

    return(
        <div className="container my-5">
            <StarWarsBackground/>
            {starship && (
                <div className="container-body my-5 d-inline-flex">
                    <div className="picture-starship" style={{width:"400px"}}>
                        <img src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`}
                        className="rounded img-thumbnail"
                        alt={starship.id}
                        />
                    </div>
                    <div className="starship-body-data ms-5 text-light">
                        <h1>{starship.name}</h1>
                        <h3>Model: {starship.model}</h3>
                        <h3>Manufacturer: {starship.manufacturer}</h3>
                        <h3>Cost in credits: {starship.cost_in_credits}</h3>
                        <h3>Length: {starship.length}</h3>
                        <h3>Max atmosphering speed: {starship.max_atmosphering_speed}</h3>
                        <h3>Crew: {starship.crew}</h3>
                        <h3>Passengers: {starship.passengers}</h3>
                        <h3>Cargo capacity: {starship.cargo_capacity}</h3>
                        <h3>Consumables: {starship.consumables}</h3>
                        <h3>Hyperdrive rating: {starship.hyperdrive_rating}</h3>
                        <h3>MGLT: {starship.MGLT}</h3>
                        <h3>Starship class: {starship.starship_class}</h3>                       
                    </div>
                </div>
            )}            
        </div>
    )
}