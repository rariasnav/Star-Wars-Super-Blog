import React,{useEffect} from "react";
import "../../styles/home.css";

export const StarWarsBackground = () =>{
    useEffect( ()=>{
        const starWarsBackground = document.querySelector('.starwars-background');

        if(starWarsBackground){
            const numberOfStars = 200;

            for(let i = 0; i < numberOfStars; i++){
                const star = document.createElement('div');
                star.classList.add('star');

                // Tamaño aleatorio para las estrellas
                const size = Math.random() * 2 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;

                // Posicion aleatoria para las estrellas
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;

                // Duracion aleatoria de la animacion
                star.style.animationDuration = `${Math.random() * 50 + 50}s`;

                starWarsBackground.appendChild(star)
            }
        } else {
            console.error("Star Wars background element not found");
        }
        
    },[])

    return(
        <div className="starwars-background"></div>
    )
}