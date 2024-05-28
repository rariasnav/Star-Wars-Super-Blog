import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { StarWarsBackground } from "../component/starWarsBackground";
import { useParams } from "react-router-dom";

export const PersonInfo = () =>{
    const {actions, store} = useContext(Context)
    const {characterId} = useParams()
    const [character, setCharacter] = useState(null)

    useEffect( ()=>{
        const getCharacterInfo = async () =>{
            const response = await fetch(`${store.baseURL}/people/${characterId}`)
            const data = await response.json()
            if(response){
                setCharacter(data)
            }
        }
        getCharacterInfo()
    },[characterId])

    return(
        <div className="container my-5">
			<StarWarsBackground/>
            {character && (
			<div className="container-body my-5 d-inline-flex">
                <div className="picture-character">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                        className="rounded img-thumbnail"
                        alt={character.id}
                        />
                </div>                
                <div className="character-body-data ms-5 text-light">                    
                    <h1>{character.name}</h1>
                    <h3>Height: {character.height}</h3>
                    <h3>Mass: {character.mass}</h3>
                    <h3>Hair Color: {character.hair_color}</h3>
                    <h3>Skin Color: {character.skin_color}</h3>
                    <h3>Eye Color: {character.eye_color}</h3>
                    <h3>Birth Year: {character.birth_year}</h3>
                    <h3>Gender: {character.gender}</h3>
                </div>                
            </div>
            )}
        </div>
    )
}   