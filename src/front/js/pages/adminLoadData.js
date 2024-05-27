import React, {useContext, useState} from "react"
import { Context } from "../store/appContext"
import "../../styles/home.css";


export const AdminDataLoad = () =>{
    const {actions, store} = useContext(Context)

    const updatePeopleData = async () =>{
        if(store.people){
            const result = await actions.setPeopleData(store.people)
            if(result){
                alert('Data set')
            }
        }
    }

    const updatePlanetsData = async () =>{
        if(store.planets){
            const result = await actions.setPlanetsData(store.planets)
            if(result){
                alert('Data set')
            }
        }
    }

    const updateStarshipsData = async () =>{
        if(store.starships){
            const result = await actions.setStarshipsData(store.starships)
            if(result){
                alert('Data set')
            }
        }
    }

    return(
        <div className="container">
            <div className="body text-center m-5">
                <div className="d-grid gap-2 m-auto" style={{width: "26rem"}}>
                    <h1 className="text-primary-custom">In case data base is restored</h1>
                    <p className="text-secondary-custom">Use this view to load the data</p>
                    <div className="btn-group">
							<button className="btn btn-primary" onClick={ ()=>actions.getPeopleData()}>Load people data</button>
							<button className="btn btn-secondary" onClick={ ()=>updatePeopleData() }>Set people data</button>
					</div>
                    <div className="btn-group">
							<button className="btn btn-primary" onClick={ ()=>actions.getPlanetsData() }>Load planets data</button>
							<button className="btn btn-secondary" onClick={ ()=>updatePlanetsData() }>Set planets data</button>
					</div>
                    <div className="btn-group">
							<button className="btn btn-primary" onClick={ ()=>actions.getStarshipsData() }>Load starships data</button>
							<button className="btn btn-secondary" onClick={ ()=>updateStarshipsData() }>Set starships data</button>
					</div>
                </div>
            </div>
        </div>
    )
}