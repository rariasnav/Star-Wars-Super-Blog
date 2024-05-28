import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { StarWarsBackground } from "../component/starWarsBackground";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [people, setPeople] = useState([])
	const [planets, setPlanets] = useState([])
	const [starships, setStarships] = useState([])

	useEffect( ()=>{
		const getPeople = async () =>{
			const response = await actions.getMyPeopleData()
			if(response){
				setPeople(response)
			}
		}		
		getPeople()
	},[])

	useEffect( ()=>{
		const getPlanets = async () =>{
			const response = await actions.getMyPlanetsData()
			if(response){
				setPlanets(response)
			}
		}
		getPlanets()
	},[])

	useEffect( ()=>{
		const getStarships = async () =>{
			const response = await actions.getMyStarshipsData()
			if(response){
				setStarships(response)
			}
		}
		getStarships()
	},[])
	
	return (
		<div className="container my-5">
			<StarWarsBackground/>
			<div className="container-body my-5">
				<div className="album py-5 bg-background-light-color">
					<div className="container">
						<div className="horizontal-scroll-container d-flex">
							{people ? people.map( (person, index)=> {
								return(
									<div className="card shadow-sm" key={index}>
										<img
											src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
											className="bd-placeholder-img card-img-top"
											alt={person.name}
										/>
										<div className="card-body">
											<p className="card-text">{person.name}</p>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group">
													<button 
														type="button" 
														className="btn btn-sm btn-outline-secondary"
														onClick={ ()=>navigate(`/people/${person.id}`) }
														>More details
													</button>
													<button 
														type="button" 
														className="btn btn-sm btn-outline-secondary"
														><i className="fa-regular fa-heart"></i>
													</button>												
												</div>								
											</div>
										</div>
									</div>
								)
							})
							:
							<div className="text-center">
								<h1 className="text-light">No people data :(</h1>
							</div> 								
							}							
						</div>
					</div>

					<div className="container">
						<div className="horizontal-scroll-container d-flex my-2">
							{planets ? planets.map( (planet, index)=> {
								return(
									<div className="card shadow-sm" key={index}>
										<img
											src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
											className="bd-placeholder-img card-img-top"
											alt={planet.name}
										/>
										<div className="card-body">
											<p className="card-text">{planet.name}</p>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group">
													<button 
														type="button" 
														className="btn btn-sm btn-outline-secondary"
														onClick={ ()=>navigate(`/planets/${planet.id}`) }
														>More details
													</button>
													<button 
														type="button" 
														className="btn btn-sm btn-outline-secondary"
														><i className="fa-regular fa-heart"></i>
													</button>												
												</div>								
											</div>
										</div>
									</div>
								)
							})
							:
							<div className="text-center">
								<h1 className="text-light">No planets data :(</h1>
							</div>
							}
						</div>
					</div>

					<div className="container">
						<div className="horizontal-scroll-container d-flex my-2">
							{starships ? starships.map( (starship, index)=> {
								return(
									<div className="card shadow-sm" key={index}>
										<img
											src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`}
											className="bd-placeholder-img card-img-top"
											alt={starship.name}
										/>
										<div className="card-body">
											<p className="card-text">{starship.name}</p>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group">
													<button 
														type="button" 
														className="btn btn-sm btn-outline-secondary"
														onClick={ ()=>navigate(`/starships/${starship.id}`) }
														>More details
													</button>
													<button 
														type="button" 
														className="btn btn-sm btn-outline-secondary"
														><i className="fa-regular fa-heart"></i>
													</button>												
												</div>								
											</div>
										</div>
									</div>
								)
							})
							:
							<div className="text-center">
								<h1 className="text-light">No starships data :(</h1>
							</div>
							}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};
