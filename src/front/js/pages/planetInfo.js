import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { StarWarsBackground } from "../component/starWarsBackground";
import { useParams } from "react-router-dom";

export const PlanetInfo = () =>{
    const {actions, store} = useContext(Context)
    const {planetId} = useParams()
    const [planet, setPlanet] = useState(null)

    useEffect( ()=>{
        const getPlanetInfo = async () =>{
            const response = await fetch(`${store.baseURL}/planets/${planetId}`)
            const data = await response.json()
            
            if(response){
                setPlanet(data)
            }
        }
        getPlanetInfo()
    },[planetId])

    return(
        <div className="container my-5">
            <StarWarsBackground/>
            {planet && (            
                <div className="container-body my-5 d-inline-flex">
                    <div className="picture-planet" style={{width:"400px"}}>
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`}
                        className="rounded img-thumbnail"
                        alt={planet.id}
                        />
                    </div>
                    <div className="character-body-data ms-5 text-light"> 
                        <h1>{planet.name}</h1>
                        <h3>Rotation period: {planet.rotation_period}</h3>
                        <h3>Orbitational period: {planet.orbital_period}</h3>
                        <h3>Diameter: {planet.diameter}</h3>
                        <h3>Climate: {planet.climate}</h3>
                        <h3>Gravity: {planet.gravity}</h3>
                        <h3>Terrain: {planet.terrain}</h3>
                        <h3>Population: {planet.population}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}